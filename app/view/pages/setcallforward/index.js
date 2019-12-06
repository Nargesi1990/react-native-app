import React, { Component } from 'react';
import { name as appName } from '../../../../app.json';
import style from 'view/style'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,

} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Fab,
  Footer,
  Content,
  FooterTab,
  Button

} from 'native-base'
import {
  DrawerActions,
} from 'react-navigation'


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
  componentDidMount() {
    this.get_callforward()
  }

  get_callforward = async () => {
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
    if (this.state.number == '') {
      alert('keine Data vorhanden')
    }
    else {
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
          alert('die Konfigration erfolgreich ')
          this.setState({
            data: responseJson.data.destination
          })
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
          alert(JSON.stringify(error));
        });
    }
  }
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
      <Container style={appStyle.container}>
        <Header style={appStyle.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('get_nebenstelle')}>
              <Icon name='arrow-back' style={appStyle.headerIcon} />
            </Button>
          </Left>
          <Body>
            <Title>Weiterleitung </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
        <Text style={{ paddingTop: 20, fontWeight: '500', paddingLeft: 7, color: '#141823', fontSize: 13, }}>
          die aktuelle Weiterleitung-Nummer :{this.state.data}
        </Text>
        <View style={appStyle.content}>
          <TextInput
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
            placeholder="eingeben Sie Ihr Telefonsnummer"
          >
          </TextInput>
          <TouchableOpacity
            style={appStyle.btn}
            onPress={
              this.set_callforward}>
            <Text style={homeStyle.textstyle}>
              Bestätigen
           </Text>
          </TouchableOpacity>
        </View>
        <Footer >
          <FooterTab style={appStyle.footer}>
            <Button
              onPress={() => this.props.navigation.navigate('get_nebenstelle')}
            >
              <Text style={appStyle.footer_text}>Rückseite </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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
    width: 300,
    height: 40,
    paddingLeft: 6,
    alignItems: 'center'
  },
});


export default SetCallForward;

