import {CLOSE_MODAL, SHOW_CONFIRMATION_MODAL, SHOW_ERROR_MODAL} from "../constants/modalConstants";

const initialState = {
    modal: {
        modalType: null,
        modalProps: {}
    }
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CONFIRMATION_MODAL:
            return action.data;
        case SHOW_ERROR_MODAL:
            return action.data;
        case CLOSE_MODAL:
            return action.data;
        default:
            return state
    }
};

export default modalReducer