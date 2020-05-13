import React from 'react';
import colors from './colorthemes/warmtheme.js';
import 'react-native-gesture-handler';
import mockdata from './mockdata';
import Todolist from './components/ToDoList'
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry, Button, Picker, ButtonText, StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { themePicker } from './reduxStore/actions';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { Dropdown } from 'react-native-material-dropdown';
import { warmTheme, roseTheme } from './colorthemes'

const Stack = createStackNavigator();

class Home extends React.Component {
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
       
        <Content>
        <View style={ {flexDirection: 'row', marginBottom: 15} }>
          <Divider></Divider>
          <Title>T O D O<Text style={ {color: this.props.theme.accent1, fontWeight: '500'} }> L I S T</Text></Title>
          <Divider></Divider>   
        </View>

        <View style={ {flexDirection: 'row', margineVertical: 41} }>
          <TouchableOpacity style={styles.addList}>
          <FontAwesome name="pencil-square-o" size={51} color={this.props.theme.accent} />
          </TouchableOpacity>
          <Accent>add list</Accent>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: colors.title,
    margin: 10,
    fontFamily: Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace',
    paddingHorizontal: 31,
    fontWeight: '900',
  },
  addList: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  console.log(state)
  return {
    theme: state.themeReducer.currentTheme
  }
}

export default connect(mapStateToProps, {themePicker})(Home)

const LeButton = styled.TouchableOpacity`
  align-self: flex-end;
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
  justify-content: flex-start;
`
const Content = styled.SafeAreaView `
  background-color: ${props => props.theme.bg};
  margin-top: 90px;
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
