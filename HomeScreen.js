import React, {useState} from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Input, Button, Icon  } from 'react-native-elements';
import {connect} from 'react-redux';

const backgroundImg = require('./assets/bghome.jpg')

function HomeScreen(props) {

  const [pseudo, setPseudo] = useState('');
  
  return (

    <ImageBackground source={backgroundImg}
                    style={styles.container}
    >
    <Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}
      leftIcon={<Icon 
        name='user'
        type='font-awesome'
        color='#db5952'
        size={25}
      />}
      placeholder='John'
      onChangeText={ (value) => setPseudo(value)}
    />
    <Button 
      icon={<Icon
        name='arrow-right'
        type='font-awesome'
        size={25}
        color="#db5952"
        style={{marginRight:10}}
      />}
      title='Go to Map' 
      onPress={ () => {props.onTypePseudo(pseudo);props.navigation.navigate('BottomNavigator', { screen: 'Map' } )} }
      />
    </ImageBackground>

  );
 }

 function mapDispatchToProps(dispatch) {
   return {
     onTypePseudo: function (pseudo) {
      dispatch( {type: 'typingPseudo', pseudo: pseudo} )
     }
   }
 }

 export default connect(null, mapDispatchToProps)(HomeScreen);

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  });