import {
    formatBalance
  } from '@polkadot/util';

export async function queryBalance(api, addr) {
    const { tokenDecimals, tokenSymbol } = await api.rpc.system.properties();
    const decimals = tokenDecimals.unwrapOr(18)[0].toNumber();
    const symbol = tokenSymbol.unwrapOr('')[0].toString();
    const { data: { free } } = await api.query.system.account(addr);
    const taoBalance = formatBalance(free, { forceUnit: symbol, withSi: true, withUnit: false }, decimals);
    return `${taoBalance} ${symbol}`;
}