import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { LoginService } from '../api/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: "Login",
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            userName: '',
            userPassword: ''
        }
    }

    storeData = async (id, name, type) => {
        try {
            await AsyncStorage.setItem('userIdStorage', id);
            await AsyncStorage.setItem('userNameStorage', name);
            await AsyncStorage.setItem('userType', type);
        } catch (err) {
            console.log(err);
        }
    };

    Login() {
        if (this.state.userName == "" && this.state.userPassword == "") {
            Alert.alert("Vui lòng nhập tài khoản/mật khẩu");
        } else {
            fetch(LoginService, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: this.state.userName,
                    password: this.state.userPassword,
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.status == 1) {
                        AsyncStorage.setItem('user', responseData.content[0]);
                        this.storeData(responseData.content[0].user_id, responseData.content[0].name, responseData.content[0].account_type);
                        this.props.navigation.navigate('Home');
                    }
                    else Alert.alert("Sai tài khoản hoặc mật khẩu...");
                }).catch(function (err) {
                    Alert.alert("Đã có lỗi xảy ra...");
                    console.log(err);
                }).done();
        }
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Image
                    style={styles.ImageLogoStyleClass}
                    source={require('../image/logo_samr.png')}
                />
                <TextInput
                    placeholder="Tên đăng nhập"
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    onChangeText={userName => this.setState({ userName })} />
                <TextInput
                    placeholder="Mật khẩu"
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={userPassword => this.setState({ userPassword })} />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacityStyle}
                    onPress={this.Login.bind(this)}>
                    <Text style={styles.TextStyle}>Đăng nhập</Text>
                </TouchableOpacity>
                <Text>Chưa có tài khoản?
                    <Text style={{ color: '#0000ff' }} onPress={() => { this.props.navigation.navigate('Registration') }}> Đăng ký</Text>
                </Text>
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