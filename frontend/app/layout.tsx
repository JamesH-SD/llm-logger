// app/layout.tsx
import '../styles/globals.css'
import Layout from '../components/layout/Layout'

export const metadata = {
  title: 'LLM Logger',
  description: 'Log and view LLM interactions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
