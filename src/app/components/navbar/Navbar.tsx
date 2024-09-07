"use client";
import styles from "./Navbar.module.scss";
import Signin from "../signIn/Signin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

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
              href={slug ? `/draw/${slug}` : "/draw/new"}
              className={slug && pathname === `/draw/${slug}` ? "selected" : ""}
            >
              Explore
            </Link>
          </li>
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
      </div>
      <Signin />
    </div>
  );
}
