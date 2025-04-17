"use client";

import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      void controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id ?? generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background ?? "#0d47a1",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true as any,
              },
              modes: {
                push: { quantity: 4 },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              bounce: {
                horizontal: { value: 1 },
                vertical: { value: 1 },
              },
              collisions: {
                enable: false,
                mode: "bounce",
                maxSpeed: 50,
                overlap: {
                  enable: true,
                  retries: 0,
                },
                absorb: { speed: 2 },
                bounce: {
                  horizontal: { value: 1 },
                  vertical: { value: 1 },
                },
              },
              color: {
                value: particleColor ?? "#ffffff",
                animation: {
                  h: { enable: false, speed: 1, sync: true, count: 0, decay: 0, delay: 0, offset: 0 },
                  s: { enable: false, speed: 1, sync: true, count: 0, decay: 0, delay: 0, offset: 0 },
                  l: { enable: false, speed: 1, sync: true, count: 0, decay: 0, delay: 0, offset: 0 },
                },
              },
              move: {
                enable: true,
                speed: { min: 0.1, max: 1 },
                direction: "none",
                straight: false,
                outModes: { default: "out" },
                angle: { value: 90, offset: 0 },
                center: { x: 50, y: 50, mode: "percent", radius: 0 },
                gravity: { enable: false, acceleration: 9.81, inverse: false, maxSpeed: 50 },
                decay: 0,
                drift: 0,
                path: { enable: false, clamp: true, delay: { value: 0 }, options: {} },
                random: false,
                size: false,
                spin: { enable: false, acceleration: 0 },
                trail: { enable: false, fill: {}, length: 10 },
                vibrate: false,
                warp: false,
                attract: {
                  enable: false,
                  distance: 200,
                  rotate: { x: 3000, y: 3000 },
                },
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                limit: { mode: "delete", value: 0 },
                value: particleDensity ?? 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed ?? 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                  count: 0,
                },
              },
              shape: {
                type: "circle",
                options: {},
                close: true,
                fill: true,
              },
              size: {
                value: { min: minSize ?? 1, max: maxSize ?? 3 },
                animation: {
                  enable: false,
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                  count: 0,
                },
              },
              stroke: { width: 0 },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              links: {
                enable: false,
                distance: 100,
                opacity: 1,
                width: 1,
                color: { value: "#fff" },
                blink: false,
                consent: false,
                frequency: 1,
                shadow: {
                  enable: false,
                  blur: 5,
                  color: { value: "#000" },
                },
                triangles: { enable: false, frequency: 1 },
                warp: false,
              },
              reduceDuplicates: false,
              shadow: {
                enable: false,
                blur: 0,
                color: { value: "#000" },
                offset: { x: 0, y: 0 },
              },
              destroy: {
                mode: "none",
                bounds: {},
                split: {
                  count: 1,
                  factor: { value: 3 },
                  rate: { value: { min: 4, max: 9 } },
                  sizeOffset: true,
                },
              },
              twinkle: {
                lines: { enable: false, frequency: 0.05, opacity: 1 },
                particles: { enable: false, frequency: 0.05, opacity: 1 },
              },
              life: {
                count: 0,
                delay: { value: 0, sync: false },
                duration: { value: 0, sync: false },
              },
              orbit: {
                enable: false,
                rotation: { value: 45 },
                width: 1,
                opacity: 1,
                animation: {
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  count: 0,
                },
              },
              roll: {
                enable: false,
                speed: 25,
                mode: "vertical",
                darken: { enable: false, value: 0 },
                enlighten: { enable: false, value: 0 },
              },
              tilt: {
                enable: false,
                direction: "clockwise",
                value: 0,
                animation: { enable: false, speed: 0, decay: 0, sync: false },
              },
              wobble: {
                enable: false,
                distance: 5,
                speed: { angle: 50, move: 10 },
              },
              rotate: {
                path: false,
                direction: "clockwise",
                value: 0,
                animation: { enable: false, speed: 0, decay: 0, sync: false },
              },
              effect: {
                close: true,
                fill: true,
                type: undefined,
                options: {},
              },
              groups: {},
              repulse: {
                enabled: false,
                value: 0,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
