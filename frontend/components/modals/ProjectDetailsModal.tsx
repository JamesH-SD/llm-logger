"use client"

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Project } from '@/types/projects'

type ProjectDetailsModalProps = {
  open: boolean
  onClose: () => void
  onSave: (updatedFields: Partial<Project>) => Promise<void>
  project: Project
}

export default function ProjectDetailsModal({ open, onClose, onSave, project }: ProjectDetailsModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({})

  useEffect(() => {
    if (project) setFormData(project)
  }, [project])

  const handleChange = (field: keyof Project, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    await onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Project Workspace</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="px-6 pt-4 flex gap-4 border-b border-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="costs">Model Costs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <TabsContent value="overview">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <Input
                    value={formData.project_name || ''}
                    onChange={e => handleChange('project_name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={formData.project_description || ''}
                    onChange={e => handleChange('project_description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <Select
                    value={formData.model || ''}
                    onValueChange={value => handleChange('model', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select
                    value={formData.status || ''}
                    onValueChange={value => handleChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api">
              {project.api_keys && project.api_keys.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {project.api_keys.map((key, idx) => (
                    <li key={idx}>{key}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No API keys found.</p>
              )}
            </TabsContent>

            <TabsContent value="costs">
              {project.model_costs && project.model_costs.length > 0 ? (
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Model</th>
                      <th className="p-2 border">Prompt Token Cost</th>
                      <th className="p-2 border">Completion Token Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.model_costs.map((cost, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{cost.model}</td>
                        <td className="p-2 border">{cost.prompt_token_cost}</td>
                        <td className="p-2 border">{cost.completion_token_cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted-foreground text-sm">No model costs available.</p>
              )}
            </TabsContent>

            <TabsContent value="settings">
              <p className="text-muted-foreground text-sm">More configuration options coming soon.</p>
            </TabsContent>
          </div>

          <DialogFooter className="border-t border-gray-200 p-4">
            <div className="flex justify-end gap-4 w-full">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </div>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}