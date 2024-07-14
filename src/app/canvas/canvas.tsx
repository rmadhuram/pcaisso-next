//src/app/canvas/canvas.ts
"use client";

import { useState, useRef } from "react";
import default_image from "../assets/default_image.jpg";
import "./canvas.css";

export default function Canvas() {
  const [image_url, setImage_url] = useState("/");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [format, setFormat] = useState("2D");
  const [hasGenerated, setHasGenerated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (inputRef.current) {
      const input = inputRef.current.value;

      const response = await fetch('../api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, format }),
      });

      const data = await response.json();
      setImage_url(data.imageURL); 
      setGeneratedCode(data.code);
      setHasGenerated(true); 
    }

  };

  const toggleView = () => {
    setShowCode(!showCode);
  };

  return (
    <div className="canvasMain">
      <div className="message">
        <h1 className="text">PCAISSO</h1>
        <p className="text">An AI powered code generator</p>
      </div>
      <div className="canvas">
        {showCode ? (
          <pre>{generatedCode}</pre>
        ) : (
          <img
            src={image_url === "/" ? default_image.src : image_url}
            alt="generated image"
          />
        )}
      </div>
      {hasGenerated && (
        <div className="toggleView">
          <button onClick={toggleView}>
            {showCode ? "Show Drawing" : "Show Code"}
          </button>
        </div>
      )}
      <div className="choices">
        <p>Select the format you want : </p>
        <div className="format-options">
          <label>
            <input
              type="radio"
              value="2D"
              checked={format === "2D"}
              onChange={() => setFormat("2D")}
            />
            2D
          </label>
          <label>
            <input
              type="radio"
              value="SVG"
              checked={format === "SVG"}
              onChange={() => setFormat("SVG")}
            />
            SVG
          </label>
          <label>
            <input
              type="radio"
              value="3D"
              checked={format === "3D"}
              onChange={() => setFormat("3D")}
            />
            3D
          </label>
          <label>
            <input
              type="radio"
              value="D3"
              checked={format === "D3"}
              onChange={() => setFormat("D3")}
            />
            D3
          </label>
        </div>
      </div>
      <div className="generate">
        <input
          className="input"
          type="text"
          placeholder="Describe what you want to see"
          ref={inputRef}
        />
        <div className="generatebtn" onClick={handleGenerate}>
          GENERATE
        </div>
      </div>
    </div>
  );
}
