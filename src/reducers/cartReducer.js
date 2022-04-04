const savedItems = JSON.parse(localStorage.getItem('cartItems'));

const initialState = savedItems?.length ? savedItems : [];

const cartReducer = (state = initialState, action) => {
  if (action.type === 'ADD_ITEM') {
    let foundItem = state.find(
      (i) =>
        i.id === action.payload.id &&
        object_equals(i.selectedAttributes, action.payload.selectedAttributes)
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
        object_equals(i.selectedAttributes, action.payload.selectedAttributes)
    );
    let stateCopy = [...state];

    if (foundItem) {
      stateCopy[stateCopy.indexOf(foundItem)].quantity--;

      if (stateCopy[stateCopy.indexOf(foundItem)].quantity > 0) {
        localStorage.setItem('cartItems', JSON.stringify(stateCopy));
        return stateCopy;
      }

      const newState = state.filter((x) => !object_equals(x, foundItem));

      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    return state;
  } else if (action.type === 'REMOVE_ITEM') {
    let foundItem = state.find(
      (i) =>
        i.id === action.payload.id &&
        object_equals(i.selectedAttributes, action.payload.selectedAttributes)
    );

    if (foundItem) {
      const newState = state.filter((x) => !object_equals(x, foundItem));

      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    return state;
  }
  return state;
};

export default cartReducer;

function object_equals(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== 'object') return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!object_equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  // allows x[ p ] to be set to undefined

  return true;
}
