
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TimeEntry } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeEntryFormProps {
  addEntry: (entry: TimeEntry) => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({ addEntry }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [breakStart, setBreakStart] = useState<string>("12:00");
  const [breakEnd, setBreakEnd] = useState<string>("13:00");
  const [travelTime, setTravelTime] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cria nova entrada de tempo
    const newEntry: TimeEntry = {
      id: uuidv4(),
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
      breakStart,
      breakEnd,
      travelTime,
      notes
    };
    
    addEntry(newEntry);
    
    // Limpa o campo de notas após o envio
    setNotes("");
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Registrar Horas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Hora de Início</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Hora de Término</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breakStart">Início da Pausa</Label>
              <Input
                id="breakStart"
                type="time"
                value={breakStart}
                onChange={(e) => setBreakStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breakEnd">Fim da Pausa</Label>
              <Input
                id="breakEnd"
                type="time"
                value={breakEnd}
                onChange={(e) => setBreakEnd(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelTime">Tempo de Viagem (minutos)</Label>
            <Input
              id="travelTime"
              type="number"
              min="0"
              value={travelTime}
              onChange={(e) => setTravelTime(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicionar notas..."
            />
          </div>
          
          <CardFooter className="px-0">
            <Button type="submit" className="w-full">Adicionar Registro</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default TimeEntryForm;
