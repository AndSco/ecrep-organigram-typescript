"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToDatabase = void 0;
exports.uploadImageToDatabase = async (req, res, next) => {
    try {
        console.log("REQ FILE", req.file);
        const url = req.file.path;
        // const public_id = req.file.filename.split("/")[1];
        // console.log("Public id", public_id);
        res.status(200).json(url);
    }
    catch (err) {
        console.log("ERROR", err);
        return next(err);
    }
};
