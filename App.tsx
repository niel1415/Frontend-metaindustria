import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { CadastroScreen } from "./src/screens/CadastroScreen";
import { DetalheScreen } from "./src/screens/DetalheScreen";
import { ListaScreen } from "./src/screens/ListaScreen";
import * as sensorService from "./src/services/sensorService";
import { NovoSensor, Sensor } from "./src/types/Sensor";

type TelaAtual = "lista" | "cadastro" | "detalhe";

function mensagemErro(error: unknown) {
  return "Não foi possível acessar a API. Confirme se o Spring Boot está ligado na porta 8080 e se a BASE_URL está correta.";
}

export default function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAtual>("lista");
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [sensorSelecionado, setSensorSelecionado] = useState<Sensor | null>(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState<string | null>(null);
  const [erroDetalhe, setErroDetalhe] = useState<string | null>(null);

  async function carregarSensores() {
    setCarregandoLista(true);
    setErroLista(null);
    try {
      setSensores(await sensorService.listar());
    } catch (error) {
      setErroLista(mensagemErro(error));
    } finally {
      setCarregandoLista(false);
    }
  }

  useEffect(() => { void carregarSensores(); }, []);

  async function criarSensor(novoSensor: NovoSensor) {
    setSalvando(true);
    try {
      await sensorService.criar(novoSensor);
      await carregarSensores();
      setTelaAtual("lista");
      Alert.alert("Sucesso", "Sensor cadastrado no backend.");
    } catch (error) {
      Alert.alert("Erro", mensagemErro(error));
    } finally {
      setSalvando(false);
    }
  }

  async function abrirDetalhe(id: number) {
    setTelaAtual("detalhe");
    setSensorSelecionado(null);
    setErroDetalhe(null);
    setCarregandoDetalhe(true);
    try {
      setSensorSelecionado(await sensorService.buscarPorId(id));
    } catch (error) {
      setErroDetalhe(mensagemErro(error));
    } finally {
      setCarregandoDetalhe(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {telaAtual === "lista" && <ListaScreen sensores={sensores} carregando={carregandoLista} erro={erroLista} onRecarregar={carregarSensores} onCadastrar={() => setTelaAtual("cadastro")} onVerDetalhe={abrirDetalhe} />}
      {telaAtual === "cadastro" && <CadastroScreen salvando={salvando} onSalvar={criarSensor} onVoltar={() => setTelaAtual("lista")} />}
      {telaAtual === "detalhe" && <DetalheScreen sensor={sensorSelecionado} carregando={carregandoDetalhe} erro={erroDetalhe} onVoltar={() => setTelaAtual("lista")} />}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, minHeight: "100%", backgroundColor: "#121212" } });
