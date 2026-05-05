import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Backend (Filament) bir Block veya Page kaydedince burası çağrılır.
 * Body: { secret: string, paths: string[] }
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const secret = (body as { secret?: unknown })?.secret;
  const paths = (body as { paths?: unknown })?.paths;

  if (typeof secret !== 'string' || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!Array.isArray(paths) || paths.some((p) => typeof p !== 'string')) {
    return NextResponse.json({ error: 'invalid_paths' }, { status: 400 });
  }

  for (const p of paths as string[]) {
    revalidatePath(p);
  }

  return NextResponse.json({ revalidated: paths });
}
