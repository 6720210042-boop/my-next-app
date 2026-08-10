import { fetchExternal } from '@/lib/external';

export async function GET(req: Request) {
 const url = new URL(req.url);
  const rawSource = url.searchParams.get('source');
  
  if (rawSource !== 'products' && rawSource !== 'news') {
    return Response.json(
      { source: rawSource, external: [], error: `ไม่พบแหล่งข้อมูล: "${rawSource || 'ไม่มีการระบุ'}"` },
      { status: 400 }
    );
  }
  
  const source = rawSource as 'products' | 'news';
 try {
 const external = await fetchExternal(source);
 return Response.json({ source, external });
 } catch {
 // degrade gracefully ถ้า external API ล่ม
 return Response.json(
 { source, external: [], error: 'External API unavailable' },
 { status: 200 }
 );
 }
}
