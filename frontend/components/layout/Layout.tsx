// components/layout/Layout.tsx
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  )
}
