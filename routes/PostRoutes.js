import express from "express";
import { addWork, editWork,deleteWork, wrokOfTheDay, workStatus } from "../controllers/PostControllers.js";


const PostRoutes = express.Router()


PostRoutes.post("/addWork", addWork)
PostRoutes.post("/editWork/:contentId", editWork)
PostRoutes.post("/deleteWork/:contentId", deleteWork)
PostRoutes.post("/wrokOfTheDay", wrokOfTheDay)
PostRoutes.post("/workStatus", workStatus)


export default PostRoutes