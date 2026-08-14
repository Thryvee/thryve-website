"use client";

import { useState, useEffect } from "react";
import LeadMagnetModal from "./LeadMagnetModal";

const DELAY_MS = 6000;

export default function LeadMagnetTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return <LeadMagnetModal open={open} onClose={() => setOpen(false)} />;
}
