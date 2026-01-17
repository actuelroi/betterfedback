// store/useCanvasStore.ts
import { create } from "zustand"
import { CanvasElement } from "@/types/canvas"
import { nanoid } from "nanoid"

interface CanvasState {
  elements: CanvasElement[]
  history: CanvasElement[]
  future: CanvasElement[]
  addElement: (element: Partial<CanvasElement>) => void
  updateElement: (id: string, props: any) => void
  removeElement: (id: string) => void
  moveElement: (id: string, x: number, y: number) => void

}


const GRID = 8

const snap = (v: number) => Math.round(v / GRID) * GRID


export const useCanvasStore = create<CanvasState>((set) => ({
  elements: [],
  history: [],
  future: [],

  addElement: (element) =>
    set((state) => ({
      elements: [
        ...state.elements,
        {
          id: nanoid(),
          x: 50,
          y: 50,
          props: {},
          ...element,
        } as CanvasElement,
      ],
    })),

  updateElement: (id, props) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...props } } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),

  moveElement: (id, x, y) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, x, y } : el
      ),
    })),
}))
