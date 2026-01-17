// components/editor/MainEdit.tsx
import { useCanvasStore } from "@/store/useCanvasStore"
import { useSelectionStore } from "@/store/useSelectionStore"
import { DndContext } from "@dnd-kit/core"
import DraggableElement from "./DraggableElement"

const ElementRenderer = ({ element }: any) => {
    
  switch (element.type) {
    case "title":
      return (
        <h2 style={{ fontSize: element.props.fontSize || 24 }}>
          {element.props.text}
        </h2>
      )

    case "text":
      return <p>{element.props.text}</p>

    case "button":
      return (
        <button className="px-4 py-2 rounded bg-blue-600 text-white">
          {element.props.text}
        </button>
      )

    default:
      return null
  }
}


export default function Middle() {
 const { elements, moveElement } = useCanvasStore()

  return (
    <DndContext
      onDragEnd={(event) => {
        const { delta, active } = event
        const el = elements.find((e) => e.id === active.id)
        if (!el) return

        moveElement(
          el.id,
          el.x + delta.x,
          el.y + delta.y
        )
      }}
    >
      <div className="relative w-full h-full bg-gray-50 overflow-hidden">
        {elements.map((el) => (
            
          <DraggableElement key={el.id} element={el}>
            <ElementRenderer element={el} />
          </DraggableElement>
        ))}
      </div>
    </DndContext>
  
  )
}
