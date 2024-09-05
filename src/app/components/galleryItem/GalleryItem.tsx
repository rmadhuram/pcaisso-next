import styles from "./GalleryItem.module.scss";
import { Button } from "primereact/button";
import Link from "next/link";
export default function GalleryItem({
  uuid,
  type,
  src,
  description,
}: {
  uuid: string;
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
          <Link href={`/draw/${uuid}`}>
            <Button className="submit-button" type="submit">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
