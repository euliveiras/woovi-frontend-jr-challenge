import { WooviGrayLogo } from "./woovi-gray-logo";
import GppGoodIcon from "@mui/icons-material/GppGood";

export function CustomFooter() {
  return (
    <footer>
      <span className="flex items-center justify-center gap-1 text-gray-400">
        <GppGoodIcon />
        <p className="text-xs font-semibold">Pagamento 100% seguro via: </p>
        <WooviGrayLogo />
      </span>
    </footer>
  );
}
