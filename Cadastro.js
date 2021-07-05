import React, { Component } from 'react';
import Grafico from "./Grafico";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { firebaseApp, cadastrosContasDB } from './Firebase.js';


export default class Cadastros extends Component {
  state = {
    nomeConta: "",
    valor: "",
    cadastros: []
  }

  componentDidMount() {
    this.listarCadastros();
  }

  listarCadastros = () => {
    var cadastrosTemp = [];

    cadastrosContasDB.on("value", (cadastros) => {
      cadastros.forEach((cadastro) => {
        cadastrosTemp.push({
          key: cadastro.key,
          nomeConta: cadastro.val().nomeConta,
          valor: cadastro.val().valor
        });
      });

      this.setState({ cadastros: cadastrosTemp });

    });
  }

  adicionarCadastro = () => {
    if (this.state.cadastros.length > 0) {

      var cadastro = {
        nome: this.state.nome,
        telefone: this.state.telefone
      };

      cadastrosContasDB.push(cadastro);

      this.listarCadastros();
    }
  }

  excluirCadastro = (key) => {

    cadastrosContasDB.child(key).remove();

    this.listarCadastros();
  }


  render() {
    return (

      <SafeAreaView style={styles.container}>

        <Text style={styles.titulo}>Cadastro de Contas</Text>

        <View style={styles.itemContainer}>
          <TextInput style={styles.input} placeholder="Nome da Conta" value={this.state.nomeConta}
            onChange={(nomeConta) => this.setState({ nomeConta: nomeConta })} />
        </View>

        <View style={styles.itemContainer}>
          <TextInput style={styles.input} placeholder="Valor" value={this.state.valor}
            onChange={(valor) => this.setState({ valor: valor })} />
        </View>

        <View>
          <Button style={styles.botao} title="Salvar" onPress={() => this.adicionarCadastro()} />
        </View>

        <Text style={styles.titulo}>Lista</Text>

        <FlatList style={styles.lista} data={this.state.cadastros} renderItem={
          ({ item, index }) =>
            <View style={styles.item}>
              <Text>Nome da Conta: {item.nomeConta}, Valor: {item.valor}</Text>
              <View style={styles.botao}>
                <Button style={styles.botao} title="X" color="#FF0000" onPress={() => this.excluirCadastro(item.key)} />
              </View>
            </View>

        } />

      </SafeAreaView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  titulo: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: "bold"
  },
  lista: {
    width: "100%",
    borderWidth: 1,
    height: 1,
    margin: 1,
    padding: 10
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 20,
    width: "50%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  botao: {
    width: "20%",

  },
  input: {
    height: 40,
    padding: 2,
    margin: 12,
    borderWidth: 1,
    width: "90%"
  }
});
