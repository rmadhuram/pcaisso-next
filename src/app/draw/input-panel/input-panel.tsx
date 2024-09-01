"use client";

import styles from "./input-panel.module.scss";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAsyncRoutePush } from "@/app/utils/asyn-push";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from "primereact/tabview";
import History from "./history/history";
import { useSession } from "next-auth/react";

interface Category {
  name: string;
  key: string;
}

interface model {
  name: string;
  code: string;
}

export default function InputPanel({
  handleSubmission,
}: {
  handleSubmission: any;
}) {
  const { data: session } = useSession();
  const categories = [
    { name: "2D Canvas", key: "2D" },
    { name: "SVG", key: "SVG" },
    { name: "3D", key: "3D" },
    { name: "d3", key: "d3" },
  ];

  const models: model[] = [
    { name: "gpt-3.5-turbo", code: "gpt3.5turbo" },
    { name: "gpt-4", code: "gpt4" },
    { name: "gpt-4-turbo", code: "gpt4turbo" },
    { name: "gpt-4o", code: "gpt4o" },
    { name: "gpt-4o-mini", code: "gpt4omini" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const [selectedModel, setSelectedModel] = useState<model | null>(null);
  const [prompt, setPrompt] = useState("");

  const router = useRouter();
  const asyncPush = useAsyncRoutePush();

  const handleModelSelection = () => {};

  const handleSubmit = async () => {
    if (!selectedModel) return;

    handleSubmission({
      prompt,
      category: selectedCategory.key,
      model: selectedModel?.name,
    });
  };

  return (
    <div className={styles["input-panel"]}>
      <TabView>
        <TabPanel header="Draw">
          <div className="draw-panel">
            <div className="categories">
              <p className="label">Select Drawing Category:</p>
              <SelectButton 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.value)} 
                optionLabel="name" 
                options={categories} 
                className="category-select"
              />
            </div>

            <div className="select-model">
              <div className="label">Select Model</div>
              <Dropdown
                value={selectedModel}
                onChange={(e: DropdownChangeEvent) => setSelectedModel(e.value)}
                options={models}
                optionLabel="name"
                placeholder="Select a GPT model"
              />
            </div>
            <div className="input-area">
              <InputTextarea
                className="text-area"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to draw"
              ></InputTextarea>
            </div>
            <div className="submit">
              <div style={{ display: "inline-block", position: "relative" }}>
                {!selectedModel && (
                  <Tooltip
                    target=".tooltip-target"
                    content="Select a model to proceed"
                    position="right"
                  />
                )}
                <div className="tooltip-target">
                  <Button
                    className="submit-button"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!selectedModel || !session || prompt.length < 3}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
            {!session && <p className="sign-in-message"><i className="fa-solid fa-triangle-exclamation"></i> Please sign in to generate!</p>}
          </div>

        </TabPanel>
        <TabPanel header="History">
          <div className="history-panel">
            <History />
          </div>
        </TabPanel>
      </TabView>

    </div>
  );
}
