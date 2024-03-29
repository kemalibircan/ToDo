import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import Modal from 'react-native-modal'
import { selectDetailModalVisible, selectListModalVisible, selectNewListModalVisible, toggleDetailModalVisible, toggleNewListModalVisible  } from '../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ModalItem from '../items/ModalItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailModal from './DetailModal';
import { selectUserId } from '../slices/userProfileSlice';
const NewListModal = () => {
               const selectModalVisible = useSelector(selectNewListModalVisible);

               const [userId, setUserId] = useState('your_user_id');
  const [listName, setListName] = useState('');
  const [listIcon, setListIcon] = useState('your_list_icon');
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const selectId = useSelector(selectUserId)

  const handleInputChange = (inputText) => {
    setListName(inputText);
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/list', {
        method: 'POST',
        headers: {
          // Include authentication headers if necessary
          // 'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: selectId,
          list_name: listName,
        }),
      });
    } catch (error) {
      setError(error.message); // Set error message for UI display
      console.error('Error creating list:', error);
    } 
  };



  const dispatch = useDispatch()
  return (
               <Modal
               style={{flex: 1, margin: 0}}
               statusBarTranslucent={true}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={"slideInLeft"}
               animationOut={"bounceOutUp"}
               animationInTiming={500}
               animationOutTiming={500}
               backdropOpacity={.7}
               backdropColor={'blue'}>
               <View style={styles.container}>
                              <View style={styles.middleContainer}>
                              <TextInput onChangeText={handleInputChange} value={listName} placeholder='Liste başlığı girin.' style={styles.textInput}></TextInput>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                              handleSubmit()
                                              setListName('')
                                             dispatch(toggleNewListModalVisible(false))
                                             }}>
                                             <Text style={{color:'white',fontSize:20}}>Oluştur</Text>
                              </TouchableOpacity>
                              </View>
               </View>
               </Modal>
  )
}

export default NewListModal

const styles = StyleSheet.create({

               container:{
                              flex:1,
                              justifyContent:'center',
                              alignItems:'center'          
                    },
                    textInput:{
                              backgroundColor:'white',
                              padding:10,
                              height:65,
                              width:250,
                              borderRadius:9,
                              textDecorationLine:'underline',
                              fontSize:20,

                    },
                    button:{
                              backgroundColor:'#1E90FF',
                              padding:10,
                              height:65,
                              width:250,
                              borderRadius:9,
                              justifyContent:'center',
                              alignItems:'center',
                              marginTop:20
                    },
                    middleContainer:{
                              backgroundColor:'white',
                              padding:25,
                              borderRadius:9,
                              justifyContent:'center',
                              alignItems:'center'

                    }
})