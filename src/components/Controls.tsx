import { store } from "../store";
import { OPTIONS } from "../consts";

export default function Controls() {
  const { counterState, changeCounterState } = store();

  const handleClick = () => {
    if (counterState === OPTIONS.START) {
      changeCounterState(OPTIONS.STOP);
    } else {
      changeCounterState(OPTIONS.START);
    }
  };

  return (
    <section className="w-full h-full grid place-items-center pb-4">
      <button
        onClick={handleClick}
        className="capitalize p-5 rounded-full border dark:border-white border-[#484b6a] aspect-square text-xl font-bold"
      >
        {counterState}
      </button>
    </section>
  );
}
