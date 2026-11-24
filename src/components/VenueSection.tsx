import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { JasmineDivider, ScrollFlourishDivider } from './Ornaments';
import { ScrollLetters } from './ScrollLetters';

const MAPS_DIRECTIONS_URL = 'https://maps.app.goo.gl/DKfMkWhNb9nrm1fFA';


const GOOGLE_CALENDAR_SAVE_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Shruthi+%26+Jagadeesh+Wedding' +
  '&dates=20261129T060000/20261129T073000' +
  '&ctz=Asia/Kolkata' +
  '&details=Together+with+our+families%2C+we+warmly+invite+you+to+celebrate+the+wedding+of+Shruthi+%26+Jagadeesh.' +
  '&location=Shree+Venkatesh+Mahal%2C+Zamin+Pallavaram%2C+Chennai';
  
export function VenueSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  // Header ("THE Celebration AWAITS" from top + letter-by-letter reveal)
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start 95%', 'end 0%'],
  });
  const headerY = useTransform(headerProgress, [0, 0.03, 0.28, 1], ['-30px', '-30px', '0px', '0px']);
  const headerOpacity = useTransform(headerProgress, [0, 0.03, 0.22, 1], [0, 0, 1, 1]);

  // Mandapam center rise + flanking banana leaves (left from left, right from right)
  const { scrollYProgress: stageProgress } = useScroll({
    target: stageRef,
    offset: ['start 95%', 'end 0%'],
  });
  const mandapamY = useTransform(stageProgress, [0, 0.04, 0.34, 1], ['48px', '48px', '0px', '0px']);
  const mandapamOpacity = useTransform(stageProgress, [0, 0.04, 0.26, 1], [0, 0, 1, 1]);
  const leafLeftX = useTransform(stageProgress, [0, 0.04, 0.32, 1], ['-68px', '-68px', '0px', '0px']);
  const leafRightX = useTransform(stageProgress, [0, 0.04, 0.32, 1], ['68px', '68px', '0px', '0px']);

  // Venue Details & Actions reveal
  const { scrollYProgress: detailsProgress } = useScroll({
    target: detailsRef,
    offset: ['start 95%', 'end 0%'],
  });
  const detailsY = useTransform(detailsProgress, [0, 0.04, 0.3, 1], ['28px', '28px', '0px', '0px']);
  const detailsOpacity = useTransform(detailsProgress, [0, 0.04, 0.24, 1], [0, 0, 1, 1]);

  // Bottom Flowers (left from left, right from right)
  const { scrollYProgress: bottomProgress } = useScroll({
    target: bottomRef,
    offset: ['start 98%', 'end 0%'],
  });
  const flowerLeftX = useTransform(bottomProgress, [0, 0.02, 0.26, 1], ['-60px', '-60px', '0px', '0px']);
  const flowerRightX = useTransform(bottomProgress, [0, 0.02, 0.26, 1], ['60px', '60px', '0px', '0px']);
  const flowerOpacity = useTransform(bottomProgress, [0, 0.02, 0.22, 1], [0, 0, 1, 1]);

  return (
    <section
      aria-label="Wedding Venue and Directions"
      className="relative w-full overflow-hidden parchment-surface pt-10 sm:pt-14 pb-10 sm:pb-14"
    >
      {/* Section Heading (No top marigold garlands, matches Section 4 reveal style) */}
      <motion.div
        ref={headerRef}
        style={prefersReduced ? {} : { y: headerY, opacity: headerOpacity }}
        className="relative z-20 px-4 sm:px-8 text-center flex flex-col items-center will-change-transform"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="flex items-center">
            <span className="h-[1px] w-10 sm:w-16 bg-[#C8962E]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
          </span>
          <span className="font-serif-inv text-sm sm:text-lg tracking-[0.18em] uppercase text-[#6B0F0D] font-medium">
            <ScrollLetters text="THE" progress={headerProgress} start={0.04} end={0.14} fromX={-10} />
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
            <span className="h-[1px] w-10 sm:w-16 bg-[#C8962E]" />
          </span>
        </div>

        <h2 className="font-script text-5xl sm:text-7xl text-[#7A1210] leading-none mt-1">
          <ScrollLetters text="Celebration" progress={headerProgress} start={0.08} end={0.22} fromX={-12} />
        </h2>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-1.5">
          <span className="flex items-center">
            <span className="h-[1px] w-10 sm:w-14 bg-[#C8962E]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
          </span>
          <span className="font-serif-inv text-lg sm:text-2xl tracking-[0.14em] uppercase text-[#6B0F0D] font-semibold">
            <ScrollLetters text="AWAITS" progress={headerProgress} start={0.14} end={0.28} fromX={-12} />
          </span>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C8962E]" />
            <span className="h-[1px] w-10 sm:w-14 bg-[#C8962E]" />
          </span>
        </div>

        <p className="font-serif-inv italic text-sm sm:text-lg text-[#6B0F0D] mt-3 max-w-md leading-relaxed">
          <ScrollLetters
            text="We would be delighted to have you with us"
            progress={headerProgress}
            start={0.16}
            end={0.3}
            fromX={-8}
          />
          <br />
          <ScrollLetters
            text="on our special day."
            progress={headerProgress}
            start={0.22}
            end={0.34}
            fromX={-8}
          />
        </p>

        <ScrollFlourishDivider className="mt-3 max-w-[260px] sm:max-w-[320px]" />
      </motion.div>

      {/* Kalyana Mandapam Centerpiece + Side Banana Leaves */}
      <div ref={stageRef} className="relative z-10 mt-5 sm:mt-7 w-full">
        <motion.img
          src="/assets/venue/banana-left.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { x: leafLeftX, opacity: mandapamOpacity }}
          className="pointer-events-none select-none absolute left-0 -top-6 sm:-top-12 z-20 w-[20%] max-w-[152px] h-auto object-contain will-change-transform"
        />
        <motion.img
          src="/assets/venue/banana-right.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { x: leafRightX, opacity: mandapamOpacity }}
          className="pointer-events-none select-none absolute right-0 -top-6 sm:-top-12 z-20 w-[20%] max-w-[152px] h-auto object-contain will-change-transform"
        />

        <motion.div
          style={prefersReduced ? {} : { y: mandapamY, opacity: mandapamOpacity }}
          className="w-full will-change-transform"
        >
          <img
            src="/assets/venue/kalyana-mandapam.png"
            alt="Kalyana Mandapam traditional wedding hall entrance"
            decoding="async"
            className="mandapam-img select-none pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Venue Details Block */}
      <motion.div
        ref={detailsRef}
        style={prefersReduced ? {} : { y: detailsY, opacity: detailsOpacity }}
        className="relative z-20 mt-4 sm:mt-6 px-4 text-center flex flex-col items-center will-change-transform"
      >
        <div className="flex items-center justify-center gap-3 w-full max-w-[340px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8962E]" />
          <span className="h-[1px] flex-1 bg-[#C8962E]" />
          <span className="font-serif-inv text-sm sm:text-base tracking-[0.16em] uppercase text-[#6B0F0D] font-medium px-1">
            VENUE
          </span>
          <span className="h-[1px] flex-1 bg-[#C8962E]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8962E]" />
        </div>

        <h3 className="font-serif-inv text-2xl sm:text-4xl font-bold text-[#6B0F0D] mt-2 tracking-wide">
          <ScrollLetters text="Shree Venkatesh Mahal" progress={detailsProgress} start={0.08} end={0.26} fromX={-10} />
        </h3>
        <p className="font-serif-inv text-xs sm:text-base text-[#5A1812] mt-1.5 leading-relaxed">
          200 Feet Radial Road, Pallava Garden, Zamin Pallavaram
          <br />
          Chennai, Tamil Nadu 600129
        </p>

        <JasmineDivider className="mt-4 sm:mt-5" />

        {/* Date & Time Split Block */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 items-center w-full max-w-[540px]">
          <div className="flex flex-col items-center pr-3 sm:pr-6 border-r border-[#C8962E]">
            <div className="flex items-center gap-1.5 text-[#6B0F0D]">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8962E]" strokeWidth={1.8} />
              <span className="font-serif-inv text-xs sm:text-sm tracking-[0.12em] uppercase font-medium">
                DATE
              </span>
            </div>
            <p className="font-serif-inv italic text-sm sm:text-lg text-[#6B0F0D] mt-1 font-semibold">
              29 November 2026
            </p>
          </div>

          <div className="flex flex-col items-center pl-3 sm:pl-6">
            <div className="flex items-center gap-1.5 text-[#6B0F0D]">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8962E]" strokeWidth={1.8} />
              <span className="font-serif-inv text-xs sm:text-sm tracking-[0.12em] uppercase font-medium">
                TIME
              </span>
            </div>
            <p className="font-serif-inv italic text-sm sm:text-lg text-[#6B0F0D] mt-1 font-semibold">
              7:30 AM onwards
            </p>
          </div>
        </div>

        {/* One-Tap Pre-filled Google Calendar Save-the-Date Action */}
        <div className="mt-3.5 sm:mt-4">
          <a
            href={GOOGLE_CALENDAR_SAVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm border border-[#C8962E] bg-[#FDF5E2] hover:bg-[#FAF0D4] active:scale-[0.98] text-[#6B0F0D] font-serif-inv text-[11px] sm:text-xs tracking-[0.08em] uppercase font-medium transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#7A1210]" strokeWidth={1.8} />
            <span>Save the Date in Google Calendar</span>
          </a>
        </div>

        <ScrollFlourishDivider className="mt-4 sm:mt-5 max-w-[300px] sm:max-w-[360px]" />

        {/* Get Directions CTA using location-ornament.png */}
        <div className="mt-5 sm:mt-6 relative z-20 flex justify-center w-full">
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Directions to Kalyana Mandapam in Google Maps"
            className="group relative inline-flex items-center justify-center w-[76%] max-w-[330px] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6B0F0D]"
          >
            <img
              src="/assets/venue/location-ornament.png"
              alt=""
              aria-hidden="true"
              decoding="async"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
            <span className="absolute inset-0 flex items-center justify-center pl-[17%] pr-[9%] text-white font-serif-inv text-[11px] min-[390px]:text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.14em] uppercase font-semibold whitespace-nowrap">
              GET DIRECTIONS
            </span>
          </a>
        </div>
      </motion.div>

      {/* Bottom Corner Floral Clusters (left from left, right from right) */}
      <div ref={bottomRef} className="pointer-events-none select-none">
        <motion.img
          src="/assets/venue/bottom-flower-left.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { x: flowerLeftX, opacity: flowerOpacity }}
          className="absolute left-0 bottom-0 z-10 w-[23%] max-w-[166px] h-auto object-contain will-change-transform"
        />
        <motion.img
          src="/assets/venue/bottom-flower-right.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          style={prefersReduced ? {} : { x: flowerRightX, opacity: flowerOpacity }}
          className="absolute right-0 bottom-0 z-10 w-[23%] max-w-[166px] h-auto object-contain will-change-transform"
        />
      </div>
    </section>
  );
}
