'use strict';

import Reflux from 'reflux';
import Actions from '../actions/Actions';

let modalState = {
  type: undefined,
  futureTypes: [],
  errorMessage: ''
};

const ModalStore = Reflux.createStore({
  listenables: Actions,

  showModal(type, errorMessage, futureTypes = []) {
    modalState = {
      type: type,
      futureTypes: futureTypes,
      errorMessage: errorMessage ? (errorMessage || 'Something went wrong') : ''
    };

    this.trigger(modalState);
  },

  hideModal() {
    modalState.type = undefined;
    this.trigger(modalState);
  },

  nextModal() {
    modalState.type = modalState.futureTypes.shift();
    modalState.errorMessage = '';
    this.trigger(modalState);
  },

  modalError(errorMessage) {
    modalState.errorMessage = errorMessage;
    this.trigger(modalState);
  },

  getDefaultData() {
    return modalState;
  }
});

export default ModalStore;
