import React, { useEffect, useState } from 'react'
import { Image,View, TouchableOpacity, Text, FlatList , StyleSheet} from 'react-native'
import { Container, Header, Left, Right, Body, Title, Button, Icon ,Content,Fab} from 'native-base'
import Spalsh from 'view/pages/splash'
import i18n from 'i18n'
import gate from 'gate'
import style from 'view/style'
import Loading from 'view/components/Loading'
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions }from 'react-navigation-drawer'
import styles from '../../style/home';

const Home = (props) => {

  const { appStyle, homeStyle } = style
  const { appLang, homeLang } = i18n


  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchData = async () => {
    try {
      const response = await gate.home()
      
      setTodos(response)
      setLoading(false)
    } catch {
      // handling error
    }
  }

  useEffect(() => {
    fetchData()    
  }, [])

  const someAction = text => {
    console.log(text)
  }
  const navigationOptions = {
    drawerLabel : 'Home',
    
  }
  
     return  ( 
    <Container style={appStyle.container}>
    
      <Header style={ appStyle.header}>
        <Left>
          <Button
           style={styles.touch}  transparent 
           >
            <Icon style={appStyle.headerIcon} />
          </Button>
        </Left>
        <Body>
          <Title>LOGIN</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => someAction('search!')}>
            <Icon style={appStyle.headerIcon} />
          </Button>
        </Right>
      </Header>

      <View style={appStyle.content}>
      <Image    source={require('./ansit-com-logo.png')}  
         style={{width: 200, height: 100}} />
       
          <TouchableOpacity
           style={homeStyle.btn_home}
           onPress={() =>{ props.navigation.navigate('Qrcode');  }}>
              <Text style={homeStyle.textstyle}>
                 login mit Qrcode
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={homeStyle.btn_home} 
          onPress={() =>{ props.navigation.navigate('Manuell_Input');  }}>
              <Text style={homeStyle.textstyle}>
                 login mit Textinput
              </Text>
          </TouchableOpacity>
       

          </View>
     
    </Container>
  )
}

const vvvv = StyleSheet.create({
touch : {
  backgroundColor: 'red',
  width: 50,
  height: 50,
  justifyContent :'center',
  position: 'absolute',
  left: 10,
  top:10, 
  
},
open :{
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold'
}
})

 export default Home

