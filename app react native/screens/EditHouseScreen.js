import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight, Alert, FlatList, StyleSheet, TextInput } from 'react-native';
import { GetHouseByIdService, DeleteRoomByIdService, GetRoomByHouseIdService, UpdateHouseByIdService } from '../api/ApiUrl'

export default class EditHouseScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        title: 'Chỉnh sửa nhà trọ'
    });

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            houseId: 0,
            houseName: '',
            phoneNumber: 0,
            address: ''
        }
    };

    onGetRoomByHouseId = (id) => {
        fetch(GetRoomByHouseIdService, {
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
                this.setState({
                    isLoading: false,
                    dataContent: responseData.content
                }, function () {

                });
            }).catch(function (err) {
                Alert.alert("Đã có lỗi xảy ra...");
                console.log(err);
            }).done();
    };

    onDeleteRoom = (id) => {
        fetch(DeleteRoomByIdService, {
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
                    Alert.alert("Xóa thành công");
                }
                else Alert.alert("Xóa không thành công");
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    onUpdateHouse = () => {
        fetch(UpdateHouseByIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house_id: this.state.houseId,
                house_name: this.state.houseName,
                phone_number: this.state.phoneNumber,
                address: this.state.address
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
        fetch(GetHouseByIdService, {
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
                if (responseData.status == 1) {
                    this.setState({
                        houseId: responseData.content[0].house_id,
                        houseName: responseData.content[0].house_name,
                        phoneNumber: responseData.content[0].phone_number,
                        address: responseData.content[0].address
                    });
                    this.onGetRoomByHouseId(responseData.content[0].house_id);
                }
            }).catch(function (err) {
                console.log(err);
            }).done();
    };

    render() {
        return (
            <View>
                <View>
                    <View style={{ margin: 15 }}>
                        <Text>Tên nhà trọ</Text>
                        <TextInput
                            placeholder="Tên nhà trọ"
                            style={styles.TextInputStyleClass}
                            value={this.state.houseName}
                            underlineColorAndroid="transparent"
                            onChangeText={houseName => this.setState({ houseName })} />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text>Số điện thoại</Text>
                        <TextInput
                            placeholder="Số điện thoại"
                            keyboardType="phone-pad"
                            style={styles.TextInputStyleClass}
                            value={this.state.phoneNumber}
                            underlineColorAndroid="transparent"
                            onChangeText={phoneNumber => this.setState({ phoneNumber })} />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text>Địa chỉ</Text>
                        <TextInput
                            placeholder="Địa chỉ"
                            value={this.state.address}
                            style={styles.TextInputStyleClass}
                            underlineColorAndroid="transparent"
                            onChangeText={address => this.setState({ address })} />
                    </View>
                </View>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => { this.onUpdateHouse() }}
                        activeOpacity={0.5}
                        style={styles.TouchableOpacityStyle}>
                        <Text style={styles.TextStyle}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={this.state.dataContent}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomFlatListItem
                                    navigation={this.props.navigation}
                                    item={item}
                                    index={index}>
                                </CustomFlatListItem>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
}

class CustomFlatListItem extends React.Component {

    onDeleteRoom = (id) => {
        fetch(DeleteRoomByIdService, {
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
                if (responseData.status == 1) {
                    Alert.alert("Xóa thành công");
                    this.props.navigation.navigate('EditHouse');
                }
                else Alert.alert("Xóa không thành công");
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    render() {
        return (
            <TouchableHighlight>
                <View style={styles.FlatListItemClass}>
                    <View style={{ position: 'relative', marginRight: 100 }}>
                        <Text>Tên phòng: {this.props.item.room_name}</Text>
                        <Text>Số phòng: {this.props.item.room_number}</Text>
                        <Text>Giá: {this.props.item.price_room}</Text>
                    </View>
                    <View style={{ position: 'absolute', marginLeft: 300, paddingTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('EditRoom', { houseId: this.props.item.house_id }) }}
                            style={styles.EditButton}
                            underlayColor='#fff'>
                            <Text style={styles.EditText}>Sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Xác nhận xóa',
                                    'Bạn chắc muốn xóa phòng số ' + this.props.item.room_number,
                                    [
                                        {
                                            text: 'Cancel'
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => this.onDeleteRoom(this.props.item.room_id)
                                        }
                                    ],
                                    { cancelable: false },
                                );
                            }}
                            style={styles.DeleteButton}
                            underlayColor='#fff'>
                            <Text style={styles.EditText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableHighlight >
        )
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
        },

        FlatListItemClass:
        {
            alignItems: "flex-start",
            padding: 16,
            backgroundColor: "#FFF",
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            borderRadius: 4,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            borderColor: "#ddd",
            borderWidth: 1,
        },

        EditButton: {
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#0390fc',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff'
        },

        EditText: {
            color: '#fff',
            textAlign: 'center',
            paddingLeft: 10,
            paddingRight: 10
        },

        DeleteButton: {
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: '#fc0303',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff'
        },
    });