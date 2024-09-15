import styles from "./RecentlyLikedItem.module.scss";
import { RecentlyLikedItemModel } from "@/models/recently-liked-item";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

export default function RecentlyLikedItem({
  recent,
}: {
  recent: RecentlyLikedItemModel;
}) {
  function formattedAgo(liked_time: string) {
    const browserOffset = new Date().getTimezoneOffset();
    const likedTimeUTC = dayjs.utc(liked_time);
    const likedTimeAdjusted = likedTimeUTC.add(-browserOffset, "minute");
    const now = dayjs();
    const timeDifference = likedTimeAdjusted.from(now);
    return timeDifference;
  }

  return (
    <div className={styles["recently-liked-item"]}>
      <div className="top-section">
        <img className="thumbnail" src={recent.image_url} alt="thumbnail" />
        <div className="name">{recent.user_name}</div>
        <div className="type">{recent.type}</div>
        <div className="ago">{formattedAgo(recent.liked_time)}</div>
      </div>
      <div className="bottom-section">
        <div className="prompt">{recent.prompt}</div>
      </div>
    </div>
  );
}
