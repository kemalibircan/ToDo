import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.toDoContainer}>
    <Text style={styles.to}>Yapılacaklar</Text>
    <Text style={styles.do}>Listesi</Text>
    </View>
    <View style={styles.bottomContainer}>

 
  <View style={styles.inputPlaceContainer}>
<TextInput placeholderTextColor={'white'} placeholder='Kullanıcı Adınız' style={styles.userNameInput}></TextInput>
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>Giriş Yap</Text>
</TouchableOpacity>
</View>
<View>
  <Text style={styles.wibesoft}>
    Bu uygulama 
    <Text style={styles.textWibesoft}> Wibesoft </Text> adına yapılmıştır.
  </Text>
</View>
</View>
   </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#1E90FF'
  },
  userNameInput:{
   marginTop:25,
  padding:15,
  textAlign:'center',
  height:55,
  width:265,
  borderRadius:8,
  borderWidth:1,
  borderColor:'white',
  color:'white',
  fontSize:19
  },
  button:{
    marginTop:25,
    borderRadius:8,
    borderWidth:1,
    height:55,
    width:265,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'white',
    backgroundColor:'white'
  },
  buttonText:{
color:'#1E90FF',
fontSize:22,
fontWeight:'600'
  },
  to:{
    fontSize:55,
    fontWeight:'700',
    color:'white',
  },
  do:{
    fontWeight:'700',
    fontSize:55,
    marginLeft:150,
  },
  toDoContainer:{
marginLeft:5,
marginTop:35,
flexDirection:'column',

  },
  inputPlaceContainer:{
width:'100%',
justifyContent:'center',
alignItems:'center',
marginTop:30
  },
  wibesoft:{
    color:'white',
    fontSize:16,
    
  },
  bottomContainer:{
    flex:1,
  alignItems:'center',
justifyContent:'space-around',
marginBottom:20
  },
  textWibesoft:{
    fontSize:16,
    color:'black',
    fontWeight:'600'
  }


})