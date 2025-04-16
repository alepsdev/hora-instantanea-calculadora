
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLocale();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Languages className="h-5 w-5" />
              <span className="sr-only">{t("language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => setLanguage("pt-BR")}
              className={language === "pt-BR" ? "bg-muted" : ""}
            >
              Português
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setLanguage("it-IT")}
              className={language === "it-IT" ? "bg-muted" : ""}
            >
              Italiano
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("language")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
