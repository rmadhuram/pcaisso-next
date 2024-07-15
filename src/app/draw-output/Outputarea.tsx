import "./Outputarea.css";

export default function Outputarea() {
  return (
    <div className="outputContainer">
      <div className="editor">
        <button>
          <a className="underline" href="#">
            Result
          </a>
        </button>
        <button>
          <a className="underline" href="#">
            Code
          </a>
        </button>
        <button>
          <a className="underline" href="#">
            Debug
          </a>
        </button>
      </div>
      <div className="canvas"></div>
    </div>
  );
}
