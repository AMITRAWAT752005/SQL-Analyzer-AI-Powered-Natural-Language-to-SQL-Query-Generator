export interface HealthResponse {
  status: string;
  uptime: number;
  environment: string;
  database: string;
  timestamp: string;
  version: string;
  service: string;
}
