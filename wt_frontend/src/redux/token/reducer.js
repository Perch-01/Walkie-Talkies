const initialState = '';//Whatever default state it should have
export default (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case 'ACTION':
      return action.payload;
    default:
      return state;
  }
};