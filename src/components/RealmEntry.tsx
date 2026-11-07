import { Crown, Flame, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSound } from '@/hooks/useSound';
import dragonImage from '@/assets/gotbg2.jpg';

export function RealmEntry() {
  const { activateSound } = useSound();
  const [leaving, setLeaving] = useState(false);
  const [entered, setEntered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
    document.body.classList.add('realm-entry-active');
    return () => document.body.classList.remove('realm-entry-active');
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => {
      document.body.classList.remove('realm-entry-active');
      setEntered(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const enterRealm = () => {
    if (leaving) return;
    activateSound();
    document.documentElement.classList.add('realm-entered');
    setLeaving(true);
  };

  if (entered) return null;

  return (
    <section className={`realm-entry ${leaving ? 'is-leaving' : ''}`} aria-label="Enter the portfolio">
      <img className="realm-entry-dragon" src={dragonImage} alt="" aria-hidden="true" />
      <div className="realm-entry-shade" />
      <div className="realm-entry-runes" aria-hidden="true"><span /><span /><span /></div>
      <div className="realm-entry-content">
        <div className="realm-entry-crown" aria-hidden="true"><Crown size={42} strokeWidth={1.15} /></div>
        <p className="realm-entry-kicker"><Flame size={15} aria-hidden="true" /> A portfolio forged in fire</p>
        <h1>The realm awaits</h1>
        <p className="realm-entry-copy">Steel your resolve. The dragon is near.</p>
        <button ref={buttonRef} type="button" onClick={enterRealm} className="realm-entry-button">
          <span>Enter the realm</span>
          {/* <Volume2 size={18} aria-hidden="true" /> */}
        </button>
        {/* <p className="realm-entry-note">Sound will begin when you enter</p> */}
      </div>
      <div className="realm-entry-sparks" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--spark-left': `${(index * 31) % 100}%`, '--spark-duration': `${4 + (index % 5) * .8}s`, '--spark-delay': `${index * -.33}s` } as CSSProperties} />)}</div>
    </section>
  );
}
