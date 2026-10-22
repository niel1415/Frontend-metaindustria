import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Sensor } from "../types/Sensor";
import { SensorCard } from "../components/SensorCard";

type Props = {
  sensores: Sensor[];
  carregando: boolean;
  erro: string | null;
  onRecarregar: () => void;
  onCadastrar: () => void;
  onVerDetalhe: (id: number) => void;
};

export function ListaScreen({ sensores, carregando, erro, onRecarregar, onCadastrar, onVerDetalhe }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Metaindústria</Text>
          <Text style={styles.subtitulo}>Sensores conectados ao backend</Text>
        </View>
        <TouchableOpacity style={styles.botao} onPress={onCadastrar}><Text style={styles.botaoTexto}>+ Novo</Text></TouchableOpacity>
      </View>

      {erro && (
        <View style={styles.erroBox}>
          <Text style={styles.erroTitulo}>Backend indisponível</Text>
          <Text style={styles.erroTexto}>{erro}</Text>
          <TouchableOpacity onPress={onRecarregar}><Text style={styles.tentar}>Tentar novamente</Text></TouchableOpacity>
        </View>
      )}

      {carregando && sensores.length === 0 ? (
        <View style={styles.centro}><ActivityIndicator size="large" /><Text style={styles.loading}>Carregando sensores...</Text></View>
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <SensorCard sensor={item} onPress={() => onVerDetalhe(item.id)} />}
          refreshControl={<RefreshControl refreshing={carregando} onRefresh={onRecarregar} />}
          ListEmptyComponent={!erro ? <Text style={styles.vazio}>Nenhum sensor cadastrado. Crie o primeiro registro.</Text> : null}
          contentContainerStyle={sensores.length === 0 ? styles.listaVazia : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 52, backgroundColor: "#121212" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22, gap: 12 },
  titulo: { color: "#fff", fontSize: 28, fontWeight: "800" },
  subtitulo: { color: "#999", marginTop: 3 },
  botao: { backgroundColor: "#7c3aed", paddingVertical: 11, paddingHorizontal: 15, borderRadius: 10 },
  botaoTexto: { color: "#fff", fontWeight: "800" },
  erroBox: { backgroundColor: "#3a1717", borderColor: "#7f1d1d", borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16 },
  erroTitulo: { color: "#fff", fontWeight: "800", marginBottom: 4 },
  erroTexto: { color: "#f0b5b5", marginBottom: 8 },
  tentar: { color: "#c4b5fd", fontWeight: "800" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: { color: "#aaa", marginTop: 12 },
  vazio: { color: "#aaa", textAlign: "center", lineHeight: 22 },
  listaVazia: { flex: 1, justifyContent: "center" },
});
