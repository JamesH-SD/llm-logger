'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProjectDetailsModal from '@/components/modals/ProjectDetailsModal'

type ModelCost = {
  model: string
  prompt_token_cost: number
  completion_token_cost: number
}

type Project = {
  project_id: string
  project_name: string
  project_description?: string
  model: string
  organization_id?: string
  created_by?: string
  created_dtm: string
  api_keys?: string[]
  model_costs?: ModelCost[]
  status: 'active' | 'archived' | 'draft' | 'disabled'
}


export default function ProjectDetailsPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/projects/${projectId}`)
      const data = await res.json()

      data.api_keys ??= []
      data.model_costs ??= []

      setProject(data)
    }
    fetchProject()
  }, [projectId])

  const handleSave = async (updatedFields: Partial<Project>) => {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...project, ...updatedFields }),
    })

    if (res.ok) {
      const updated = await res.json()
      setProject(updated)
    }
  }

  if (!project) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Details</h1>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input value={project.project_name} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Input value={project.project_description || ''} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <Input value={project.model} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Created At</label>
          <Input value={project.created_dtm} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Input value={project.status || 'active'} disabled />
        </div>

        {project.api_keys && project.api_keys.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">API Keys</label>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {project.api_keys.map((key, idx) => (
                <li key={idx}>{key}</li>
              ))}
            </ul>
          </div>
        )}

        {project.model_costs && project.model_costs.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">Model Costs</label>
            <table className="w-full text-sm text-left border border-gray-200 mt-2">
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
          </div>
        )}
      </div>

      <ProjectDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
        onSave={handleSave}
/>
    </div>
  )
}
