
import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TimeEntry, AppConfig } from "@/types";
import { calculateWorkTime, calculateValue, minutesToTime } from "@/utils/timeCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TimeEntryListProps {
  entries: TimeEntry[];
  config: AppConfig;
  removeEntry: (id: string) => void;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ entries, config, removeEntry }) => {
  // Ordenação por data (mais recente primeiro)
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registros de Horas</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEntries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Pausa</TableHead>
                <TableHead>Viagem</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Valor</TableHead>
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
                      {format(parseISO(entry.date), "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {entry.startTime} - {entry.endTime}
                    </TableCell>
                    <TableCell>
                      {entry.breakStart} - {entry.breakEnd}
                    </TableCell>
                    <TableCell>{entry.travelTime} min</TableCell>
                    <TableCell>{minutesToTime(workTimeMinutes)}</TableCell>
                    <TableCell>R$ {entryValue.toFixed(2)}</TableCell>
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
            Nenhum registro encontrado. Adicione seu primeiro registro de horas.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeEntryList;
