import { Crown, Flame, Shield, Swords } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSound } from '@/hooks/useSound';
const dragonImage = '/assets/gotbg2.jpg';

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
      <div className="realm-entry-grain" aria-hidden="true" />
      <div className="realm-entry-banner realm-entry-banner-left" aria-hidden="true"><span /></div>
      <div className="realm-entry-banner realm-entry-banner-right" aria-hidden="true"><span /></div>
      <div className="realm-entry-runes" aria-hidden="true"><span /><span /><span /></div>
      <div className="realm-entry-content">
        <div className="realm-entry-sigil" aria-hidden="true">
          <Swords className="realm-entry-swords" size={52} strokeWidth={1} />
          <div className="realm-entry-crown"><Crown size={35} strokeWidth={1.15} /></div>
        </div>
        <p className="realm-entry-kicker"><Flame size={14} aria-hidden="true" /> Westeros calls</p>
        <div className="realm-entry-title-rule" aria-hidden="true"><span /></div>
        <h1><span>The game</span><em>of thrones</em></h1>
        <p className="realm-entry-copy">A chronicle of craft, ambition, and fire.</p>
        <div className="realm-entry-house-line" aria-hidden="true"><Shield size={14} strokeWidth={1.5} /><span>House of the portfolio</span><Shield size={14} strokeWidth={1.5} /></div>
        <button ref={buttonRef} type="button" onClick={enterRealm} className="realm-entry-button">
          <span>Claim your seat</span>
          <Swords size={17} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <p className="realm-entry-note">Sound awakens with your command</p>
      </div>
      <div className="realm-entry-sparks" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--spark-left': `${(index * 31) % 100}%`, '--spark-duration': `${4 + (index % 5) * .8}s`, '--spark-delay': `${index * -.33}s` } as CSSProperties} />)}</div>
    </section>
  );
}
