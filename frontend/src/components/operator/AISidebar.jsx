import ConfidenceBar from '../shared/ConfidenceBar'

export default function AISidebar() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-lg p-4">
        <h3 className="font-display font-bold">AI Assist</h3>
        {['I can review the billing history now.', 'Thanks for the details, I found the account.', 'I’m escalating this to our billing specialist.'].map((text) => (
          <button key={text} className="mt-3 w-full rounded-md border border-white/10 p-3 text-left text-sm hover:border-lime/40">{text}</button>
        ))}
      </div>
      <div className="glass rounded-lg p-4">
        <h3 className="mb-3 font-display font-bold">Intent Summary</h3>
        <div className="mb-2 flex justify-between font-data text-xs"><span>billing inquiry</span><span>91.3%</span></div>
        <ConfidenceBar value={91.3} />
      </div>
      <div className="glass rounded-lg p-4">
        <h3 className="font-display font-bold">Quick Macros</h3>
        <div className="mt-3 space-y-2 font-data text-xs text-cyan">
          <div>Refund submitted - 3-5 business days</div>
          <div>Escalating to billing specialist</div>
          <div>I’ve located your account</div>
        </div>
      </div>
    </div>
  )
}
