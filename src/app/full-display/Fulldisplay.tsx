"use client";

import Inputarea from "../draw-input/Inputarea";
import Outputarea from "../draw-output/Outputarea";
import Homepage from "../home/Homepage";
import { CSSProperties, useState } from "react";

export default function Fulldisplay() {
  const [generated, setGenerated] = useState<Boolean>(false);

  const displayContainer: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'space-between'
  };

  return (
    <div style={displayContainer}>
      <Inputarea />
      {generated ? <Outputarea /> : <Homepage />}
    </div>
  );
}
