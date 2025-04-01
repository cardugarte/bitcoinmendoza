export default function ClaimBadge({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Reclamar Badge {params.id}</h1>
    </div>
  )
}