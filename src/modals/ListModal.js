import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Modal from "react-native-modal";
import { selectListModalVisible, toggleListModalVisible, toggleNewListModalVisible } from '../slices/modalSlice';
import { useSelector,useDispatch } from "react-redux";
import ListItem from '../items/ListItem';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DetailModal from './DetailModal';
import NewListModal from './NewListModal';



const ListModal = () => {

  const selectModalVisible = useSelector(selectListModalVisible);
  const dispatch = useDispatch();


  const itemList = ({item}) => {
    return(
      <ListItem data={item}></ListItem>
    )

  }
  return (
    <Modal
    style={{flex: 1, margin: 0}}
    statusBarTranslucent={true}
    isVisible={selectModalVisible}
    hasBackdrop={true}
    animationIn={"slideInLeft"}
    animationOut={"slideInRight"}
    animationInTiming={500}
    animationOutTiming={500}
    backdropOpacity={1}
    backdropColor={'white'}>
            <DetailModal></DetailModal>
            <NewListModal></NewListModal>

     <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.hosgeldinText}>Hoşgeldin</Text>
      <Text style={styles.username}>Ali</Text>
      </View>
      
      <FlatList
      style={styles.flatList}
      renderItem={itemList}
      data={[{},{},{}]}
      >
      </FlatList>
      
      <TouchableOpacity style={styles.bottomContainer} onPress={() => dispatch(toggleNewListModalVisible(true))}>
        <FontAwesome5Icon name={"plus"} color={"#1E90FF"} size={35}></FontAwesome5Icon>
        <Text style={styles.bottomText}>Yeni Liste</Text>
      </TouchableOpacity>
     </SafeAreaView>
      
    </Modal>
  )
}

export default ListModal

const styles = StyleSheet.create({
  container:{flex:1
  },
  hosgeldinText:{
    fontSize:20,
    fontWeight:'500'
  },
  headerContainer:{
flexDirection:'row',
marginTop:15,
marginLeft:10

  },
  username:{
    marginLeft:5,
    fontSize:20,
    fontWeight:'500'
  },
  flatList:{
    marginTop:15,
    marginLeft:25,
    
  },
  bottomContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:25,
    marginLeft:25,
    width:175
  },
  bottomText:{
marginLeft:15,
fontSize:18,
fontWeight:'600',
color:"#1E90FF"
  }

})