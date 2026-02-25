import { neon } from '@neondatabase/serverless';

// This creates a direct 'pipe' to your Neon Postgres instance
export const sql = neon(process.env.DATABASE_URL!);