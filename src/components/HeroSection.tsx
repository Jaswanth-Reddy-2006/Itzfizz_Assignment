"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatBox from "./StatBox";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Headline letters for "WELCOME ITZFIZZ" */
const HEADLINE = "WELCOME ITZFIZZ";

/**
 * HeroSection — Scroll-driven animated hero with stealth fighter jet.
 *
 * Directional Flight:
 * - When scrolling down (forward): Jet faces RIGHT and zooms forward.
 * - When scrolling up (reverse): Jet flips to face LEFT in a smooth tactical maneuver.
 * - Supersonic green trail tracks the jet's engines dynamically.
 * - Headline letters reveal when passed going forward and un-reveal in reverse.
 * - 4 enlarged stat cards fade in and slide up with non-overlapping layout.
 */
const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const jetImgRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headlineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const jet = jetRef.current;
      const jetImg = jetImgRef.current;
      const trail = trailRef.current;
      const road = roadRef.current;
      const headlineContainer = headlineContainerRef.current;
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!jet || !jetImg || !trail || !road || !headlineContainer || !section || !track) return;

      const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

      const getJetWidth = () => jet.offsetWidth || 340;
      const getRoadWidth = () => window.innerWidth;

      // Start position: completely off the left edge
      const getStartX = () => -getJetWidth() - 80;
      // End position: completely off the right edge (well past screen boundary)
      const getEndX = () => getRoadWidth() + getJetWidth() + 120;

      // Set initial state before any scroll
      gsap.set(jet, { x: getStartX() });
      gsap.set(jetImg, { scaleX: 1 });
      gsap.set(trail, { width: 0 });
      gsap.set(["#box1", "#box2", "#box3", "#box4"], {
        opacity: 0,
        y: 40,
        scale: 0.92,
      });

      // ─── 1. Intro Animation on Load ───
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl.from(track, {
        opacity: 0,
        duration: 0.6,
      });

      introTl.from(
        letters,
        {
          opacity: 0,
          y: 25,
          duration: 0.45,
          stagger: 0.025,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      introTl.to(letters, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.015,
        delay: 0.3,
      });

      // ─── 2. Scroll-Driven Animation with Directional Flip ───
      let currentDirection = 1;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: track,
          scrub: 0.5, // fast, crisp scrubbing
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const jetX = gsap.getProperty(jet, "x") as number;
            const jetWidth = getJetWidth();

            // Detect scroll direction and flip the fighter jet
            if (self.direction !== currentDirection) {
              currentDirection = self.direction;
              if (currentDirection === -1) {
                // Scrolling UP (reverse) -> Flip jet to face left
                gsap.to(jetImg, {
                  scaleX: -1,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              } else if (currentDirection === 1) {
                // Scrolling DOWN (forward) -> Face right
                gsap.to(jetImg, {
                  scaleX: 1,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            }

            // Calculate active leading nose position
            const jetNose = jetX + jetWidth * 0.92;
            const jetRear = jetX + jetWidth * 0.15;

            // Compute letter reveal based on jet travel
            letters.forEach((letter) => {
              if (!letter) return;
              const letterLeft = letter.getBoundingClientRect().left;
              if (jetNose >= letterLeft) {
                letter.style.opacity = "1";
              } else {
                letter.style.opacity = "0";
              }
            });

            // Green trail: expands as jet moves forward, contracts when scrolling back
            const trailWidth = Math.max(0, Math.min(jetRear + jetWidth * 0.3, window.innerWidth));
            gsap.set(trail, { width: trailWidth });
          },
        },
      });

      // Move fighter jet from complete left to complete right within the first 60% of scroll (duration: 6 of 10)
      scrollTl.fromTo(
        jet,
        { x: () => getStartX() },
        {
          x: () => getEndX(),
          ease: "none",
          duration: 6.0,
        },
        0
      );

      // Staggered reveal of the 4 stat cards along the first half of the timeline
      // Box 1 (58% Yellow - top left)
      scrollTl.to(
        "#box1",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        1.0
      );

      // Box 2 (23% Blue - bottom left)
      scrollTl.to(
        "#box2",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        2.2
      );

      // Box 3 (27% Dark - top right)
      scrollTl.to(
        "#box3",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        3.4
      );

      // Box 4 (40% Orange - bottom right)
      scrollTl.to(
        "#box4",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        4.6
      );

      // Total timeline duration is 10.0; from 6.0 to 10.0 the scene is complete and stable
      scrollTl.set({}, {}, 10.0);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh" }}
    >
      {/* Track — Pinned during the scroll sequence */}
      <div
        ref={trackRef}
        className="h-screen w-full flex items-center justify-center bg-[#d8d8d8] overflow-hidden relative select-none"
      >
        {/* Runway strip */}
        <div
          ref={roadRef}
          className="relative w-full h-[230px] bg-[#1e1e1e] overflow-hidden flex items-center"
        >
          {/* Green supersonic trail that grows behind the jet — 0 width initially */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full bg-[#45db7d] z-[1]"
            style={{ width: 0, willChange: "width" }}
          />

          {/* Stealth Fighter Jet element — With directional flip container */}
          <div
            ref={jetRef}
            className="absolute top-0 left-0 z-10 h-[230px]"
            style={{
              width: "30vw",
              minWidth: "280px",
              maxWidth: "460px",
              willChange: "transform",
            }}
          >
            <div
              ref={jetImgRef}
              className="relative w-full h-full"
              style={{ willChange: "transform" }}
            >
              <Image
                src="/fighter-jet.png"
                alt="Stealth fighter jet top view"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 768px) 300px, 32vw"
              />
            </div>
          </div>

          {/* Headline letters on the runway */}
          <div
            ref={headlineContainerRef}
            className="absolute z-[5] flex items-center gap-[0.2rem] md:gap-[0.4rem] px-8 md:px-14 pointer-events-none"
            style={{
              left: "2%",
            }}
          >
            {HEADLINE.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
                className="font-black text-[#111] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
                style={{
                  opacity: 0,
                  transition: "opacity 0.12s ease",
                  willChange: "opacity",
                  display: "inline-block",
                  width: char === " " ? "0.45em" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Runway center line markings */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[2] pointer-events-none">
            <div className="flex gap-8 w-full px-4">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-[3px] bg-yellow-300/40 shrink-0 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── 4 Stat Boxes (Enlarged size with clean non-overlapping layout) ─── */}
        {/* Top-Left Card (58% Yellow) */}
        <StatBox
          id="box1"
          percentage="58%"
          description="Increase in pick up point use"
          variant="yellow"
          style={{
            top: "3%",
            right: "32%",
          }}
        />

        {/* Top-Right Card (27% Dark) */}
        <StatBox
          id="box3"
          percentage="27%"
          description="Increase in pick up point use"
          variant="dark"
          style={{
            top: "3%",
            right: "2%",
          }}
        />

        {/* Bottom-Left Card (23% Blue) */}
        <StatBox
          id="box2"
          percentage="23%"
          description="Decreased in customer phone calls"
          variant="blue"
          style={{
            bottom: "3%",
            right: "32%",
          }}
        />

        {/* Bottom-Right Card (40% Orange) */}
        <StatBox
          id="box4"
          percentage="40%"
          description="Decreased in customer phone calls"
          variant="orange"
          style={{
            bottom: "3%",
            right: "2%",
          }}
        />

        {/* Scroll indicator — Positioned on the bottom-left where no cards exist */}
        <div className="absolute bottom-6 left-8 flex items-center gap-2.5 animate-bounce z-20 pointer-events-none opacity-80 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-300 shadow-sm">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="text-[#333] text-[11px] font-bold tracking-[0.2em] uppercase">
            Scroll to Fly
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
