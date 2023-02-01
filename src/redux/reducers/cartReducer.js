const CartType = {
    cartData: []
};

const CartReducer = (state = CartType, action) => {
    switch (action.type) {
        case 'CARTTYPE':
            delete action.type;
            return {
                ...action,
            };
        default:
            return state;
    }
};
export default CartReducer;
