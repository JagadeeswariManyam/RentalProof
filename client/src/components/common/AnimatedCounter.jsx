import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ value = 0, duration = 1000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const target = typeof value === 'number' ? value : parseInt(value, 10) || 0;

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = (end - start) / totalSteps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
