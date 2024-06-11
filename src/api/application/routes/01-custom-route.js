module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/applications/me',
            handler: 'application.me'
        },
        {
            method: 'GET',
            path: '/applications/getApplications',
            handler: 'application.getApplications'
        }
    ]
}