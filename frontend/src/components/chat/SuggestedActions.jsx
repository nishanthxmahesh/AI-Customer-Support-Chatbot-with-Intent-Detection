export default function SuggestedActions({ actions = [], onPick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button key={action.action_type} onClick={() => onPick(action.label)} className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs text-cyan">
          {action.label}
        </button>
      ))}
    </div>
  )
}
