export type ElementType = 'button' | 'text' | 'container' | 'icon' | 'title' | 'label' | 'input' | 'email'| 'phone' | 'divider'|'paragraph'

export interface CanvasItem {
  id: string
  type: ElementType
  content: string
  position: { x: number; y: number }
  dimensions: { width: number; height: number }
  style: {
    backgroundColor?: string
    color?: string
    fontSize?: string
    fontWeight?: string
    fontStyle?: string
    textDecoration?: string
    textAlign?: 'left' | 'center' | 'right' | 'justify' | any
    border?: string
    borderWidth?: string
    borderColor?: string
    borderRadius?: string
    backgroundImage?: string
    padding?: string
    opacity?: string
    backgroundImages?: string
    boxShadow?: string
    margin?: string
    lineHeight?: string
  }
}













export type CanvasElementType =
  | "text"
  | "title"
  | "button"
  | "input"
  | "divider"
  | "container"



export interface CanvasElement {
  id: string
  type: CanvasElementType
  x: number
  y: number
  width?: number
  height?: number
  props: {
    text?: string
    fontSize?: number
    fontFamily?: string
    fontWeight?: "normal" | "bold"
    color?: string
    backgroundColor?: string
  }
}
