import React from 'react';
import { View, Image, Text, ActivityIndicator, TouchableHighlight, Alert, FlatList, StyleSheet, Button } from 'react-native';
import { GetAllHouseService } from '../api/ApiUrl'

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        // header: null,
        title: 'Danh sách nhà trọ',
        headerLeft: <TouchableHighlight onPress={() => navigation.openDrawer()}>
            <Image style={{ width: 38, height: 38 }}
                source={require('../image/ic_menu.png')}
            />
        </TouchableHighlight>,
        headerBackTitle: null,
        tabBarLabel: 'Danh sách nhà trọ',

    });

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            houseId: 0,
        }
    }

    componentDidMount() {
        fetch(GetAllHouseService).then((response) => response.json())
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
            <TouchableHighlight
                onPress={() => { this.props.navigation.navigate('HouseDetail', { house: this.props.item }) }}>
                <View style={styles.FlatListItemClass}>
                    <Image
                        style={{ width: 70, height: 70, position: 'relative' }}
                        source={{uri: this.props.item.thumbnail_image}}
                    />
                    <View style={{ position: 'absolute', marginLeft: 80, padding: 15, paddingRight: 0 }}>
                        <Text>Nhà: {this.props.item.house_name}</Text>
                        <Text>Số điện thoại: {this.props.item.phone_number}</Text>
                        <Text>Địa chỉ: {this.props.item.address}</Text>
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
        }
    });