export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200 p-5 md:py-16 md:px-24">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl md:text-7xl">{children}</h1>
      </div>
    </div>
  );
}
