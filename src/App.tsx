import { CustomFooter } from "./components/custom-footer";
import { CustomHeader } from "./components/custom-header";
import { FirstStep } from "./components/first-step";

function App() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-gray-950 p-8">
      <main className="relative size-full max-w-lg bg-slate-100">
        <CustomHeader />
        <FirstStep />
        <CustomFooter />
      </main>
    </div>
  );
}

export default App;
