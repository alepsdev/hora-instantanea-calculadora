
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

interface LanguageSelectorProps {
  isCompact?: boolean;
}

export function LanguageSelector({ isCompact = true }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLocale();

  if (isCompact) {
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
                Português (BR)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("it-IT")}
                className={language === "it-IT" ? "bg-muted" : ""}
              >
                Italiano
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("de-DE")}
                className={language === "de-DE" ? "bg-muted" : ""}
              >
                Deutsch
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("ro-RO")}
                className={language === "ro-RO" ? "bg-muted" : ""}
              >
                Română
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("fr-FR")}
                className={language === "fr-FR" ? "bg-muted" : ""}
              >
                Français
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between items-center">
          <span>
            {language === "pt-BR" && "Português (BR)"}
            {language === "it-IT" && "Italiano"}
            {language === "de-DE" && "Deutsch"}
            {language === "ro-RO" && "Română"}
            {language === "fr-FR" && "Français"}
          </span>
          <Languages className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem 
          onClick={() => setLanguage("pt-BR")}
          className={language === "pt-BR" ? "bg-muted" : ""}
        >
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("it-IT")}
          className={language === "it-IT" ? "bg-muted" : ""}
        >
          Italiano
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("de-DE")}
          className={language === "de-DE" ? "bg-muted" : ""}
        >
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ro-RO")}
          className={language === "ro-RO" ? "bg-muted" : ""}
        >
          Română
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("fr-FR")}
          className={language === "fr-FR" ? "bg-muted" : ""}
        >
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
