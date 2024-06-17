'use strict';

/**
 * application router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::application.application', {
    config: {
        update: {
            middlewares: ['api::application.is-owner']
        },
        delete: {
            middlewares: ['api::application.is-owner']
        }
    }
})