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

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.pathname.split('/').pop()

  try {
    const client = await pool.connect();

    const projectQuery = `
      SELECT project_id, project_name, model, status, created_dtm
      FROM projects
      WHERE project_id = $1
      `;

    const apiKeysQuery = `
      SELECT api_key
      FROM project_api_keys
      WHERE project_id = $1
      `;

    const costsQuery = `
        SELECT model, prompt_token_cost, completion_token_cost
        FROM project_model_costs
        WHERE project_id = $1
        `;

    const [projectResult, apiKeysResult, costsResult] = await Promise.all([
      client.query(projectQuery, [projectId]),
      client.query(apiKeysQuery, [projectId]),
      client.query(costsQuery, [projectId])
    ]);

    client.release();

    if (projectResult.rows.length === 0) {
      return new NextResponse('Project not found', { status: 404 });
    }

    return NextResponse.json({
      ...projectResult.rows[0],
      api_keys: apiKeysResult.rows.map(row => row.api_key),
      model_costs: costsResult.rows
    });

  } catch (err) {
    console.error('Error fetching project details:', err);
    return new NextResponse('Failed to fetch project details', { status: 500 });
  }
}