import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDetailModalVisible, toggleEditModalVisible } from '../slices/modalSlice';
import { selectTaskCounter, setEditTaskId, setTaskCounter, setTaskId, setTaskName } from '../slices/taskSlice';

const ListItem = ({ data }) => {
  const dispatch = useDispatch();
  const [listItems, setListItems] = useState([data]); 
  const taskCounter = useSelector(selectTaskCounter)// State'i tanımla ve başlangıçta data ile doldur

  const handleDelete = async () => {
    try {
      if (!data || !data.list_id) {
        throw new Error('Missing list_id in data object');
      }

      // Silme işlemi
      await fetch('http://localhost:3001/api/v1/list/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          list_id: data.list_id,
        })
        ,
      }).then(data => data.json()).then(data => console.log(data.message));

      dispatch(setTaskCounter(taskCounter+1))

    } catch (error) {
      console.error('Error deleting list:', error);
      // Hata durumunda kullanıcıya bilgilendirme yap
    }
  };

  return (
    <SwipeListView
      style={{ flex: 1, padding: 5, marginTop: 10 }}
      data={listItems} // Güncellenmiş listeyi kullan
      renderItem={() => {
        return (
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                dispatch(setTaskName(data.list_name))
                dispatch(setTaskId(data.list_id))
                dispatch(toggleDetailModalVisible(true))}}
              style={styles.itemContainer}>
              <FontAwesome5Icon name="list" size={17}></FontAwesome5Icon>
              <Text style={styles.itemText}>{data.list_name}</Text>
            </TouchableOpacity>
          </View>
        )
      }}
      renderHiddenItem={() => (
        <View style={{ flexDirection: 'row', }}>

          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
            style={styles.deleteContainer}>
            <Text style={styles.deleteTextRight}>Sil</Text>
          </TouchableOpacity>

        </View>
      )}
      rightOpenValue={-125}
    />
  )
}

export default ListItem;

const styles = StyleSheet.create({
  contaniner: {
    flexDirection: 'row',
    height: 65,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemText: {
    marginLeft: 20,
    fontSize: 20, fontWeight: '500'
  },
  editContainer: {
    backgroundColor: 'green',
    width: 65,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editTextLeft: {
    color: 'white',
    fontSize: 12
  },
  deleteTextRight: {
    color: 'white',
    fontSize: 13
  },
  deleteContainer: {
    backgroundColor: 'red',
    width: 65,
    padding: 5,
    right:0,
    position:'absolute',
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
