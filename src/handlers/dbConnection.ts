import mongoose from "mongoose";
import {
  mongoProductionConnection,
  mongoDevelopmentConnection
} from "../config";

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = Promise; // allows us to do without CALLBACKS!

// const connectionString =
//   process.env.NODE_ENV === "production"
//     ? mongoProductionConnection
//     : mongoDevelopmentConnection;

const connectionString = mongoDevelopmentConnection;

export const connectToDatabase = () => {
  mongoose.connect(
    connectionString as string,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        console.log(err);
        throw new Error(err.message);
      } else {
        console.log("Database connected!");
      }
    }
  );
};
