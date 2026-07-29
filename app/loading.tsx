export default function Loading() {
  return (
    <main
      className="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pt-36 lg:px-16"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Се вчитува...</span>

      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <div className="h-2 w-24 rounded-full bg-white/5" />
          <div className="mt-7 h-10 w-4/5 rounded-xl bg-white/[0.06] sm:h-14" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-white/[0.04]" />
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-10">
          <div className="mx-auto mb-8 h-2 w-32 rounded-full bg-white/5" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-2xl border border-white/[0.04] bg-white/[0.045] shadow-lg shadow-black/10"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
