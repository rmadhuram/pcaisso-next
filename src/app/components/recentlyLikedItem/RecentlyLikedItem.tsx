import styles from "./RecentlyLikedItem.module.scss";
import { RecentlyLikedItemModel } from "@/models/recently-liked-item";

export default function RecentlyLikedItem({
  recent,
}: {
  recent: RecentlyLikedItemModel;
}) {
  return (
    <div className={styles["recently-liked-item"]}>
      <div className="top-section">
        <img className="thumbnail" src={recent.image_url} alt="thumbnail" />
        <div className="name">{recent.user_name}</div>
        <div className="type">{recent.type}</div>
        <div className="ago">10 mins ago</div>
      </div>
      <div className="bottom-section">
        <div className="prompt">{recent.prompt}</div>
      </div>
    </div>
  );
}
