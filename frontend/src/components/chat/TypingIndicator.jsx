export default function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-lg border border-white/10 bg-panel px-4 py-3">
      {[0, 120, 260].map((delay) => (
        <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-lime" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  )
}
