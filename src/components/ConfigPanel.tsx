
import React from "react";
import { AppConfig } from "@/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";

interface ConfigPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig }) => {
  const { currencySymbol, t } = useLocale();
  
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setConfig((prev) => ({ ...prev, hourlyRate: value }));
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>{t("config.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">{t("config.hourlyRate")} ({currencySymbol})</Label>
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
  );
};

export default ConfigPanel;
