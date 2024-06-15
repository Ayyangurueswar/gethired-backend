'use strict';

/**
 * application router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::application.application', {
    config: {
        update: {
            middlewares: ['api::application.isOwner']
        },
        delete: {
            middlewares: ['api::application.isOwner']
        }
    }
})