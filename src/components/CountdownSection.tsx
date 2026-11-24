import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { ScrollLetters } from './ScrollLetters';

const WEDDING_TARGET_MS = new Date('2026-11-29T07:30:00+05:30').getTime();

const COUNTDOWN_PETALS = [
  { id: 1, left: '27%', top: '14%', w: 12, rot: -18, delay: '0.2s' },
  { id: 2, left: '68%', top: '16%', w: 13, rot: 26, delay: '1.3s' },
  { id: 3, left: '84%', top: '18%', w: 11, rot: -32, delay: '0.8s' },
  { id: 4, left: '87%', top: '28%', w: 12, rot: 22, delay: '2.1s' },
  { id: 5, left: '10%', top: '70%', w: 13, rot: -15, delay: '1.5s' },
  { id: 6, left: '82%', top: '65%', w: 12, rot: 35, delay: '0.5s' },
  { id: 7, left: '6%', top: '57%', w: 11, rot: 14, delay: '2.6s' },
];

function computeTimeLeft() {
  const diff = Math.max(0, WEDDING_TARGET_MS - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    days: pad(days),
    hours: pad(hours),
    mins: pad(mins),
    secs: pad(secs),
  };
}

function TimerCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full aspect-[156/222]">
      <img
        src="/assets/countdown/countdown-frame.png"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center pb-[23%]">
        <span className="font-serif-inv text-[26px] min-[390px]:text-[32px] sm:text-[46px] font-semibold leading-none tracking-tight text-[#6B0F0D] tabular-nums">
          {value}
        </span>
        <span className="font-serif-inv text-[8.5px] min-[390px]:text-[10px] sm:text-xs tracking-[0.16em] text-[#7D1B17] mt-1 font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}

export function CountdownSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end 0%'],
  });

  // Top Garland opens from top on scroll and stays settled
  const topGarlandY = useTransform(scrollYProgress, [0, 0.05, 0.42, 1], ['-42%', '-42%', '0%', '0%']);
  const topGarlandOpacity = useTransform(scrollYProgress, [0, 0.04, 0.28, 1], [0, 0, 1, 1]);

  // Title text settles gently from top
  const headerY = useTransform(scrollYProgress, [0, 0.06, 0.42, 1], ['-20px', '-20px', '0px', '0px']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06, 0.34, 1], [0, 0, 1, 1]);

  // Title divider reveals from top
  const titleDividerY = useTransform(scrollYProgress, [0, 0.08, 0.44, 1], ['-22px', '-22px', '0px', '0px']);
  const titleDividerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.38, 1], [0, 0, 1, 1]);

  // Center timer: reveals from little bottom -> center, settles cleanly, then drifts very slowly center -> little top moving to next section
  const timerY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.45, 0.64, 1],
    ['44px', '44px', '0px', '-4px', '-26px']
  );
  const timerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.4, 1], [0, 0, 1, 1]);

  // Date highlight & message settle calmly with center flow
  const detailsY = useTransform(scrollYProgress, [0, 0.12, 0.48, 1], ['28px', '28px', '0px', '0px']);
  const detailsOpacity = useTransform(scrollYProgress, [0, 0.12, 0.44, 1], [0, 0, 1, 1]);

  // Bottom divider reveals from bottom
  const bottomDividerY = useTransform(scrollYProgress, [0, 0.14, 0.48, 1], ['26px', '26px', '0px', '0px']);
  const bottomDividerOpacity = useTransform(scrollYProgress, [0, 0.14, 0.44, 1], [0, 0, 1, 1]);

  // Banana leaves & Kalash corners slide from left and right respectively
  const leftSlideX = useTransform(scrollYProgress, [0, 0.1, 0.46, 1], ['-74px', '-74px', '0px', '0px']);
  const rightSlideX = useTransform(scrollYProgress, [0, 0.1, 0.46, 1], ['74px', '74px', '0px', '0px']);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.09, 0.4, 1], [0, 0, 1, 1]);

  // Central brass lamp rises smoothly from bottom
  const centralLampY = useTransform(scrollYProgress, [0, 0.14, 0.5, 1], ['76px', '76px', '0px', '0px']);
  const centralLampOpacity = useTransform(scrollYProgress, [0, 0.14, 0.45, 1], [0, 0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Wedding Countdown"
      className="relative w-full h-[185vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden parchment-glow">
        {/* Lightweight GPU-composited floating rose petals matching invitation_slide_3 */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
          {COUNTDOWN_PETALS.map((p) => (
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

        {/* Top Marigold & Mango Leaf Garlands */}
        <motion.div
          style={prefersReduced ? {} : { y: topGarlandY, opacity: topGarlandOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 top-0 z-20 w-full will-change-transform"
        >
          <img
            src="/assets/countdown/top-garland.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain object-top"
          />
        </motion.div>

        {/* Left & Right Banana Leaves */}
        <motion.img
          src="/assets/countdown/banana-left.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: leftSlideX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute left-0 top-[23%] z-10 w-[15%] max-w-[114px] h-auto object-contain will-change-transform"
        />
        <motion.img
          src="/assets/countdown/banana-right.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: rightSlideX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute right-0 top-[23%] z-10 w-[13.5%] max-w-[100px] h-auto object-contain will-change-transform"
        />

        {/* Centered Vertical Stack (Title + Timer in Center + Date + Bottom Divider) */}
        <div className="relative z-20 h-full w-full flex flex-col items-center justify-center pt-[12dvh] pb-[20dvh] px-3 sm:px-8 text-center">
          {/* Header (from top + letter-by-letter side reveal) */}
          <motion.div
            style={prefersReduced ? {} : { y: headerY, opacity: headerOpacity }}
            className="flex flex-col items-center will-change-transform"
          >
            <p className="font-serif-inv text-xs sm:text-base tracking-[0.14em] uppercase text-[#6B0F0D] font-medium">
              <ScrollLetters
                text="THE COUNTDOWN TO"
                progress={scrollYProgress}
                start={0.06}
                end={0.22}
                fromX={-10}
              />
            </p>
            <h2 className="font-script text-[48px] sm:text-7xl text-[#7A1210] mt-1 leading-none">
              <ScrollLetters
                text="Forever Begins"
                progress={scrollYProgress}
                start={0.14}
                end={0.34}
                fromX={-12}
              />
            </h2>
          </motion.div>

          {/* Title Divider (from top) */}
          <motion.div
            style={prefersReduced ? {} : { y: titleDividerY, opacity: titleDividerOpacity }}
            className="mt-2 sm:mt-3 w-[56%] max-w-[398px] will-change-transform"
          >
            <img
              src="/assets/countdown/title-divider.png"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </motion.div>

          {/* 4-Box Countdown Timer: Centered, little bottom -> center on reveal, very slow center -> little top exiting */}
          <motion.div
            style={prefersReduced ? {} : { y: timerY, opacity: timerOpacity }}
            className="mt-4 sm:mt-6 grid grid-cols-4 gap-1.5 min-[390px]:gap-2 sm:gap-4 w-[94%] max-w-[660px] will-change-transform"
          >
            <TimerCard value={timeLeft.days} label="DAYS" />
            <TimerCard value={timeLeft.hours} label="HOURS" />
            <TimerCard value={timeLeft.mins} label="MINS" />
            <TimerCard value={timeLeft.secs} label="SECS" />
          </motion.div>

          {/* Date Highlight & Message */}
          <motion.div
            style={prefersReduced ? {} : { y: detailsY, opacity: detailsOpacity }}
            className="mt-5 sm:mt-7 w-full flex flex-col items-center will-change-transform"
          >
            <div className="flex items-center justify-center gap-2.5 sm:gap-5 w-[84%] max-w-[520px]">
              <div className="flex items-center flex-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8962E]" />
                <span className="h-[1px] flex-1 bg-[#C8962E]" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#6B0F0D] whitespace-nowrap shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1210]" strokeWidth={1.75} />
                <span className="font-serif-inv text-sm sm:text-2xl font-semibold tracking-wide">
                  29 &nbsp;November 2026
                </span>
              </div>
              <div className="flex items-center flex-1">
                <span className="h-[1px] flex-1 bg-[#C8962E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8962E]" />
              </div>
            </div>

            <p className="font-serif-inv italic text-sm sm:text-xl text-[#6B0F0D] mt-2 sm:mt-3">
              <ScrollLetters
                text="We can't wait to celebrate with you!"
                progress={scrollYProgress}
                start={0.2}
                end={0.42}
                fromX={-8}
              />
            </p>
          </motion.div>

          {/* Bottom Divider (from bottom) */}
          <motion.div
            style={prefersReduced ? {} : { y: bottomDividerY, opacity: bottomDividerOpacity }}
            className="mt-2.5 sm:mt-3.5 w-[54%] max-w-[368px] will-change-transform"
          >
            <img
              src="/assets/countdown/bottom-divider.png"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Bottom Flanking Kalash Pots & Central Sacred Brass Lamp */}
        <motion.img
          src="/assets/countdown/kalash-left.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: leftSlideX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute left-0 bottom-0 z-10 w-[24%] max-w-[184px] max-h-[23dvh] h-auto object-contain object-left-bottom will-change-transform"
        />

        <motion.div
          style={prefersReduced ? {} : { y: centralLampY, opacity: centralLampOpacity }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-10 flex justify-center will-change-transform"
        >
          <img
            src="/assets/countdown/central-lamp.png"
            alt="Traditional brass Kuthuvilakku oil lamp"
            loading="eager"
            decoding="async"
            className="w-[46%] max-w-[370px] max-h-[22dvh] h-auto object-contain object-bottom"
          />
        </motion.div>

        <motion.img
          src="/assets/countdown/kalash-right.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={prefersReduced ? {} : { x: rightSlideX, opacity: sideOpacity }}
          className="pointer-events-none select-none absolute right-0 bottom-0 z-10 w-[28%] max-w-[228px] max-h-[23dvh] h-auto object-contain object-right-bottom will-change-transform"
        />
      </div>
    </section>
  );
}
