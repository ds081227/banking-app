"use client";
import CountUp from "react-countup";

export default function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <p className="w-full">
      <CountUp duration={1} decimals={2} prefix="$" end={amount} />
    </p>
  );
}
