import useDate from '../../hooks/useDate';

function getFormattedDate(date: Date) {
  return date.toLocaleDateString('de-De', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
}

function getIsoDate(date: Date) {
  return date.toISOString().slice(0, 16); //YYYY-MM-DDTHH:MM
}

export default function CustomDate() {
  const date = useDate(10000);

  return (
    <time
      className="justify-self-center mt-6 text-[64px] leading-[3rem] text-tokyo-white"
      dateTime={getIsoDate(date)}
    >
      {getFormattedDate(date)}
    </time>
  );
}
