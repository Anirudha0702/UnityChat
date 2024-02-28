import express from "express"
import { getStatusOfFollowings,getStatusOfUser,updateStatusSeenBy,deleteStatus,createStatus } from "../controllers/status.controller.js"
const router = express.Router();
router.get('/ofUser', getStatusOfUser);
router.post('/create', createStatus);
router.delete('/delete', deleteStatus);
router.get('/ofFollowings', getStatusOfFollowings);
router.patch('/updateSeenBy', updateStatusSeenBy);
export default router;