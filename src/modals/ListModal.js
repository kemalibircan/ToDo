import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import { selectListModalVisible, selectNewListModalVisible, toggleListModalVisible, toggleNewListModalVisible } from '../slices/modalSlice';
import { useSelector,useDispatch } from "react-redux";
import ListItem from '../items/ListItem';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DetailModal from './DetailModal';
import NewListModal from './NewListModal';
import { selectUserId, selectUsername } from '../slices/userProfileSlice';
import { selectTaskCounter } from '../slices/taskSlice';



const ListModal = () => {
  const [listData, setListData] = useState();
  const selectModalVisible = useSelector(selectListModalVisible);
  const dispatch = useDispatch();
  const selectNewModalVisible = useSelector(selectNewListModalVisible)
  const selectName= useSelector(selectUsername)
  const selectId = useSelector(selectUserId)
  const taskCounter = useSelector(selectTaskCounter)
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/list/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user_id": selectId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setListData(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Kullanıcıya hata mesajı gösterebilirsiniz
    }
  };

  useEffect(() => {
    fetchData();
  },[selectNewModalVisible,taskCounter]);
  useEffect(() => {
    fetchData();
  },[]);

  const itemList = ({ item }) => {
    return (
      <ListItem data={item}></ListItem>
    );
  };

  return (
    <Modal
      style={{ flex: 1, margin: 0 }}
      statusBarTranslucent={true}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={"slideInLeft"}
      animationOut={"slideInRight"}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={1}
      backdropColor={'white'}
    >
      <DetailModal />
      <NewListModal />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.hosgeldinText}>Hoşgeldin</Text>
          <Text style={styles.username}>{selectName}</Text>
        </View>

        <FlatList
          style={styles.flatList}
          renderItem={itemList}
          data={listData}
        />

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
    flex:1,
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