'use strict';

/**
 * application controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::application.application', ({strapi}) => ({
    async me(ctx){
        const user = ctx.state.user;
        if(!user || user.type === 'recruiter'){
            return ctx.badRequest([{messages: [{id: 'No authorization header was found'}]}])
        }
        const data = await strapi.db.query('api::application.application').findMany({
            where: {
                user: {
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
        if(!user || user.type ==='recruiter'){
            return ctx.badRequest([{messages: [{id: 'No authorization header was found'}]}])
        }
        const res = await super.create(ctx);
        const updatedRes = await strapi.entityService.update('api::application.application', res.data.id, {
            data: {
                user: {
                    id: user.id,
                },
                job: {
                    id: res.data.attributes.applicationFor,
                }
            },
            populate: "*"
        });
        return updatedRes;
    },
    async getApplications(ctx){
        const user = ctx.state.user;
        if(!user || user.type === 'candidate'){
            return ctx.badRequest([{messages: [{id: 'No authorization header was found'}]}])
        }
        const {jobId} = JSON.parse(ctx.request.body);
        const data = await strapi.db.query('api::application.application').findMany({
            where: {
                job: {
                    id: jobId,
                }
            },
            populate: true,
        });
        if(!data){
            return ctx.notFound();
        }
        const sanitizedData = await this.sanitizeOutput(data, ctx);
        return sanitizedData;
    }
}));
