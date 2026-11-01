import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  target: number;
  label: string;
  suffix: string;
  decimals?: number;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats: StatItem[] = [
    { target: 15, label: "Active Members", suffix: "k+", decimals: 0 },
    { target: 120, label: "Events & Hackathons", suffix: "+", decimals: 0 },
    { target: 45, label: "Projects Shipped", suffix: "+", decimals: 0 },
    { target: 2.4, label: "Lines of Code Written", suffix: "M+", decimals: 1 },
  ];

  return (
    <section ref={ref} className="main-container" style={{ padding: "4rem 2rem" }}>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} isInView={isInView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, isInView, delay }: { stat: StatItem; isInView: boolean; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);

      // Ease out quad
      const easedPercentage = percentage * (2 - percentage);
      const currentValue = easedPercentage * stat.target;

      setDisplayValue(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(stat.target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stat.target]);

  const formattedValue = stat.decimals
    ? displayValue.toFixed(stat.decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="stats-card"
    >
      <h2
        style={{
          fontSize: "3rem",
          color: "var(--red)",
          marginBottom: "0.5rem",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          background: "var(--accent-gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {formattedValue}
        <span style={{ fontSize: "2rem", fontWeight: 700 }}>{stat.suffix}</span>
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: 500 }}>{stat.label}</p>
    </motion.div>
  );
}


