import {CLOSE_MODAL, CONFIRMATION, SHOW_CONFIRMATION_MODAL} from "./constants/modalConstants";

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

export const closeModal = () => ({
    type: CLOSE_MODAL,
    data: {
        modalType: null,
        modalProps: {}
    }
});