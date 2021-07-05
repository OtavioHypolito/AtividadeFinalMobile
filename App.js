import React, { Component } from 'react';
import Cadastro from "./Cadastro";
import Grafico from "./Grafico";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { firebaseApp, cadastrosContasDB } from './Firebase.js';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export default class CadastrosContas extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cadastro">
          <Stack.Screen name="Cadastro" component={Cadastro} options={({ navigation }) => ({
            headerRight: () => (
              <Button onPress={() => navigation.navigate("Gráfico")} title="Gráfico" color="#000" />
            )
          })} />
          <Stack.Screen name="Gráfico" component={Grafico} options={({ navigation }) => ({
            headerRight: () => (
              <Button onPress={() => navigation.navigate("Cadastro")} title="Cadastro" color="#000" />
            )
          })} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}