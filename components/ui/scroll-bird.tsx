"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

/**
 * A bird that keeps pace with you down the page.
 *
 * Drawn in side profile, sitting in the left gutter with its beak turned inward
 * towards the text. Its height is bound to scroll progress, so it descends as
 * you read and rises if you scroll back up; a spring sits between the scroll
 * position and the transform so it glides rather than snapping to every wheel
 * event.
 *
 * The wing flap is driven by scroll *velocity*, not by a fixed timer: at rest
 * the bird glides with a slow breathing motion, and the harder you scroll the
 * faster and wider it beats. Stopping the scroll settles it back to a glide.
 *
 * Decorative only: hidden from assistive tech and it never intercepts a click.
 */
export default function ScrollBird() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollY);

  const glide = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.6,
    restDelta: 0.001,
  });

  const y = useTransform(glide, [0, 1], ["12vh", "82vh"]);
  const x = useTransform(glide, [0, 0.3, 0.65, 1], [0, 5, -2, 0]);
  const rotate = useTransform(glide, [0, 0.3, 0.65, 1], [0, 5, -4, 0]);

  /* Wing angle in degrees, advanced by hand so the beat can react to speed. */
  const wing = useMotionValue(0);
  const phase = useRef(0);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    /* 0 at rest, 1 when scrolling hard. */
    const speed = Math.min(Math.abs(velocity.get()) / 900, 1);

    phase.current += (delta / 1000) * (2.6 + speed * 24);
    const amplitude = 6 + speed * 26;

    wing.set(Math.sin(phase.current) * amplitude);
  });

  /* The far wing sits behind the body and trails the near one slightly. */
  const farWing = useTransform(wing, (value) => value * 0.78);

  const sharedStyle = {
    transformBox: "view-box" as const,
    transformOrigin: "18.2px 10.7px",
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 -z-10 w-full"
    >
      {/* Anchored to the same centred column as the page. On wide screens the
          wrapper is pushed one full bird-width to the left of the content edge,
          so the bird sits in the gutter immediately beside the sticky section
          titles instead of out at the edge of the screen. Where there is no
          gutter to sit in it tucks back against the page edge at a smaller
          size, so it never covers the headings. */}
      <div className="container-page relative h-full">
        <div className="bird-rail">
          <motion.div
            style={prefersReducedMotion ? { y: "48vh" } : { y, x, rotate }}
          >
            <div className="bird-bob">
              <svg
                viewBox="0 0 32 22"
                className="h-[0.875rem] w-auto text-accent sm:h-5 xl:h-9"
                fill="currentColor"
              >
                {/* Far wing: behind the body, lower opacity, slightly offset. */}
                <g transform="translate(1 1.4)" opacity={0.42}>
                  <motion.path
                    style={{ ...sharedStyle, rotate: farWing }}
                    d="M18.2 10.7 C16.2 6.6 12.2 4.5 8.2 4.7 C9.6 8 13.2 10.9 17.9 11.9 Z"
                  />
                </g>

                {/* Forked tail, then body so the body hides the tail's root. */}
                <path d="M10.2 12.2 L2.4 9.6 L6.6 12.6 L2.6 15.8 Z" />
                <path d="M9.6 12.9 C9.6 10.3 12.9 8.4 16.9 8.5 C20.3 8.6 22.7 9.8 23.5 11.7 C23.9 12.7 23.4 13.5 22.4 14.1 C20.6 15.2 17.3 15.7 14.5 15.3 C11.5 14.9 9.6 14.2 9.6 12.9 Z" />

                {/* Beak, pointing inward towards the content. */}
                <path d="M23.2 10.6 L28.4 11.1 L23.5 12.7 Z" />

                {/* Eye: punched out in the canvas colour so it reads as a hole. */}
                <circle cx="21.4" cy="10.9" r="0.8" fill="var(--canvas)" />

                {/* Near wing, drawn last so it sits over the body. */}
                <motion.path
                  style={{ ...sharedStyle, rotate: wing }}
                  d="M18.2 10.7 C16.2 6.6 12.2 4.5 8.2 4.7 C9.6 8 13.2 10.9 17.9 11.9 Z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
