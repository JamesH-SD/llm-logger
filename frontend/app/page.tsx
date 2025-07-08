// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import LogTable from '@/components/LogTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DashboardPage() {
  const [logs, setLogs] = useState([])
  const [projectId, setProjectId] = useState('')
  const [model, setModel] = useState('')

  async function fetchLogs() {
    try {
      const response = await axios.get('http://localhost:3000/logs', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      setLogs(response.data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
              <SelectItem value="gpt-4">gpt-4</SelectItem>
              <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchLogs}>Apply</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <LogTable logs={logs} />
        </CardContent>
      </Card>
    </div>
  )
}
