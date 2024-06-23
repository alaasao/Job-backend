const express = require("express")
const jobsRouter = express.Router()
const {getAllJobs,getJob,updateJob,createJob,deleteJob}=require("../controllers/jobs")
jobsRouter.route('/').get(getAllJobs).post(createJob)
jobsRouter.route('/:jobId').put(updateJob).delete(deleteJob).get(getJob)
module.exports=jobsRouter 