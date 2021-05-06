export default (pseudo='', action) => {
  if(action.type === 'typingPseudo') {
    console.log('action.pseudo', action.pseudo);
    return action.pseudo;
  } else {
    return pseudo;
  }
}