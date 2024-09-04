import styles from "./LikeButton.module.scss";
export default function LikeButton({
  liked,
  onClick,
}: {
  liked: boolean;
  onClick: () => Promise<void>;
}) {
  return (
    <div className={styles["like-btn"]} onClick={onClick}>
      {liked ? (
        <i className="fa-solid fa-heart liked"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </div>
  );
}
