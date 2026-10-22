import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NovoSensor, StatusSensor } from "../types/Sensor";

type Props = { salvando: boolean; onSalvar: (sensor: NovoSensor) => Promise<void>; onVoltar: () => void };

export function CadastroScreen({ salvando, onSalvar, onVoltar }: Props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState<StatusSensor>("normal");

  async function salvar() {
    if (!nome.trim() || !tipo.trim() || !localizacao.trim()) {
      Alert.alert("Atenção", "Preencha nome, tipo e localização.");
      return;
    }
    await onSalvar({ nome: nome.trim(), tipo: tipo.trim(), localizacao: localizacao.trim(), status });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Cadastrar sensor</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Ex: Sensor de temperatura" placeholderTextColor="#777" value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Tipo</Text>
      <TextInput style={styles.input} placeholder="Ex: Temperatura" placeholderTextColor="#777" value={tipo} onChangeText={setTipo} />
      <Text style={styles.label}>Localização</Text>
      <TextInput style={styles.input} placeholder="Ex: Linha de produção 1" placeholderTextColor="#777" value={localizacao} onChangeText={setLocalizacao} />
      <Text style={styles.label}>Status</Text>
      <View style={styles.statusContainer}>
        {(["normal", "alerta", "critico"] as StatusSensor[]).map((item) => (
          <TouchableOpacity key={item} style={[styles.statusButton, status === item && styles.statusSelecionado]} onPress={() => setStatus(item)}>
            <Text style={styles.statusTexto}>{item === "critico" ? "Crítico" : item[0].toUpperCase() + item.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[styles.botaoSalvar, salvando && styles.desabilitado]} onPress={salvar} disabled={salvando}>
        {salvando ? <ActivityIndicator /> : <Text style={styles.botaoTexto}>Salvar no backend</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar} disabled={salvando}><Text style={styles.botaoTexto}>Voltar</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingTop: 52, backgroundColor: "#121212" },
  titulo: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 24 },
  label: { color: "#fff", marginBottom: 8, fontWeight: "bold" },
  input: { backgroundColor: "#1f1f1f", color: "#fff", padding: 14, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: "#333" },
  statusContainer: { flexDirection: "row", gap: 8, marginBottom: 24 },
  statusButton: { flex: 1, backgroundColor: "#333", padding: 12, borderRadius: 10, alignItems: "center" },
  statusSelecionado: { backgroundColor: "#7c3aed" },
  statusTexto: { color: "#fff", fontWeight: "bold" },
  botaoSalvar: { backgroundColor: "#2ecc71", padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 12 },
  botaoVoltar: { backgroundColor: "#555", padding: 14, borderRadius: 10, alignItems: "center" },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  desabilitado: { opacity: 0.6 },
});
