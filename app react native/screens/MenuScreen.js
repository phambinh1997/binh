import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class MenuScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            type: 0,
            userName: '',
            userId: 0
        }
    };

    getData = async () => {
        try {
            const userType = await AsyncStorage.getItem('userType', 0);
            const name = await AsyncStorage.getItem('userNameStorage', '');
            const id = await AsyncStorage.getItem('userIdStorage', 0);
            if (userType !== null) {
                this.setState({ isLoading: false, type: userType, userName: name, userId: id });
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (err) {
            console.log(err);
            this.props.navigation.navigate('Home');
        }
    };

    onLogout = async () => {
        try {
            await AsyncStorage.removeItem('userType');
            await AsyncStorage.removeItem('userIdStorage');
            await AsyncStorage.removeItem('userNameStorage');
            this.props.navigation.navigate('Login');
        } catch (err) {
            console.log(err);
            this.props.navigation.navigate('Login');
        }
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        if (this.state.userName !== '' && this.state.type == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: .5, backgroundColor: '#ffb380', alignItems: 'center' }} >
                        <Image
                            style={{ width: 50, height: 70, marginTop: 10 }}
                            source={require('../image/logo_samr.png')}
                        />
                        <Text style={{ fontSize: 18, color: '#ffffff', padding: 10 }} >{this.state.userName} (Admin)</Text>
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#ffffff', padding: 10 }} >
                        <TouchableOpacity style={{ marginBottom: 20, marginTop: 10 }}
                            activeOpacity={0.5}
                            onPress={() => this.props.navigation.navigate('Admin')}>
                            <Text style={{ fontSize: 16 }} >Quản trị</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginBottom: 20 }}
                            activeOpacity={0.5}
                            onPress={() => this.onLogout()}>
                            <Text style={{ fontSize: 16 }} >Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (this.state.userName !== '' && this.state.type == 10) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: .5, backgroundColor: '#ffb380', alignItems: 'center' }} >
                        <Image
                            style={{ width: 50, height: 70, marginTop: 10 }}
                            source={require('../image/logo_samr.png')}
                        />
                        <Text style={{ fontSize: 18, color: '#ffffff', padding: 10 }} >{this.state.userName}</Text>
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#ffffff', padding: 10 }} >
                        <TouchableOpacity style={{ marginBottom: 20, marginTop: 10 }}
                            activeOpacity={0.5}
                            onPress={() => this.props.navigation.navigate('Owner', { id: this.state.userId })}>
                            <Text style={{ fontSize: 16 }} >Quản trị</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginBottom: 20 }}
                            activeOpacity={0.5}
                            onPress={() => this.onLogout()}>
                            <Text style={{ fontSize: 16 }} >Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (this.state.userName !== '' && this.state.type == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: .5, backgroundColor: '#ffb380', alignItems: 'center' }} >
                        <Image
                            style={{ width: 50, height: 70, marginTop: 10 }}
                            source={require('../image/logo_samr.png')}
                        />
                        <Text style={{ fontSize: 18, color: '#ffffff', padding: 10 }} >{this.state.userName}</Text>
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#ffffff', padding: 10 }} >
                        <TouchableOpacity style={{ marginBottom: 20 }}
                            activeOpacity={0.5}
                            onPress={() => this.onLogout()}>
                            <Text style={{ fontSize: 16 }} >Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    {/* <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={ () => this.onLogin()}>
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity> */}
                </View>
            );
        }
    }
};