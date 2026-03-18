import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const fetchWord = async () => {
    if (!input) return;

    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
    );

    setData(res.data);
  };

  return (
    <div className="container">
      <h1>Dictionary App</h1>

      <input
        type="text"placeholder="Enter a word..." value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWord()} />

      <button onClick={fetchWord}>Search</button>

      {data.length > 0 && (
        <>
          <h2>{data[0].word}</h2>

          {data[0].phonetics[0]?.audio && (
            <audio controls src={data[0].phonetics[0].audio}></audio>
          )}

          <div className="card-container">
            {data[0].meanings[0].definitions.map((item, index) => (
              <div className="card" key={index}>
                <h3>Definition {index + 1}</h3>
                <p>{item.definition}</p>

                {item.example && (
                  <p className="example">👉 {item.example}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;