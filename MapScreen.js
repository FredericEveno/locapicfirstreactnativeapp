import React, {useState, useEffect} from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { Input, Button, Icon  } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';

function MapScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [userPosition, setUserPosition] = useState({longitude: 0, latitude:0});
  const [addPOI, setAddPOI] = useState(false);
  const [bufferPOI, setBufferPOI] = useState({});
  const [listPOI, setListPOI] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  useEffect( () => {
    // console.log('addPOI : ', addPOI);
    const askPermission = async () => {
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      console.log('status : ', status);
      if (status === 'granted') {
        Location.watchPositionAsync({distanceInterval: 1},
          (location) => {
            // console.log('location', location);
            setUserPosition({longitude: location.coords.longitude, latitude: location.coords.latitude});
          }
         );
      }
    }
    askPermission();
    props.settlePOI(listPOI);
  }, [listPOI] )

  var selectPOI = (screenPress) => {
    console.log('addPOI : ', addPOI);
    if (addPOI === true) {
      setModalVisible(!modalVisible)
      setBufferPOI({ longitude: screenPress.nativeEvent.coordinate.longitude,
                      latitude: screenPress.nativeEvent.coordinate.latitude
                    }
      );
    }
  }

  var handleModalButton = (titleFromModal, descriptionFromModal) => {
    console.log('bufferPOI : ', bufferPOI);
    setListPOI([...props.POIList,
      {
        longitude: bufferPOI.longitude,
        latitude: bufferPOI.latitude,
        title: titleFromModal,
        description: descriptionFromModal
      }
    ])
    setModalVisible(!modalVisible);
    setAddPOI(false);
    setModalTitle('');
    setModalDescription('');
  }

  return (

    <View style={{flex : 1}}>
      <MapView style={{flex : 1}}
        onPress={(screenPress) => {selectPOI(screenPress)}}
        initialRegion={{
          latitude: 43.6456,
          longitude: 5.585,
          latitudeDelta: 1,
          longitudeDelta: 0.0421,
        }}
        >
        <Marker
          coordinate={userPosition}
          title='Hello'
          description="I'm here !"
          pinColor={'tomato'}
        />
        {
          props.POIList.map( (poi, index) => (
            <Marker key={index}
            coordinate={poi}
            title={poi.title}
            description={poi.description}
            pinColor={'blue'}
            draggable
            />
           ) )
        }
      </MapView>
      <Button buttonStyle={{backgroundColor:'#db5952'}}
        icon={<Icon
          name='map-marker'
          type='font-awesome'
          size={25}
          color="white"
          style={{marginRight:10}}
        />}
        disabled={addPOI}
        title='Add a POI'
        onPress={ () => setAddPOI(true) }
      />
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Input
          containerStyle = {{marginBottom: 25, width: '100%'}}
          inputStyle={{marginLeft: 10}}
          placeholder='Title'
          onChangeText = {(text) => setModalTitle(text)}
          />
          <Input
          containerStyle = {{marginBottom: 25, width: '100%'}}
          inputStyle={{marginLeft: 10}}
          placeholder='Description'
          onChangeText = {(text) => setModalDescription(text)}
          />
          <Button buttonStyle={{backgroundColor:'#db5952'}}
          title='Add this POI'
          onPress={ () => {handleModalButton(modalTitle, modalDescription); setModalVisible(!modalVisible)} }
          />
        </View>
      </Modal>
    </View>
  );
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

export default connect(mapStateProps, mapDispatchToProps)(MapScreen);

const styles = StyleSheet.create ({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 5
  }
})