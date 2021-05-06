import React, {useState, useEffect} from 'react';
import { Text, View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Icon, ListItem  } from 'react-native-elements';
import {connect} from 'react-redux'

import socketIOClient from "socket.io-client";


var socket = socketIOClient("http://192.168.0.155:3000/");
// var socket = socketIOClient("http://localhost:3000/");

// const list = [
//   {
//     name: 'Alex',
//     message: 'Parfait et toi ?'
//   },
//   {
//     name: 'John',
//     message: 'Coucou ça roule ?'
//   }
// ]

function ChatScreen(props) {

  const [currentMessage, setCurrentMessage] = useState('');
  const [listMessage, setListMessage] = useState([]);

  useEffect( () => {
    socket.on('sendMessageAll', (newMessage)=> {
      console.log('newMessage : ', newMessage);
      setListMessage([...listMessage, newMessage]);
      setCurrentMessage('');
    });
  }, [currentMessage] )

  return (
    <View style={{flex:1}}> 
      <ScrollView style={{flex:1, marginTop: 30}}>
        {
          listMessage.map((line, index) => (

              <ListItem key={index} bottomDivider>
                <ListItem.Content
                  containerStyle = {{marginBottom: 25, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                >
                  <ListItem.Title>{line.message}</ListItem.Title>
                  <ListItem.Subtitle>{line.pseudo}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
          ))
        }
      </ScrollView>
      <Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}
      placeholder='Your message'
      value={currentMessage}
      onChangeText={ (text) => setCurrentMessage(text) }
      />
    <Button buttonStyle={{backgroundColor:'#db5952'}}
      icon={<Icon
        name='paper-plane'
        type='font-awesome'
        size={25}
        color="white"
        style={{marginRight:10}}
      />}
      title='Send' 
      onPress={ () => socket.emit('sendMessage', {message:currentMessage, pseudo:props.userPseudo}) }
      />
    </View>
  );
 }

 function mapStateProps(state) {
   return {userPseudo: state.pseudo}
 }

 export default connect(mapStateProps, null)(ChatScreen);

 const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: 'center',
  },
  });

        