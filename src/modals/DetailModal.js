import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { selectDetailModalVisible, selectListModalVisible, toggleDetailModalVisible  } from '../slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ModalItem from '../items/ModalItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailModal = () => {

  const selectModalVisible = useSelector(selectDetailModalVisible);

  const dispatch = useDispatch()
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
      <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerLeftContainer}>

      <TouchableOpacity style={styles.backButton} onPress={() => dispatch(toggleDetailModalVisible(false))}>
      <Ionicons name="arrow-back-outline" color={'white'} size={30}></Ionicons>
      </TouchableOpacity>
      <Text style={styles.name}>Ali</Text>
      </View>
      <TouchableOpacity style={styles.trashButton}>
    <Ionicons name="trash" color={'white'} size={30}></Ionicons>
    </TouchableOpacity>
    </View>
    <FlatList
    data={[{},{}]}
    renderItem={DetailModalItem}
    />
    <TouchableOpacity style={styles.stickyButton}>
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