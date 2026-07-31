"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="section-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-red-600">Error</p>
        <h1 className="mt-3 text-4xl font-black text-[#24365E]">Something went wrong</h1>
        <button className="btn-primary mt-6" onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  );
}
