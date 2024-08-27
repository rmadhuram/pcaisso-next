import styles from "./page.module.scss";
import "animate.css";

export default function Contributions() {
  return (
    <div className={styles["display"]}>
      <div className="animate animated bounceInUp credits">
        <h2>Founding Team</h2>
        <h3>Project Lead</h3>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/rmadhuram/">Raj Madhuram</a>{" "}
            (CSE &apos;95)
          </li>
        </ul>

        <h3>Contributors</h3>
        <h4>(In the order of contributions)</h4>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/aleena-joseph-918072258/"
            >
              Aleena Joseph
            </a>{" "}
            (CSE &apos;26)
          </li>
          <li>
            <a href="https://www.linkedin.com/in/varshinianandhanehru/">
              Varshini Anandha Nehru
            </a>{" "}
            (Spouse of Mech &apos;14)
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jeremy-asirwaad-182b93192/">
              Jeremy Asirwaad
            </a>{" "}
            (IT &apos;24)
          </li>
          <li>
            <a href="https://www.linkedin.com/in/iamnoufal/">Noufal Rahman</a>{" "}
            (CSE &apos;24)
          </li>
          <li>
            <a href="https://www.linkedin.com/in/suntrakanesh-subramanian-0a81471a4/">
              Suntrakanesh Subramanian
            </a>{" "}
            (EIE &apos;23)
          </li>
        </ul>
      </div>
    </div>
  );
}
