import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          AI Strategy Discovery
        </h1>
        <p className="text-sm text-muted-foreground">
          Executive Insight Dashboard · Sign in to continue
        </p>
      </div>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#6c63ff",
            colorBackground: "hsl(228, 22%, 9%)",
            colorInputBackground: "hsl(228, 22%, 14%)",
            colorText: "hsl(230, 20%, 92%)",
            colorTextSecondary: "hsl(228, 15%, 55%)",
            borderRadius: "0.6rem",
          },
        }}
      />
    </main>
  );
}
