import React, { createContext, useEffect, useReducer } from "react";
import mixpanel from "mixpanel-browser";
import { createTezos, createWallet, getTezosNetwork } from './utils';
import { INITIAL_STATE, reducer, TezosState} from './reducer';
import {TezosAction, TezosActionType} from './actions';

interface TezosProvider {
  state: TezosState;
  dispatch: React.Dispatch<TezosAction>;
}

export const TezosContext = createContext<TezosProvider>({
  state: INITIAL_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const getSavedState = async (): Promise<TezosState> => {
  const network = getTezosNetwork()
  const tezos = createTezos(network)
  const wallet = createWallet()
  const account = await wallet.client.getActiveAccount()

  return {
    network,
    tezos,
    wallet,
    account: account?.address ?? "",
  }
}

export const TezosProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    mixpanel.register({'Network': state.network });
  }, [state.network])

  useEffect(() => {
    getSavedState()
      .then((tezosState) => {
          dispatch({
            type: TezosActionType.UPDATE_TEZOS,
            payload: tezosState,
          });
      })
  }, [])

  return (
    <TezosContext.Provider value={{ state, dispatch }}>
      {children}
    </TezosContext.Provider>
  );
};
