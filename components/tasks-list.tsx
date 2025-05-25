import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const tasks = [
  {
    id: 1,
    title: "Complete session report for Alex Johnson",
    completed: true,
    dueDate: "Today",
    priority: "High",
  },
  {
    id: 2,
    title: "Prepare materials for Emma's fluency exercises",
    completed: false,
    dueDate: "Today",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Review Michael's progress and update treatment plan",
    completed: false,
    dueDate: "Today",
    priority: "High",
  },
  {
    id: 4,
    title: "Call Sophia's parents to discuss home practice",
    completed: false,
    dueDate: "Tomorrow",
    priority: "Medium",
  },
  {
    id: 5,
    title: "Order new assessment materials",
    completed: false,
    dueDate: "This week",
    priority: "Low",
  },
  {
    id: 6,
    title: "Schedule follow-up appointment for Noah",
    completed: false,
    dueDate: "This week",
    priority: "Medium",
  },
  {
    id: 7,
    title: "Complete continuing education course",
    completed: false,
    dueDate: "Next week",
    priority: "Low",
  },
]

export function TasksList() {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Checkbox id={`task-${task.id}`} checked={task.completed} />
            <label
              htmlFor={`task-${task.id}`}
              className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{task.dueDate}</Badge>
            <Badge
              variant="outline"
              className={`
                ${task.priority === "High" ? "border-red-200 bg-red-100 text-red-800" : ""}
                ${task.priority === "Medium" ? "border-yellow-200 bg-yellow-100 text-yellow-800" : ""}
                ${task.priority === "Low" ? "border-green-200 bg-green-100 text-green-800" : ""}
              `}
            >
              {task.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
