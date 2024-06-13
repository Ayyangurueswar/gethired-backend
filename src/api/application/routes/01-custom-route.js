module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/applications/me',
            handler: 'application.me'
        },
        {
            method: 'POST',
            path: '/applications/getApplications',
            handler: 'application.getApplications'
        }
    ]
}