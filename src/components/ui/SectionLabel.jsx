export default function SectionLabel({ index, label }) {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-6">
      <span className="font-mono text-xs text-muted-foreground">[ {index} ]</span>
      <div className="flex-1 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}