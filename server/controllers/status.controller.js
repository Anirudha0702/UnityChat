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
        const { uid, displayName, sid, isVideo, isImage, isText, text, image, video, visibleTo ,photoURL} = req.body;
        const status = new Status({ uid, displayName, sid, isVideo, isImage, isText, text, image, video, visibleTo ,photoURL});
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

export const getStatusVisibleTo = async (req, res) => {
    try {
        const { uid } = req.params;
        const status = await Status.find({ visibleTo: { $in: [uid]}}).sort({"createdAt": -1});
        const result=status.reduce((x, y) => {
            (x[y.uid] = x[y.uid] || []).push(y);
            return x;
        }, {});
        res.status(200).json(result);
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