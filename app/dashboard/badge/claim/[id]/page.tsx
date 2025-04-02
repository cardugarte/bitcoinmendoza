export default function ClaimPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Claim Badge #{params.id}</h1>
      {/* Contenido del claim */}
    </div>
  )
}