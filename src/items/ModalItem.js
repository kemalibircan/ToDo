import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const ModalItem = ({ data }) => {
  const [completed, setCompleted] = useState(false);

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
              <FontAwesome5Icon name="circle" size={17} />
              <Text style={[styles.itemText, completed && styles.completedText]}>Textler</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      renderHiddenItem={() => (
        <TouchableOpacity style={styles.deleteContainer}>
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
  },
  deleteContainer: {
    flex: 1,
    backgroundColor: 'red',
    width: 75,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position: 'absolute',
  },
});
