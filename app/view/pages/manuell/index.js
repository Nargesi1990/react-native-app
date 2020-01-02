import React, { Component  } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import style from 'view/style'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard,
  BackHandler,
  Platform,
  ScrollView,
  KeyboardAvoidingView } from 'react-native';
  import {
     Container , 
     Header ,
      Left , 
      Right, 
      Button, 
      Icon, 
      Body , 
      Title,
      
  } from 'native-base'
  import {
    DrawerActions,
} from 'react-navigation-drawer'

const { appStyle, homeStyle } = style
const BLUE = '#3b4fb6'
const LIGHT_GRAY = '#8d8d8b'

class Manuell_Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin:false,
    nummber: "",
     data: "", 
     ButtonStateHolder: false ,
     isFocused: false};
     state = {showIndicator: false}
    }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handlrBackButton)
  }
  handlrBackButton = () =>
  {
    this.props.navigation.navigate('Home')
    this._logout()
    return true;
  }

  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 60000)

  handelFocus = event => {
    this.setState({ isFocused : true})
    if (this.props.onFocus){
      this.props.onFocus(event)
    }
  }
  handelBlur = event => {
  this.setState ({ isFocused : false})
  if (this.props.onBlur) {
    this.props.onBlur(event)
  }
}
  
async _getContent() { //past Token code
  let content = await Clipboard.getString();
  this.setState({nummber: content})
}
spin = async () => {
  this.setState({
    showIndicator: true
  })
}
  onsSuccess = async () => { // login user
     const token = { data: this.state.nummber} //connect with Tetxtinput
    if (this.state.nummber === "") {
      alert('Textinput is empty')
      return
    }
    return fetch('http://192.168.1.17/awi/api/rest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token.data,
        action: 'getpeersoncuserbytoken',
        ip: '192.168.1.17'
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log('log-manuell',responseJson)
        this.setState({
          data: { responseJson }
        })
         if (responseJson.status_message == "token not valid") {
          alert('token not valid');
          this.setState({
            ButtonStateHolder: false
          })
        } else {
         await AsyncStorage.setItem('token', JSON.stringify(token))
         this.setState({
           nummber:'', 
           isLoggedin: 'true'
         })  
          this.props.navigation.navigate('get_nebenstelle',{ data: this.state.data })
         }
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }
  render() {
   const animating = this.state.animating
    const { isFocused} = this.state
    const {onFocus , onBlur } = this.props
    
    return (
    <ScrollView>
      <KeyboardAvoidingView keyboardVerticalOffset={-50} behavior="padding" style={{flex:1}}> 
     <Container  style={appStyle.container}>
      <Header style={ appStyle.header}>
          <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                  <Icon name='arrow-back' style={appStyle.headerIcon} />
              </Button>
          </Left>
          <Body>
              <Title>Token eingeben</Title>
          </Body>
          <Right>


          </Right>
      </Header>
 
        <View style={appStyle.content_token}>
          <View style={{flex:2 , margin:50,flexDirection: 'row', alignItems:'center'}}>
     
              <TextInput
                dataDetectorTypes='phoneNumber'
                editable
                multiline
                placeholderTextColor='grau'
                selectionColor={'#f47621'}
                value={this.state.nummber}
                underlineColorAndroid={
                  isFocused ? BLUE : LIGHT_GRAY
                }
                onFocus={this.handelFocus}
                onBlur = {this.handelBlur}

                multiline
                style={styles.input_text}
                onChangeText={(text) => this.setState({ nummber: text })}
                placeholder="eingeben Sie Ihr Tokenscode" >                     
                </TextInput>
                <Icon name='paper'
                 onPress={() => this._getContent()} 
                 style={styles.test} 
                 />
            

            </View>       
          
            <TouchableOpacity
                 style={appStyle.btn_token}
                 onPress={() =>  this.onsSuccess()}
                 >
                   <Text style={homeStyle.textstyle} >
                     login
                   </Text>
             </TouchableOpacity>

        </View> 
       
      </Container>
      </KeyboardAvoidingView>
     </ScrollView> 
    );
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
  input_text: {
    width: 250,
    height: 40,
    margin:40,
    alignItems: 'center',
    borderBottomWidth: 2
   },


});

export default Manuell_Input;

