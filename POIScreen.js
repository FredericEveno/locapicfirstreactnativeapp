import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {View, Text, ScrollView} from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

function POIScreen(props) {

  useEffect( () => {
    
    console.log('POIList from store : ', props.POIList);
    
    // props.settlePOI(listPOI);

  }, [] )

  var deletePOI = (poi) => {
    console.log('received poi : ', poi);
    var tempPOI = [...props.POIList];
    var filteredPOI = tempPOI.filter( item => item !== poi )
    console.log('filteredPOI : ', filteredPOI);
    props.settlePOI(filteredPOI);
  }

  return (
    <View style={{flex:1}}>
      <Text style={{marginTop:30, textAlign:'center'}} >Vous êtes sur la page POIScreen de : {props.userPseudo} !</Text>
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
                  <Ionicons name='trash-outline' size={24} color='black' 
                            onPress={ () => deletePOI(poi) } 
                  />
              </ListItem.Content>
            </ListItem>
          ) )
        }
      </ScrollView>
    </View>
  )

}

function mapStateProps(state) {
  console.log('poilist from store : ', state.poilist)
  return {POIList: state.poilist, userPseudo: state.pseudo}
}

function mapDispatchToProps(dispatch) {
  return {
    settlePOI: function (poiList) {
      dispatch( {type: 'settlePoiList', poiList: poiList} )
    }
  }
 }

export default connect(mapStateProps, mapDispatchToProps)(POIScreen)