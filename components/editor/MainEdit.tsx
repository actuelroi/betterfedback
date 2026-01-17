'use client'

import { useActiveElementStore } from "@/store/ActiveEelement";
import useCanvas from "@/store/useCanvas";
import { useEffect, useRef } from "react";
import * as fabric from "fabric";

const MainEdit = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { canvas, setCanvas } = useCanvas();

    const { activeElement, setActiveElement, setActiveElements } = useActiveElementStore();


    const width = 800;
    const height = 550



    useEffect(() => {
        if (!canvasRef.current) return;

        const FabricCanvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
            width: width,
            height: height,
            backgroundColor: "#f0f0f0",
            // freeDrawingCursor:
        });

        // FabricCanvas.loadFromJSON(design?.json).then((canvas) =>
        //     canvas.requestRenderAll()
        // );

        setCanvas(FabricCanvas);

        const updateSelectedObject = () => {
            const activeObject = FabricCanvas.getActiveObject();
            if (activeObject) {
                setActiveElement(activeObject as fabric.Object & fabric.ITextProps);
            } else {
                setActiveElement(null);
            }
        };

        const updateSelectedObjects = () => {
            const selectedObjects = FabricCanvas.getActiveObjects();
            if (!selectedObjects) {
                setActiveElements(null);
            } else {
                setActiveElements(
                    selectedObjects as (fabric.Object & fabric.ITextProps)[]
                ); // Store all selected objects in the state
            }
        };

        FabricCanvas.on("selection:created", updateSelectedObjects);
        FabricCanvas.on("selection:updated", updateSelectedObjects);
        FabricCanvas.on("selection:cleared", () => setActiveElements(null));

        FabricCanvas.on("selection:created", updateSelectedObject);
        FabricCanvas.on("selection:updated", updateSelectedObject);
        FabricCanvas.on("selection:cleared", updateSelectedObject);

        return () => {
            FabricCanvas.dispose();
        };
    }, [width, height]);



    return (
        <div
            className="flex-1  ml-4 justify-center flex "
        >
            <canvas ref={canvasRef} className='w-full h-full ' />
        </div>

    )
}

export default MainEdit
