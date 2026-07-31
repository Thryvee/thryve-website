"use client";

import { motion } from "motion/react";

const columns = [
  {
    label: "At Risk",
    dot: "#f97316",
    tasks: [
      { name: "Sarah M.", tag: "Win-back email" },
      { name: "James T.", tag: "Discount offer" },
    ],
  },
  {
    label: "Re-engaging",
    dot: "#a020f0",
    tasks: [
      { name: "Priya K.", tag: "SMS flow" },
      { name: "Alex R.", tag: "Loyalty nudge" },
    ],
  },
  {
    label: "Retained",
    dot: "#22c55e",
    tasks: [
      { name: "Maria L.", tag: "Repeat buyer" },
      { name: "Devon C.", tag: "VIP tier" },
    ],
  },
];

export default function RetentionBoardMockup() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-black/5 bg-white md:h-full">
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
            R
          </span>
          <span className="text-sm font-medium text-black">Retention Board</span>
        </div>
        <div className="flex gap-4 text-xs text-black/40">
          <span>Segment</span>
          <span>CRM</span>
          <span>Flows</span>
        </div>
      </div>

      <div className="flex gap-4 px-5 py-4 text-xs text-black/40">
        <span className="border-b-2 border-black pb-1 font-medium text-black">
          Lifecycle Board
        </span>
        <span>Cohorts</span>
        <span>Campaigns</span>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 pb-5">
        {columns.map((col, ci) => (
          <div key={col.label} className="rounded-xl bg-zinc-50 p-2">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: col.dot }}
              />
              <span className="text-[11px] font-medium text-black/70">{col.label}</span>
            </div>
            <div className="flex flex-col gap-2">
              {col.tasks.map((task, ti) => (
                <motion.div
                  key={task.name}
                  className="rounded-lg border border-black/5 bg-white p-2"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.6 + ci * 0.25 + ti * 0.15,
                  }}
                >
                  <p className="text-[11px] font-medium text-black">{task.name}</p>
                  <span className="mt-1 inline-block rounded-md bg-purple-50 px-1.5 py-0.5 text-[10px] text-purple-600">
                    {task.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
