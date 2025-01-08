import { useState } from "react";
import surprise from "./surprisePrompt";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="app">
      <section className="search-section">
        <p>
          What do you want to know?
          <button className="surprise " onClick={setValue(surprise)}>
            Surprise me
          </button>
        </p>
        <div className="input-section">
          <input
            type="text"
            value={""}
            placeholder="Search for a movie, tv show, person..."
            onChange={() => {}}
          />
          {!error && <button>Ask Me</button>}
          {error && <button>Clear</button>}
        </div>
        {error && <p className="error">{error}</p>}

        <div className="search-result">
          <div key="">
            <p className="answer"></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
