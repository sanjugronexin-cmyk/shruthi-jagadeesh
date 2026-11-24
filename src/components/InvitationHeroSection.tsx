import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { GoldDiamondRule, ScrollFlourishDivider } from './Ornaments';
import { ScrollLetters } from './ScrollLetters';

export function InvitationHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end 0%'],
  });

  // Top floral garland opens smoothly from top and stays settled
  const floralTopY = useTransform(scrollYProgress, [0, 0.05, 0.42, 1], ['-38%', '-38%', '0%', '0%']);
  const floralTopOpacity = useTransform(scrollYProgress, [0, 0.04, 0.28, 1], [0, 0, 1, 1]);

  // Header typography reveals smoothly from top and stays settled
  const headerY = useTransform(scrollYProgress, [0, 0.05, 0.38, 1], ['-22px', '-22px', '0px', '0px']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.3, 1], [0, 0, 1, 1]);

  // Left-side banana leaf & brass lamp slide in from left
  const leftX = useTransform(scrollYProgress, [0, 0.1, 0.46, 1], ['-72px', '-72px', '0px', '0px']);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.08, 0.38, 1], [0, 0, 1, 1]);

  // Right-side banana leaf & brass lamp slide in from right
  const rightX = useTransform(scrollYProgress, [0, 0.1, 0.46, 1], ['72px', '72px', '0px', '0px']);

  // Watercolor floral ground backdrop rises gently and stays settled
  const floralBgY = useTransform(scrollYProgress, [0, 0.1, 0.46, 1], ['36px', '36px', '0px', '0px']);
  const floralBgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [0, 0, 1, 1]);

  // Temple background: reveals from bottom -> top on scroll, then drifts slowly upward & fades smoothly while moving to 3rd section
  const templeBgY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.44, 0.62, 1],
    ['95px', '95px', '0px', '-14px', '-115px']
  );
  const templeBgOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.38, 0.62, 0.96, 1],
    [0, 0, 1, 1, 0, 0]
  );

  // Standing couple rises smoothly from bottom and stays settled
  const coupleY = useTransform(scrollYProgress, [0, 0.12, 0.48, 1], ['52px', '52px', '0px', '0px']);
  const coupleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.42, 1], [0, 0, 1, 1]);

  // Wedding date ornament settles cleanly at bottom
  const dateY = useTransform(scrollYProgress, [0, 0.16, 0.5, 1], ['24px', '24px', '0px', '0px']);
  const dateOpacity = useTransform(scrollYProgress, [0, 0.16, 0.45, 1], [0, 0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Wedding Invitation Details"
      className="relative w-full h-[185vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden parchment-surface">
        {/* Bottom warm sandstone ground wash matching invitation_2nd_slide */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[23%] z-0 bg-gradient-to-b from-[#F5EBCE]/65 via-[#F2DFBE] to-[#F7EED7]"
        />

        {/* Top Marigold & Mango Leaf Garlands */}
        <motion.div
          style={prefersReduced ? {} : { y: floralTopY, opacity: floralTopOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 top-0 z-20 w-full will-change-transform"
        >
          <img
            src="/assets/couple/floral-top.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain object-top"
          />
        </motion.div>

        {/* Invitation Typography Header (from top + letter-by-letter side reveal) */}
        <motion.div
          style={prefersReduced ? {} : { y: headerY, opacity: headerOpacity }}
          className="relative z-30 pt-[9.5dvh] sm:pt-[10.5dvh] px-4 text-center flex flex-col items-center will-change-transform"
        >
          <p className="font-serif-inv text-[10px] sm:text-sm tracking-[0.14em] uppercase text-[#6B0F0D] leading-snug">
            <ScrollLetters
              text="TOGETHER WITH OUR FAMILIES"
              progress={scrollYProgress}
              start={0.05}
              end={0.19}
              fromX={-10}
            />
          </p>
          <p className="font-serif-inv text-[10px] sm:text-sm tracking-[0.14em] uppercase text-[#6B0F0D] leading-snug mt-0.5">
            <ScrollLetters
              text="WE INVITE YOU TO CELEBRATE OUR"
              progress={scrollYProgress}
              start={0.1}
              end={0.25}
              fromX={-10}
            />
          </p>

          {/* Wedding Script with Flanking Gold Rules */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-5 mt-1 sm:mt-2">
            <GoldDiamondRule side="right" className="w-10 sm:w-20" />
            <h1 className="font-script text-[44px] sm:text-7xl text-[#7A1210] leading-none pt-0.5">
              <ScrollLetters
                text="Wedding"
                progress={scrollYProgress}
                start={0.16}
                end={0.29}
                fromX={-12}
              />
            </h1>
            <GoldDiamondRule side="left" className="w-10 sm:w-20" />
          </div>

          {/* Couple Names */}
          <div className="mt-0.5 sm:mt-1 flex flex-col items-center">
            <span className="font-serif-inv text-2xl sm:text-[42px] font-normal text-[#6B0F0D] tracking-wide leading-tight">
              <ScrollLetters
                text="N.Sai Shruthi"
                progress={scrollYProgress}
                start={0.21}
                end={0.32}
                fromX={-10}
              />
            </span>
            <div className="flex items-center justify-center gap-2 my-0.5">
              <GoldDiamondRule side="right" className="w-7 sm:w-11" />
              <span className="font-serif-inv text-lg sm:text-3xl text-[#7A1210] font-normal leading-none">
                &amp;
              </span>
              <GoldDiamondRule side="left" className="w-7 sm:w-11" />
            </div>
            <span className="font-serif-inv text-2xl sm:text-[42px] font-normal text-[#6B0F0D] tracking-wide leading-tight">
              <ScrollLetters
                text="N.Jagadeesh Gandhi"
                progress={scrollYProgress}
                start={0.27}
                end={0.38}
                fromX={-10}
              />
            </span>
          </div>

          <ScrollFlourishDivider className="mt-2 sm:mt-3.5 max-w-[230px] sm:max-w-[320px]" />
        </motion.div>

        {/* Left & Right Banana Leaves */}
        <motion.img
          src="/assets/couple/banana-left.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: leftX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute left-0 top-[29.5%] z-20 edge-leaf max-w-[168px] object-contain will-change-transform"
        />
        <motion.img
          src="/assets/couple/banana-right.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: rightX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute right-0 top-[29.5%] z-20 edge-leaf max-w-[154px] object-contain will-change-transform"
        />

        {/* Temple Background: Reveals bottom -> top, drifts slowly up & fades smoothly toward Section 3 */}
        <motion.div
          style={prefersReduced ? {} : { y: templeBgY, opacity: templeBgOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-[35%] z-10 flex justify-center will-change-transform"
        >
          <img
            src="/assets/couple/temple-background.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="w-[66%] max-w-[446px] h-auto object-contain"
          />
        </motion.div>

        {/* Soft Watercolor Greenery & Floral Horizon Backdrop */}
        <motion.div
          style={prefersReduced ? {} : { y: floralBgY, opacity: floralBgOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-[19.5%] z-10 w-full will-change-transform"
        >
          <img
            src="/assets/couple/floral-background.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain object-bottom"
          />
        </motion.div>

        {/* Standing Couple Portrait */}
        <motion.div
          style={prefersReduced ? {} : { y: coupleY, opacity: coupleOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-[18.5%] z-20 flex justify-center will-change-transform"
        >
          <img
            src="/assets/couple/couple-illustration.png"
            alt="Shruthi and Jagadeesh in traditional South Indian wedding attire"
            loading="eager"
            decoding="async"
            className="h-[min(41dvh,80vw)] max-h-[430px] w-auto object-contain object-bottom"
          />
        </motion.div>

        {/* Bottom Corner Brass Lamps on Kalash */}
        <motion.img
          src="/assets/couple/brass-lamp-left.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: leftX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute left-0 bottom-[1%] z-20 w-[25%] max-w-[194px] h-auto object-contain will-change-transform"
        />
        <motion.img
          src="/assets/couple/brass-lamp-right.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: rightX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute right-0 bottom-[1%] z-20 w-[26.5%] max-w-[208px] h-auto object-contain will-change-transform"
        />

        {/* Wedding Date & Ornate Banner */}
        <motion.div
          style={prefersReduced ? {} : { y: dateY, opacity: dateOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-[4.5%] z-30 flex flex-col items-center text-center will-change-transform"
        >
          <p className="font-serif-inv text-[11px] sm:text-sm tracking-[0.14em] uppercase text-[#6B0F0D] mb-1.5 font-medium">
            WEDDING DATE
          </p>
          <div className="relative inline-flex items-center justify-center w-[58%] sm:w-[52%] max-w-[350px]">
            <img
              src="/assets/couple/date-ornament.png"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-3 px-3 text-[#6B0F0D] font-serif-inv text-[12px] min-[390px]:text-[13px] sm:text-xl font-semibold tracking-wide">
              <span className="inline-block w-2.5 sm:w-5 h-[1px] bg-[#C8962E]" />
              <span className="whitespace-nowrap">
                29<sup className="text-[0.72em]">th</sup> November 2026
              </span>
              <span className="inline-block w-2.5 sm:w-5 h-[1px] bg-[#C8962E]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
