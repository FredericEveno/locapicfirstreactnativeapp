export default (poiList=[], action) => {
  if(action.type === 'settlePoiList') {
    console.log('action.poiList', action.poiList);
    return action.poiList;
  } else {
    return poiList;
  }
}