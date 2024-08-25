import styles from "./GalleryItem.module.scss";
import { Button } from "primereact/button";

export default function GalleryItem({
  type,
  src,
  description,
}: {
  type: string;
  src: string;
  description: string;
}) {
  return (
    <div className={styles["item"]}>
      {type === "video" ? (
        <video width="100%" autoPlay muted loop>
          <source src={src} type="video/mp4" />
        </video>
      ) : type === "image" ? (
        <img src={src} alt={description} width="100%" />
      ) : null}
      <div className="bottom-section">
        <p>{description}</p>
        <div>
          <Button className="submit-button" type="submit">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
