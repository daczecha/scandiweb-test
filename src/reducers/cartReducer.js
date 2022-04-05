import objectEquals from '../helperFunctions/objectEquals';

const savedItems = JSON.parse(localStorage.getItem('cartItems'));

const initialState = savedItems?.length ? savedItems : [];

const cartReducer = (state = initialState, action) => {
  if (action.type === 'ADD_ITEM') {
    let foundItem = state.find(
      (i) =>
        i.id === action.payload.id &&
        objectEquals(i.selectedAttributes, action.payload.selectedAttributes)
    );
    let stateCopy = [...state];

    if (foundItem) {
      stateCopy[stateCopy.indexOf(foundItem)].quantity++;

      localStorage.setItem('cartItems', JSON.stringify(stateCopy));
      return stateCopy;
    }

    action.payload = { ...action.payload, quantity: 1 };

    localStorage.setItem(
      'cartItems',
      JSON.stringify([...state, action.payload])
    );
    return [...state, action.payload];
  } else if (action.type === 'REDUCE_ITEM') {
    let foundItem = state.find(
      (i) =>
        i.id === action.payload.id &&
        objectEquals(i.selectedAttributes, action.payload.selectedAttributes)
    );
    let stateCopy = [...state];

    if (foundItem) {
      stateCopy[stateCopy.indexOf(foundItem)].quantity--;

      if (stateCopy[stateCopy.indexOf(foundItem)].quantity > 0) {
        localStorage.setItem('cartItems', JSON.stringify(stateCopy));
        return stateCopy;
      }

      const newState = state.filter((x) => !objectEquals(x, foundItem));

      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    return state;
  } else if (action.type === 'REMOVE_ITEM') {
    let foundItem = state.find(
      (i) =>
        i.id === action.payload.id &&
        objectEquals(i.selectedAttributes, action.payload.selectedAttributes)
    );

    if (foundItem) {
      const newState = state.filter((x) => !objectEquals(x, foundItem));

      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    return state;
  } else if (action.type === 'CLEAR_CART') {
    localStorage.setItem('cartItems', JSON.stringify([]));
    return [];
  }
  return state;
};

export default cartReducer;
