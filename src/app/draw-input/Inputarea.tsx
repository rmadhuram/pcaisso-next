import "./inputarea.css";
import "../draw-output/Outputarea.css";
export default function Inputarea() {
  return (
    <div className="inputContainer">
      <div className="message">
        <p>
          Describe what you imagine , and the system will draw it for you! This
          is powered by OpenAI APIs (ChatGPT).
        </p>
      </div>
      <div className="choices">
        <label>
          <input type="radio" value="2D" name="option" />
          2D (Canvas)
        </label>
        <label>
          <input type="radio" value="SVG" name="option" />
          SVG (Vector Graphics)
        </label>
        <label>
          <input type="radio" value="3D" name="option" />
          3D (Three.js)
        </label>
        <label>
          <input type="radio" value="d3" name="option" />
          d3 (Data Visualization)
        </label>
      </div>
      <div className="inputarea">
        <p>What do you want to draw?</p>
        <label htmlFor="inputtext">
          <textarea
            name="inputtext"
            id="inputtext"
            className="textarea"
          ></textarea>
        </label>
      </div>
      <div className="submit">
        <button className="submitButton" type="submit">
          Generate
        </button>
      </div>
    </div>
  );
}
