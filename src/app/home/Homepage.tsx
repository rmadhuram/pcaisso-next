import "./Homepage.css";
import cover1 from "../../assets/cover1.jpg";
import cover2 from "../../assets/cover2.png";
import cover3 from "../../assets/cover3.png";
export default function Homepage() {
  return (
    <div className="home">
      <h1>
        Pc<span style={{ color: "rgb(228, 113, 113)" }}>ai</span>sso
      </h1>
      <h2 className="catchy">AI Art + Code</h2>
      <div className="coverpages">
        <img src={cover1.src} alt="cover1" className="cover" />
        <img src={cover2.src} alt="cover2" className="cover" />
        <img src={cover3.src} alt="cover3" className="cover" />
      </div>
      <h2 className="footer">
        Made with 💖 by the <span>students and friends</span> of{" "}
        <span>GCT, Coimbatore</span>
      </h2>
    </div>
  );
}
