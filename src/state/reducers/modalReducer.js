const webReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'SHOW_CONFIRMATION_MODAL':
            return state - 1;
        default:
            return state
    }
};

export default webReducer