import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, TouchableHighlight, Alert, FlatList, StyleSheet, Button } from 'react-native';
import { GetHouseByUserIdService, DeleteHouseByIdService } from '../api/ApiUrl'

export default class OwnerScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        // header: null,
        title: 'Chủ nhà'

    });

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            houseId: 0,
        }
    }

    onDeleteHouse = (id) => {
        fetch(DeleteHouseByIdService, {
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

    componentDidMount() {
        fetch(GetHouseByUserIdService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.props.navigation.getParam('id')
            })
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    isLoading: false,
                    dataContent: responseData.content
                }, function () {

                });
            }).catch(function (err) {
                console.log(err);
            }).done();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.Container}>
                <View style={styles.MainContainer}>
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
};

class CustomFlatListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight>
                <View style={styles.FlatListItemClass}>
                    <View style={{ position: 'relative', marginRight: 100 }}>
                        <Text>Nhà: {this.props.item.house_name}</Text>
                        <Text>Số điện thoại: {this.props.item.phone_number}</Text>
                        <Text>Địa chỉ: {this.props.item.address}</Text>
                    </View>
                    <View style={{ position: 'absolute', marginLeft: 300, paddingTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('EditHouse', { houseId: this.props.item.house_id }) }}
                            style={styles.EditButton}
                            underlayColor='#fff'>
                            <Text style={styles.EditText}>Sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.onDeleteHouse(this.props.item.house_id) }}
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
        Container: {
            flex: 1
        },

        HeaderContainer: {
            flex: .5
        },

        MainContainer:
        {
            flex: 15,
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