'use strict';

/**
 * job router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::job.job', {
    config: {
        update: {
            middlewares: ["api::job.isOwner"],
        },
        delete: {
            middlewares: ["api::job.isOwner"],
        }
    }
});
