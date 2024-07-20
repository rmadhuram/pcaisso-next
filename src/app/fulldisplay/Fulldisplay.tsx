"use client";

import Inputarea from "../inputarea/Inputarea";
import Outputarea from "../outputarea/Outputarea";
import Homepage from "../home/Homepage";
import { CSSProperties, useState } from "react";

export default function Fulldisplay() {
  const [generated, setGenerated] = useState<Boolean>(false);

  const displayContainer: CSSProperties = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={displayContainer}>
      <Inputarea />
      {generated ? <Outputarea /> : <Homepage />}
    </div>
  );
}
