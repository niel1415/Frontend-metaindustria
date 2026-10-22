import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Sensor } from "../types/Sensor";

type Props = { sensor: Sensor; onPress: () => void };

export function SensorCard({ sensor, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topo}>
        <Text style={styles.nome}>{sensor.nome}</Text>
        <View style={[styles.badge, sensor.status === "alerta" && styles.alerta, sensor.status === "critico" && styles.critico]}>
          <Text style={styles.badgeTexto}>{sensor.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.texto}>{sensor.tipo}</Text>
      <Text style={styles.local}>{sensor.localizacao}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#1f1f1f", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#333" },
  topo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  nome: { color: "#fff", fontWeight: "700", fontSize: 17, flex: 1 },
  texto: { color: "#c4c4c4", marginTop: 8 },
  local: { color: "#8f8f8f", marginTop: 4 },
  badge: { backgroundColor: "#238636", paddingVertical: 5, paddingHorizontal: 8, borderRadius: 99 },
  alerta: { backgroundColor: "#b7791f" },
  critico: { backgroundColor: "#b42318" },
  badgeTexto: { color: "#fff", fontSize: 10, fontWeight: "800" },
});
