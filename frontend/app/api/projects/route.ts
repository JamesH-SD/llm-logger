// app/api/projects/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  ssl: {
    rejectUnauthorized: false, // Accept self-signed certs
  },
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT project_id, project_name, model, status, created_dtm
      FROM projects
      ORDER BY created_dtm DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new NextResponse('Failed to fetch projects', { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
  const { projectId } = params
  const body = await req.json()

  const { project_name, project_description, model, status } = body

  try {
    const query = `
      UPDATE projects
      SET
        project_name = $1,
        project_description = $2,
        model = $3,
        status = $4
      WHERE project_id = $5
      RETURNING *;
    `
    const values = [project_name, project_description, model, status, projectId]
    const result = await pool.query(query, values)

    return NextResponse.json(result.rows[0])
  } catch (err) {
    console.error('Error updating project:', err)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}
