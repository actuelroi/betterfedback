import { create } from "zustand";
import * as fabric from "fabric";

interface canvasProps{
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas)=> void;
}


const useCanvas = create<canvasProps>((set)=>({
   canvas: null,
   setCanvas: (canvas) => set({ canvas: canvas }),
}))


export default useCanvas