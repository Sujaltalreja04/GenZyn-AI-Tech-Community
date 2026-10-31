import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const expiredState: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: true,
};

function calculateCountdown(targetDate: string): CountdownState {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return expiredState;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => calculateCountdown(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <div className="countdown-expired" style={{ textAlign: "center", color: "var(--red)", fontWeight: "bold" }}>
        EVENT UNDERWAY / CONCLUDED
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");
  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Mins", value: countdown.minutes },
    { label: "Secs", value: countdown.seconds },
  ];

  return (
    <div className="countdown" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {units.map((unit) => (
        <div
          key={unit.label}
          className="countdown-item"
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
