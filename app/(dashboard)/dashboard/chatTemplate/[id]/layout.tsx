export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-[calc(100vh-0px)] p-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
          {children}
        </div>
      </div>
    );
  }