"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Button } from "primereact/button";
import GalleryItem from "./components/galleryItem/GalleryItem";

export default function Page() {
  return (
    <div className={styles["intro"]}>
      <div className="title">
        <h1 className="animated bounceInUp animate-delay-1s">
          🎨 Pc<span>ai</span>sso
        </h1>
      </div>
      <p className="explain">
        LLMs can draw cool things. Come explore with us!
      </p>
      <Link href="/draw" passHref>
        <Button
          className="explore-button"
          type="submit"
          severity="success"
        >
          Start Exploring!
        </Button>
      </Link>
      <h3>🌸 2D Canvas</h3>
      <section className="gallery">
        <GalleryItem
          type="image"
          src="/demos/skyscraper-japan.png"
          description="A Japan cityscape. Road filled with skyscrapers"
        ></GalleryItem>
        <GalleryItem
          type="image"
          src="/demos/parabola-art.png"
          description="Art with parabolas and circle"
        ></GalleryItem>
        <GalleryItem
          type="image"
          src="/demos/church.png"
          description="Church on rolling hills"
        ></GalleryItem>
      </section>

      <h3>🌸 2D Canvas - Dynamic Graphics</h3>
      <section className="gallery">
        <GalleryItem
          type="video"
          src="/demos/clock.mp4"
          description="A functional clock"
        ></GalleryItem>
        <GalleryItem
          type="video"
          src="/demos/bricks.mp4"
          description="Make a simple bricks game"
        ></GalleryItem>
        <GalleryItem
          type="video"
          src="/demos/fractal.mp4"
          description="Animated fractal"
        ></GalleryItem>
      </section>

      <h3>💠 Data Visualization</h3>
      <section className="gallery">
        <GalleryItem
          type="image"
          src="/demos/viz1.png"
          description="Denominations of Christianity."
        ></GalleryItem>
        <GalleryItem type="" src="" description=""></GalleryItem>
        <GalleryItem type="" src="" description=""></GalleryItem>
      </section>

      <p className="footer animated bounceInUp animate-delay-2s">
        Made with 💖 by{" "}
        <Link href="https://www.linkedin.com/in/rmadhuram/">Raj Madhuram</Link>{" "}
        & the <Link href="/draw/contributions">students and friends</Link> of{" "}
        <Link target="_blank" href="https://gct.ac.in/">
          GCT, Coimbatore
        </Link>
      </p>
    </div>
  );
}
