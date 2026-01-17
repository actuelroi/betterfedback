"use client"

import { useActiveElementStore } from '@/store/ActiveEelement';
import useCanvas from '@/store/useCanvas';
import { FabricText } from 'fabric'
import { useEffect, useRef } from 'react';
import * as fabric from "fabric";
import Tools from "@/components/editor/Tools";
import LeftSidebar from './LeftSidebar';
import Rigthsidebar from './Rigthsidebar';


const page = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { canvas, setCanvas } = useCanvas();

    const { activeElement, setActiveElement, setActiveElements } = useActiveElementStore();


    const width = 400;
    const height = 400;

    const handleStringChange = (
        property: keyof fabric.Object,
        value: string | boolean | number
    ) => {
        if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                activeObject.set(property, value);
                if (property === "padding") activeObject.setCoords();
                canvas.requestRenderAll();
            }
        }
    };


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
        <main className="flex-1 overflow-auto relative flex flex-col">
            

            <div className='grid grid-cols-3 p-4'>

                <LeftSidebar />

                <div
                    className="flex-1 h-[calc(100%-124px)] bg-accent-foreground ml-4 "
                    style={{ height: height, width: width }}
                >
                    <canvas ref={canvasRef} height={height} width={width} className='' />
                </div>

                {activeElement && <Rigthsidebar/>}

            </div>

        </main>



    )
}

export default page
