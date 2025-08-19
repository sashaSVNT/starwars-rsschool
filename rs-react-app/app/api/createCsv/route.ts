import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { selectedIds } = (await req.json()) as { selectedIds: string[] };

  const content = 'id\n'.concat(selectedIds.join('\n'));
  const filename = `${selectedIds.length}_items.csv`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
