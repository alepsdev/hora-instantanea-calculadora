
import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR, it } from "date-fns/locale";
import { TimeEntry, AppConfig } from "@/types";
import { calculateWorkTime, calculateValue, minutesToTime } from "@/utils/timeCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface TimeEntryListProps {
  entries: TimeEntry[];
  config: AppConfig;
  removeEntry: (id: string) => void;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ entries, config, removeEntry }) => {
  // Obter o contexto de idioma e moeda
  const { language, currencySymbol, t } = useLocale();
  
  // Definir o locale para date-fns baseado no idioma selecionado
  const dateLocale = language === "it-IT" ? it : ptBR;
  
  // Ordenação por data (mais recente primeiro)
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("entries.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEntries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("entries.date")}</TableHead>
                <TableHead>{t("entries.period")}</TableHead>
                <TableHead>{t("entries.break")}</TableHead>
                <TableHead>{t("entries.travel")}</TableHead>
                <TableHead>{t("entries.total")}</TableHead>
                <TableHead>{t("entries.value")}</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEntries.map((entry) => {
                const workTimeMinutes = calculateWorkTime(entry);
                const entryValue = calculateValue(workTimeMinutes, config.hourlyRate);
                
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {format(parseISO(entry.date), "dd/MM/yyyy", { locale: dateLocale })}
                    </TableCell>
                    <TableCell>
                      {entry.startTime} - {entry.endTime}
                    </TableCell>
                    <TableCell>
                      {entry.breakStart} - {entry.breakEnd}
                    </TableCell>
                    <TableCell>{entry.travelTime} min</TableCell>
                    <TableCell>{minutesToTime(workTimeMinutes)}</TableCell>
                    <TableCell>{currencySymbol} {entryValue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeEntry(entry.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4 text-muted-foreground">
            {t("entries.noEntries")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeEntryList;
