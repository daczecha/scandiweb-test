const initialState = 'all';

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return action.payload;
    default:
      return state;
  }
};

export default categoryReducer;
