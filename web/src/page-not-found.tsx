import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="grid min-h-screen w-full place-content-center place-items-center">
      <div className="flex flex-col items-center gap-4 pb-32">
        <p className="text-xl font-bold sm:text-2xl">
          Página não encontrada (︶︹︶)
        </p>
        <Link to="/" className="underline">
          Ir para pagamento
        </Link>
      </div>
    </div>
  );
}
