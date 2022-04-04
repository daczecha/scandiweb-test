const initialState = JSON.parse(localStorage.getItem('cartItems')) || {};

const cartReducer = (state = initialState, action) => {
  return state;
};

export default cartReducer;
