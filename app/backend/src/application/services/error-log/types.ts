export interface LogData {
  code: string;
  message: string;
  workerId: number;
  machineId: number | null;
  collectorId: number | null;
  severity: string;
  trace: string | null;
  timestamp: Date;
}