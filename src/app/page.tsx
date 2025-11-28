import { Suspense } from "react";
import ClientPage from "./ClientPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-sm text-neutral-400">
            Loading stream...
          </p>
        </main>
      }
    >
      <ClientPage />
    </Suspense>
  );
}
