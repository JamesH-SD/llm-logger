import React from 'react'

export default function LogTable({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-sm border rounded bg-white shadow">
        No logs found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border rounded shadow bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="text-left px-4 py-2">Prompt</th>
            <th className="text-left px-4 py-2">Response</th>
            <th className="text-left px-4 py-2">Model</th>
            <th className="text-left px-4 py-2">Tokens</th>
            <th className="text-left px-4 py-2">Latency</th>
            <th className="text-left px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2 max-w-xs truncate">{log.prompt}</td>
              <td className="px-4 py-2 max-w-xs truncate">{log.response}</td>
              <td className="px-4 py-2">{log.model}</td>
              <td className="px-4 py-2">{log.tokens || '-'}</td>
              <td className="px-4 py-2">{log.latency || '-'}</td>
              <td className="px-4 py-2">{new Date(log.created_dtm).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
