import {
    CLOSE_MODAL,
    CONFIRMATION,
    ERROR,
    SHOW_CONFIRMATION_MODAL,
    SHOW_ERROR_MODAL,
    SHOW_SUCCESS_MODAL, SUCCESS
} from "../constants/modalConstants";

export const showConfirmationModal = (message, callBack) => ({
    type: SHOW_CONFIRMATION_MODAL,
    data: {
        modalType: CONFIRMATION,
        modalProps: {
            message: message,
            callBack: callBack
        }
    }
});

export const showErrorModal = (message) => ({
    type: SHOW_ERROR_MODAL,
    data: {
        modalType: ERROR,
        modalProps: {
            message: message
        }
    }
});

export const showSuccessModal = (message) => ({
    type: SHOW_SUCCESS_MODAL,
    data: {
        modalType: SUCCESS,
        modalProps: {
            message: message
        }
    }
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
    data: {
        modalType: null,
        modalProps: {}
    }
});