'use client'

import React, { useState } from 'react'
import LeftSide from './Left'
import EditorCanvas from './EditorCanvas'


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

export type ViewMode = 'mobile' | 'desktop'

const MainPart = () => {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([
    {
      id: 'demo-text',
      type: 'text',
      content: 'Welcome to the Editor',
      position: { x: 100, y: 100 },
      dimensions: { width: 300, height: 60 },
      style: {
        color: '#000000',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    },
    {
      id: 'demo-button',
      type: 'button',
      content: 'Click Me',
      position: { x: 150, y: 200 },
      dimensions: { width: 200, height: 50 },
      style: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        border: 'none'
      }
    },
    {
      id: 'demo-container',
      type: 'container',
      content: '',
      position: { x: 50, y: 300 },
      dimensions: { width: 400, height: 200 },
      style: {
        backgroundColor: '#f3f4f6',
        border: '2px dashed #d1d5db',
        borderRadius: '12px',
        opacity: '1'

      }
    }
  ])
  const [selectedElement, setSelectedElement] = useState<CanvasItem | null>(null)
  const [view, setView] = useState<ViewMode>('desktop')
  const [canvasBackground, setCanvasBackground] = useState<string>('linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)');
   const [canvasShadow, setCanvasShadow] = useState<string>('0 1px 3px rgba(0,0,0,0.1)')
   const [canvasImage, setCanvasImage] = useState<string>('0 1px 3px rgba(0,0,0,0.1)')

  const addElement = (elementType: ElementType) => {
    const defaultConfig = {
      button: {
        dimensions: { width: 120, height: 40 },
        content: 'Button',
        style: {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '6px',
          border: 'none',
          padding: '8px 16px'
        }
      },
      text: {
        dimensions: { width: 200, height: 40 },
        content: 'Edit me',
        style: {
          backgroundColor: 'transparent',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'normal',
          textAlign: 'left',
          border: 'none',
          padding: '4px 8px'
        }
      },
      container: {
        dimensions: { width: 200, height: 150 },
        content: '',
        style: {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          padding: '16px'
        }
      },
      icon: {
        dimensions: { width: 50, height: 50 },
        content: '',
        style: {
          backgroundColor: '#e5e7eb',
          color: '#6b7280',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '8px'
        }
      },
      input: {
        dimensions: { width: 250, height: 45 },
        content: '',
        placeholder: 'Enter text...',
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '10px 12px'
        }
      },
      title: {
        dimensions: { width: 300, height: 60 },
        content: 'Title',
        style: {
          backgroundColor: 'transparent',
          color: '#000000',
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'left',
          margin: '0'
        }
      },
       label: {
        dimensions: { width: 150, height: 20 },
        content: 'Label',
        style: {
          backgroundColor: 'transparent',
          color: '#374151',
          fontSize: '12px',
          fontWeight: '500',
          marginBottom: '4px'
        }
      },
      email: {
        dimensions: { width: 250, height: 45 },
        content: '',
        placeholder: 'you@example.com',
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '10px 12px'
        }
      },
      phone: {
        dimensions: { width: 250, height: 45 },
        content: '',
        placeholder: '(123) 456-7890',
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '10px 12px'
        }
      },
      divider: {
        dimensions: { width: 300, height: 2 },
        content: '',
        style: {
          backgroundColor: '#e5e7eb',
          border: 'none',
          margin: '20px 0'
        }
      },
      paragraph: {
        dimensions: { width: 350, height: 80 },
        content: 'This is a paragraph. You can edit this text to add your content.',
        style: {
          backgroundColor: 'transparent',
          color: '#4b5563',
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },
    }

    const config = defaultConfig[elementType]
    const newElement: CanvasItem = {
      id: `element-${Date.now()}`,
      type: elementType,
      content: config.content,
      position: { x: 100, y: 100 },
      dimensions: config.dimensions,
      style: config.style
    }
    
    setCanvasItems(prev => [...prev, newElement])
    setSelectedElement(newElement)
  }

  const updateElement = (id: string, updates: Partial<CanvasItem>) => {
    setCanvasItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    )
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const removeElement = (id: string) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id))
    if (selectedElement?.id === id) {
      setSelectedElement(null)
    }
  }

  const handleElementClick = (element: CanvasItem) => {
    setSelectedElement(element)
  }


  const clearSelection = () => {
    setSelectedElement(null);
  };

  const inspectedElement = React.useMemo<CanvasItem | null>(() => {
    if (selectedElement) return selectedElement
    if (canvasItems.length === 0) return null
    return canvasItems[canvasItems.length - 1]
  }, [selectedElement, canvasItems])


  

  return (
    <section className="h-screen overflow-hidden hide-scrollbar ">
      <div className='grid grid-cols-1 md:grid-cols-3 h-full '>
        <div className='md:col-span-2 flex h-full'>
          <LeftSide
            addElement={addElement}
          />
          
          <div className='flex-1 h-full '>
            <EditorCanvas 
              canvasItems={canvasItems}
              updateElement={updateElement}
              removeElement={removeElement}
              selectedElement={selectedElement}
              handleElementClick={handleElementClick}
              view={view}
              clearSelection={clearSelection}
              canvasBackground={canvasBackground}
              canvasShadow={canvasShadow} 
              canvasImage={canvasImage} // Pass canvas background to EditorCanvas
            />
          </div>
        </div>
        
        <div className='h-full border-l border-gray-200 '>
          {/* <RightSide 
            selectedElement={inspectedElement}
            updateElement={updateElement}
            canvasBackground={canvasBackground}
            canvasShadow={canvasShadow} 
            setCanvasBackground={setCanvasBackground}
            setCanvasShadow={setCanvasShadow}
            canvasImage={canvasImage}
            setCanvasImage={setCanvasImage}
          
          /> */}
        </div>
      </div>
    </section>
  )
}

export default MainPart