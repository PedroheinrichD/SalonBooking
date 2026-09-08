"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Drives a <video>'s currentTime from scroll progress through a tall
 * "stage" section (CSS position: sticky handles the pin; ScrollTrigger
 * just measures progress and stays in sync with Lenis's smooth scroll).
 *
 * progress 0 -> first frame, progress 1 -> last frame.
 *
 * The source video is re-encoded with a short GOP (keyframe every ~4
 * frames) so seeking lands on the exact frame instead of snapping to
 * the nearest keyframe — without that, scrubbing looks frozen/broken.
 */
export function useScrollVideo(
  stageRef: React.RefObject<HTMLElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let trigger: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      const setup = () => {
        // Prime the decoder so seeking paints on mobile Safari, which
        // won't render a seeked frame on a video that was never played.
        const primePromise = video.play();
        if (primePromise !== undefined) {
          primePromise.then(() => video.pause()).catch(() => {});
        }

        trigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: reduceMotion ? false : 0.35,
          onUpdate: (self) => {
            setProgress(self.progress);
            const duration = video.duration;
            if (!duration || Number.isNaN(duration)) return;
            const time = self.progress * duration;
            if (Math.abs(video.currentTime - time) > 0.01) {
              video.currentTime = time;
            }
          },
        });
      };

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }
    }, stage);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      trigger?.kill();
      ctx.revert();
    };
  }, [stageRef, videoRef]);

  return { progress };
}
