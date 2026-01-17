'use client'

import { Button } from '@/components/ui/button';
import useCanvas from '@/store/useCanvas';
import { TEXT_OPTIONS } from '@/types';
import * as fabric from "fabric";

const LeftSidebar = () => {

  const { canvas } = useCanvas();
  type TextStyle = "heading" | "subheading" | "small";


  const addText = (text: string, style: TextStyle) => {
    const options = (values: { fontSize: number; fontWeight: number }) => {
      const textObject = new fabric.IText(text, { ...TEXT_OPTIONS, ...values });
      if (canvas) {
        canvas.add(textObject);
        canvas.setActiveObject(textObject);
        canvas.renderAll();
      }
    };

    if (style === "heading") {
      options({ fontSize: 36, fontWeight: 500 });
    } else if (style === "subheading") {
      options({ fontSize: 24, fontWeight: 200 });
    } else if (style === "small") {
      options({ fontSize: 14, fontWeight: 100 });
    }
  };



  return (
    <div>
     <Button
     
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700 font-extrabold text-3xl"
        onClick={() => addText("Added a heading", "heading")}
      >
        Add a heading
      </Button>
    </div>
  )
}

export default LeftSidebar
