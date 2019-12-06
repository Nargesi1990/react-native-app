import React, { Component } from 'react';
import { name as appName } from '../../../../app.json';
import style from 'view/style'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch
} from 'react-native';

import {
  CheckBox,
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  ListItem,
  Content,
  List,
  Alert
} from 'native-base'

const { appStyle, homeStyle } = style

import AsyncStorage from '@react-native-community/async-storage';

class SetDnd extends Component {

  componentDidMount() {
    this.get_dnd()
}

  constructor(props) {
    super(props);
    this.state = {
      number: "",
      data: '',
      content: [],
      chkbox_chk: false, 
      ButtonStateHolder: false
    }
  }
  get_dnd = async () =>{
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.1.17/awi/api/rest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: JSON.parse(token).data,
        action: 'getdndoncuserbytoken',
        }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson.data)
       if (responseJson.data ){
         this.setState({
          content: responseJson.data,
          chkbox_chk : true
        })} 
      else if(responseJson.data === null)
         {    
         this.setState({
           chkbox_chk: false
         })
       }})
      .catch((error) => {
        console.error(error);
        alert('Es ist ein Fehler aufgetreten222')
      });
  }
  set_dnd = async () => {
    const token = await AsyncStorage.getItem('token');
     fetch('http://192.168.1.17/awi/api/rest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: JSON.parse(token).data,
          action: 'setdndoncuserbytoken',
          dnd: this.state.chkbox_chk,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
         alert('aktived')
          this.setState({
            content: responseJson.data
          })
        })
        .catch((error) => {
          console.error(error);
          alert('Es ist ein Fehler aufgetreten')
        });
    }
   set_dnd_deactive = async () => {
      const token = await AsyncStorage.getItem('token');
      fetch('http://192.168.1.17/awi/api/rest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: JSON.parse(token).data,
            action: 'setdndoncuserbytoken',
            dnd: 0,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
                alert('deactived')  
          })
          .catch((error) => {
            console.error(error);
            alert('fehler')
          });
      }
  toggle = async () => {
    if (this.state.chkbox_chk == 0) {
      this.setState({ chkbox_chk: true })
      this.set_dnd()
    }
    else {
      this.setState({ chkbox_chk: false})
      this.set_dnd_deactive()
    }
  }
  render() {
    return (
      <Container style={appStyle.container}>
        <View style={appStyle.content_dnd}>
            <ListItem
            >
           <Text style={{ fontWeight: 'bold' }}>
              Anrufbeantworter aktivieren
            </Text>
          </ListItem>
        <Switch   style={{paddingLeft:20}}
           value = {this.state.chkbox_chk}
           onValueChange = { this.toggle}/> 
           <Text style={{fontWeight: '500',color:'#141823',paddingLeft:20}}>Aktive / Deaktive</Text>
        </View>
   </Container>
    )
  }}
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
  }
});
export default SetDnd;

