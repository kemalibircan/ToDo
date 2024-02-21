import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { selectDetailModalVisible, selectListModalVisible, selectNewTaskModal, toggleDetailModalVisible, toggleNewTaskModalVisible  } from '../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ModalItem from '../items/ModalItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectUsername } from '../slices/userProfileSlice';
import { selectTaskCounter, selectTaskId, selectTaskName, setTaskCounter } from '../slices/taskSlice';
import NewTaskModal from './NewTaskModal';

const DetailModal = () => {
  const [taskData,setTaskData] = useState([])
  const taskId = useSelector(selectTaskId)
  const selectVisibilty = useSelector(selectNewTaskModal)
  const selectVisibiltyDetail = useSelector(selectDetailModalVisible)

  
  const taskCounter = useSelector(selectTaskCounter)
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/task/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "list_id": taskId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTaskData(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Kullanıcıya hata mesajı gösterebilirsiniz
    }
  };

  const handleDelete = async () => {
    try {
     
      await fetch('http://localhost:3001/api/v1/list/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "list_id": taskId,
        })
        ,
      }).then(data => data.json()).then(data => console.log(data.message));
      dispatch(setTaskCounter(taskCounter+1))
      dispatch(toggleDetailModalVisible(false))

    } catch (error) {
      console.error('Error deleting list:', error);
      // Hata durumunda kullanıcıya bilgilendirme yap
    }
  };

  useEffect(() => {
    fetchData()
    dispatch(setTaskCounter(taskCounter+1))
  },[])

  useEffect(() => {
    fetchData()

  },[selectVisibilty])
  useEffect(() => {
    fetchData()

  },[selectVisibiltyDetail])
  useEffect(() => {
    fetchData()

  },[taskCounter])
  const selectModalVisible = useSelector(selectDetailModalVisible);
  const dispatch = useDispatch()
  const taskName = useSelector(selectTaskName)
  const DetailModalItem = ({item}) => {

    return(
    <ModalItem data={item}>
    </ModalItem>)
  } 
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
    backdropOpacity={1}
    backdropColor={'white'}>
      <NewTaskModal></NewTaskModal>
      <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerLeftContainer}>

      <TouchableOpacity style={styles.backButton} onPress={() => dispatch(toggleDetailModalVisible(false))}>
      <Ionicons name="arrow-back-outline" color={'white'} size={30}></Ionicons>
      </TouchableOpacity>
      <Text style={styles.name}>{taskName}</Text>
      </View>
      <TouchableOpacity 
      onPress={() => {
        handleDelete()
      }}
      style={styles.trashButton}>
    <Ionicons name="trash" color={'white'} size={30}></Ionicons>
    </TouchableOpacity>
    </View>
    <FlatList
    data={taskData}
    renderItem={DetailModalItem}
    />
    <TouchableOpacity 
    onPress={() => {
      dispatch(toggleNewTaskModalVisible(true))
    }}
    style={styles.stickyButton}>
    <Ionicons name="add-outline" color={'blue'} size={40}></Ionicons>

    </TouchableOpacity>
    </View>
    </Modal>
    
  )
}

export default DetailModal

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue'
  },
  header:{

height:65,
  marginTop:20,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'

  },
  backButton:{
    marginLeft:25,
    
  },
  trashButton:{marginRight:25,},
  headerLeftContainer:{
flexDirection:'row',
alignItems:'center'
  },
  name:{
    color:'white',
    fontSize:22,
    marginLeft:15,
    fontWeight:'700'
  },
  stickyButton:{
    backgroundColor:'white',
    padding:5,
    height:60,
    width:60,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',bottom:25,
    right:25
  }
  

})