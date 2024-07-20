import "./inputarea.scss";
export default function Inputarea() {
  return (
    <div className="input-container">
      <p>
        Describe what you imagine , and the system will draw it for you! This is
        powered by OpenAI APIs (ChatGPT).
      </p>
      <div className="choices">
        <label>
          <span>
            <input type="radio" value="2D" name="option" />
          </span>
          2D (Canvas)
        </label>
        <label>
          <span>
            <input type="radio" value="SVG" name="option" />
          </span>
          SVG (Vector Graphics)
        </label>
        <label>
          <span>
            <input type="radio" value="3D" name="option" />
          </span>
          3D (Three.js)
        </label>
        <label>
          <span>
            <input type="radio" value="d3" name="option" />
          </span>
          d3 (Data Visualization)
        </label>
      </div>
      <div className="input-area">
        <p>What do you want to draw?</p>
        <textarea
          name="inputtext"
          id="inputtext"
          className="text-area"
        ></textarea>
      </div>
      <div className="submit">
        <button className="submit-button" type="submit">
          Generate
        </button>
      </div>
    </div>
  );
}
