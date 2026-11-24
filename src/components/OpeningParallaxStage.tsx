import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const HERO_PETALS = [
  { id: 1, left: '32%', top: '23%', w: 14, rot: -20, delay: '0s' },
  { id: 2, left: '24%', top: '28%', w: 12, rot: 28, delay: '1.1s' },
  { id: 3, left: '70%', top: '25%', w: 15, rot: 38, delay: '0.6s' },
  { id: 4, left: '71%', top: '33%', w: 11, rot: -32, delay: '1.8s' },
  { id: 5, left: '21%', top: '35%', w: 13, rot: 15, delay: '2.3s' },
];

export function OpeningParallaxStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 0%', 'end 100%'],
  });

  // Section 1: Left door glides left, Right door glides right on scroll
  const leftDoorX = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '-104%', '-104%']);
  const rightDoorX = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '104%', '104%']);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [1, 0, 0]);

  // Marigold top reveals from top when scrolling and stays settled
  const marigoldY = useTransform(scrollYProgress, [0, 0.1, 0.55, 1], ['-65%', '-65%', '0%', '0%']);
  const marigoldOpacity = useTransform(scrollYProgress, [0, 0.08, 0.35, 1], [0, 0, 1, 1]);

  // Ganesha gentle reveal and stays settled
  const ganeshaY = useTransform(scrollYProgress, [0, 0.16, 0.55, 1], ['-18px', '-18px', '0px', '0px']);
  const ganeshaOpacity = useTransform(scrollYProgress, [0, 0.16, 0.48, 1], [0, 0, 1, 1]);

  // Temple Gopuram comes from bottom on scroll and stays settled
  const templeY = useTransform(scrollYProgress, [0, 0.14, 0.72, 1], ['26%', '26%', '0%', '0%']);
  const templeOpacity = useTransform(scrollYProgress, [0, 0.12, 0.42, 1], [0, 0, 1, 1]);

  // Left-side elements (bride, banana-left, brass-lamp-left) come from left and stay settled
  const leftSlideX = useTransform(scrollYProgress, [0, 0.22, 0.75, 1], ['-90px', '-90px', '0px', '0px']);
  const brideX = useTransform(scrollYProgress, [0, 0.28, 0.78, 1], ['-110px', '-110px', '0px', '0px']);
  const leftRevealOpacity = useTransform(scrollYProgress, [0, 0.22, 0.55, 1], [0, 0, 1, 1]);

  // Right-side elements (groom, banana-right, brass-lamp-right) come from right and stay settled
  const rightSlideX = useTransform(scrollYProgress, [0, 0.22, 0.75, 1], ['90px', '90px', '0px', '0px']);
  const groomX = useTransform(scrollYProgress, [0, 0.28, 0.78, 1], ['110px', '110px', '0px', '0px']);
  const rightRevealOpacity = useTransform(scrollYProgress, [0, 0.22, 0.55, 1], [0, 0, 1, 1]);

  return (
    <section
      ref={stageRef}
      aria-label="Sacred Temple Entrance and Welcome"
      className="relative w-full h-[215vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#F4F3EB]">
        {/* === LAYER 1: WEDDING INVITATION 1ST PAGE HERO === */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Exact bottom layered sage/taupe ground from wedding_invitation_1st_page */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] z-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#E4D9CE]" />
            <svg
              viewBox="0 0 720 320"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path d="M0 40 L720 110 L720 320 L0 320 Z" fill="#DDE3CB" fillOpacity="0.6" />
              <path d="M0 245 L720 190 L720 320 L0 320 Z" fill="#E1E6CE" fillOpacity="0.85" />
            </svg>
          </div>

          {/* Floating Rose Petals (lightweight GPU CSS flower effect) */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
            {HERO_PETALS.map((p) => (
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

          {/* Top Garlands + Ganesha Stack */}
          <div className="relative z-20 w-full flex flex-col items-center pointer-events-none select-none">
            {/* Marigold Top: reveals from top on scroll */}
            <motion.div
              style={prefersReduced ? {} : { y: marigoldY, opacity: marigoldOpacity }}
              className="w-full will-change-transform"
            >
              <img
                src="/assets/hero/marigold-top.png"
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain object-top"
              />
            </motion.div>

            {/* Ganesha (artwork already includes flanking diamond gold lines) */}
            <motion.div
              style={prefersReduced ? {} : { y: ganeshaY, opacity: ganeshaOpacity }}
              className="ganesha-row flex items-center justify-center w-full px-4 will-change-transform"
            >
              <img
                src="/assets/hero/ganesha.png"
                alt="Lord Ganesha"
                loading="eager"
                decoding="async"
                className="w-[44%] max-w-[300px] h-auto object-contain"
              />
            </motion.div>

                        {/* Thirumana Azhaipithal PNG below Vinayaga (same reveal-on-scroll as Ganesha) */}
            <motion.div
              style={prefersReduced ? {} : { y: ganeshaY, opacity: ganeshaOpacity }}
              className="mt-1 sm:mt-1.5 flex items-center justify-center w-full px-4 will-change-transform"
            >
              <img
                src="/assets/wedding/thirumana-azhaipithal.png"
                alt="திருமண அழைப்பிதழ்"
                loading="eager"
                decoding="async"
                className="w-[62%] max-w-[360px] h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Banana Left (from left) & Banana Right (from right) */}
          <motion.img
            src="/assets/hero/banana-left.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            style={prefersReduced ? {} : { x: leftSlideX, opacity: leftRevealOpacity }}
            className="pointer-events-none select-none absolute left-0 top-[21.5%] z-10 edge-leaf object-contain will-change-transform"
          />
          <motion.img
            src="/assets/hero/banana-right.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            style={prefersReduced ? {} : { x: rightSlideX, opacity: rightRevealOpacity }}
            className="pointer-events-none select-none absolute right-0 top-[21.5%] z-10 edge-leaf object-contain will-change-transform"
          />

          {/* Temple Gopuram comes from bottom on scroll */}
          <motion.div
            style={prefersReduced ? {} : { y: templeY, opacity: templeOpacity }}
            className="pointer-events-none select-none absolute inset-x-0 bottom-[21.5%] z-10 flex items-end justify-center will-change-transform"
          >
            <img
              src="/assets/hero/temple-gopuram.png"
              alt="Dravidian Temple Gopuram"
              loading="eager"
              decoding="async"
              className="w-[108%] sm:w-[92%] max-w-[660px] max-h-[58dvh] sm:max-h-[54dvh] h-auto object-contain object-bottom"
            />
          </motion.div>

          {/* Bride (from left) & Groom (from right) converging at center */}
          <div className="pointer-events-none select-none absolute bottom-[9%] inset-x-0 z-20 flex items-end justify-center">
            <motion.div
              style={prefersReduced ? {} : { x: brideX, opacity: leftRevealOpacity }}
              className="flex justify-end -mr-[3px] will-change-transform"
            >
              <img
                src="/assets/hero/bride.png"
                alt="Shruthi, the Bride"
                loading="eager"
                decoding="async"
                className="h-[min(28.5dvh,56vw)] max-h-[290px] w-auto object-contain object-bottom"
              />
            </motion.div>
            <motion.div
              style={prefersReduced ? {} : { x: groomX, opacity: rightRevealOpacity }}
              className="flex justify-start -ml-[3px] will-change-transform"
            >
              <img
                src="/assets/hero/groom.png"
                alt="Jagadeesh, the Groom"
                loading="eager"
                decoding="async"
                className="h-[min(31.9dvh,62.7vw)] max-h-[325px] w-auto object-contain object-bottom"
              />
            </motion.div>
          </div>

          {/* Brass Lamp Left (from left) & Brass Lamp Right (from right) */}
          <motion.img
            src="/assets/hero/brass-lamp-left.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            style={prefersReduced ? {} : { x: leftSlideX, opacity: leftRevealOpacity }}
            className="pointer-events-none select-none absolute left-0 bottom-[2%] z-20 edge-lamp max-w-[152px] object-contain will-change-transform"
          />
          <motion.img
            src="/assets/hero/brass-lamp-right.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            style={prefersReduced ? {} : { x: rightSlideX, opacity: rightRevealOpacity }}
            className="pointer-events-none select-none absolute right-0 bottom-[2%] z-20 edge-lamp max-w-[152px] object-contain will-change-transform"
          />
        </div>

        {/* === LAYER 2: CARVED WOODEN TEMPLE DOORS === */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-stretch">
          <motion.div
            initial={prefersReduced ? false : { x: '-45%', opacity: 0.75 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={prefersReduced ? {} : { x: leftDoorX }}
            className="w-1/2 shrink-0 h-full overflow-hidden border-r border-[#2D0A03]/70 will-change-transform"
          >
            <img
              src="/assets/wedding/door-left.png"
              alt="Left carved teakwood temple door"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-right select-none"
            />
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { x: '45%', opacity: 0.75 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={prefersReduced ? {} : { x: rightDoorX }}
            className="w-1/2 shrink-0 h-full overflow-hidden border-l border-[#2D0A03]/70 will-change-transform"
          >
            <img
              src="/assets/wedding/door-right.png"
              alt="Right carved teakwood temple door"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-left select-none"
            />
          </motion.div>

          <motion.div
            style={prefersReduced ? { opacity: 0 } : { opacity: scrollHintOpacity }}
            className="absolute bottom-7 inset-x-0 flex justify-center will-change-opacity"
          >
            <div className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-md bg-[#3A0A02]/90 border border-[#D4A13B]/75 text-[#FDF4DE]">
              <span className="text-[11px] tracking-[0.2em] uppercase font-medium">
                Scroll to Open
              </span>
              <ChevronDown className="w-4 h-4 text-[#E3BA58]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
