import express from "express";
import { connectToDB } from "./configs/MongoConfig";
import { routes } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "*",
}
app.use(cors(corsOptions));
app.use(express.json());

// body-parser
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const port = 4000;

// connect to database
connectToDB();

app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 4000, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
