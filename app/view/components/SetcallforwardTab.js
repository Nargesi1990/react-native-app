import React, { Component } from 'react';
import style from 'view/style'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

import {
  Container
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';
const { appStyle, homeStyle } = style
const BLUE = '#3b4fb6'
const LIGHT_GRAY = '#8d8d8b'

class SetCallForward extends Component {
  static navigationOptions = {
    drawerLabel: 'Setcallforward'
  }
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      data: '',
      isFocused: false
    };
  }
  componentDidMount(){
    this.get_callforward()
  }
  get_callforward = async() => {
      const token = await AsyncStorage.getItem('token');
              fetch('http://192.168.1.17/awi/api/rest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token: JSON.parse(token).data,
                action: 'getcallfordwardingoncuserbytoken',
              }),
           })
              .then((response) => response.json())
               .then((responseJson) => {
                console.log('in ja negah kon',JSON.stringify(responseJson))
                if (responseJson.data == null) {
                  this.setState({
                    data: 'es gibt keine aktuelle Weiterleitung Nummer'
                  })
                }
                else {
                  this.setState({
                    data: responseJson.data.destination
                  })
                }
              }
               )
                  .catch((error) => {
                    console.error(error);
                    alert(JSON.stringify(error));
                  });
       } 
  set_callforward = async () => {
    const token = await AsyncStorage.getItem('token');
    if (this.state.number == ''){
      alert('keine Data vorhanden')
    }
    else{
    fetch('http://192.168.1.17/awi/api/rest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: JSON.parse(token).data,
        action: 'setcallfordwardingoncuserbytoken',
        destination: this.state.number
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert('Die Weiterleitungsnummer wurde eingesetzt')
        this.setState({
          data:responseJson.data.destination
        })
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
        alert(JSON.stringify(error));
      });
  }}
  handelFocus = event => {
    this.setState({ isFocused: true })
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }
  handelBlur = event => {
    this.setState({ isFocused: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  render() {
    const { isFocused } = this.state
    const { onFocus, onBlur } = this.props
    return (
   <ScrollView> 
    <KeyboardAvoidingView>   
      <Container style={appStyle.container}>
        <View style={{ paddingTop:25, alignContent:'center', alignItems:'center', alignSelf:'center', margin:10 }}> 
      <Text style= {{paddingTop:12,fontWeight: '500',paddingLeft:7, color: '#141823',fontSize:18, marginBottom:25 }}>
          Weiterleitungsnummer :{this.state.data}
     </Text>  
          <TextInput
            dataDetectorTypes= 'phoneNumber'
            value={this.state.number}
            selectionColor={'#f47621'}
            underlineColorAndroid={
              isFocused ? BLUE : LIGHT_GRAY
            }
            onFocus={this.handelFocus}
            onBlur={this.handelBlur}
            multiline
            style={styles.input_text}
            onChangeText={(text) => this.setState({ number: text })}
            placeholder="Geben sie Ihre Telefonsnummer ein"

          >
          </TextInput>
          <TouchableOpacity
            style={appStyle.btn_fwd}
            onPress={(this.set_callforward)}>
            <Text style={homeStyle.textstyle}>
              Bestätigen
           </Text>
          </TouchableOpacity>
          </View>
       </Container>
       </KeyboardAvoidingView>
     </ScrollView>    
    )

  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB9E23'
  },
  txt: {
    backgroundColor: '#fafaed',
    alignItems: 'center',
    height: 100,
    width: 200,
  },

  input_text: {
    width: 250,
    height: 50,
    paddingLeft: 6,
    alignItems: 'center'
  },
  
});


export default SetCallForward;

