'use client';
import { useEffect, useRef, useState } from 'react';

const P = '#9B5DE5', B = '#4361EE', G = '#2DC653', O = '#F4A261';

function s(metric, value, sub, color, bg) { return { type:'stat', metric, value, sub, color, bg }; }
function q(text, color, bg) { return { type:'quote', text, color, bg }; }
function m(label, value, color, bg) { return { type:'mini', label, value, color, bg }; }

const col1 = [
  s('ROAS','3.1x','from 0.9x',P,'#1a0533'),
  q('We finally understand why every number moves.',P,'#FAFAFA'),
  s('CAC','Rs 312','down from Rs 847',P,'#2d1b4e'),
  m('D2C Skincare','Delhi',P,'#F0EEE8'),
  s('Repeat Rate','29%','up from 11%',P,'#FAFAFA'),
  m('Pillar','Acquire',P,'#1a0533'),
  s('Monthly Rev','Rs 21.4L','from Rs 8.2L',P,'#2d1b4e'),
  q('Before Thryve we were just guessing.',P,'#FAFAFA'),
  m('Duration','4 months',P,'#F0EEE8'),
  s('ROAS','2.8x','from 1.1x',P,'#1a0533'),
  m('Brand','D2C Wellness',P,'#FAFAFA'),
  s('Email CVR','4.2%','new channel',P,'#2d1b4e'),
  q('The system compounds. Our results do too.',P,'#1a0533'),
  m('Location','Pune',P,'#F0EEE8'),
  s('AOV','Rs 2,400','up from Rs 1,100',P,'#FAFAFA'),
  m('Pillar','Convert',P,'#1a0533'),
  s('ROAS Month 1','1.8x','from 0.7x',P,'#2d1b4e'),
  q('Month 1 alone covered our entire engagement cost.',P,'#FAFAFA'),
  m('Model','D2C',P,'#F0EEE8'),
  s('Win-Back Rate','22%','recovered users',P,'#1a0533'),
  s('ROAS Month 4','4.1x','sustained',P,'#FAFAFA'),
  q('We own the system now.',P,'#1a0533'),
  m('Pillar','Retain',P,'#F0EEE8'),
  s('ROAS','3.1x','from 0.9x',P,'#2d1b4e'),
  m('D2C Skincare','Delhi',P,'#1a0533'),
  s('CAC','Rs 312','down from Rs 847',P,'#FAFAFA'),
];

const col2 = [
  m('B2B SaaS','Bangalore',B,'#0A0A0A'),
  s('Pipeline','Rs 18L','from zero',B,'#0a0a2e'),
  q('The outbound system runs while I build the product.',B,'#0A0A0A'),
  s('Sales Cycle','21 days','from 67 days',B,'#1a1a4e'),
  s('Leads/mo','34','from 3-4',B,'#FAFAFA'),
  m('Pillar','Scale',B,'#0a0a2e'),
  s('Founder Time','8 hrs','from 35 hrs/wk',B,'#F5F4EF'),
  q('I finally have a business that does not need me in every deal.',B,'#0a0a2e'),
  m('Duration','4 months',B,'#FAFAFA'),
  s('Close Rate','38%','from 12%',B,'#1a1a4e'),
  m('Location','Bangalore',B,'#0A0A0A'),
  s('MQL to SQL','4 days','from 18 days',B,'#FAFAFA'),
  q('Pipeline visibility changed how I run the company.',B,'#0A0A0A'),
  m('Model','B2B',B,'#1a1a4e'),
  s('Response Rate','14%','cold email',B,'#F5F4EF'),
  m('Pillar','Acquire',B,'#0a0a2e'),
  s('Deal Size','Rs 1.8L','avg ticket',B,'#FAFAFA'),
  q('Revenue is now a system, not a hope.',B,'#0A0A0A'),
  m('CRM','HubSpot',B,'#1a1a4e'),
  s('Pipeline Vel','Rs 6L/wk','new baseline',B,'#F5F4EF'),
  m('SOPs Built','3 core',B,'#0a0a2e'),
  s('ICP Accuracy','91%','vs 40% before',B,'#FAFAFA'),
  q('We went from 3 leads a month to 34.',B,'#0A0A0A'),
  m('Engagement','a full engagement',B,'#1a1a4e'),
  s('Pipeline','Rs 18L','from zero',B,'#0a0a2e'),
  m('B2B SaaS','Bangalore',B,'#F5F4EF'),
];

const col3 = [
  s('CVR','2.4%','from 0.8%',G,'#001a10'),
  m('B2C Fitness','Mumbai',G,'#FAFAFA'),
  s('Email Rev','Rs 3.8L','per month, from zero',G,'#FAFAFA'),
  q('My email list now makes more than my ads.',G,'#001a10'),
  s('Churn','9%','from 28%',G,'#0d3320'),
  m('Pillar','Retain',G,'#F0EEE8'),
  s('Repeat Rate','31%','from 12%',G,'#001a10'),
  q('In 10 weeks our repeat rate more than doubled.',G,'#FAFAFA'),
  m('Duration','4 months',G,'#0d3320'),
  s('Email List','12,000','activated',G,'#FAFAFA'),
  m('Location','Mumbai',G,'#001a10'),
  s('LTV','Rs 8,400','from Rs 3,200',G,'#0d3320'),
  q('The landing page rebuild alone added 1.6% CVR.',G,'#001a10'),
  m('Model','B2C',G,'#FAFAFA'),
  s('Abandon Rate','14%','from 67%',G,'#F0EEE8'),
  m('Pillar','Convert',G,'#001a10'),
  s('NPS','72','up from 41',G,'#0d3320'),
  q('We had the traffic. We just were not converting it.',G,'#FAFAFA'),
  m('Loyalty','3-tier prog.',G,'#001a10'),
  s('CTA CTR','6.8%','from 2.1%',G,'#F0EEE8'),
  s('Flows Built','5 email','built from zero',G,'#FAFAFA'),
  q('The retention stack changed everything.',G,'#001a10'),
  m('Engagement','Pilot + Retainer',G,'#0d3320'),
  s('CVR','2.4%','from 0.8%',G,'#FAFAFA'),
  m('B2C Fitness','Mumbai',G,'#F0EEE8'),
  s('Churn','9%','from 28%',G,'#001a10'),
];

const col4 = [
  s('LTV','Rs 4,800','from Rs 1,200',O,'#1a0f00'),
  s('LTV:CAC','16.5x','from 1.8x',O,'#FAFAFA'),
  m('C2C Market.','Hyderabad',O,'#3d2000'),
  q('Fixing LTV changed the entire business model.',O,'#1a0f00'),
  s('CAC','Rs 290','from Rs 680',O,'#F5F4EF'),
  m('Pillar','Scale',O,'#0A0A0A'),
  s('Churn','9%','from 34%',O,'#3d2000'),
  q('We finally have sustainable unit economics.',O,'#FAFAFA'),
  m('Duration','4 months',O,'#1a0f00'),
  s('Referral','31%','of acquisitions',O,'#F5F4EF'),
  m('Location','Hyderabad',O,'#3d2000'),
  s('Re-engage','22%','churned back',O,'#1a0f00'),
  q('The referral programme changed our CAC permanently.',O,'#FAFAFA'),
  m('Model','C2C',O,'#3d2000'),
  s('SOPs','4 built','handed over',O,'#F5F4EF'),
  m('Pillar','Acquire',O,'#1a0f00'),
  s('Repeat Txn','3.8x','avg per user',O,'#0A0A0A'),
  q('The KPI dashboard gave me visibility I never had.',O,'#1a0f00'),
  m('Dashboard','5-tab KPI',O,'#F5F4EF'),
  s('Win-Back','22%','recovered',O,'#3d2000'),
  m('Founder Time','60% less',O,'#FAFAFA'),
  s('Cohort LTV','Rs 6,200','M3 cohort',O,'#1a0f00'),
  q('Before Thryve every decision went through me.',O,'#3d2000'),
  m('Engagement','a full engagement',O,'#F5F4EF'),
  s('LTV','Rs 4,800','from Rs 1,200',O,'#0A0A0A'),
  m('C2C Market.','Hyderabad',O,'#1a0f00'),
];

const allCols = [col1, col2, col3, col4];
const directions = [-1, 1, -1, 1];
const speeds = [0.5, 0.38, 0.58, 0.42];

function Tile({ tile }: { tile: any }) {
  const isDark = ['#FAFAFA','#F0EEE8','#F5F4EF'].includes(tile.bg);
  const textColor = isDark ? '#0A0A0A' : '#FAFAFA';
  const borderColor = isDark ? 'rgba(10,10,10,0.07)' : 'rgba(255,255,255,0.07)';

  return (
    <div
      style={{
        background: tile.bg,
        borderRadius: '14px',
        border: `1px solid ${borderColor}`,
        padding: tile.type === 'mini' ? '16px 18px' : '22px',
        marginBottom: '10px',
        overflow: 'hidden',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {tile.type === 'stat' && (
        <>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tile.color, marginBottom: '14px' }}>
            {tile.metric}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, color: textColor, marginBottom: '5px' }}>
            {tile.value}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: tile.color, fontStyle: 'italic' }}>{tile.sub}</p>
        </>
      )}
      {tile.type === 'quote' && (
        <>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: tile.color, opacity: 0.4, display: 'block', marginBottom: '4px' }}>"</span>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(13px, 1.4vw, 17px)', fontStyle: 'italic', color: textColor, lineHeight: 1.55 }}>
            {tile.text}
          </p>
        </>
      )}
      {tile.type === 'mini' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tile.color }}>{tile.label}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 500, letterSpacing: '-0.02em', color: textColor, lineHeight: 1 }}>{tile.value}</p>
        </div>
      )}
    </div>
  );
}

export default function PinterestGrid() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      setScrollY(-el.getBoundingClientRect().top);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={wrapRef} className="m-pinterest-outer" style={{ height: '250vh', position: 'relative' }}>
      <div className="m-pinterest-sticky" style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh',
        overflow: isMobile ? 'visible' : 'hidden', background: 'var(--bg)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          padding: '0 60px',
          height: '100%',
          alignItems: 'start',
          overflow: 'hidden',
        }}>
          {allCols.map((col, ci) => {
            const offset = directions[ci] === 1 ? -400 : 0;
            const translateY = offset + scrollY * speeds[ci] * directions[ci];
            return (
              <div key={ci} style={{
                transform: isMobile ? 'none' : `translateY(${translateY}px)`,
                willChange: 'transform',
                paddingTop: '20px',
              }}>
                {col.map((tile, ti) => <Tile key={ti} tile={tile} />)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}