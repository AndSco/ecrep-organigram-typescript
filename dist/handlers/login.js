"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const config_1 = require("../config");
exports.login = (req, res, next) => {
    try {
        let role;
        let status;
        if (req.body.password === config_1.adminPassword) {
            role = "admin";
            status = 200;
        }
        else if (req.body.password === config_1.readerPassword) {
            role = "reader";
            status = 200;
        }
        else {
            role = "unauthorised";
            status = 200;
        }
        res.status(status).json({ role });
    }
    catch (err) {
        return next(err);
    }
};
