'use strict';

/**
 * job router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::job.job', {
    config: {
        update: {
            middlewares: ["api::job.is-owner"],
        },
        delete: {
            middlewares: ["api::job.is-owner"],
        }
    }
});
