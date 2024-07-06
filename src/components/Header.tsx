import HeaderOptions from "./HeaderOptions";
import ThemeSelector from "./ThemeSelector";

import { COUNTERS } from "../consts";
import { store } from "../store";

export default function Header() {
  const { arrayState } = store();

  return (
    <header className="w-full py-5 flex justify-center items-center relative">
      <ul className="py-2 flex justify-center items-center gap-2">
        {Object.entries(COUNTERS).map((c) => (
          <HeaderOptions
            title={`${arrayState[c[0].toLowerCase()]} ${c[0]}`}
            type={c[0].toLowerCase()}
            count={c[1]}
            key={c[0]}
          />
        ))}
      </ul>
      <ThemeSelector />
    </header>
  );
}
