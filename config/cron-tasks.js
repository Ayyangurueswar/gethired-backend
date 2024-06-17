module.exports = {
    deleteJob: {
        task: async ({strapi}) => {
            await strapi.db.query("api::job.job").deleteMany({
                where: {
                    applyBy: new Date().toLocaleDateString().slice(0, 10)
                }
            })
        },
        options: {
            rule: "0 0 0 * * ?",
        }
    },
    myJob: {
        task: async () => {
            console.log("To keep server running")
        }
    }
}