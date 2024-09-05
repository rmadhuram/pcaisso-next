import styles from "./LikeButton.module.scss";
import { useState } from "react";

export default function LikeButton({
  liked,
  callback,
}: {
  liked: boolean | undefined;
  callback: (liked: boolean) => Promise<void>;
}) {
  const [likedState, setLikedState] = useState(liked ?? false);
  return (
    <div className={styles["like-btn"]} onClick={() => {setLikedState(!likedState); callback(!likedState)}}>
      {likedState ? (
        <i className="fa-solid fa-heart liked"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </div>
  );
}
