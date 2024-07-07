import { store } from "../store";
import { OPTIONS } from "../consts";

export default function HeaderOptions({
  title,
  type,
  count,
}: {
  type: string;
  title: string;
  count: number;
}) {
  const {
    setCounterType,
    changeActualType,
    actualCounterType,
    counterState,
    changeCounterState,
  } = store();

  const active = type === actualCounterType;

  const handleClick = () => {
    setCounterType(count);
    changeActualType(type);

    if (counterState === OPTIONS.STOP) changeCounterState(OPTIONS.START);
  };

  return (
    <li
      className={`${active && "dark:bg-zinc-500 bg-[#d2d3db]"} dark:hover:bg-zinc-500 hover:bg-[#d2d3db] p-2 rounded-xl`}
    >
      <button className="capitalize" onClick={handleClick}>
        {title.toLowerCase()}
      </button>
    </li>
  );
}
