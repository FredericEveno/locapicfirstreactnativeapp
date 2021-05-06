import React from 'react';
import { Text, View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Icon, ListItem  } from 'react-native-elements';

const list = [
  {
    name: 'Alex',
    message: 'Parfait et toi ?'
  },
  {
    name: 'John',
    message: 'Coucou ça roule ?'
  }
]

function ChatScreen(props) {
  return (
    <View style={{flex:1}}> 
      <ScrollView style={{flex:1, marginTop: 30}}>
        {
          list.map((line, index) => (

              <ListItem key={index} bottomDivider>
                <ListItem.Content
                  containerStyle = {{marginBottom: 25, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                >
                  <ListItem.Title>{line.message}</ListItem.Title>
                  <ListItem.Subtitle>{line.name}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
          ))
        }
      </ScrollView>
      <Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}
      placeholder='Your message'
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
      onPress={ () => props.navigation.navigate('Home') }
      />
    </View>
  );
 }

 export default ChatScreen;

 const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: 'center',
  },
  });

        