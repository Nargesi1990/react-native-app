import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import style from 'view/style'
import Tab2 from 'view/components/SetcallforwardTab'
import Tab3 from 'view/pages/setdnd'
import {
    Container,
    Header,
    Left,
    Right,
    Body,
    Title,
    Button,
    Icon,
    Text,
    Fab,
    Footer,
    Content,
    FooterTab,
    Tab,
    Tabs,
    ScrollableTab 
} from 'native-base'
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Input,
    FlatList,
    ActivityIndicator,
    } from 'react-native';

import {
    DrawerActions,
} from 'react-navigation-drawer'

const { appStyle, homeStyle } = style
import RNRestart from 'react-native-restart'; 
const token = AsyncStorage.getItem('token');

class get_nebenstelle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('data'),
            number: "",
            content: [],
            isLoading: true,
            item_state: '',
            active: false,
            ModalVisible_getpersonnebenstelle: false,
            dataArr: [],
            test_color: 'false',
            activate_nebenstelle: ''
        };
    } 
    componentDidMount() {
        this.get_nebenstellen() //  will first query all active extensions /Nebenstellen            
    }
    get_nebenstellen = async () => { //gets all active extensions for the token 
        const token = await AsyncStorage.getItem('token');
           fetch('http://192.168.1.17/awi/api/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: JSON.parse(token).data,
                action: 'getpeersoncuserbytoken',
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    content: Object.keys(responseJson.data.peer).map(
                        peer => responseJson.data.peer[peer])  // response send to flatlist
                })
            })
              
            .catch((error) => {
                console.error(error);
                alert(JSON.stringify(error))
            });
          }
    activate = async (id  , index) => { // can activate the deactive extensions here
        const token = await AsyncStorage.getItem('token');
        const peer = {};
        this.state.content.forEach((item, i) => {
           peer[i] = {
            peerId: item.peerId,
            active: item.active
         
          };
          console.log('i',i,'ppp', peer[i])
        });
      return  fetch('http://192.168.1.17/awi/api/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: JSON.parse(token).data,
                action: 'setpeersoncuserbytoken',
                "preset": 1,
                peer
            }),
            
        })
        .then((response) => response.json())
              .then((responseJson) => {   
             })
            .catch((error) => {
                console.error(error);
                alert(JSON.stringify(error))
            });
    }
    deactivate = async (id, index) => { //the active extensions can be deactivated here
        const token = await AsyncStorage.getItem('token');
        const peer = {};
        this.state.content.forEach((item, i) => {
          console.log('item.id', item.peerId)
          peer[i] = {
            peerId: item.peerId,
            active: item.active
         
          };
         
        });
      return  fetch('http://192.168.1.17/awi/api/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: JSON.parse(token).data,
                action: 'setpeersoncuserbytoken',
                "preset": "1",
                peer
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    statment: 'offline'
                })
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
                alert(JSON.stringify(error))
            });
    }
    _logout = async () => { 
        try {
          await  AsyncStorage.clear()
          this.props.navigation.navigate('Splash')
            RNRestart.Restart();
            this.setState({
                isLoggedin:false
            })
            this.props.navigation.navigate('Home')
        }
     catch(e) {

         alert('can not response')
     }
    }
    render() {
        return (
            <Container style={appStyle.container}>
                <Header style={appStyle.header}>
                    <Body>
                        <Title>Übersicht Nebenstellen</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                            <Icon name='more' />
                        </Button>
                    </Right>
                </Header>
                <Tabs renderTabBar={()=> <ScrollableTab />} style={{ borderWidth: 0}}>
                    <Tab heading="NebenStellen" activeTabStyle={appStyle.tabStyle} tabStyle={appStyle.headlineTab} >
                        <View style={appStyle.content}>
                            <View >
                             <Text style={styles.txt}>{`Benutzer ${this.state.data.responseJson.status_message}`}</Text>   
                             
                                <FlatList data={this.state.content}  // here created our Button
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item , index}) =>
                                        <View style={styles.btn1}>
                                            <Text style={{ paddingRight: 20 }}> Nummer : {item.peerName}</Text>
                                            {console.log('index', index , item.active)}
                                            <Button
                                                style={item.active == 1 ? styles.on : styles.off }
                                                onPress={() => {
                                                    const state = { ...this.state };
                                                      const temp = state.content.map(field => {
                                                         if (field.peerId === item.peerId) {
                                                            if (field.active == 1) {
                                                               
                                                                console.log('field.peerId in deactivate' , field.peerId)
                                                                this.deactivate(field.peerId, index);
                                                          
                                                               field.active = 0
                                                              //  item.active= 0
                                                            } else {
                                                                console.log('field.peerId in activate' , field.peerId)
                                                                this.activate(field.peerId , index );
                                                               field.active = 1
                                                             // item.active=1

                                                            }
                                                         }
                                                        return field
                                                    })
                                                    this.setState({ content: temp  });
                                                }}>
                                                <Text style={{ color: '#52524b' }} >{item.active == 0 ? 'Of' : 'On'}</Text>

                                            </Button>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </Tab>
                    <Tab heading="Weiterleitungen" tabStyle={appStyle.headlineTab} activeTabStyle={appStyle.tabStyle}>
                       <Tab2/>
                    </Tab>
                    <Tab heading="Anrufbeantworter" tabStyle={appStyle.headlineTab} activeTabStyle={appStyle.tabStyle}>
                      <Tab3/>
                    </Tab>
                </Tabs>

                <Footer >
                    <FooterTab style={appStyle.footer}>
                        <Button onPress={() => this._logout()}>
                            <Text style={appStyle.footer_text}>abmelden</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
};

export default get_nebenstelle;
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10
    },
    sub_content: {
        padding: 15
    },
    btn: {
        marginRight: 15


    },
    btn1: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: 'row'

    },
    off: {
        backgroundColor: '#b0aba9',
        padding: 5,
        marginBottom: 8

    },
    on: {
        backgroundColor: '#f3f398',
        padding: 5,
        marginBottom: 8
    }

})

