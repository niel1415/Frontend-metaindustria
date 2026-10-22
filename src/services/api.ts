import axios from "axios";
import { Platform } from "react-native";

// Em celular físico, troque pelo IP da máquina na mesma rede, ex.: http://192.168.0.10:8080
const API_HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
export const BASE_URL = `http://${API_HOST}:8080`;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
