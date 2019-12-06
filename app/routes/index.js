import {  createDrawerNavigator } from 'react-navigation-drawer'
import {  createStackNavigator } from 'react-navigation-stack'
import {  createAppContainer } from 'react-navigation'

import HomeScreen from 'view/pages/home'
import splash from 'view/pages/splash'
import Manuell_Input from 'view/pages/manuell'
import qrcode from 'view/pages/qrcod'
/* import CustumDrawer from 'view/components/CostumDrawer'
import SetcallforwardTab from 'view/components/SetcallforwardTab'
import SetCallforward from 'view/pages/setcallforward'
import SetDnd from 'view/pages/setdnd'
import get_nebenstelle from 'view/pages/nebenstelle'
import SetDndExtra from 'view/pages/SetDndEXtraSeite' */ 

const MyDrawerNavigator = createDrawerNavigator({
 
  Spalsh:splash,
  Home: HomeScreen,
  Manuell_Input: Manuell_Input,
  Qrcode : qrcode,

},
  {
   
    headerMode: 'none',
     initialRouteName: 'Home',
  })
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,



  },
  

)
 

export default createAppContainer(MyDrawerNavigator)
