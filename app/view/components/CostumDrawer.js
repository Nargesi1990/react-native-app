import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Icon,
    Right,
    Left,
    Body,
    Button
}
    from 'native-base'

import {
    Text,
    View,
    Image
} from 'react-native';

import RNRestart from 'react-native-restart';
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: true,
            showList: false,
        }
    }
    _logout = async () => {
        try {
            await AsyncStorage.clear()
            this.props.navigation.navigate('Splash')
            RNRestart.Restart();
            this.setState({
                isLoggedin: false
            })
            this.props.navigation.navigate('Home')
        }
        catch (e) {
            alert('can not response')
        }
    }



    render() {
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 180, backgroundColor: '#3c5d7d' }}>
                        <Image
                            source={require('./chat.png')}
                            style={{
                                width: 64,
                                height: 64,
                                position: 'absolute',
                                bottom: 20,
                                left: 16
                            }}
                        />
                        <Text
                            style={{
                                position: 'absolute',
                                bottom: 46,
                                left: 96,
                                color: '#fff',
                                fontSize: 28
                            }}
                        >Settings</Text>
                    </View>
                    <Content>
                        <List style={{ borderColor: 'none' }}>
                            <ListItem icon onPress={() => {
                                this.props.navigation.navigate('get_nebenstelle');
                                !this.state.showList ?
                                    this.setState({
                                        showList: true
                                    })
                                    :
                                    this.setState({
                                        showList: false
                                    })
                            }}>
                                {console.log("showList", this.state.showList)}
                                <Left>
                                    <Button>
                                        <Icon name="settings" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text> Nebenstellen </Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            {
                                this.state.showList ? (
                                    <List >
                                        <ListItem icon onPress={() => { this.props.navigation.navigate('SetCallforward') }}>
                                            <Left>
                                                <Button >
                                                    <Icon name="shuffle" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text>Weiterleitung</Text>
                                            </Body>

                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>


                                        </ListItem>
                                        <ListItem icon onPress={() => { this.props.navigation.navigate('SetDndExtra') }}>

                                            <Left>
                                                <Button>
                                                    <Icon name="bookmarks" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text>DND stezen</Text>
                                            </Body>

                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>


                                        </ListItem>
                                    </List>
                                ) : null
                            }
                            <ListItem icon onPress={() => this._logout()}>
                                <Left>
                                    <Button>
                                        <Icon name="wifi" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Amelden</Text>
                                </Body>

                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>



                        </List>
                    </Content>


                    <View style={{ position: 'absolute', bottom: 16, right: 0, left: 0 }}>
                        <Text style={{ textAlign: 'center' }}>Version 1.0</Text>
                        <Text style={{ textAlign: 'center' }}>All rights reserved </Text>
                    </View>
                </View>
            </Container>
        )
    }
}

