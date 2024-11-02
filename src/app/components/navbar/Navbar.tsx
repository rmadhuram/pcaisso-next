"use client";
import styles from "./Navbar.module.scss";
import Signin from "../signIn/Signin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug;

  return (
    <div className={styles["navbar"]}>
      <div className="left-side">
        <h3>
          Pc<span>ai</span>sso
        </h3>
        <ul className="menu">
          <li>
            <Link href="/" className={pathname === "/" ? "selected" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/draw/new"
              className={pathname.startsWith("/draw") ? "selected" : ""}
            >
              Create
            </Link>
          </li>
          {/* <li>
            <Link
              href="/blog"
              className={pathname === "/blog" ? "selected" : ""}
            >
              Blog
            </Link>
          </li> */}
          <li>
            <Link href="/faq" className={pathname === "/faq" ? "selected" : ""}>
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={pathname === "/about" ? "selected" : ""}
            >
              About
            </Link>
          </li>
        </ul>
        <div className="socials">
          <Link
            href="https://discord.com/channels/1301703780064165940/1301703780064165943"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <FontAwesomeIcon icon={faDiscord} className="icon" />
          </Link>

          <Link
            href="https://x.com/pcaisso_"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <FontAwesomeIcon icon={faXTwitter} className="icon" />
          </Link>
        </div>
      </div>
      <div className="right-side">
        <Signin />
      </div>
    </div>
  );
}
