"use client";
import styles from "./Navbar.module.scss";
import Signin from "../signIn/Signin";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: any) => {
    return pathname === href;
  };

  return (
    <div className={styles["navbar"]}>
      <div className="left-side">
        <h3>
          Pc<span>ai</span>sso
        </h3>
        <ul className="menu">
          <li>
            <Link href="/" style={{ color: isActive("/") ? "wheat" : "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/draw/new"
              style={{ color: isActive("/draw/new") ? "wheat" : "white" }}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              style={{ color: isActive("/faq") ? "wheat" : "white" }}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              style={{ color: isActive("/about") ? "wheat" : "white" }}
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
