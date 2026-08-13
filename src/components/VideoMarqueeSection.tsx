"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDarkSection } from "./NavThemeContext";
import WarpText from "./WarpText";

interface VideoItem {
  id: string;
  title: string;
}

const videos: VideoItem[] = [
  { id: "5t9KUOfowrk", title: "Thryve video" },
  { id: "M7lc1UVf-VE", title: "Placeholder video 2" },
  { id: "aqz-KE-bpKQ", title: "Placeholder video 3" },
  { id: "ScMzIvxBSi4", title: "Placeholder video 4" },
  { id: "9bZkp7q19f0", title: "Placeholder video 5" },
  { id: "jNQXAC9IVRw", title: "Placeholder video 6" },
];

const SCROLL_DURATION_S = 32;
const RESUME_DELAY_MS = 3000;

// Minimal shape of the YT IFrame Player API we rely on.
interface YTPlayer {
  destroy: () => void;
}
interface YTPlayerEvent {
  data: number;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onStateChange?: (e: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT as YTNamespace);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}

function VideoPlayer({
  video,
  onPlayingChange,
}: {
  video: VideoItem;
  onPlayingChange: (playing: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onPlayingChangeRef = useRef(onPlayingChange);
  onPlayingChangeRef.current = onPlayingChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // YT.Player replaces its target node with its own iframe, which fights
    // React's reconciler if that node is React-managed. Give it a plain
    // child div that React never touches directly.
    const mount = document.createElement("div");
    mount.className = "h-full w-full";
    container.appendChild(mount);

    let player: YTPlayer | null = null;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      player = new YT.Player(mount, {
        videoId: video.id,
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          onStateChange: (e) => {
            onPlayingChangeRef.current(e.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
      mount.remove();
    };
  }, [video.id]);

  return <div ref={containerRef} className="h-full w-full" />;
}

export default function VideoMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useDarkSection("video-marquee-section");
  const [openId, setOpenId] = useState<string | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      darkRef(el);
    },
    [darkRef]
  );

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearResumeTimeout, [clearResumeTimeout]);

  const handlePlayingChange = useCallback(
    (playing: boolean) => {
      if (playing) {
        clearResumeTimeout();
        setIsFrozen(true);
      } else {
        clearResumeTimeout();
        resumeTimeoutRef.current = setTimeout(() => {
          setIsFrozen(false);
        }, RESUME_DELAY_MS);
      }
    },
    [clearResumeTimeout]
  );

  const closeVideo = useCallback(() => {
    setOpenId(null);
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsFrozen(false);
    }, RESUME_DELAY_MS);
  }, [clearResumeTimeout]);

  const openVideo = useCallback(
    (instanceKey: string) => {
      clearResumeTimeout();
      setOpenId(instanceKey);
      setIsFrozen(true);
    },
    [clearResumeTimeout]
  );

  const marqueeItems = [...videos, ...videos];

  return (
    <section
      ref={setRefs}
      className="relative flex h-screen w-full flex-col items-center justify-center gap-16 overflow-hidden bg-black"
    >
      <WarpText
        text="Brands We Audited."
        color="#f8f5ff"
        warpStrength={0.08}
        warpScale={1.7}
        speed={0.55}
        pointerInfluence={0.42}
        pointerStrength={0.38}
        refraction={0.018}
        ripple
        fontSize="clamp(2rem, 6vw, 5rem)"
        fontWeight={800}
        style={{ height: "200px" }}
      />

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max items-center gap-8 px-8"
          style={{
            animation: `video-marquee-scroll ${SCROLL_DURATION_S}s linear infinite`,
            animationPlayState: isFrozen ? "paused" : "running",
          }}
        >
          {marqueeItems.map((video, i) => {
            const instanceKey = `${video.id}-${i}`;
            const isOpen = openId === instanceKey;

            return (
              <div
                key={instanceKey}
                className="relative aspect-video w-105 shrink-0 overflow-hidden rounded-2xl bg-zinc-900 md:w-130"
              >
                {isOpen ? (
                  <VideoPlayer video={video} onPlayingChange={handlePlayingChange} />
                ) : (
                  <button
                    type="button"
                    onClick={() => openVideo(instanceKey)}
                    className="group relative h-full w-full cursor-pointer"
                    aria-label={`Play ${video.title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                    <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                )}

                {isOpen && (
                  <button
                    type="button"
                    onClick={closeVideo}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/90"
                    aria-label="Close video"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #000000, #00000000)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #000000, #00000000)" }}
        />
      </div>

      <style>{`
        @keyframes video-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
