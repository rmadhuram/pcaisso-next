"use client";

import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Splitter, SplitterPanel } from "primereact/splitter";
import Link from "next/link";
import "./page.scss";

interface Category {
  name: string;
  key: string;
}

export default function Home() {
  const categories = [
    { name: "2D (Canvas)", key: "2D" },
    { name: "SVG (Vector Graphics", key: "SVG" },
    { name: "3D (Three.js)", key: "3D" },
    { name: "d3", key: "d3" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[1]
  );

  return (
    <Splitter layout="horizontal">
      <SplitterPanel
        className="flex align-items-center justify-content-center left"
        size={30}
      >
        <div className="input-container">
          <p>
            Describe what you imagine , and the system will draw it for you!
            This is powered by OpenAI APIs (ChatGPT).
          </p>
          <div className="choices">
            <div className="card flex justify-content-center">
              <div className="flex flex-column gap-3">
                {categories.map((category) => {
                  return (
                    <div
                      key={category.key}
                      className="flex align-items-start"
                      style={{
                        fontSize: "14px",
                        fontFamily: "Chivo Mono, monospace",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ padding: "0.5rem", paddingLeft: "0px" }}>
                        <RadioButton
                          inputId={category.key}
                          name="category"
                          value={category}
                          onChange={(e: RadioButtonChangeEvent) =>
                            setSelectedCategory(e.value)
                          }
                          checked={selectedCategory.key === category.key}
                        />
                      </span>
                      <label htmlFor={category.key} className="ml-2">
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="input-area">
            <p>What do you want to draw?</p>
            <textarea
              name="inputtext"
              id="inputtext"
              className="text-area"
            ></textarea>
          </div>
          <div className="submit">
            <button className="submit-button" type="submit">
              Generate
            </button>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel
        className="flex align-items-center justify-content-center right"
        size={70}
      >
        <div className="home">
          <h1 className="animated bounceInUp animate-delay-1s">
            Pc<span>ai</span>sso
          </h1>
          <h2>AI Art + Code</h2>
          <div className="cover-pages">
            <div className="cover-3 cover"></div>
            <div className="cover-1 cover"></div>
            <div className="cover-2 cover"></div>
          </div>
          <p className="footer animated bounceInUp animate-delay-2s">
            Made with 💖 by the{" "}
            <Link href="/contributions">
              students and friends
            </Link>{" "}
            of{" "}
            <Link target="_blank" href="https://gct.ac.in/">
              {" "}
              GCT, Coimbatore
            </Link>
          </p>
        </div>
      </SplitterPanel>
    </Splitter>
  );
}
