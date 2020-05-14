import React from 'react';
import 'react-native-gesture-handler';
import mockdata from './mockdata';
import Todolist from './components/ToDoList'
import AddTodo from './components/AddToDo'
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry, Button, Picker, ButtonText, StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { themePicker, watchBlrp } from './reduxStore/actions';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { Dropdown } from 'react-native-material-dropdown';
import { warmTheme, roseTheme } from './colorthemes'
import db from './config'
import * as firebase from 'firebase';

const Stack = createStackNavigator();

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("IN CONSTRUCTOR")
    console.log(this.props)
    
    this.state = {
      addTodoVisible: false
    }
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }
  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={this.props.theme}>
      <Container>
        { this.props.theme.mode === "warm" ?  <LeButton title="change theme!" onPress={() => this.props.themePicker(roseTheme)}>
            <LeButtText>toggle theme</LeButtText>
        </LeButton> : <LeButton title="change theme!" onPress={() => this.props.themePicker(warmTheme)}>
            <LeButtText>toggle theme</LeButtText>
        </LeButton>}
       
        <Modal animationType="slide" 
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddTodo closeModal={() => this.toggleAddTodoModal()}/>
        </Modal>

        <Content>
        <Title>{this.props.brlp}</Title>
        <View style={ {flexDirection: 'row', marginBottom: 15} }>
          <Divider></Divider>
          <Title>T O D O<Text style={ {color: this.props.theme.accent1, fontWeight: '500'} }> L I S T</Text></Title>
          <Divider></Divider>   
        </View>

        <View style={ {flexDirection: 'row', margineVertical: 41} }>
          <TouchableOpacity style={ {flexDirection: 'row'} }onPress={() => this.toggleAddTodoModal()}>
            <FontAwesome name="pencil-square-o" size={51} color={this.props.theme.accent} />
            <Accent>add list</Accent>
          </TouchableOpacity>
        </View>

        <View style={ {height: 325, paddingLeft: 21, paddingRight: 21} }>
          <FlatList
            data={mockdata}
            keyExtractor={ item => item.name }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Todolist list= {item} />}
          />
        </View>
        </Content>
      </Container>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("IN HOME MAP STATE TO")
  console.log(state)
  return {
    theme: state.reducer.currentTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    themePicker: (theme) => {dispatch(themePicker(theme))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const LeButton = styled.TouchableOpacity`
  position: absolute;
  top: 64px;
  right: 32px;
  border-radius: 9px;
  background-color: ${props => props.theme.accent1};
  padding: 9px;
  margin: 10px;
`

const LeButtText = styled.Text`
  font-size: 9px;
  color: ${props => props.theme.title};
  font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
`

const Container = styled.SafeAreaView`
  flex:1;
  background-color: ${props => props.theme.bg};
  align-items: center;
  justify-content: center;
`
const Content = styled.SafeAreaView `
  background-color: ${props => props.theme.bg};
  align-items: center;
  justify-content: center;
`

const Divider = styled.SafeAreaView`
  background-color: ${props => props.theme.darkest};
  height: .5px;
  flex: 1;
  align-self: center;
`
const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  color: ${props => props.theme.title};
  margin: 10px;
  font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
  padding-horizontal: 31px;
  font-weight: 900;
`
const Accent = styled.Text`
    color: ${props => props.theme.accent};
    font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
    margin: 10px;
    font-weight: 900;
    align-self: center;
`
