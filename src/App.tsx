import { CustomFooter } from "./components/custom-footer";
import { CustomHeader } from "./components/custom-header";
import { FirstStep } from "./components/first-step";

function App() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-gray-950 px-8 py-4">
      <main className="grid size-full max-w-lg grid-rows-[auto_1fr_auto] gap-1 bg-slate-100 p-4">
        <CustomHeader />
        <FirstStep />
        <CustomFooter />
      </main>
    </div>
  );
}

export default App;
