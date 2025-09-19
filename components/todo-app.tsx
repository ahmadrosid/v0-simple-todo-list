"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ])
      setInputValue("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">My Todo List</h1>
        <p className="text-muted-foreground text-lg">Stay organized and get things done</p>
      </div>

      {/* Add Todo Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base"
            />
            <Button onClick={addTodo} className="px-6" disabled={!inputValue.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {totalCount > 0 && (
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="text-sm text-muted-foreground">
            {totalCount} {totalCount === 1 ? "task" : "tasks"} total
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            {completedCount} completed
          </div>
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No tasks yet</p>
                <p className="text-sm">Add your first task above to get started!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          todos.map((todo) => (
            <Card
              key={todo.id}
              className={cn("transition-all duration-200 hover:shadow-md", todo.completed && "opacity-75")}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <span
                    className={cn(
                      "flex-1 text-base leading-relaxed",
                      todo.completed && "line-through text-muted-foreground",
                    )}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Progress indicator */}
      {totalCount > 0 && (
        <div className="mt-8 p-4 bg-card rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-card-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
