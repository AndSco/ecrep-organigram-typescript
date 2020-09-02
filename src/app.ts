import express, { Request, Response, NextFunction } from "express";
const app = express();
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";
import loginRoutes from "./routes/login";
import imageRoutes from "./routes/image";
import { connectToDatabase } from "./handlers/dbConnection";
import path from "path";

app.use(json());
app.use("/api", loginRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/images", imageRoutes);

// Connect to DB
connectToDatabase();

// To serve both frontend and backend - catch ALL. Serve static assets only if in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
  });
}

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("ERROR HANDLER", error.message);

  res.json({
    message: error.message || "Ooops, something went wrong!"
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
