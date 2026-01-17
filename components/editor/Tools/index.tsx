import ToolOver from "@/components/ToolOver";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActiveElementStore } from "@/store/ActiveEelement";
import useCanvas from "@/store/useCanvas";
import { FaLock, FaLockOpen } from "react-icons/fa6";

import * as fabric from 'fabric'
import Colors from "@/app/learn/Colors";
import { parseLinearGradientString } from "@/utils";


const Tools = () => {
    const { setActiveElement, activeElement, activeElements, setActiveElements } =
        useActiveElementStore();
    const { canvas } = useCanvas();

   


      // Function to handle property updates
  const updateSelectedObject = (
    property: keyof fabric.Object | keyof fabric.ITextProps | "rect" | "gradient",
    value: string | number | boolean | number[] | undefined
  ) => {
    if (activeElement && canvas) {
      if (activeElement.type === "rect" && property === "rect") {
        activeElement.set({ rx: value, ry: value });
      }

      // Handle gradient fill specifically
      if (typeof value === "string" && value.includes("linear")) {
        const gradient = parseLinearGradientString(value, canvas); // call your parser
        activeElement.set({ [property]: gradient });
      } else {
        activeElement.set({ [property]: value });
      }

      canvas.renderAll();
      setActiveElement(activeElement); // force reactivity
    }
  };

  // duplicate
  const duplicateActiveObject = async () => {
    if (activeElement) {
      const Duplicate = activeElement.clone();

      // Update the state to trigger React reactivity
      canvas?.add(await Duplicate);
      setActiveElement(await Duplicate); // Clone to force update
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // bring forward
  const bringForward = () => {
    if (activeElement) {
      canvas?.bringObjectForward(activeElement);
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // send backward
  const sendBackward = () => {
    if (activeElement) {
      canvas?.sendObjectBackwards(activeElement);
    }
  };

  // This function sets the background image of the canvas to the currently selected image
  const addImage = async () => {
    if (!canvas) return;
    if (canvas?.backgroundImage === undefined) {
      // @ts-ignore
      const imageUrl = activeElement?._originalElement.currentSrc;
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        fabric.FabricImage.fromURL(imageUrl, {
          crossOrigin: "anonymous",
        })
          .then((img) => {
            // Scale image to fit the canvas size
            const scaleX = canvas.width! / img.width!;
            const scaleY = canvas.height! / img.height!;
            img.scaleX = scaleX;
            img.scaleY = scaleY;

            canvas.backgroundImage = img;
            canvas?.requestRenderAll();
            canvas?.discardActiveObject(); // Deselect if needed
            // canvas.renderAll();
          })
          .catch((e) => {
            console.error("Error loading image", e);
          });
      };
    } else {
      // If there is already a background image, remove it
      if (!canvas) return;
      canvas.backgroundImage = undefined;
      canvas?.requestRenderAll();
      canvas?.discardActiveObject(); // Deselect if needed
    }
  };

  // lock active object
  const lockObject = () => {
    if (activeElement?.evented) {
      activeElement.set({ evented: false });
      canvas?.discardActiveObject(); // Deselect if needed
      canvas?.renderAll();
      // setActiveElement(activeElement); // update state
    } else {
      activeElement?.set({ evented: true });
      canvas?.discardActiveObject(); // Deselect if needed
      canvas?.renderAll();
      // setActiveElement(activeElement); // update state
    }
  };

    return (
        <ScrollArea className=" mb-4">
            <div className="justify-center items-center flex space-x-2">
                {activeElements!.length === 1 && (
                    <div className="flex items-center h-full justify-center">
                        <ToolOver
                            label={activeElement?.evented ? "lock" : "unlock"}
                            side="bottom"
                            

                        >
                            <Button onClick={lockObject} size="icon" variant="ghost" asChild>
                                {activeElement?.evented ? (
                                    <FaLock className="size-4" />
                                ) : (
                                    <FaLockOpen className="size-4" />
                                )}
                            </Button>
                        </ToolOver>
                    </div>
                )}


                {activeElement?.type !== "image" && (
                    <Colors
                  onChange={updateSelectedObject}
                  value={activeElement?.fill || "#000000"}
                  property="fill"
                  title="Fill color"
                  desc="Add Fill color to your element"
                />
                )}

            </div>

        </ScrollArea>
    )
}

export default Tools
