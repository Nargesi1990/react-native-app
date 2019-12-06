import React, { Component } from 'react';
import { name as appName } from '../../../../app.json';
import AsyncStorage from '@react-native-community/async-storage';
import style from 'view/style'

import {
 StyleSheet,
 View,
 TouchableOpacity,
 BackHandler
} from 'react-native';

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
  Footer,
  Content,
  FooterTab,
} from 'native-base'

const { appStyle, homeStyle } = style

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNRestart from 'react-native-restart';


class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = { showScanner: false, data: '', ButtonStateHolder: false };
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handlrBackButton)
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }
  handlrBackButton = async () =>
  {
    const token = await AsyncStorage.getItem('token');
   if (!token)
      this.props.navigation.navigate('Home')
    else
      this._logout()
    return true;
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
  onSuccess = async (e) => {
    console.log(typeof e)
    fetch('http://192.168.1.17/awi/api/rest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: e.data,
        action: 'getcallfordwardingoncuserbytoken',
        }),
    })
      .then((response) => response.json())
      .then(async(responseJson) => {
        this.setState({ showScanner: true });
        this.setState({
          data: { responseJson },
          ButtonStateHolder: true
        })
        console.log(responseJson)
        if (responseJson.status_message == "token not valid"){
          alert('token not valid');
          this.setState({
            ButtonStateHolder: false
           })
 
        } else{
          await AsyncStorage.setItem('token', JSON.stringify(e))
       }
     })
        .catch((error) => {
          alert('kann nur den token von 192.168.1.17/rest/api abrufen')
      });
  }
 render() {
    const { hasCameraPermission, focusedScreen } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (focusedScreen){
      return (
 <Container style={appStyle.container}>
   <Header style={appStyle.header}>
     <Left>
      <Button transparent onPress={() => this.handlrBackButton()}>
        <Icon name='arrow-back' style={appStyle.headerIcon} />
          </Button>
            </Left>
            <Body>
            <Title>QRCode Scanen</Title>
            </Body>
            <Right>
            </Right>
  </Header>  
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <QRCodeScanner
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  halten Sie die Kamera
            </Text>
              }
              bottomContent={
                this.state.ButtonStateHolder ?
                  <TouchableOpacity  style={homeStyle.btn_home}  onPress={() => this.props.navigation.navigate('get_nebenstelle',{data: this.state.data})}>
                    <Text style={homeStyle.textstyle} >WEITER</Text>
                  </TouchableOpacity>
                  :
                  <View style={homeStyle.offbuttonTouchable} onPress={() => this.props.navigation.navigate('get_nebenstelle')}>
                    <Text style={homeStyle.textstyle} >WEITER</Text>
                  </View>
              }
            />
           </View>
        </View>

        <Footer >
           <FooterTab style={appStyle.footer}>
              <Button  onPress={() => this.handlrBackButton()}>
               <Text style={appStyle.footer_text}>Rückseite</Text>
               </Button>
           </FooterTab>
          </Footer>
        </Container>    
      );
    } else {
      return <View />;
    }
 }
}

const styles = StyleSheet.create({
  centerText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#0c0d0c',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  scanner: {
    backgroundColor: 'red',
    alignItems: 'center',
    width: 100,
    height: 100
  },
  btns: {
    backgroundColor: '#DB9E23',
    marginBottom: 20,
    height: 50,
    width: 200,
    color: '#0e3f76',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scannerview: {
    width: 100,
    height: 300,
    alignItems: 'center',
    borderColor: '#4a4a4a'

  }

});

export default Qrcode;

