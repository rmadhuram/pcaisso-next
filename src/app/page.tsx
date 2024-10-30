"use client";
import "animate.css";
import Link from "next/link";
import styles from "./page.module.scss";
import { Button } from "primereact/button";
import GalleryItem from "./components/galleryItem/GalleryItem";
import { RecentlyLikedItemModel } from "@/models/recently-liked-item";
import RecentlyLikedItem from "./components/recentlyLikedItem/RecentlyLikedItem";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { dataForDisplay } from "@/data/demo-outputs";

type GalleryItemType = {
  uuid: string;
  type: "image" | "video";
  src: string;
  description: string;
};

type SectionType = {
  title: string;
  gallery: GalleryItemType[];
};

export default function Page() {
  const { data: session } = useSession();
  const [recentLikedOnes, setRecentLikedOnes] = useState<
    RecentlyLikedItemModel[]
  >([]);
  const router = useRouter();

  const userId = session?.user?.id;

  const [sections, setSections] = useState<SectionType[]>([]);

  useEffect(() => {
    const getRecentLikes = async () => {
      try {
        const response = await fetch("/api/getRecentLikes", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const dataReceived = await response.json();

        setRecentLikedOnes(dataReceived);
      } catch (error) {
        console.error("Error updating the recent likes");
      }
    };
    getRecentLikes();
  }, []);

  useEffect(() => {
    const selectRandomItems = () => {
      const updatedSections = dataForDisplay.sections.map((section) => {
        const shuffledGallery = section.gallery.sort(() => 0.5 - Math.random());
        return {
          ...section,
          gallery: shuffledGallery.slice(0, 3),
        };
      }) as SectionType[];
      setSections(updatedSections);
    };
    selectRandomItems();
  }, []);

  return (
    <div className={styles["intro"]}>
      <div className="title">
        <h1 className="animate__animated animate__flipInX">
          🎨 Pc<span>ai</span>sso
        </h1>
      </div>
      <p className="explain">
        Did you know that LLMs can draw cool things? 2D & 3D graphics, simple
        games & data visualizations! Come, explore with us!
      </p>
      <p className="explain mobile-only">
        Pcaisso is best experienced on a desktop/laptop. You will not be able to
        generate images on mobile devices.
      </p>
      <Link href="/draw/new" className="explore-link" passHref>
        <Button className="explore-button" type="submit">
          Start Creating!
        </Button>
      </Link>
      <div className="contents">
        <div className="left-side">
          {sections.map((section, index) => (
            <div key={index} className="gallery-section">
              <h3>{section.title}</h3>
              <section className="gallery">
                {section.gallery.map((item) => (
                  <GalleryItem
                    key={item.uuid}
                    uuid={item.uuid}
                    type={item.type}
                    src={item.src}
                    description={item.description}
                  />
                ))}
              </section>
            </div>
          ))}
        </div>

        <div className="right-side">
          <h3>
            <i className="fa-solid fa-heart liked"></i>&nbsp;&nbsp;Recent Likes
          </h3>
          <section className="recent-likes">
            {recentLikedOnes.length > 0 ? (
              recentLikedOnes.map(
                (item: RecentlyLikedItemModel, index: any) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/draw/${item.uuid}`)}
                  >
                    <RecentlyLikedItem key={item.uuid} recent={item} />
                  </div>
                )
              )
            ) : (
              <>
                <Skeleton className="mb-2" height="50px"></Skeleton>
                <Skeleton className="mb-2" height="50px"></Skeleton>
              </>
            )}
          </section>
        </div>
      </div>

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
