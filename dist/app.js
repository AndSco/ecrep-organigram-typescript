"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = require("body-parser");
const employee_1 = __importDefault(require("./routes/employee"));
const login_1 = __importDefault(require("./routes/login"));
const image_1 = __importDefault(require("./routes/image"));
const dbConnection_1 = require("./handlers/dbConnection");
const path_1 = __importDefault(require("path"));
app.use(body_parser_1.json());
app.use("/api", login_1.default);
app.use("/api/employees", employee_1.default);
app.use("/api/images", image_1.default);
// Connect to DB
dbConnection_1.connectToDatabase();
// To serve both frontend and backend - catch ALL. Serve static assets only if in production.
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "client", "build", "index.html"));
    });
}
app.use((error, req, res, next) => {
    console.log("ERROR HANDLER", error.message);
    res.json({
        message: error.message || "Ooops, something went wrong!"
    });
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
