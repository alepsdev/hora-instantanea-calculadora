
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppConfig } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, LogOut } from "lucide-react";

interface SettingsMenuProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ config, setConfig }) => {
  const { logout, user } = useAuth();
  const { currencySymbol, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setConfig((prev) => ({ ...prev, hourlyRate: value }));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">{t("settings.title")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>{t("settings.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="font-medium mr-2">{t("settings.loggedInAs")}:</span>
              <span>{user}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("settings.logout")}
            </Button>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="general" className="flex-1">{t("settings.general")}</TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">{t("settings.appearance")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>{t("config.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="hourlyRate">{t("config.hourlyRate")} ({currencySymbol})</label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={config.hourlyRate}
                      onChange={handleRateChange}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.appearance")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{t("theme.toggle")}</span>
                    <ThemeToggle />
                  </div>
                  
                  <div className="space-y-2">
                    <label>{t("language")}</label>
                    <LanguageSelector isCompact={false} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsMenu;
