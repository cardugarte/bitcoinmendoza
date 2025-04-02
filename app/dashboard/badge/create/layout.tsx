export default function CreateBadgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen md:min-h-0 md:py-8 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </div>
  )
} 