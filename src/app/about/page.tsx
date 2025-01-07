import styles from "./about.module.scss";
export default function page() {
  return <div className={styles["about"]}>
    <div className="title">
      <h1 className="animate__animated animate__flipInX">
        🎨 Pc<span>ai</span>sso
      </h1>
      <h2>Drawing Studio</h2>
    </div>

    <h3 className="team">Brought to you by</h3>
    <ul>
      <li><a href="https://www.linkedin.com/in/rmadhuram/">Raj Madhuram</a></li>
      <li><a href="https://www.linkedin.com/in/aleena-joseph-918072258/">Aleena Joseph</a></li>
    </ul>

    <h3 className="team">2023 Initial Version Contributors</h3>
    <ul>
      <li>Varshini Anandha Nehru</li>
      <li>Jeremy Asirwaad</li>
      <li>Noufal Rahman</li>
      <li>Suntrakanesh Subramanian</li>
    </ul>
  </div>;
}
