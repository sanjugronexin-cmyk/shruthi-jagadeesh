import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { GoldDiamondRule, ScrollFlourishDivider } from './Ornaments';
import { ScrollLetters } from './ScrollLetters';

const BLESSINGS_PETALS = [
  { id: 1, left: '4%', top: '18%', w: 12, rot: -20, delay: '0.3s' },
  { id: 2, left: '89%', top: '19%', w: 13, rot: 25, delay: '1.1s' },
  { id: 3, left: '94%', top: '25%', w: 11, rot: -15, delay: '1.9s' },
];

export function BlessingsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  // Header & blessing lines: reveal from top + letter-by-letter side reveal (reversible)
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start 95%', 'end 100%'],
  });
  const headerY = useTransform(headerProgress, [0, 0.04, 0.35, 1], ['-28px', '-28px', '0px', '0px']);
  const headerOpacity = useTransform(headerProgress, [0, 0.04, 0.28, 1], [0, 0, 1, 1]);

  // Lamps + Kalash centerpiece: rises smoothly from bottom (reversible)
  const { scrollYProgress: centerProgress } = useScroll({
    target: centerRef,
    offset: ['start 96%', 'end 100%'],
  });
  const centerpieceY = useTransform(centerProgress, [0, 0.05, 0.5, 1], ['46px', '46px', '0px', '0px']);
  const centerpieceOpacity = useTransform(centerProgress, [0, 0.05, 0.4, 1], [0, 0, 1, 1]);

  const { scrollYProgress: signoffProgress } = useScroll({
    target: signoffRef,
    offset: ['start 97%', 'end 100%'],
  });
  const signoffY = useTransform(signoffProgress, [0, 0.05, 0.52, 1], ['22px', '22px', '0px', '0px']);
  const signoffOpacity = useTransform(signoffProgress, [0, 0.05, 0.4, 1], [0, 0, 1, 1]);

  // Bottom sandstone kolam & floral corners: rises from bottom (guaranteed 1.0 at page end)
  const { scrollYProgress: floorProgress } = useScroll({
    target: floorRef,
    offset: ['start 98%', 'end 100%'],
  });
  const floorY = useTransform(floorProgress, [0, 0.05, 0.72, 1], ['28px', '28px', '0px', '0px']);
  const floorOpacity = useTransform(floorProgress, [0, 0.05, 0.6, 1], [0, 0, 1, 1]);

  return (
    <footer
      aria-label="Blessings and Closing Invitation"
      className="relative w-full overflow-hidden parchment-glow pt-8 sm:pt-12 pb-0"
    >
      {/* Floating Rose Petals matching invitation_slide_6 */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {BLESSINGS_PETALS.map((p) => (
          <svg
            key={p.id}
            viewBox="0 0 24 16"
            className="hero-petal absolute opacity-80"
            style={{
              left: p.left,
              top: p.top,
              width: p.w,
              height: p.w * 0.67,
              animationDelay: p.delay,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <path d="M2 8C6 1 16 1 22 7C18 14 8 15 2 8Z" fill="#E34B61" fillOpacity="0.82" />
          </svg>
        ))}
      </div>

      {/* Header + Blessings Copy */}
      <motion.div
        ref={headerRef}
        style={prefersReduced ? {} : { y: headerY, opacity: headerOpacity }}
        className="relative z-20 px-5 sm:px-10 text-center flex flex-col items-center will-change-transform"
      >
        <img
          src="/assets/rsvp/ornament-divider.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="w-[58%] max-w-[300px] sm:max-w-[360px] h-auto object-contain select-none pointer-events-none"
        />

        <h2 className="font-serif-inv text-lg sm:text-3xl font-bold tracking-[0.06em] uppercase text-[#6B0F0D] mt-4 sm:mt-6 leading-snug">
          <ScrollLetters
            text="YOUR PRESENCE IS OUR"
            progress={headerProgress}
            start={0.05}
            end={0.22}
            fromX={-10}
          />
          <br />
          <ScrollLetters
            text="GREATEST BLESSING"
            progress={headerProgress}
            start={0.14}
            end={0.32}
            fromX={-10}
          />
        </h2>

        {/* Jasmine Center Blossom Flanked by Gold Rules */}
        <div className="mt-2.5 sm:mt-3.5 flex items-center justify-center gap-2 sm:gap-3 w-full max-w-[330px] sm:max-w-[400px]">
          <GoldDiamondRule side="both" className="w-16 sm:w-24 shrink-0" />
          <img
            src="/assets/rsvp/jasmine-divider.png"
            alt=""
            aria-hidden="true"
            decoding="async"
            className="w-20 sm:w-28 h-auto object-contain select-none pointer-events-none"
          />
          <GoldDiamondRule side="both" className="w-16 sm:w-24 shrink-0" />
        </div>

        <div className="mt-3 sm:mt-5 space-y-3.5 sm:space-y-4 max-w-[540px]">
          <p className="font-serif-inv italic text-sm sm:text-xl text-[#6B0F0D] leading-relaxed">
            As we begin this beautiful new chapter
            <br className="hidden sm:inline" /> of our lives, we would be grateful to have
            <br className="hidden sm:inline" /> your presence, love and blessings by our side.
          </p>
          <p className="font-serif-inv italic text-sm sm:text-xl text-[#6B0F0D] leading-relaxed">
            Your love and good wishes will make
            <br className="hidden sm:inline" /> our celebration even more special.
          </p>
        </div>

        <ScrollFlourishDivider className="mt-4 sm:mt-5 max-w-[260px] sm:max-w-[320px]" />
      </motion.div>

      {/* Grand Symmetrical Lamps + Purna Kalash + Lotuses Centerpiece */}
      <motion.div
        ref={centerRef}
        style={prefersReduced ? {} : { y: centerpieceY, opacity: centerpieceOpacity }}
        className="relative z-10 mt-2 sm:mt-4 w-full px-1 sm:px-2 will-change-transform"
      >
        <img
          src="/assets/rsvp/kalash-with-lamp.png"
          alt="Auspicious Purna Kalash flanked by lit brass Kuthuvilakku lamps, lotus flowers, and jasmine"
          decoding="async"
          className="closing-center-img select-none pointer-events-none"
        />
      </motion.div>

      {/* Sign-off */}
      <motion.div
        ref={signoffRef}
        style={prefersReduced ? {} : { y: signoffY, opacity: signoffOpacity }}
        className="relative z-20 px-4 text-center flex flex-col items-center will-change-transform"
      >
        <p className="font-serif-inv text-xs sm:text-base tracking-[0.16em] uppercase text-[#6B0F0D] font-medium">
          <ScrollLetters text="WITH LOVE," progress={signoffProgress} start={0.04} end={0.2} fromX={-8} />
        </p>
        <p className="font-script text-4xl sm:text-6xl text-[#7A1210] mt-1 leading-tight">
          <ScrollLetters
            text="Shruthi  & Jagadeesh"
            progress={signoffProgress}
            start={0.12}
            end={0.38}
            fromX={-10}
          />
        </p>
        <p className="font-serif-inv text-sm sm:text-xl text-[#6B0F0D] mt-1">
          <ScrollLetters
            text="And Our Families"
            progress={signoffProgress}
            start={0.24}
            end={0.48}
            fromX={-8}
          />
        </p>

        <img
          src="/assets/rsvp/ornament-divider.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="mt-3.5 sm:mt-5 w-[56%] max-w-[300px] sm:max-w-[360px] h-auto object-contain select-none pointer-events-none"
        />
      </motion.div>

      {/* Bottom Sandstone Kolam & Marigold Corner Floor */}
      <div
        ref={floorRef}
        className="relative z-10 w-full -mt-2 sm:-mt-4 pt-5 sm:pt-7 pointer-events-none select-none overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-[#FAF1DC]/0 via-[#F5DAB0]/85 to-[#F0C88B]"
        />
        <motion.img
          src="/assets/rsvp/bottom-floral-set.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { y: floorY, opacity: floorOpacity }}
          className="relative z-10 w-full h-auto object-cover object-bottom will-change-transform"
        />
      </div>
    </footer>
  );
}
