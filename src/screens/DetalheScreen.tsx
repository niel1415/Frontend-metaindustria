import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Sensor } from "../types/Sensor";

type Props = { sensor: Sensor | null; carregando: boolean; erro: string | null; onVoltar: () => void };

export function DetalheScreen({ sensor, carregando, erro, onVoltar }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do sensor</Text>
      {carregando && <View style={styles.centro}><ActivityIndicator size="large" /><Text style={styles.info}>Consultando GET por ID...</Text></View>}
      {!carregando && erro && <View style={styles.erro}><Text style={styles.erroTexto}>{erro}</Text></View>}
      {!carregando && sensor && (
        <View style={styles.card}>
          <Text style={styles.id}>ID #{sensor.id}</Text>
          <Text style={styles.nome}>{sensor.nome}</Text>
          <Text style={styles.label}>Tipo</Text><Text style={styles.valor}>{sensor.tipo}</Text>
          <Text style={styles.label}>Localização</Text><Text style={styles.valor}>{sensor.localizacao}</Text>
          <Text style={styles.label}>Status</Text><Text style={styles.valor}>{sensor.status.toUpperCase()}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.botao} onPress={onVoltar}><Text style={styles.botaoTexto}>Voltar à lista</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 52, backgroundColor: "#121212" },
  titulo: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 24 },
  centro: { paddingVertical: 40, alignItems: "center" },
  info: { color: "#999", marginTop: 10 },
  card: { backgroundColor: "#1f1f1f", borderWidth: 1, borderColor: "#333", borderRadius: 14, padding: 18 },
  id: { color: "#8f8f8f", fontWeight: "700" },
  nome: { color: "#fff", fontSize: 23, fontWeight: "800", marginTop: 5, marginBottom: 22 },
  label: { color: "#8f8f8f", marginTop: 10 },
  valor: { color: "#fff", fontSize: 16, marginTop: 3 },
  erro: { backgroundColor: "#3a1717", padding: 16, borderRadius: 12 },
  erroTexto: { color: "#f0b5b5" },
  botao: { backgroundColor: "#555", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 18 },
  botaoTexto: { color: "#fff", fontWeight: "800" },
});
