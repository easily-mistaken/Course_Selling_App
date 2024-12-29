import { useState, useEffect } from "react";
import { BLOCKCHAIN_COHORT_URL, COHORT2_URL, COHORT3_URL } from "../utils/lib";

export default function HeaderSlider() {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => (prev === 200 ? 0 : prev + 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex transition-transform duration-500"
      style={{ transform: `translateX(-${translateX}%)` }}
    >
      <img src={COHORT2_URL} />
      <img src={COHORT3_URL} />
      <img src={BLOCKCHAIN_COHORT_URL} />
    </div>
  );
}
