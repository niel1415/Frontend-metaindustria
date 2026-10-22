export type StatusSensor = "normal" | "alerta" | "critico";

export type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  localizacao: string;
  status: StatusSensor;
};

export type NovoSensor = Omit<Sensor, "id">;
