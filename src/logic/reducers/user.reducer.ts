import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions";
import { UserState } from '../../utils/types'

const initialState: UserState = {
  walletConnected: false,
  userAddress: "",
  network: "",
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        walletConnected: true,
        userAddress: action.address,
        network: action.network,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        walletConnected: false,
        userAddress: "",
        network: "",
      };

    default:
      return state;
  }
};

export default userReducer;
