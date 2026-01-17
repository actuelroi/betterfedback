


import * as fabric from "fabric";



export const text_options: Partial<fabric.ITextProps> = {
    left: 100,
    top: 100,
    fontFamily: "serif",
    fill: "#000000",
    selectable: true,
    fontStyle: "normal",     // ✅ now correctly typed
    linethrough: false,
    underline: false,
    textAlign: "left",      // ✅ union-safe
    backgroundColor: 'transparent',
  
    fontSize: 14,
    fontWeight: 'normal',
    padding: 4 ,
    width: 200, 
    height: 40
};


export const Button_OPTIONS: Partial<fabric.RectProps> = {
  left: 100,
  top: 100,
  fill: '#3b82f6',
  stroke: '#ffffff',
  strokeWidth: 2,
  width: 200,
  height: 50,
  rx: 8,
  ry: 8,
  selectable: true,
   evented: false, // Important: rectangle should not handle events directly
};
