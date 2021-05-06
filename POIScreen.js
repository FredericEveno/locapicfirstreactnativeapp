import React from 'react';
import { connect } from 'react-redux';
import {View, Text, ScrollView} from 'react-native'
import { ListItem } from 'react-native-elements';

function POIScreen(props) {
  return (
    <View style={{flex:1}}>
      <ScrollView style={{flex:1, marginTop: 30}}>
        {
          props.POIList.map( (poi, index) => (
            <ListItem  key={index}>
              <ListItem.Content
                    containerStyle = {{marginBottom: 25, width: '70%'}}
                    inputStyle={{marginLeft: 10}}
                  >
                    <ListItem.Title>{poi.title}</ListItem.Title>
                    <ListItem.Subtitle>{poi.description}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ) )
        }
      </ScrollView>
      <Text>Vous êtes sur la page POIScreen de M {props.userPseudo} !</Text>
    </View>
  )

}

function mapStateProps(state) {
  console.log('poilist from store : ', state.poilist)
  return {POIList: state.poilist, userPseudo: state.pseudo}
}

export default connect(mapStateProps, null)(POIScreen)