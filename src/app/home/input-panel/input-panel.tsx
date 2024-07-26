"use client";

import './input-panel.module.scss';
import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

interface Category {
  name: string;
  key: string;
}

export default function InputPanel() {
  const categories = [
    { name: "2D (Canvas)", key: "2D" },
    { name: "SVG (Vector Graphics)", key: "SVG" },
    { name: "3D (Three.js)", key: "3D" },
    { name: "d3 (Data Visualization)", key: "d3" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[1]
  );

  return (
    <div className="input-panel">
      <div className="input-container">
          <p>
            Describe what you imagine, and the system will draw it for you!
            This is powered by OpenAI APIs (ChatGPT).
          </p>
          <div className="choices">
            <div className="card flex justify-content-center">
              <div className="flex flex-column gap-3" >
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
                      <span>
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
    </div>
  );
}