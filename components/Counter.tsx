"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  animateUntil?: number;
}

export default function Counter({ target, suffix = "", animateUntil = target }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / animateUntil));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= animateUntil) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, target, animateUntil]);

  return (
    <h2 ref={ref} className="text-6xl font-bold">
      {count}
      {suffix}
    </h2>
  );
}
