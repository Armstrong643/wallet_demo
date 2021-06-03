import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";

export const enableExtension = () => web3Enable("FUSOTAO");

export const allAccount = () => web3Accounts();
