import styles from "./Navbar.module.scss";
import Signin from "../signIn/Signin";
import Link from "next/link";

export default function Navbar() {

 return (
    <div className={styles["navbar"]}>
      <div className="left-side">
        <h3>
          Pc<span>ai</span>sso
        </h3>
        <ul className="menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/draw">Explore</Link></li>
          <li>FAQ</li>
          <li>About</li>
        </ul>
      </div>
      <Signin/>
    </div>
  );
}


