AIzaSyC3zCTFdP50761V0G2-yrboTG3eZMoMj8c

text:

```javascript
async function generateStory() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = "write me a story of a magic backpack";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const story = response.text();
  console.log(story);
}

generateStory();
```

/\*\*

- This script reads two image files, converts them to base64 encoded strings,
- and then uses a generative model to compare the two images based on a given prompt.
-
- Functions:
-
- - fileToGenerativePart(path, mimeType):
- Reads a file from the given path, converts it to a base64 encoded string,
- and returns an object containing the encoded data and its MIME type.
-
- - run():
- Asynchronously runs the main logic of the script. It creates a prompt and
- an array of image parts, then uses a generative model to generate content
- based on the prompt and the images. Finally, it logs the generated text response.
-
- Usage:
-
- - Ensure the image files "Dark, cozy small home office.jpeg" and "download (8).jpeg"
- are present in the working directory.
- - Call the run() function to execute the script.
-
- Note:
-
- - The script assumes that the generative model is already defined and available
- as the variable `model`.
- - The script uses Node.js's `fs` module to read the image files.
    \*/

```javascript
const fs = require("fs");

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const prompt = "What is the difference between these two images?";
  const imageParts = [
    fileToGenerativePart("Dark, cozy small home office.jpeg", "image/jpeg"),
    fileToGenerativePart("download (8).jpeg", "image/jpeg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
run();
```
