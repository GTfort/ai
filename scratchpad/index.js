require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function run() {
  const text = "THE DOG RAN OVER THE LAZY FOX";
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  console.log("Embedding: ", embedding);
}

run();
