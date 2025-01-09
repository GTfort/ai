import { useState } from "react";
import surprise from "./surprisePrompt";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSurpriseClick = () => {
    setValue(surprise);
  };
  const clear = () => {
    setValue("");
    setError("");
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a prompt");
      return;
    }
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [value],
        },
        {
          role: "model",
          parts: [data],
        },
      ]);
      setValue("");
    } catch (error) {
      console.error("Error:", error.message);
      console.error("Stack Trace:", error.stack);
      setError("Something went wrong");
    }
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          What do you want to know?
          <button
            className="surprise"
            onClick={handleSurpriseClick}
            disabled={!chatHistory}
          >
            Surprise me
          </button>
        </p>
        <div className="input-section">
          <input
            type="text"
            value={value}
            placeholder="Search for a movie, tv show, person..."
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Ask Me</button>}
          {error && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p className="error">{error}</p>}

        <div className="search-result">
          {chatHistory.map((chatItem, index) => (
            <div key={index}>
              <p className="answer">
                {" "}
                {chatItem.role}:{chatItem.parts}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
