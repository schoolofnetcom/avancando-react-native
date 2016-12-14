import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    Picker,
    Alert
} from 'react-native';

import I18n from './../Translates';
import ReactI18N from 'react-native-i18n';

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            to   : '',
            text : '',
            result: ''
        }
    }

    render() {
        const loc = ReactI18N.locale;
        return(
            <View
                style = { styles.wrapper }>
                <Text>{ I18n.t('lbl_lang_to_translate') }</Text>
                <Picker
                    style = {{ width: 150 }}
                    selectedValue = { this.state.to }
                    onValueChange = { (lang) => this.setState({ to : lang }) }>
                    <Picker.Item label = "English" value="en" />
                </Picker>


                <Text>{ I18n.t('lbl_type_to_translate') }</Text>
                <TextInput style = { styles.txt }
                    onChangeText = { (e) => this.setState({ text: e }) }
                    text = { this.state.text }
                    onSubmitEditing = { this.translate } />

                <Text>{ I18n.t('lbl_sentence_translated') }</Text>
                <Text>
                    { this.state.result.text }
                </Text>

                <TouchableHighlight
                    style = { styles.tochable }
                    onPress = { this.getHistory } >
                    <Text>{ I18n.t('btn_history') }</Text>
                </TouchableHighlight>
            </View>
        );
    }

    translate = () => {
        var data = {
            text: this.state.text,
            to: this.state.to
        };

        fetch('http://10.0.2.2:3000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                result: responseJson.data
            })
        });
    }

    getHistory = () => {
        var url = `http://10.0.2.2:3000/translate/${this.state.result._id}` ;
        fetch(url, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert(I18n.t('header_alert'), responseJson.data.time.toString());
        });
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        top: 30,
        backgroundColor: '#f5fcff',
        alignItems: 'center', // row
        justifyContent: 'center', // column
    },
    tochable: {
        top: 40
    },
    txt: {
        alignSelf: 'stretch'
    }
});
