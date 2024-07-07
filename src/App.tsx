import "./App.css";

import Header from "./components/Header";
import Count from "./components/Count";
import Controls from "./components/Controls";

function App() {
  return (
    <div
      className="dark:bg-[#2f2f2f] dark:text-white bg-[#fafafa] text-black w-full min-h-dvh grid"
      style={{ gridTemplateRows: "96px 1fr 150px" }}
    >
      <Header />
      <Count />
      <Controls />
    </div>
  );
}

export default App;
