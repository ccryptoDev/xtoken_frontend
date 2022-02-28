export interface NFTtype {
  id: number;
  img: string;
  limit: number;
  title: string;
  desc: string;
}

export interface walletType {
  isConnected: boolean;
  walletAddr: string;
}

export interface RootState {
  user: UserState
}

export interface UserState {
  walletConnected: boolean;
  userAddress: string;
  network: string;
}