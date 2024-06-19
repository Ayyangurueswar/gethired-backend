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
            const events = await fetch('https://gethired-backend.onrender.com/api/jobs')
            const res = await events.json();
            return events;
        },
        options: {
            rule: "*/13 * * * *",
        }
    }
}