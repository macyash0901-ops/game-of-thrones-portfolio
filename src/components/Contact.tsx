import { Button } from "@/components/ui/button";
import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Embers } from '@/components/Embers';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { profile } from '@/data/portfolio';
import { supabase } from '@/integrations/supabase/next-client';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    if (!supabase) {
      setStatus('error');
      setError('The contact service is not connected yet. Please email me directly instead.');
      return;
    }

    try {
    const { error: insertError } = await supabase.from('contact_messages').insert(form);
    if (insertError) {
      setStatus('error');
      setError('Your message could not be sent right now. Please email me directly instead.');
      return;
    }

    setForm(initialForm);
    setStatus('success');
    } catch {
      setStatus('error');
      setError('Your message could not be sent right now. Please email me directly instead.');
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <Embers />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-crimson/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          chapter="Final Chapter"
          title="When the realm calls, answer"
          description="Bring the signal, the challenge, or the first spark of an idea. Together, we can give it walls, wings, and a reason to endure."
        />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur md:p-10">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">The raven is waiting</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Send word, and I will answer.</h3>
              <div className="mt-8 space-y-5">
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-lg text-muted transition-colors hover:text-accent">
                  <Mail size={19} className="text-accent" />
                  <span>{profile.email}</span>
                  <ArrowUpRight size={15} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a href={profile.phoneHref} className="flex items-center gap-4 text-lg text-muted transition-colors hover:text-accent">
                  <Phone size={19} className="text-accent" />
                  <span>{profile.phone}</span>
                </a>
                <a data-sfx="click" href={profile.linkedinHref} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-lg text-muted transition-colors hover:text-accent">
                  <Linkedin size={19} className="text-accent" />
                  <span>{profile.linkedin}</span>
                  <ArrowUpRight size={15} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <div className="flex items-center gap-4 text-lg text-muted">
                  <MapPin size={19} className="text-accent" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="hairline mt-10 h-px" />
              <p className="mt-6 text-base leading-relaxed text-muted">Available for full-time software engineering roles and freelance projects.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-xs uppercase tracking-[0.18em] text-muted">Your name</span>
                  <input required maxLength={100} value={form.name} onChange={(event) => updateField('name', event.target.value)} className="mt-2 w-full border-b border-line bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent" placeholder="Arya Stark" />
                </label>
                <label className="block">
                  <span className="font-display text-xs uppercase tracking-[0.18em] text-muted">Your email</span>
                  <input required type="email" maxLength={200} value={form.email} onChange={(event) => updateField('email', event.target.value)} className="mt-2 w-full border-b border-line bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent" placeholder="you@example.com" />
                </label>
              </div>
              <label className="mt-8 block">
                <span className="font-display text-xs uppercase tracking-[0.18em] text-muted">Your message</span>
                <textarea required maxLength={2000} rows={5} value={form.message} onChange={(event) => updateField('message', event.target.value)} className="mt-2 w-full resize-none border-b border-line bg-transparent px-0 py-3 text-lg leading-relaxed text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent" placeholder="Tell me about the kingdom you are building..." />
              </label>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <Button variant="imported" size="imported" data-sfx="sword" type="submit" disabled={status === 'sending'} className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm uppercase tracking-[0.15em] text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                {status === 'success' && <p className="flex items-center gap-2 text-base contact-success"><Check size={17} /> Message sent successfully.</p>}
                {status === 'error' && <p className="max-w-xs text-base contact-error">{error}</p>}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
