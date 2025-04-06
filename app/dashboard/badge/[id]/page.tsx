import { NextPage } from 'next';

type Params = {
  id: string;
};

const BadgePage: NextPage<{ params: Params }> = async ({ params }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Badge #{params.id}</h1>
      {/* Contenido del badge específico */}
    </div>
  );
};

export default BadgePage;