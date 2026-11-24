
import React from 'react';
import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';

function ScrollChar({
  char,
  index,
  total,
  progress,
  start,
  end,
  fromX,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  fromX: number;
}) {
  const safeTotal = Math.max(1, total);
  const step = (end - start) / safeTotal;
  const cStart = Math.max(0.001, start + index * step * 0.72);
  const cEnd = Math.min(0.99, cStart + Math.max(0.045, step * 1.8));

  const opacity = useTransform(
    progress,
    [0, cStart, cEnd, 1],
    [0, 0, 1, 1]
  );

  const x = useTransform(
    progress,
    [0, cStart, cEnd, 1],
    [fromX, fromX, 0, 0]
  );

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export function ScrollLetters({
  text,
  progress,
  start,
  end,
  fromX = -10,
  className = '',
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  fromX?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <span className={`${className} whitespace-pre-line`}>
        {text}
      </span>
    );
  }

  // Preserve line breaks while splitting the text.
  const lines = text.split('\n');

  const totalNonSpace = text.replace(/\s/g, '').length;
  let runningIndex = 0;

  return (
    <span
      className={`${className} whitespace-pre-line`}
      aria-label={text}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');

        return (
          <React.Fragment key={lineIdx}>
            {words.map((word, wIdx) => {
              const chars = Array.from(word);

              return (
                <React.Fragment key={`${lineIdx}-${wIdx}`}>
                  <span className="inline-block whitespace-nowrap">
                    {chars.map((ch, cIdx) => {
                      const idx = runningIndex++;

                      return (
                        <ScrollChar
                          key={`${lineIdx}-${wIdx}-${cIdx}`}
                          char={ch}
                          index={idx}
                          total={totalNonSpace}
                          progress={progress}
                          start={start}
                          end={end}
                          fromX={fromX}
                        />
                      );
                    })}
                  </span>

                  {wIdx < words.length - 1 ? ' ' : null}
                </React.Fragment>
              );
            })}

            {lineIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </span>
  );
}
