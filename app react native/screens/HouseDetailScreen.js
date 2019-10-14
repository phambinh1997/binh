import React from 'react';
import { StyleSheet, View, TextInput, Text, ActivityIndicator, TouchableHighlight, Alert, FlatList, Image } from 'react-native';
import { GetRoomByHouseIdService } from '../api/ApiUrl'

export default class HouseDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Chi tiết nhà trọ',
    };

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            houseName: '',
            address: '',
            phone: 0
        }
    }

    componentDidMount() {
        const house = this.props.navigation.getParam('house');
        this.setState({ houseName: house.house_name, address: house.address, phone: house.phone_number });
        fetch(GetRoomByHouseIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                house_id: house.house_id
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
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.Container}>
                <View style={styles.HeaderContainer}>
                    <Text style={{ fontSize: 20 }}>Thông tin nhà trọ</Text>
                </View>
                <View style={styles.InfoContainer}>
                    <Text style={{ fontSize: 18 }}>Tên nhà trọ: {this.state.houseName}</Text>
                    <Text style={{ fontSize: 18 }}>Số điện thoại: {this.state.phone}</Text>
                    <Text style={{ fontSize: 18 }}>Địa chỉ: {this.state.address}</Text>
                </View>
                <View style={styles.HeaderContainer}>
                    <Text style={{ fontSize: 20 }}>Danh sách phòng trọ</Text>
                </View>
                <View style={styles.MainContainer}>
                    <FlatList
                        data={this.state.dataContent}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomFlatListItemHouseDetail
                                    navigation={this.props.navigation}
                                    item={item}
                                    index={index}>
                                </CustomFlatListItemHouseDetail>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
};

class CustomFlatListItemHouseDetail extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => { this.props.navigation.navigate('RoomDetail', { room: this.props.item }) }}>
                <View style={styles.FlatListItemClass}>
                    <Image
                        style={{ width: 40, height: 40, position: 'relative' }}
                        source={{ uri: this.props.item.thumbnail_image }}
                    />
                    <View style={{ position: 'absolute', marginLeft: 80, padding: 15 }}>
                        <Text>Phòng: {this.props.item.room_name}</Text>
                        <Text>Giá: {this.props.item.price_room}</Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

const styles = StyleSheet.create(
    {
        Container: {
            flex: 1
        },

        HeaderContainer: {
            marginTop: 20,
            flex: .5,
            justifyContent: 'center',
            alignItems: 'center',
        },

        InfoContainer:
        {
            flex: 2,
            marginTop: 10,
            // backgroundColor: '#ddd',
            padding: 10
        },

        MainContainer:
        {
            flex: 10,
            margin: 10
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
        }
    });