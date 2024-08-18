"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./Signin.module.scss";

export default function SignIn() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
  };

  const isUserSignedIn = session && session.user;

  return (
    <div className={styles["submitbtn"]}>
      {isUserSignedIn ? (
          <button onClick={handleSignOut}>
          <Image
            src={session?.user?.image || "/default-profile.png"}
            alt="User's Google profile picture"
            width={18}
            height={18}
            className="img"
          />
          <span>SignOut</span>
          </button>
      ) : (
        <button onClick={handleSignIn}>
          <Image
            src="/googleLogo.png"
            alt="Sign in with Google"
            width={15}
            height={15}
            className="img"
          />
          <span>SignIn</span>
        </button>
      )}
    </div>
  );
}
