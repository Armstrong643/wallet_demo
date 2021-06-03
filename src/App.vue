<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.svg" width="150" />

    <div class="main">
      <div class="connect-btn" v-if="!address">
        <button class="btn" @click="connect">connect</button>
      </div>
      <div class="mt-10" v-if="address">
        <div>name：{{ name }}</div>
        <div>address：{{ address }}</div>
        <div>balance：{{ balance }}</div>
      </div>

      <div class="mt-10" v-if="balance">
        <button class="btn" @click="send">send</button>
      </div>

      <div class="mt-10" v-if="balance">
        <button class="btn" @click="sign">sign</button>
      </div>
    </div>
  </div>
</template>

<script>
import { enableExtension } from "@/extension";
import {
  connectToBlockchain,
  sendTransfer,
  sendSign,
} from "@/lib/polkadotProvider";
import { queryBalance } from "@/lib/polkadotProvider/query/balance";

export default {
  name: "App",
  data: () => ({
    name: "",
    address: "",
    balance: "",
    api: null,
  }),
  methods: {
    async connect() {
      const data = await enableExtension();
      if (data.length) {
        const accounts = await data[0].accounts.get();
        if (accounts.length) {
          this.name = accounts[0].name;
          this.address = accounts[0].address;
          this.getBalance();
        }
      } else {
        alert("请先安装FUSOTAO浏览器钱包插件");
      }
    },
    async getBalance() {
      const api = await connectToBlockchain();
      this.api = api;
      const balance = await queryBalance(api, this.address);
      this.balance = balance;
    },
    async send() {
      const txHash = await sendTransfer(
        this.api,
        "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw"
      );
      console.log(txHash);
    },
    async sign() {
      const txHash = await sendSign();
      console.log(txHash);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  margin-top: 20px;
  font-size: 14px;
}
.btn {
  font-size: 14px;
  padding: 4px 10px;
  border: 1px solid #1890ff;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  appearance: none;
  color: #333;
  background: #fff;
  transition: all 0.2s ease-in-out;
}
.btn:hover {
  color: #fff;
  background: #1890ff;
}
.mt-10 {
  margin-top: 10px;
}
</style>
