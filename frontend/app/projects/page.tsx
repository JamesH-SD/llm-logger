'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProjectDetailsModal from '@/components/modals/ProjectDetailsModal'
import { Project } from '../../types/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    model: '',
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false)

const handleOpenProject = (project: Project) => {
  setSelectedProject(project)
  setIsModalOpen(true)
}

const handleSave = async (updatedFields: Partial<Project>) => {
  if (!selectedProject) return
  const res = await fetch(`/api/projects/${selectedProject.project_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...selectedProject, ...updatedFields }),
  })

  if (res.ok) {
    const updated = await res.json()
    setSelectedProject(updated)
    setIsModalOpen(false)
  }
}

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        console.log('Fetch project:', data)
        setProjects(data)
      })
      .catch(err => console.error('Failed to fetch projects', err))
  }, [])

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
              <Button className="w-full">Create Project</Button>
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
              <TableHead>Project ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map(project => (
              <TableRow
                key={project.project_id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleOpenProject(project)}
              >
                <TableCell>{project.project_id}</TableCell>
                <TableCell>{project.project_name}</TableCell>
                <TableCell>{project.model}</TableCell>
                <TableCell className="capitalize">{project.status}</TableCell>
                <TableCell>{project.created_dtm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedProject && (
        <ProjectDetailsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
