// app/projects/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Project = {
  name: string
  description: string
  model: string
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      name: 'Customer Support Bot',
      description: 'Logs from AI assistant in support chat',
      model: 'gpt-4',
      createdAt: '2025-07-01',
    },
    {
      name: 'Internal Research Q&A',
      description: 'Experimental LLM usage for internal team',
      model: 'gpt-3.5-turbo',
      createdAt: '2025-06-22',
    },
  ])

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    model: '',
  })

  const handleCreate = () => {
    setProjects(prev => [
      ...prev,
      {
        ...newProject,
        createdAt: new Date().toISOString().split('T')[0],
      },
    ])
    setNewProject({ name: '', description: '', model: '' })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a New Project</DialogTitle>
            <div className="space-y-4">
              <Input
                placeholder="Project name"
                value={newProject.name}
                onChange={e => setNewProject({ ...newProject, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              />
              <Select onValueChange={value => setNewProject({ ...newProject, model: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreate} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, idx) => (
                <TableRow key={idx}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.model}</TableCell>
                  <TableCell>{project.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


// export default function ProjectsPage() {
//     return (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
//         <div className="rounded-lg border p-6 bg-white shadow">
//           <p className="text-muted-foreground">You can view and manage your projects here.</p>
//         </div>
//       </div>
//     )
//   }
  