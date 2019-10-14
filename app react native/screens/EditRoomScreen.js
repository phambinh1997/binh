import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, TextInput } from 'react-native';
import { GetRoomByHouseIdService, UpdateRoomByIdService } from '../api/ApiUrl'

export default class EditRoomScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        title: 'Chỉnh sửa phòng trọ'
    });

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            roomId: 0,
            roomName: '',
            roomNumber: 0,
            priceRoom: 0,
            roomStatus: 0
        }
    };

    onUpdateRoom = () => {
        fetch(UpdateRoomByIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_id: this.state.roomId,
                room_name: this.state.roomName,
                room_number: this.state.roomNumber,
                price_room: this.state.priceRoom,
                status: this.state.roomStatus
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.status == 1) {
                    Alert.alert("Cập nhật thành công");
                }
                else Alert.alert("Cập nhật không thành công");
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    componentDidMount() {
        fetch(GetRoomByHouseIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house_id: this.props.navigation.getParam('houseId')
            })
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    roomId: responseData.content[0].room_id,
                    roomName: responseData.content[0].room_name,
                    roomNumber: responseData.content[0].room_number,
                    priceRoom: responseData.content[0].price_room,
                    roomStatus: responseData.content[0].status
                }, function () {

                });
            }).catch(function (err) {
                Alert.alert("Đã có lỗi xảy ra...");
                console.log(err);
            }).done();
    };

    render() {
        return (
            <View>
                <View style={{ margin: 15 }}>
                    <Text>Tên phòng</Text>
                    <TextInput
                        placeholder="Tên phòng"
                        style={styles.TextInputStyleClass}
                        value={this.state.roomName}
                        underlineColorAndroid="transparent"
                        onChangeText={roomName => this.setState({ roomName })} />
                </View>
                <View style={{ margin: 15 }}>
                    <Text>Số phòng</Text>
                    <TextInput
                        placeholder="Số phòng"
                        style={styles.TextInputStyleClass}
                        value={this.state.roomNumber}
                        underlineColorAndroid="transparent"
                        onChangeText={roomNumber => this.setState({ roomNumber })} />
                </View>
                <View style={{ margin: 15 }}>
                    <Text>Giá tiền</Text>
                    <TextInput
                        placeholder="Giá tiền"
                        style={styles.TextInputStyleClass}
                        value={this.state.priceRoom}
                        underlineColorAndroid="transparent"
                        onChangeText={priceRoom => this.setState({ priceRoom })} />
                </View>
                <View style={{ margin: 15 }}>
                    <Text>Trạng thái</Text>
                    <TextInput
                        placeholder="Trạng thái"
                        style={styles.TextInputStyleClass}
                        value={this.state.roomStatus}
                        underlineColorAndroid="transparent"
                        onChangeText={roomStatus => this.setState({ roomStatus })} />
                </View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => { this.onUpdateRoom() }}
                        activeOpacity={0.5}
                        style={styles.TouchableOpacityStyle}>
                        <Text style={styles.TextStyle}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        TextDetailStyleClass:
        {
            position: 'relative'
        },

        TextInputStyleClass:
        {
            marginLeft: 120,
            position: 'absolute',
            height: 40,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: '#ff6600',
            borderRadius: 7,
            marginBottom: 10,
            width: '70%'
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
        }
    });