import { useEffect, useState } from "react";

export default function useDate(interval = 1000) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDate(new Date());
    }, interval);

    return () => clearInterval(timeInterval);
  }, []);

  return date;
}
