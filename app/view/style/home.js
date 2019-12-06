
import { StyleSheet } from 'react-native'

import theme from './theme'

const { colors } = theme

const styles = StyleSheet.create({
  contentText: {
      fontSize: 25, 
      fontWeight: '900',
      marginBottom: 10, 
      marginTop: 10    
  },
  flatList: {
      marginBottom: 20 
  },
  flatListView: {
      width: '100%'
  },
  renderItemTouchable: {
      backgroundColor: colors.link, 
      borderRadius: 5, 
      marginBottom: 5,
      padding: 5    
  },
  buttonTouchable:{
    backgroundColor:colors.link, 
    padding: 5,
    borderRadius: 5, 
    marginTop:40,
    width:150,
    height:40,
    alignItems:'center',
  },
  btn_home:{
    backgroundColor:colors.btn_color, 
    borderRadius: 5, 
    marginTop:40,
    padding: 5,
    width:150,
    height:40,
    alignItems:'center',
    justifyContent:'center'
    
  },
  btn_modal:{
    backgroundColor:colors.link, 
    padding: 5,
    borderRadius: 5, 
    marginTop:40,
    width:120,
    height:30,
    alignItems:'center'
  },
  offbuttonTouchable:{
  backgroundColor:colors.gray, 
  padding: 5,
  borderRadius: 5, 
  marginTop:40,
  width:150,
  height:40,
  alignItems:'center',
  },
  textstyle:{
    color:'white',
    padding:5
  },
  btn_lable:{
    color:'white',
    padding:5 ,
    fontSize:10
  },
  inputtextview:{
      margin:5,
      backgroundColor:'#DDFFF5',
      borderColor:colors.secondary,
      borderRadius:4,
      borderWidth:1,
      width:200
  },
  backgroundStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalBox: {
    width:250,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding:15
  }


})

export default styles
