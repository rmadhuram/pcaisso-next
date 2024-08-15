"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./Signin.module.scss";

export default function Signin() {
  const handleSumbit = () => {
    signIn("google");
  };

  return (
    <div className={styles["submitbtn"]}>
      <button type="submit" onClick={handleSumbit}>
        <Image
          src="/googleLogo.png"
          alt="sign in button"
          width={15}
          height={15}
        />
        <span>SignIn</span>
      </button>
    </div>
  );
}
