// components/editor/DraggableElement.tsx
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useCanvasStore } from "@/store/useCanvasStore"
import { useSelectionStore } from "@/store/useSelectionStore"

export default function DraggableElement({ element, children }: any) {
  const { moveElement } = useCanvasStore()
  const { select } = useSelectionStore()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    position: "absolute" as const,
    left: element.x,
    top: element.y,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => select(element.id)}
      className="cursor-move"
    >
      {children}
    </div>
  )
}
