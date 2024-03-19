import express from "express"
import { getStatusVisibleTo,getStatusOfUser,updateStatusSeenBy,deleteStatus,createStatus } from "../controllers/status.controller.js"
const router = express.Router();
router.get('/ofUser', getStatusOfUser);
router.post('/create', createStatus);
router.delete('/delete', deleteStatus);
router.get('/visibleto/:uid', getStatusVisibleTo);
router.patch('/updateSeenBy/:statusId', updateStatusSeenBy);
export default router;