import React, { Component } from 'react';

import {
    Navigator,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import HomeContainer from './components/HomeContainer';

export default class Router extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Navigator
                initialRoute = {{ name: 'Home', title: 'Home' }}
                renderScene = { this. renderScene }
                navigationBar = {
                   <Navigator.NavigationBar
                        style = { styles.navigationBar }
                        routeMapper = { NavigationBarRouteMapper }
                    />
                }
            />
        );
    }

    renderScene(route, navigator) {
        if (route.name == 'Home') {
            return(
                <HomeContainer
                    navigator = { navigator }
                    { ...route.passProps }
                />
            );
        }
    }
}

let NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, state) {
        if (index > 0) {
            return (
                <TouchableOpacity
                    onPress = { () => { if (index > 0) { navigator.pop() } } }>
                    <Text
                        style = { styles.leftButton } >
                        Back
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    },
    RightButton(route, navigator, index, state) {

    },
    Title(route, navigator, index, state) {
        return (
            <Text
                style = { styles.title } >
                { route.title }
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: '#05c3f9'
    },
    leftButton: {
        color: '#ffffff',
        margin: 10,
        fontSize: 16
    },
    title: {
        padding: 13,
        color: '#ffffff',
        justifyContent: 'center',
        fontSize: 18
    }
});