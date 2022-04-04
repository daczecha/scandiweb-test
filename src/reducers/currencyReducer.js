const initialState = JSON.parse(localStorage.getItem('selectedCurrency')) || {
  label: 'USD',
  symbol: '$',
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENCY':
      return action.payload;
    default:
      return state;
  }
};

export default currencyReducer;
