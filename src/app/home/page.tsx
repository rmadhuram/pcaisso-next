import Link from "next/link";
import styles from "./page.module.scss";
import "../../styles/animations.scss";

export default function HomePage() {
  return (
    <div className={styles["intro"]}>
      <h1 className="animated bounceInUp animate-delay-1s">
        Pc<span>ai</span>sso
      </h1>
      <h2>AI Art + Code</h2>
      <div className="cover-pages">
        <div className="cover-3 cover"></div>
        <div className="cover-1 cover"></div>
        <div className="cover-2 cover"></div>
      </div>
      <p className="footer animated bounceInUp animate-delay-2s">
        Made with 💖 by the{" "}
        <Link href="/home/contributions">students and friends</Link> of{" "}
        <Link target="_blank" href="https://gct.ac.in/">
          {" "}
          GCT, Coimbatore
        </Link>
      </p>
    </div>
  );
}
