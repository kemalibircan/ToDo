import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux';
import { toggleDetailModalVisible } from '../slices/modalSlice';



const ListItem = ({data}) => {

  const dispatch = useDispatch()
  return (
               <SwipeListView
               style={{flex:1,padding:5,marginTop:10}}
               data={[data]}
               renderItem={() => {
               return(
                <View style={{backgroundColor:'white'}}>
               <TouchableOpacity activeOpacity={.4} 
               onPress={() => dispatch(toggleDetailModalVisible(true))}
                style={styles.itemContainer}> 
                 <FontAwesome5Icon name="list" size={17}></FontAwesome5Icon>
               <Text style={styles.itemText}>Textler</Text>
               </TouchableOpacity>
               </View>

               )
               }}
               renderHiddenItem={ () => (
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

               
                              <TouchableOpacity style={styles.editContainer}>
                                <Text style={styles.editTextLeft}>Düzenle</Text>
                              </TouchableOpacity>
                                 <TouchableOpacity style={styles.deleteContainer}>
                               <Text style={styles.deleteTextRight}>Sil</Text>
                               </TouchableOpacity>
                               </View>
                          )}

            leftOpenValue={75}
            rightOpenValue={-125}
        />
  )
}

export default ListItem

const styles = StyleSheet.create({
               contaniner:{

                              flexDirection:'row',
                              height:65,
                            

               },
               itemContainer:{
                              flexDirection:'row',
                              alignItems:'center',
                        backgroundColor:'white',

               },
               itemText:{
                              marginLeft:20,
                              fontSize:20,fontWeight:'500'
               },
               editContainer:{
                backgroundColor:'green',
                width:65,
                padding:5,
                justifyContent:'center',
                alignItems:'center'
          
                
              },
              editTextLeft:{

                color:'white',
                fontSize:12
              },
              deleteTextRight:{
                color:'white',
                fontSize:12
              },
              deleteContainer:{
                backgroundColor:'red',
                width:65,
                padding:5,
                marginRight:25,
                justifyContent:'center',
                alignItems:'center'
              
              }
})