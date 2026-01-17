import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react"
import { IconType } from "react-icons"
import { Button } from "../ui/button"
import { useState, ReactNode } from "react"

interface Props {
  label: string
  icon: IconType | LucideIcon
  children?: ReactNode
}

const LabelItem = ({ icon: Icon, label, children }: Props) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-md border">
      {/* Header */}
      <div
        className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex space-x-2 items-center">
          <Icon size={16} />
          <span className="text-sm font-medium text-gray-400">{label}</span>
        </div>

        <Button size="icon" variant="ghost">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </Button>
      </div>

      {/* Expandable content */}
      {expanded && children && (
        <div className="p-3 border-t bg-background space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default LabelItem
