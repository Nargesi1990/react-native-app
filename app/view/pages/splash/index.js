import React , {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'native-base'
import { DrawerActions} from 'react-navigation-drawer'
class splash extends Component{
    constructor(props){
        super(props)
        console.log('props',this.props)// exite not props 
         }
    componentDidMount(){
      this.get_token()
    }
    get_token = async () => {
      const token = await AsyncStorage.getItem('token');
             if(token) {
          fetch('http://192.168.1.17/awi/api/rest', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 token: JSON.parse(token).data ,
                 action: 'getcallfordwardingoncuserbytoken',
                 ip: '192.168.1.17'
               }),
             })
               .then((response) => response.json())
               .then(async (responseJson) => {
                console.log('show', responseJson)  
                   this.props.navigation.navigate('get_nebenstelle', {data : { responseJson } } )
                                  
                 })      
               .catch((error) => {
                this.props.navigation.navigate('Home')
                 alert(JSON.stringify(error));
               });
           }  
         else{
          this.props.navigation.navigate('Home')
         }  
        }
render(){
    return(
        <View></View>
    )
}
}
export default splash;