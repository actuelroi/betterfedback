import * as fabric from "fabric";



export const TEXT_OPTIONS: Partial<fabric.ITextProps> = {
  left: 100,
  top: 100,
  fontFamily: "serif",
  fill: "#333333",
  selectable: true,
  fontStyle: "normal",     // ✅ now correctly typed
  linethrough: false,
  underline: false,
  textAlign: "left",       // ✅ union-safe
};