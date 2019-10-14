import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { RegistrationService } from '../api/ApiUrl'

export default class RegistrationScreen extends React.Component {

    static navigationOptions = {
        title: "Registration",
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            userName: '',
            userPassword: '',
            name: ''
        }
    }

    Registration() {
        fetch(RegistrationService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: this.state.userName,
                password: this.state.userPassword,
                name: this.state.name,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.status == 1) {
                    Alert.alert("Đăng ký thành công");
                    this.props.navigation.navigate('Login');
                }
                else Alert.alert("Đăng ký không thành công");
            }).catch(function (err) {
                Alert.alert("Đã có lỗi xảy ra...");
                console.log(err);
            }).done();
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Image
                    style={styles.ImageLogoStyleClass}
                    source={require('../image/logo_samr.png')}
                />
                <TextInput
                    placeholder="Tên của bạn"
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    onChangeText={name => this.setState({ name })} />
                <TextInput
                    placeholder="Tên đăng nhập"
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    onChangeText={userName => this.setState({ userName })} />
                <TextInput
                    placeholder="Mật khẩu"
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    onChangeText={userPassword => this.setState({ userPassword })} />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacityStyle}
                    onPress={this.Registration.bind(this)}>
                    <Text style={styles.TextStyle}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20

        },

        ImageLogoStyleClass:
        {
            width: 150,
            height: 200,
            margin: 20
        },

        TextInputStyleClass:
        {
            textAlign: 'center',
            height: 40,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: '#ff6600',
            borderRadius: 7,
            marginBottom: 10,
            width: '95%'
        },

        TouchableOpacityStyle:
        {
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 20,
            borderRadius: 7,
            backgroundColor: '#ff6600',
            width: '95%'

        },

        TextStyle:
        {
            color: '#fff',
            textAlign: 'center',
            fontSize: 18
        },

        ActivityIndicatorStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'

        }
    });