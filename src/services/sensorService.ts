import { api } from "./api";
import { NovoSensor, Sensor } from "../types/Sensor";

export async function listar(): Promise<Sensor[]> {
  const resposta = await api.get<Sensor[]>("/sensores");
  return resposta.data;
}

export async function buscarPorId(id: number): Promise<Sensor> {
  const resposta = await api.get<Sensor>(`/sensores/${id}`);
  return resposta.data;
}

export async function criar(sensor: NovoSensor): Promise<Sensor> {
  const resposta = await api.post<Sensor>("/sensores", sensor);
  return resposta.data;
}
