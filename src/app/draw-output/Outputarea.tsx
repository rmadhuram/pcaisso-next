import "./Outputarea.css";

export default function Outputarea()  {
  return (
    <div className="output-container">
      <div className="editor">
        <button>
          <a href="#">
            Result
          </a>
        </button>
        <button>
          <a href="#">
            Code
          </a>
        </button>
        <button>
          <a href="#">
            Debug
          </a>
        </button>
      </div>
      <div className="canvas"></div>
    </div>
  );
}
