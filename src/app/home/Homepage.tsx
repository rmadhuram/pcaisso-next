import "./Homepage.css";
import cover1 from "../../assets/cover1.jpg";
import cover2 from "../../assets/cover2.png";
import cover3 from "../../assets/cover3.png";
export default function Homepage()  {
  return (
    <div className="home">
      <h1>
        Pc<span style={{ color: "rgb(228, 113, 113)" }}>ai</span>sso
      </h1>
      <h2>AI Art + Code</h2>
      <div className="cover-pages">
        <div className="cover-3 cover"></div>
        <div className="cover-1 cover"></div>
        <div className="cover-2 cover"></div>
      </div>
      <p className="footer">
        Made with 💖 by the <a href="#">students and friends</a> of{" "}
        <a href="#">GCT, Coimbatore</a>
      </p>
    </div>
  );
}
