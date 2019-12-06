import { StyleSheet } from 'react-native'

import theme from './theme'

const { colors, fonts: { fontFamily } } = theme

const styles = StyleSheet.create({
  center: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor:colors.wall
  },
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
    
  },
  content_dnd: {
    alignItems: 'flex-start',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    paddingLeft:14
    
  },
  content_token: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:100
    
  },
  content_edit: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    position:'absolute',
    left:20,
    top:50
  },
  defaultLink: {
    color: colors.link,
    fontFamily    
  },
  defaultText: {
    color: colors.font,
    fontFamily    
  },
  font: {
    color: colors.font
  },
  fontFamily: {
    fontFamily
  },
  headerIcon: {
    color: colors.icon_color,
    fontSize: 25    
  },
  icon: {
    color: colors.link,
    fontSize: 30,
    lineHeight: 50,
    paddingLeft: 10, 
    paddingRight: 10
  },
  white: {
    backgroundColor: colors.white
  },
  whiteFont: {
    color: colors.white
  },
  whiteLink: {
    color: colors.white,
    fontFamily    
  },
  header:{
    backgroundColor: colors.header,
    borderColor: 'white'
  },
  footer:{
    backgroundColor: colors.footer,

  },
  footer_text:{
    color:'#9d9490',
    fontSize:12,
    fontWeight: '500'
   
  },
  tabStyle:{
    backgroundColor:colors.header,
    
  },
  headlineTab:{
    backgroundColor: colors.header,
  

  },
  btn:{
    backgroundColor:colors.btn_color, 
    borderRadius: 5, 
    marginTop:40,
    padding: 5,
    width:150,
    height:40,
    alignItems:'center',
    justifyContent:'center'
    
  },
  btn_token:{
    backgroundColor:colors.btn_color, 
    borderRadius: 5, 
    marginTop:5,
    padding: 5,
    width:150,
    height:40,
    alignItems:'center',
    justifyContent:'center'
    
  },
})

export default styles
