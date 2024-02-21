import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import { toggleListModalVisible } from './src/slices/modalSlice'
import ListModal from './src/modals/ListModal'
import { setUserId, setUsername } from './src/slices/userProfileSlice'
import { selectTaskCounter, setTaskCounter } from './src/slices/taskSlice'


const AppWrapper = () => {
  return (
    <Provider store={store}> 
      <App /> 
    </Provider>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [userName,setUserName] = useState()

  const taskCounter = useSelector(selectTaskCounter)
  const handleInputChange = (inputText) => {
    setUserName(inputText);
  };

  const handleData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setUsername(data.message[0].username))
      dispatch(setUserId(data.message[0].id))
      dispatch(setTaskCounter(taskCounter+1))
    } catch (error) {
      console.error('Error fetching data:', error);
      // Kullanıcıya hata mesajı gösterilebilir
    }
  };
  


  return (
   <SafeAreaView style={styles.container}>
    <ListModal></ListModal>
    <View style={styles.toDoContainer}>
    <Text style={styles.to}>Yapılacaklar</Text>
    <Text style={styles.do}>Listesi</Text>
    </View>
    <View style={styles.bottomContainer}>
  <View style={styles.inputPlaceContainer}>
<TextInput onChangeText={handleInputChange} value={userName} placeholderTextColor={'white'} placeholder='Kullanıcı Adınız' style={styles.userNameInput}></TextInput>
<TouchableOpacity 
onPress={ () => {
  handleData()
  dispatch(toggleListModalVisible(true))
  dispatch(setTaskCounter(taskCounter+1))
}}
style={styles.button}>
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

export default AppWrapper
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
  },
  textWibesoft:{
    fontSize:16,
    color:'black',
    fontWeight:'600'
  }


})