// import { Keyring } from '@polkadot/keyring';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { stringToHex } from "@polkadot/util";
import { web3FromSource } from "@polkadot/extension-dapp";
import { walletTypes } from "@/types";
import { allAccount } from "@/extension";

export async function connectToBlockchain() {
  const wsProvider = new WsProvider("wss://test-fuso.ngnexusccs.xyz");
  return await ApiPromise.create({
    provider: wsProvider,
    types: walletTypes,
  });
}

export async function sendTransfer(api, toAddress) {
  const accounts = await allAccount();
  if (accounts.length) {
    const sender = accounts[0];
    const injector = await web3FromSource(sender.meta.source);
    const transfer = api.tx.balances.transfer(toAddress, 1000000000);
    const txHash = await transfer.signAndSend(sender.address, {
      signer: injector.signer,
    });
    return txHash;
  }
}

export async function sendSign() {
  const accounts = await allAccount();
  if (accounts.length) {
    const sender = accounts[0];
    const injector = await web3FromSource(sender.meta.source);
    const signRaw = injector?.signer?.signRaw;

    if (signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      const { signature } = await signRaw({
        address: sender.address,
        data: stringToHex("message to sign"),
        type: "payload",
      });
      return signature;
    }
  }
}
