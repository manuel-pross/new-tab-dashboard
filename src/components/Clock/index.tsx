import { useEffect, useState } from "react";

function getPrefixedDate(time: number): string {
  if (!Number.isInteger) {
    return "";
  }

  return time > 9 ? `${time}` : `0${time}`;
}

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <time className="text-[128px] text-tokyo-white">{`${getPrefixedDate(time.getHours())}:${getPrefixedDate(time.getMinutes())}`}</time>
  );
}
