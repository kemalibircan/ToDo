import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskCounter, setTaskCounter } from '../slices/taskSlice';

const ModalItem = ({ data }) => {
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch()
const counter = useSelector(selectTaskCounter)


  const handleDelete = async () => {
    try {
      // Silme işlemi
      await fetch('http://localhost:3001/api/v1/task/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: data.item_id,
        }),
      }).then(data => data.json()).then(data => console.log(data.message));;

        dispatch(setTaskCounter(counter+1))

    } catch (error) {
      console.error('Error deleting list:', error);
      // Hata durumunda kullanıcıya bilgilendirme yap
    }
  };


  const toggleCompleted = () => {
    setCompleted(!completed);
  };


  return (
    <SwipeListView
      style={{ flex: 1, padding: 5, marginTop: 5 }}
      data={[data]}
      renderItem={() => {
        return (
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={[styles.itemContainer, completed && styles.completedItem]}
              onPress={toggleCompleted}
            >
              <FontAwesome5Icon name={completed ? "check" : "circle"}  color={completed ? 'green' : 'black'}  size={17} />
              <Text style={[styles.itemText, completed && styles.completedText]}>{data.content}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      renderHiddenItem={() => (
        <TouchableOpacity
        onPress={() => {
          handleDelete()
        }}
        style={styles.deleteContainer}>
          <Text style={styles.deleteTextRight}>Sil</Text>
        </TouchableOpacity>
      )}
      rightOpenValue={-85}
    />

    
  );
};

export default ModalItem;

const styles = StyleSheet.create({
  contaniner: {
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F3F7',
    height: 55,
    paddingLeft:15
  },
  completedItem: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
    paddingLeft:15


  },
  itemText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '400',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteTextRight: {
    color: 'white',
    fontSize: 25,
    textAlign:'center',
    
  },
  deleteContainer: {
    backgroundColor: 'red',
    width: 75,
    marginRight: 10,
    height:75,
    justifyContent: 'center',
    alignItems:'center',
    paddingBottom:20,
    right: 0,
    position: 'absolute',
  },
});
