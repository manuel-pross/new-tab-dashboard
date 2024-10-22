import useDate from '../../hooks/useDate';

function getPrefixedTime(time: number): string {
  if (!Number.isInteger) {
    return '';
  }

  return time > 9 ? `${time}` : `0${time}`;
}

export default function Clock() {
  const date = useDate();

  return (
    <time className="justify-self-center mt-6 text-[128px] leading-[6rem] text-tokyo-white">{`${getPrefixedTime(date.getHours())}:${getPrefixedTime(date.getMinutes())}`}</time>
  );
}
