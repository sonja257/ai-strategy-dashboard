import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "#0d1117",
          borderColor: "#2e3250",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "#e2e8f0" }}>
              AI Strategy Discovery
            </h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Executive Insight Dashboard
            </p>
          </div>

          {/* Right: Badge + User */}
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: "rgba(108,99,255,0.12)",
                borderColor: "rgba(108,99,255,0.35)",
                color: "#a78bfa",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#6c63ff" }}
              />
              53 Interviews · AI Strategy Initiative
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
