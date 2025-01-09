const port = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/gemini", async (req, res) => {
  const { history, message } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const chat = model.startChat({
    history: history,
  });
  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
