const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((prod) =>
          prod._id === action.payload._id
            ? { ...prod, quantity: action.payload.quantity }
            : prod
        ),
      };
    case "DELETE_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (prod) => prod._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
