import React from 'react'
import colors from '../colorthemes/warmtheme'
import {StyleSheet, Text, View} from 'react-native'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { themePicker } from '../reduxStore/themeReducer'

ToDoList = ({list, theme}) => {
    console.log("PROPS IN TODO: ")
    console.log(theme)
    console.log(list)
    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    const lecolor = list.color;
    console.log(lecolor)
    console.log(theme[lecolor])
    return (
        <View style={[styles.listContainer, {backgroundColor: theme[lecolor]}]}>
            <ListTitle> 
                {list.name} 
            </ListTitle>

            <View>
                <View style={{ alignItems: 'center' }}>
                    <Count>{remainingCount}</Count>
                    <Status>remaining</Status>

                    <Count>{completedCount}</Count>
                    <Status>completed</Status>
                </View>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
        theme: state.themeReducer.currentTheme
    }
}

export default connect(mapStateToProps, {themePicker})(ToDoList)

const styles = StyleSheet.create ({
    listContainer: {
        paddingVertical: 31,
        paddingHorizontal: 15,
        borderRadius: 9,
        marginHorizontal: 25,
        marginVertical: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: 11,
        },
        shadowRadius: 9,
        shadowOpacity: .3,
    },
})

const ListTitle = styled.Text`
    color: ${props => props.theme.title};
    font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 13px;
    font-weight: 800
`
const Divider = styled.SafeAreaView`
  background-color: ${props => props.theme.darkest};
  height: .5px;
  flex: 1;
  align-self: center;
`
const Count = styled.Text`
    margin-top: 11px;
    color: ${props => props.theme.title};
    font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
    text-transform: uppercase;
    font-size: 37px;
    font-weight: 100;
`
const Status = styled.Text`
    color: ${props => props.theme.title};
    font-family: ${Platform.OS === "ios" ? 'Avenir-Heavy' : 'monospace'};
    letter-spacing: 2px;
    font-style: italic;
    font-weight: 100;   
`