"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
mongoose_1.default.set("debug", true);
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.Promise = Promise; // allows us to do without CALLBACKS!
// const connectionString =
//   process.env.NODE_ENV === "production"
//     ? mongoProductionConnection
//     : mongoDevelopmentConnection;
const connectionString = config_1.mongoDevelopmentConnection;
exports.connectToDatabase = () => {
    mongoose_1.default.connect(connectionString, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) {
            console.log(err);
            throw new Error(err.message);
        }
        else {
            console.log("Database connected!");
        }
    });
};
