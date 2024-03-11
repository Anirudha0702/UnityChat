import Status from '../models/Status.model.js';
export const getStatusOfUser = async (req, res) => {
    try {
        const { uid } = req.query;
        const status = await Status.find({ uid: uid }).sort({"createdAt": -1});
        res.status(200).json(status);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
export const createStatus = async (req, res) => {
    try {
        const { uid, displayName, sid, isVideo, isImage, isText, text, image, video, visibleTo } = req.body;
        const status = new Status({ uid, displayName, sid, isVideo, isImage, isText, text, image, video, visibleTo });
        await status.save();
        res.status(201).json(status);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
export const deleteStatus= async (req, res) => {
    try {
        const { sid } = req.body;
        const status = await Status.findOneAndDelete({ sid: sid });
        res.status(200).json(status);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

export const getStatusOfFollowings = async (req, res) => {
    try {
        const { uid } = req.query;
        const status = await Status.find({ uid: { $in: visibleTo } });
        res.status(200).json(status);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
export const updateStatusSeenBy = async (req, res) => {
    try {
        const { sid, uid } = req.body;
        const status = await Status.updateOne(
            { sid: sid },
            {$push:{seenBy:uid}
        });  
        status.seenBy.push(uid);
        await status.save();
        res.status(200).json(status);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}