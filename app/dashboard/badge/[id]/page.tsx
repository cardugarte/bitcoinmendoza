type Params = {
  id: string;
};

export default async function BadgePage({ params }: { params: Params }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Badge #{params.id}</h1>
      {/* Contenido del badge específico */}
    </div>
  );
}