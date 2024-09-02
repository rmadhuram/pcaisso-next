export enum DrawingType {
  "2D" = "2D",
  "3D" = "3D",
  "SVG" = "SVG",
  "d3" = "d3",
}

export type PromptInput = {
  type: DrawingType;
  promt: string;
};
