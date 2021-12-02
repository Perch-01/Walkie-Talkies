const initialState = 0;//Whatever default state it should have
export default (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case 'SET_ACTION':
      return action.payload;
    default:
      return state;
  }
};