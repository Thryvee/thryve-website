"use client";

import { useId, useMemo } from "react";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/caseStudiesData";

interface CaseStudyTrendChartProps {
  trend: CaseStudy["trend"];
  accent: string;
}

const WIDTH = 600;
const HEIGHT = 220;
const PAD_X = 8;
const PAD_TOP = 28;
const PAD_BOTTOM = 32;

function formatValue(value: number, unit: CaseStudy["trend"]["unit"]) {
  if (unit === "currency") return `$${value.toLocaleString()}${value < 1000 ? "" : "K"}`;
  if (unit === "percent") return `${value}%`;
  return `${value}K`;
}

export default function CaseStudyTrendChart({ trend, accent }: CaseStudyTrendChartProps) {
  const gradientId = useId();
  const { points } = trend;

  const { linePath, areaPath, dots, gridY } = useMemo(() => {
    const values = points.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const plotW = WIDTH - PAD_X * 2;
    const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;

    const coords = points.map((p, i) => {
      const x = PAD_X + (i / (points.length - 1)) * plotW;
      const y = PAD_TOP + plotH - ((p.value - min) / range) * plotH;
      return { x, y, value: p.value, label: p.label };
    });

    const line = coords
      .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
      .join(" ");

    const baseline = PAD_TOP + plotH;
    const area =
      `M ${coords[0].x.toFixed(1)} ${baseline} ` +
      coords.map((c) => `L ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ") +
      ` L ${coords[coords.length - 1].x.toFixed(1)} ${baseline} Z`;

    const gridLines = [0, 0.5, 1].map((t) => PAD_TOP + plotH * t);

    return { linePath: line, areaPath: area, dots: coords, gridY: gridLines };
  }, [points]);

  const first = dots[0];
  const last = dots[dots.length - 1];

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={trend.note}
      >
        <defs>
          <linearGradient id={`${gradientId}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Hairline gridlines — recessive, one step off surface */}
        {gridY.map((y, i) => (
          <line
            key={i}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={y}
            y2={y}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Area wash */}
        <motion.path
          d={areaPath}
          fill={`url(#${gradientId}-fill)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Line — 2px, round join/cap */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        {/* End-dot with surface ring */}
        <motion.circle
          cx={last.x}
          cy={last.y}
          r={5}
          fill={accent}
          stroke="#ffffff"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 1.4, ease: "backOut" }}
        />

        {/* Direct end-label — value at the line's end */}
        <motion.text
          x={last.x}
          y={last.y - 14}
          textAnchor="end"
          fontSize="15"
          fontWeight={600}
          fill="rgba(0,0,0,0.85)"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {formatValue(last.value, trend.unit)}
        </motion.text>

        {/* Start label, muted */}
        <motion.text
          x={first.x}
          y={first.y - 14}
          textAnchor="start"
          fontSize="12"
          fill="rgba(0,0,0,0.35)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {formatValue(first.value, trend.unit)}
        </motion.text>

        {/* X-axis labels: first, middle, last only — selective labeling */}
        {[0, Math.floor((dots.length - 1) / 2), dots.length - 1].map((idx) => (
          <motion.text
            key={idx}
            x={dots[idx].x}
            y={HEIGHT - 10}
            textAnchor={idx === 0 ? "start" : idx === dots.length - 1 ? "end" : "middle"}
            fontSize="11"
            fill="rgba(0,0,0,0.35)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {dots[idx].label}
          </motion.text>
        ))}
      </svg>
      <p className="mt-2 text-center text-xs text-black/35">{trend.note}</p>
    </div>
  );
}
