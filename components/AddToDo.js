import React from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { themePicker } from '../reduxStore/actions';
import { connect } from 'react-redux';


class AddToDo extends React.Component {
     render() {
         return (
            <Container behavior="padding">
                <LeButton onPress={this.props.closeModal}>
                    <FontAwesome name="close" size={13} color={this.props.theme.bg} />
                </LeButton>
                <Title>start a new to do list!</Title>
                <Input placeholder="list name"/>
                <Submit>
                <Feather name="arrow-right-circle" size={35} color={this.props.theme.accent} />
                </Submit>
            </Container>
         )
     }
 }

 function mapStateToProps(state) {
    console.log(state)
    return {
        theme: state.themeReducer.currentTheme
    }
}

export default connect(mapStateToProps, {themePicker})(AddToDo)


 const Container = styled.KeyboardAvoidingView`
  flex:1;
  background-color: ${props => props.theme.bg};
  align-items: center;
  justify-content: center;
`

const Input = styled.TextInput`
    border-bottom-width: .2px;
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    padding-horizontal: 51px;
    height: 30px;
    font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
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

const LeButton = styled.TouchableOpacity`
  position: absolute;
  top: 64px;
  right: 32px;
  border-radius: 9px;
  background-color: ${props => props.theme.accent1};
  padding: 9px;
  margin: 10px;
`

const Submit = styled.TouchableOpacity`
  margin: 20px;
`

const LeButtText = styled.Text`
  font-size: 9px;
  color: ${props => props.theme.title};
  font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
`