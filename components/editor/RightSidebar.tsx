import { Paintbrush } from "lucide-react"
import { BiFontColor, BiFontSize } from "react-icons/bi"
import { RxFontBold, RxFontFamily } from "react-icons/rx"
import { FaImage } from "react-icons/fa"
import { ITextProps } from "fabric";

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import LabelItem from "./label-item"
import { ScrollArea } from "../ui/scroll-area"
import { IoIosColorPalette } from "react-icons/io"
import { Textarea } from "../ui/textarea"
import { useCanvasStore } from "@/store/useCanvasStore";
import { useSelectionStore } from "@/store/useSelectionStore";



const RightSidebar = () => {

  const { elements, updateElement, removeElement } = useCanvasStore()
  const { selectedId } = useSelectionStore()

  const element = elements.find((e) => e.id === selectedId)

  return (
    <aside className="h-[calc(100vh-5px)] w-full border-l overflow-scroll hide-scrollbar">
      <ScrollArea className="h-full hide-scrollbar mb-20">
        <div className="flex flex-col gap-5 p-3">
          <h1 className="text-lg text-muted-foreground font-semibold">
            Edit selected
          </h1>

          {/* TEXT */}
          <LabelItem label="Text" icon={Paintbrush}>
            <Label>Content</Label>
            <Textarea
              placeholder="Enter text..."
              value={element?.props.text || ""}
              onChange={(e) => { element && updateElement(element?.id, { text: e.target.value }) }
              }
            />
          </LabelItem>

          {/* FONT SIZE */}
          <LabelItem label="Font size" icon={BiFontSize}>
            <Input
              type="number"
              placeholder="16"
              value={element?.props.fontSize ?? ""}
              onChange={(e) => {
                if (!element) return
                updateElement(element.id, {
                  fontSize: Number(e.target.value),
                })
              }}
            />

          </LabelItem>

          {/* FONT FAMILY */}
          <LabelItem label="Font Family" icon={RxFontFamily}>
            <Input placeholder="Serif" />
          </LabelItem>

          {/* BOLD */}
          <LabelItem label="Bold" icon={RxFontBold}>
            <Button variant="outline" className="w-full">
              Toggle Bold
            </Button>
          </LabelItem>

          {/* FONT COLOR */}
          <LabelItem label="Font color" icon={BiFontColor}>
            <Input
              
              onChange={(e) => {
                if (!element) return
                updateElement(element.id, {
                 color: e.target.value,
                })
              }}



              type="color" />
          </LabelItem>

          {/* BACKGROUND COLOR */}
          <LabelItem label="Background color" icon={IoIosColorPalette}>
            <Input type="color" />
          </LabelItem>

          {/* IMAGE */}
          <LabelItem label="Insert image" icon={FaImage}>
            <Input type="file" accept="image/*" />
          </LabelItem>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default RightSidebar
