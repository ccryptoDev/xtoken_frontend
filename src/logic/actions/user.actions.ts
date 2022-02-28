import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  // GET_ETH_BALANCE_SUCCESS,
} from "./constant";
import web3 from "web3";
import wallet from "../../utils/wallet";

export const login = (user: any, network: number) => {
  return {
    type: LOGIN_SUCCESS,
    address: user.address,
    network,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// export const getEthBalanceSuccess = (ethBalance) => {
//   return {
//     type: GET_ETH_BALANCE_SUCCESS,
//     ethBalance,
//   };
// };

// export const getEthBalance = (userAddress) => async (dispatch) => {
//   try {
//     const balance = await wallet.web3.eth.getBalance(userAddress);

//     dispatch(getEthBalanceSuccess(web3.utils.fromWei(balance, "ether")));
//   } catch (e) {
//     console.log("error in get eth balance ", e);
//   }
// };

