"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {}, postedJobs = [];
    if(!user){
      return ctx.unauthorized();
    }
    /** 
     * Gets all information about a given entry,
     * populating every relations to ensure 
     * the response includes author-related information
     */
    if (entryId) {
      entry = await strapi.entityService.findOne(
        // replace the next line with your proper content-type identifier
        "api::application.application",
        entryId,
        { populate: "*" }
      );
    }
    if(user.type === 'recruiter'){
      const jobs = await strapi.db.query("api::job.job").findMany({
        where: {
          postedBy: {
            id: user.id
          }
        }
      });
      postedJobs = jobs.map(job => job.id);
    }
    /**
     * Compares user id and entry author id
     * to decide whether the request can be fulfilled
     * by going forward in the Strapi backend server
     */
    if(user.type === 'recruiter' && !postedJobs.includes(entry.applicationFor)){
      return ctx.unauthorized();
    }
    if(user.type === 'candidate' && entry.user.id !== user.id){
      return ctx.unauthorized();
    }
    return next();
  };
};