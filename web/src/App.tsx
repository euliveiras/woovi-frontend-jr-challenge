import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { CustomFooter } from "./components/custom-footer";
import { CustomHeader } from "./components/custom-header";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!window.location.pathname.includes("mock-payment")) {
      navigate(`/payment?${searchParams}`, { replace: true });
    } else {
      navigate(`/mock-payment?${searchParams}`);
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-gray-950 px-8 py-4">
      <main className="grid size-full max-w-sm grid-rows-[auto_1fr_auto] gap-1 bg-slate-100 p-4">
        <CustomHeader />
        <section className="flex size-full flex-col items-center overflow-hidden p-4 pb-8">
          <Outlet />
        </section>
        <CustomFooter />
      </main>
    </div>
  );
}

export default App;
