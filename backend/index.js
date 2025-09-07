import express from "express";
import { generate } from "./chatbot.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).send("Server is running at port ", PORT);
});

app.post("/api/v1/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }
    const result = await generate(message);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Oops Something went wrong . Please try again after some time",
      });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to the PORT : `, PORT);
});
