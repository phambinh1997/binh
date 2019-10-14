import React from 'react';
import { StyleSheet, View, Text, Image, Linking, Platform, TouchableOpacity } from 'react-native';
import { GetHouseByIdService, GetImageByRoomIdService } from '../api/ApiUrl';

export default class RoomDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Chi tiết phòng trọ',
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            roomName: '',
            roomNumber: '',
            roomPrice: 0,
            roomStatus: 'Còn trống',
            phone: 0,
            urlImage: '../image/logo_samr.png'
        }
    }

    getHouse = async (id) => {
        await fetch(GetHouseByIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house_id: id
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.status == 1) {
                    this.setState({ phone: responseData.content[0].phone_number });
                }
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    getImageRoom = async (id) => {

        await fetch(GetImageByRoomIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_id: id
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.status == 1) {
                    this.setState({ images: this.onConvertJsonToArray(responseData.content) });
                }
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    onConvertJsonToArray = (data) => {
        let temp = [];
        data.forEach(item => {
            temp.push(item.url);
        });
        return temp;
    }

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + number + '}';
        }
        else {
            phoneNumber = 'telprompt:${' + number + '}';
        }
        Linking.openURL(phoneNumber);
    };

    componentDidMount() {
        const room = this.props.navigation.getParam('room', null);
        this.getImageRoom(room.room_id);
        if (room.status == 0) this.setState({ roomStatus: 'Đã cho thuê' });
        this.setState({ roomName: room.room_name, roomNumber: room.room_number, roomPrice: room.price_room, urlImage: room.thumbnail_image });
        this.getHouse(room.house_id);
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.HeaderContainer}>
                    <Image
                        style={{ width: 150, height: 200, marginBottom: 10 }}
                        source={{ uri: this.state.urlImage }}
                    />
                </View>
                <View style={styles.MainContainer}>
                    <Text style={styles.TextInfoClass}>Tên phòng: {this.state.roomName}</Text>
                    <Text style={styles.TextInfoClass}>Số phòng: {this.state.roomNumber}</Text>
                    <Text style={styles.TextInfoClass}>Giá thuê: {this.state.roomPrice}/tháng</Text>
                    <Text style={styles.TextInfoClass}>Tình trạng: {this.state.roomStatus}</Text>
                    <TouchableOpacity onPress={() => this.dialCall(this.state.phone.toString())} activeOpacity={0.7} style={styles.button} >
                        <Text style={styles.TextStyle}>Gọi cho chủ nhà ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create(
    {
        Container: {
            flex: 1
        },

        HeaderContainer: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },

        MainContainer:
        {
            flex: 5,
            margin: 10
        },

        TextInfoClass:
        {
            fontSize: 18
        },

        button: {
            marginTop: 20,
            width: '100%',
            padding: 10,
            backgroundColor: '#FF6F00',
            borderRadius: 7,
        },

        TextStyle: {
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
        }
    });