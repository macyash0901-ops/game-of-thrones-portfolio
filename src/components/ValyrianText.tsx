export function ValyrianText({ text }: { text: 'VALAR MORGHULIS' | 'VALAR DOHAERIS' }) {
  return (
    <div className="valyrian-scene" aria-label={text}>
      <span className="valyrian-text font-display" aria-hidden="true">{text}</span>
    </div>
  );
}