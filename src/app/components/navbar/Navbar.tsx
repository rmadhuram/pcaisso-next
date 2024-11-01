"use client";
import styles from "./Navbar.module.scss";
import Signin from "../signIn/Signin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import discordIcon from "../../../../public/discord-icon.svg";

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
          <li>
            <Link
              href="/blog"
              className={pathname === "/blog" ? "selected" : ""}
            >
              Blog
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
      <div className="right-side">
        <Signin />
        <Link href="https://discord.com/channels/1301703780064165940/1301703780064165943">
          <Image
            src={discordIcon}
            alt="Discord icon"
            width={25}
            height={25}
          ></Image>
        </Link>
      </div>
    </div>
  );
}
