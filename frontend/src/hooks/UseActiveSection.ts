import { useState, useEffect } from "react";

// watches element instead of watching everything
export function useActiveSection(id: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.6,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return inView;
}