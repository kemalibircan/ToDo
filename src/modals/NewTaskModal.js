import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import Modal from 'react-native-modal'
import { selectDetailModalVisible, selectListModalVisible, selectNewListModalVisible, selectNewTaskModal, toggleDetailModalVisible, toggleNewListModalVisible, toggleNewTaskModalVisible  } from '../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../slices/userProfileSlice';
import { selectTaskId } from '../slices/taskSlice';
const NewTaskModal = () => {
               const selectModalVisible = useSelector(selectNewTaskModal);
               const [userId, setUserId] = useState('your_user_id');
  const [listName, setListName] = useState('');
  const selectId = useSelector(selectUserId)
  const listId = useSelector(selectTaskId)

  const handleInputChange = (inputText) => {
    setListName(inputText);
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/task/create', {
        method: 'POST',
        headers: {
        
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: selectId,
          list_id:listId,
          content:listName
        }),
      });
    } catch (error) {
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
                              <TextInput onChangeText={handleInputChange} value={listName} placeholder='Görevinizi Girin...' style={styles.textInput}></TextInput>
                              <TouchableOpacity style={styles.button} onPress={() => {
                                              handleSubmit()
                                              setListName('')
                                             dispatch(toggleNewTaskModalVisible(false))
                                             }}>
                                             <Text style={{color:'white',fontSize:20}}>Oluştur</Text>
                              </TouchableOpacity>
                              </View>
               </View>
               </Modal>
  )
}

export default NewTaskModal

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