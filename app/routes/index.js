import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import HomeScreen from 'view/pages/home'
import splash from 'view/pages/splash'
import CustumDrawer from 'view/components/CostumDrawer'
import SetcallforwardTab from 'view/components/SetcallforwardTab'
import Manuell_Input from 'view/pages/manuell'
import qrcode from 'view/pages/qrcod'
import get_nebenstelle from 'view/pages/nebenstelle'
import SetDnd from 'view/pages/setdnd'
import SetDndExtra from 'view/pages/SetDndEXtraSeite'
import SetCallforward from 'view/pages/setcallforward'


const MyDrawerNavigator = createDrawerNavigator({
  Spalsh: splash,
  Home: HomeScreen,
  Manuell_Input: Manuell_Input,
  Qrcode: qrcode,
  get_nebenstelle: get_nebenstelle,
  SetDnd: SetDnd,
  SetCallforward: SetCallforward,
  SetCallforwardTab: SetcallforwardTab,
  SetDndExtra: SetDndExtra
},
  {
    contentComponent: CustumDrawer,
    headerMode: 'none',
    initialRouteName: 'Spalsh',
  })
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
)
export default createAppContainer(MyDrawerNavigator)
