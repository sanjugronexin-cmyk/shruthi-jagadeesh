import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { LeafFlourish, ScrollFlourishDivider, SmallOrnamentLine } from './Ornaments';
import { ScrollLetters } from './ScrollLetters';

export function CelebrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  // Top garland scroll reveal (from top, reversible on scroll back)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start 96%', 'end 0%'],
  });
  const topGarlandY = useTransform(sectionProgress, [0, 0.02, 0.24, 1], ['-45%', '-45%', '0%', '0%']);
  const topGarlandOpacity = useTransform(sectionProgress, [0, 0.02, 0.18, 1], [0, 0, 1, 1]);

  // Header ("THE Wedding CELEBRATIONS" from top + letter-by-letter side reveal)
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start 95%', 'end 0%'],
  });
  const headerY = useTransform(headerProgress, [0, 0.03, 0.28, 1], ['-34px', '-34px', '0px', '0px']);
  const headerOpacity = useTransform(headerProgress, [0, 0.03, 0.22, 1], [0, 0, 1, 1]);

  // Row 1 (Engagement): comes from LEFT on scroll & reverses on scroll back
  const { scrollYProgress: row1Progress } = useScroll({
    target: row1Ref,
    offset: ['start 95%', 'end 0%'],
  });
  const row1X = useTransform(row1Progress, [0, 0.04, 0.34, 1], ['-78px', '-78px', '0px', '0px']);
  const row1Opacity = useTransform(row1Progress, [0, 0.04, 0.26, 1], [0, 0, 1, 1]);

  // Row 2 (Muhurtham): comes from RIGHT on scroll & reverses on scroll back
  const { scrollYProgress: row2Progress } = useScroll({
    target: row2Ref,
    offset: ['start 95%', 'end 0%'],
  });
  const row2X = useTransform(row2Progress, [0, 0.04, 0.34, 1], ['78px', '78px', '0px', '0px']);
  const row2Opacity = useTransform(row2Progress, [0, 0.04, 0.26, 1], [0, 0, 1, 1]);

  // Row 3 (Reception): comes from LEFT on scroll & reverses on scroll back
  const { scrollYProgress: row3Progress } = useScroll({
    target: row3Ref,
    offset: ['start 95%', 'end 0%'],
  });
  const row3X = useTransform(row3Progress, [0, 0.04, 0.34, 1], ['-78px', '-78px', '0px', '0px']);
  const row3Opacity = useTransform(row3Progress, [0, 0.04, 0.26, 1], [0, 0, 1, 1]);

  // Bottom flower garland: loads from BOTTOM on scroll & reverses on scroll back
  const { scrollYProgress: bottomProgress } = useScroll({
    target: bottomRef,
    offset: ['start 98%', 'end 0%'],
  });
  const bottomGarlandY = useTransform(bottomProgress, [0, 0.03, 0.28, 1], ['48px', '48px', '0px', '0px']);
  const bottomGarlandOpacity = useTransform(bottomProgress, [0, 0.03, 0.22, 1], [0, 0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="The Wedding Celebrations"
      className="relative w-full overflow-hidden parchment-surface pb-0"
    >
      {/* Top Garland: reveals smoothly from top */}
      <motion.div
        style={prefersReduced ? {} : { y: topGarlandY, opacity: topGarlandOpacity }}
        className="pointer-events-none select-none absolute inset-x-0 top-0 z-10 w-full will-change-transform"
      >
        <img
          src="/assets/events/top-garland.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="w-full h-auto object-contain object-top"
        />
      </motion.div>

      {/* Section Title: comes from top & reveals single letter by single letter from side */}
      <motion.div
        ref={headerRef}
        style={prefersReduced ? {} : { y: headerY, opacity: headerOpacity }}
        className="relative z-20 section-arch-header text-center flex flex-col items-center will-change-transform"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-12 bg-[#C8962E]" />
          <span className="font-serif-inv text-sm sm:text-lg tracking-[0.18em] uppercase text-[#6B0F0D] font-medium">
            <ScrollLetters text="THE" progress={headerProgress} start={0.04} end={0.14} fromX={-10} />
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-[#C8962E]" />
        </div>

        <h2 className="font-script text-5xl sm:text-7xl text-[#7A1210] leading-none mt-1">
          <ScrollLetters text="Wedding" progress={headerProgress} start={0.08} end={0.22} fromX={-12} />
        </h2>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-1.5">
          <span className="flex items-center">
            <span className="h-[1px] w-8 sm:w-14 bg-[#C8962E]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
          </span>
          <span className="font-serif-inv text-lg sm:text-2xl tracking-[0.14em] uppercase text-[#6B0F0D] font-semibold">
            <ScrollLetters text="CELEBRATIONS" progress={headerProgress} start={0.14} end={0.3} fromX={-12} />
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
            <span className="h-[1px] w-8 sm:w-14 bg-[#C8962E]" />
          </span>
        </div>

        <p className="font-serif-inv italic text-xs sm:text-base text-[#6B0F0D] mt-2 sm:mt-3">
          <ScrollLetters
            text="Join us as we celebrate the beginning of forever."
            progress={headerProgress}
            start={0.18}
            end={0.34}
            fromX={-8}
          />
        </p>

        <ScrollFlourishDivider className="mt-2.5 sm:mt-3 max-w-[260px] sm:max-w-[320px]" />
      </motion.div>

      {/* Celebration Row 1: ENGAGEMENT (comes from LEFT, reverses when scrolling back) */}
      <motion.div
        ref={row1Ref}
        style={prefersReduced ? {} : { x: row1X, opacity: row1Opacity }}
        className="relative z-10 mt-6 sm:mt-8 grid grid-cols-12 items-center celebration-row will-change-transform"
      >
        <div className="col-span-6 sm:col-span-7 flex justify-start">
          <img
            src="/assets/events/engagement.png"
            alt="Engagement oonjal ceremony illustration"
            decoding="async"
            className="w-full max-w-[420px] h-auto object-contain select-none pointer-events-none"
          />
        </div>

        <div className="col-span-6 sm:col-span-5 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <LeafFlourish direction="left" />
            <h3 className="font-serif-inv celebration-title uppercase text-[#6B0F0D] font-bold">
              <ScrollLetters text="RECEPTION" progress={row1Progress} start={0.08} end={0.28} fromX={-10} />
            </h3>
            <LeafFlourish direction="right" />
          </div>
          <SmallOrnamentLine className="mt-1.5 sm:mt-2 mb-2 max-w-[160px] sm:max-w-[230px]" />
          <p className="font-serif-inv celebration-date text-[#6B0F0D]">
            <ScrollLetters
              text="Saturday, 12 November 2026"
              progress={row1Progress}
              start={0.14}
              end={0.34}
              fromX={-8}
            />
          </p>
          <p className="font-serif-inv celebration-date text-[#6B0F0D] mt-0.5">
            <ScrollLetters text="6:00 PM onwards" progress={row1Progress} start={0.2} end={0.38} fromX={-8} />
          </p>
          <SmallOrnamentLine className="mt-2 max-w-[130px] sm:max-w-[190px]" />
        </div>
      </motion.div>

      <div className="my-5 sm:my-7 px-6 flex justify-center">
        <img
          src="/assets/events/event-divider.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="w-full max-w-[440px] h-auto object-contain select-none pointer-events-none"
        />
      </div>

      {/* Celebration Row 2: MUHURTHAM (comes from RIGHT, reverses when scrolling back) */}
      <motion.div
        ref={row2Ref}
        style={prefersReduced ? {} : { x: row2X, opacity: row2Opacity }}
        className="relative z-10 grid grid-cols-12 items-center celebration-row will-change-transform"
      >
        <div className="col-span-6 sm:col-span-5 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <LeafFlourish direction="left" />
            <h3 className="font-serif-inv celebration-title uppercase text-[#6B0F0D] font-bold">
              <ScrollLetters text="WEDDING" progress={row2Progress} start={0.08} end={0.28} fromX={10} />
            </h3>
            <LeafFlourish direction="right" />
          </div>
          <SmallOrnamentLine className="mt-1.5 sm:mt-2 mb-2 max-w-[160px] sm:max-w-[230px]" />
          <p className="font-serif-inv celebration-date text-[#6B0F0D]">
            <ScrollLetters
              text="Sunday, 29 November 2026"
              progress={row2Progress}
              start={0.14}
              end={0.34}
              fromX={8}
            />
          </p>
          <p className="font-serif-inv celebration-date text-[#6B0F0D] mt-0.5">
            <ScrollLetters text="6:00 AM – 7:30 AM" progress={row2Progress} start={0.2} end={0.38} fromX={8} />
          </p>
          <SmallOrnamentLine className="mt-2 max-w-[130px] sm:max-w-[190px]" />
        </div>

        <div className="col-span-6 sm:col-span-7 flex justify-end">
          <img
            src="/assets/events/muhurtham.png"
            alt="Muhurtham sacred fire ceremony illustration"
            decoding="async"
            className="w-full max-w-[430px] h-auto object-contain select-none pointer-events-none"
          />
        </div>
      </motion.div>

      <div className="my-5 sm:my-7 px-6 flex justify-center">
        <img
          src="/assets/events/event-divider.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="w-full max-w-[440px] h-auto object-contain select-none pointer-events-none"
        />
      </div>

      {/* Celebration Row 3: RECEPTION (comes from LEFT, reverses when scrolling back) */}
      <motion.div
        ref={row3Ref}
        style={prefersReduced ? {} : { x: row3X, opacity: row3Opacity }}
        className="relative z-10 grid grid-cols-12 items-center celebration-row pb-2 will-change-transform"
      >
        <div className="col-span-6 sm:col-span-7 flex justify-start">
          <img
            src="/assets/events/reception.png"
            alt="Wedding reception stage illustration"
            decoding="async"
            className="w-full max-w-[420px] h-auto object-contain select-none pointer-events-none"
          />
        </div>

        <div className="col-span-6 sm:col-span-5 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <LeafFlourish direction="left" />
            <h3 className="font-serif-inv celebration-title uppercase text-[#6B0F0D] font-bold">
              <ScrollLetters text="BRIDE'S RECEPTION" progress={row3Progress} start={0.08} end={0.28} fromX={-10} />
            </h3>
            <LeafFlourish direction="right" />
          </div>
          <SmallOrnamentLine className="mt-1.5 sm:mt-2 mb-2 max-w-[160px] sm:max-w-[230px]" />
          <p className="font-serif-inv celebration-date text-[#6B0F0D]">
            <ScrollLetters
              text="Friday, 04 December 2026"
              progress={row3Progress}
              start={0.14}
              end={0.34}
              fromX={-8}
            />
          </p>
          <p className="font-serif-inv celebration-date text-[#6B0F0D] mt-0.5">
            <ScrollLetters text="6:00 PM onwards" progress={row3Progress} start={0.2} end={0.38} fromX={-8} /> <br />
            <ScrollLetters text={"Kammavar Naidu Kalyana Mahal,\n67, Thirrumanjana veedhi, Swamimalai."} progress={row3Progress} start={0.2} end={0.38} fromX={-8} />
          </p>
          <SmallOrnamentLine className="mt-2 max-w-[130px] sm:max-w-[190px]" />
        </div>
      </motion.div>

      {/* Bottom Garland: loads smoothly from bottom */}
      <div ref={bottomRef} className="relative z-10 w-full -mt-1 overflow-hidden pointer-events-none select-none">
        <motion.img
          src="/assets/events/bottom-garland.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { y: bottomGarlandY, opacity: bottomGarlandOpacity }}
          className="w-full h-auto object-cover will-change-transform"
        />
      </div>
    </section>
  );
}
