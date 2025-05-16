
import React from "react";
import { SleepRecord } from "@/types/recovery";
import { Clock, Moon, Sun, Activity, AlertCircle, BedDouble } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentSleepListProps {
  records: SleepRecord[];
}

const RecentSleepList: React.FC<RecentSleepListProps> = ({ records }) => {
  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div key={record.id} className="p-4 border rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-primary/10 mr-4">
                <BedDouble className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{new Date(record.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Moon className="h-3 w-3 mr-1" />
                  <span>{new Date(record.bedTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="mx-1">→</span>
                  <Sun className="h-3 w-3 mr-1" />
                  <span>{new Date(record.wakeTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Duração</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{Math.floor(record.duration / 60)}h {record.duration % 60}min</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Qualidade</span>
                <Badge variant={record.quality >= 7 ? "default" : record.quality >= 5 ? "outline" : "destructive"}>
                  {record.quality}/10
                </Badge>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Sensação</span>
                <Badge variant="outline" className="capitalize">
                  {record.feelingOnWaking === 'refreshed' ? 'Descansado' : 
                   record.feelingOnWaking === 'tired' ? 'Cansado' : 'Neutro'}
                </Badge>
              </div>
              
              {record.interruptions > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Interrupções</span>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-none">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {record.interruptions}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          {record.deviceData && (
            <div className="mt-3 pt-3 border-t flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Sono Profundo</span>
                <p className="font-medium">{Math.floor(record.deviceData.deepSleep! / 60)}h {record.deviceData.deepSleep! % 60}min</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Sono Leve</span>
                <p className="font-medium">{Math.floor(record.deviceData.lightSleep! / 60)}h {record.deviceData.lightSleep! % 60}min</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Sono REM</span>
                <p className="font-medium">{Math.floor(record.deviceData.remSleep! / 60)}h {record.deviceData.remSleep! % 60}min</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">FC Média</span>
                <p className="font-medium flex items-center">
                  <Activity className="h-3 w-3 mr-1 text-red-500" />
                  {Math.round(record.deviceData.heartRateDuringSleep!.reduce((a, b) => a + b, 0) / record.deviceData.heartRateDuringSleep!.length)} bpm
                </p>
              </div>
            </div>
          )}
          
          {record.notes && (
            <div className="mt-2 text-sm text-muted-foreground italic">
              "{record.notes}"
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentSleepList;
