import { useEffect, useState } from "react";

const Timer = ({ start }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (start) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [start]);

  return (
    <div className="timer">
      Time: {seconds}s
    </div>
  );
};

export default Timer;
