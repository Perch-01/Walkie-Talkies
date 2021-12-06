const initialState = '';//Whatever default state it should have
export default (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload;
    default:
      return state;
  }
};