'use strict';

/**
 * job controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job.job', ({strapi}) => ({
    async me(ctx){
        const user = ctx.state.user;
        if(!user || user.type === 'candidate'){
            return ctx.badRequest([{messages: [{id: 'No authorization header was found'}]}])
        }
        const data = await strapi.db.query('api::job.job').findMany({
            where: {
                postedBy : {
                    id: user.id,
                }
            },
            populate: true,
        });
        if(!data){
            return ctx.notFound();
        }
        const sanitizedData = await this.sanitizeOutput(data, ctx);
        return sanitizedData;
    },
    async create(ctx){
        const user = ctx.state.user;
        if(!user || user.type ==='candidate'){
            return ctx.badRequest([{messages: [{id: 'No authorization header was found'}]}])
        }
        const res = await super.create(ctx);
        const updatedRes = await strapi.entityService.update('api::job.job', res.data.id, {
            data: {
                postedBy: {
                    id: user.id,
                }
            },
            populate: "*"
        });
        return updatedRes;
    }
}));
