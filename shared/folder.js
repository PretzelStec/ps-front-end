import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, ScrollView, VirtualizedList, SafeAreaView } from 'react-native';
import { DataCard }from './dataCard';

export default Folder = ({title, fl_data}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return( isOpen ?
      <View style ={{
        backgroundColor:'#aaaaaa',
        marginVertical: 15,
        borderRadius: 15,
      }}>
        <TouchableOpacity 
          onPress={() => {setIsOpen(!isOpen)}}
        >
          <Text style={{color: '#404040', paddingHorizontal:15, paddingTop:10,}} >{title}</Text>
        </TouchableOpacity>
        <FlatList 
          data={fl_data}
          renderItem={({item}) => <DataCard 
            type="password"
            title={item.title} 
            entryEmail={item.email} 
            entryPass={item.password}
            section={item.section}
            url={item.url}
            id={item._id}
          />}
          keyExtractor={item => item._id}
        />
      </View>
      :
      <View style ={{
        backgroundColor:'#aaaaaa',
        marginTop: 10,
        borderRadius: 15,
      }}>
        <TouchableOpacity 
          onPress={() => {setIsOpen(!isOpen)}}
        >
          <Text style={{color: '#404040', paddingHorizontal:15, paddingVertical:10,}} >{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }