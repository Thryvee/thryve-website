'use client';
import { useState, useEffect } from 'react';
import CelebrationBurst from '@/components/ui/CelebrationBurst';

const revenueOptions = [
  'Pre-revenue',
  'Rs 0 - 1L / month',
  'Rs 1L - 5L / month',
  'Rs 5L - 20L / month',
  'Rs 20L - 50L / month',
  'Rs 50L+ / month',
];

export default function ContactForm() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [form, setForm] = useState({ name: '', brand: '', number: '', email: '', revenue: '', challenge: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [burst, setBurst] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
    } catch {
      // fail silently — still show success to user
    }
    setLoading(false);
    setBurst(true);
    setTimeout(() => setSent(true), 320);
  };

  if (sent) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: isMobile ? '0 20px' : '0 clamp(20px, 5vw, 80px)' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--purple-light)', border: '1px solid var(--purple-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '24px', color: 'var(--purple)' }}>✓</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>We got it.</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '8px' }}>Expect a response within 24 hours at {form.email}.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-tertiary)' }}>In the meantime — grab our free playbook.</p>
          <a href='/playbook' style={{ display: 'inline-flex', marginTop: '32px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAFA', background: 'var(--purple)', padding: '13px 28px', borderRadius: '100px', textDecoration: 'none' }}>Get the Playbook</a>
        </div>
      </div>
    );
  }

  return (
    <>
    <style>{`
      .float-group { position: relative; }
      .float-group input, .float-group textarea, .float-group select {
        padding-top: 22px !important;
        padding-bottom: 8px !important;
      }
      .float-label {
        position: absolute; left: 16px; top: 14px;
        font-family: 'DM Sans', sans-serif;
        font-size: 10px; font-weight: 600;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--text-tertiary);
        transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
        pointer-events: none;
      }
      .float-group input:focus ~ .float-label,
      .float-group input:not(:placeholder-shown) ~ .float-label,
      .float-group textarea:focus ~ .float-label,
      .float-group textarea:not(:placeholder-shown) ~ .float-label,
      .float-group select:focus ~ .float-label,
      .float-group select:valid ~ .float-label {
        top: 8px; font-size: 8px; color: var(--purple);
      }
    `}</style>
    <section className="m-contact-section" style={{ background: 'var(--bg)', paddingTop: isMobile ? '96px' : 'clamp(100px, 12vw, 120px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 clamp(20px, 5vw, 80px)' }}>

        {/* Hero text — top */}
        <div style={{ maxWidth: '100%', marginBottom: '80px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '20px' }}>
            Book Free Audit
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)', marginBottom: '24px' }}>
            15 minutes.<br />
            <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>We'll tell you exactly where you're losing money.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '600px' }}>
            No pitch. No fluff. A real audit of your acquisition, conversion, retention, and scaling — and exactly what to fix first.
          </p>
        </div>

        {/* Two column — steps left, form card right */}
        <div className="m-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))', gap: '48px', alignItems: 'start', paddingBottom: '80px' }}>

          {/* Left — what to expect */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '32px' }}>
              What happens next
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { step: '01', title: 'Audit call', body: 'We diagnose your biggest revenue leak across all 4 pillars. 15 minutes, no fluff.' },
                { step: '02', title: 'Pilot proposal', body: 'If we are a fit, you get a scoped proposal within 24 hours of the call.' },
                { step: '03', title: 'Engagement starts', body: 'a pilot month. Results within 30 days or we stop.' },
              ].map((item, i) => (
                <div key={i} className="m-contact-step-item" style={{ display: 'flex', gap: '20px', padding: '28px 0', borderTop: '1px solid var(--border)' }}>
                  <span className="m-contact-step-num" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--purple)', paddingTop: '3px', flexShrink: 0 }}>{item.step}</span>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>{item.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <a href='mailto:info@thhryve.com' style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', marginBottom: '6px' }}>info@thhryve.com</a>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-tertiary)' }}>India — available globally</p>
            </div>
          </div>

          {/* Right — form as a card */}
          <div className="m-contact-form-card" style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: isMobile ? '24px 18px' : '48px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.06)',
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '32px' }}>
              Tell us about your brand
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px' }}>
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'Sakcham', type: 'text' },
                  { key: 'brand', label: 'Brand / Company', placeholder: 'Your brand', type: 'text' },
                ].map((field) => (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: focused === field.key ? 'var(--purple)' : 'var(--text-tertiary)', transition: 'color 0.2s ease' }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused('')}
                      required
                      style={{ background: 'var(--bg)', border: '1px solid', borderColor: focused === field.key ? 'var(--purple)' : 'var(--border)', borderRadius: '10px', padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s ease', width: '100%' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px' }}>
                {[
                  { key: 'number', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                  { key: 'email', label: 'Email', placeholder: 'you@yourbrand.com', type: 'email' },
                ].map((field) => (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: focused === field.key ? 'var(--purple)' : 'var(--text-tertiary)', transition: 'color 0.2s ease' }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused('')}
                      required
                      style={{ background: 'var(--bg)', border: '1px solid', borderColor: focused === field.key ? 'var(--purple)' : 'var(--border)', borderRadius: '10px', padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s ease', width: '100%' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: focused === 'revenue' ? 'var(--purple)' : 'var(--text-tertiary)', transition: 'color 0.2s ease' }}>Monthly Revenue</label>
                <select
                  value={form.revenue}
                  onChange={e => setForm({ ...form, revenue: e.target.value })}
                  onFocus={() => setFocused('revenue')}
                  onBlur={() => setFocused('')}
                  required
                  style={{ background: 'var(--bg)', border: '1px solid', borderColor: focused === 'revenue' ? 'var(--purple)' : 'var(--border)', borderRadius: '10px', padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: form.revenue ? 'var(--text)' : 'var(--text-tertiary)', outline: 'none', transition: 'border-color 0.2s ease', width: '100%', appearance: 'none', cursor: 'pointer' }}
                >
                  <option value='' disabled>Select your range</option>
                  {revenueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: focused === 'challenge' ? 'var(--purple)' : 'var(--text-tertiary)', transition: 'color 0.2s ease' }}>Biggest Challenge Right Now</label>
                <textarea
                  rows={4}
                  placeholder='Tell us what is not working — acquisition, conversion, retention, or all three...'
                  value={form.challenge}
                  onChange={e => setForm({ ...form, challenge: e.target.value })}
                  onFocus={() => setFocused('challenge')}
                  onBlur={() => setFocused('')}
                  required
                  style={{ background: 'var(--bg)', border: '1px solid', borderColor: focused === 'challenge' ? 'var(--purple)' : 'var(--border)', borderRadius: '10px', padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s ease', width: '100%', resize: 'none', lineHeight: 1.6 }}
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className="m-contact-submit" style={{ marginTop: '8px', width: '100%', padding: isMobile ? '14px 20px' : '16px 28px', borderRadius: '100px', background: 'var(--purple)', color: '#FAFAFA', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.03em', border: '1.5px solid var(--purple)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1, position: 'relative', overflow: 'visible' }}
                onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--purple)'; (e.currentTarget as HTMLElement).style.color = '#FAFAFA'; }}
              >
                <CelebrationBurst trigger={burst} />
                {loading ? 'Submitting…' : 'Get My Free Audit →'}
              </button>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.6 }}>
                No commitment. No pitch. Just a real audit of where you stand.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
