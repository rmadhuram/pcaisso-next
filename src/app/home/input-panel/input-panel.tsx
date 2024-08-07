"use client";

import styles from "./input-panel.module.scss";
import React, { useState } from "react";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { useRouter } from 'next/navigation';
import { usePub } from '../../hooks/usePubSub';
import { useAsyncRoutePush } from "@/app/utils/asyn-push";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Category {
  name: string;
  key: string;
}

interface model {
  name: string;
  code: string;
}

export default function InputPanel({ handleSubmission } : { handleSubmission: any}) {
  const categories = [
    { name: "2D (Canvas)", key: "2D" },
    { name: "SVG (Vector Graphics)", key: "SVG" },
    { name: "3D (Three.js)", key: "3D" },
    { name: "d3 (Data Visualization)", key: "d3" },
  ];

  const models: model[] = [
    { name: "gpt-3.5-turbo", code: "gpt3.5turbo" },
    { name: "gpt-4", code: "gpt4" },
    { name: "gpt-4-turbo", code: "gpt4turbo" },
    { name: "gpt-4o", code: "gpt4o" },
    { name: "gpt-4o-mini", code: "gpt4omini" },
  ];
  const publish = usePub();

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const [selectedModel, setSelectedModel] = useState<model | null>(null);
  const [prompt, setPrompt] = useState("");

  const router = useRouter();
  const asyncPush = useAsyncRoutePush()

  const handleSubmit = async () => {
    //await asyncPush(`/home/results`)

    console.log('routing done')

    /*setTimeout(function() {
      publish('CREATE_NEW', { prompt, category: selectedCategory.key, model : selectedModel?.name })
    }, 1000)*/

    handleSubmission({ prompt, category: selectedCategory.key, model : selectedModel?.name })
    
  };

  return (
    <div className={styles["input-panel"]}>
      <div className="input-container">
        <p>
          Describe what you imagine, and the system will draw it for you! This
          is powered by OpenAI APIs (ChatGPT).
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
        <div className="select-model">
          <span>Select Model </span>
          <Dropdown
            value={selectedModel}
            onChange={(e: DropdownChangeEvent) => setSelectedModel(e.value)}
            options={models}
            optionLabel="name"
            editable
            placeholder="Select a gpt model"
            className="w-full md:w-14rem model-options"
          />
        </div>
        <div className="input-area">
          <p>What do you want to draw?</p>
          <textarea
            className="text-area"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt"
          ></textarea>
        </div>
        <div className="submit">
          <button
            className="submit-button"
            type="submit"
            onClick={handleSubmit}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
