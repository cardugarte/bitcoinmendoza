

export default async function BadgePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Badge # {id}</h1>
      {/* Contenido del badge específico */}
    </div>
  );
}