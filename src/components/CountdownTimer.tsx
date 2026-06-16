import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string; // ISO date string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      setTimeLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="countdown-expired" style={{ textAlign: "center", color: "var(--red)", fontWeight: "bold" }}>
        EVENT UNDERWAY / CONCLUDED
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {units.map((unit, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(10, 10, 15, 0.6)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            minWidth: "70px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="gradient-text"
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              lineHeight: 1,
            }}
          >
            {formatNumber(unit.value)}
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "4px" }}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
