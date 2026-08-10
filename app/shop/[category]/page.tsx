// ---- หลาย dynamic segments ----
// app/shop/[category]/[id]/page.tsx
type Props = {
    params: { category: string; id: string };
};
export default function Product({ params }: Props) {
    const { category, id } = params;
    return <h1>{category} #{id}</h1>;
}
// ---- Catch-all [...slug] ----
// params: { slug: string[] }