import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { firebaseApp, cadastrosContasDB } from './Firebase.js';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


export default class Grafico extends Component {

    componentDidMount() {
        this.contabilizarCadastros();
    }

    contabilizarCadastros = () => {

        var sim = 0, nao = 0;

        cadastrosContasDB.on("value", (cadastros) => {
            cadastros.forEach((cadastro) => {

                if (cadastro.val().nomeContas) {
                    conta++;
                } 
            });
        });


        var data = [
            {
                name: "Conta",
                nome: conta,
                color: "#OOFFOO",
                legendFontColor: "#000",
                legenFontSize: 15
            }
        ];
        console.log(data);

        return data;
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LineChart
                    data={this.contabilizarCadastros}
                    width={Dimensions.get("window").width}
                    height={250}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                    }}
                    accessor="nome"
                    backgroundColor="transparent"
                    absolute
                />
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
});
