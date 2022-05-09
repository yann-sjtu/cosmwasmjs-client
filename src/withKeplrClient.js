import {parseCoins, setupWebKeplr} from "cosmwasm";

const config = {
  // chainId: "cliffnet-1",
  chainId: "exchain-67",
  rpcEndpoint: "localhost:26657",
  prefix: "ex",
};

async function main() {
  const client = await setupWebKeplr(config);
  console.log(client);
  const chainID = await client.getChainId();
  console.log(chainID);
  const codes = await client.getCodes();
  console.log(codes);
  const contract = await client.getContract("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27");
  console.log(contract);
  const res = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq"}})
  console.log(res);
  const res2 = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v"}})
  console.log(res2);
  const res3 = await client.execute("ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq", "ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"transfer":{"amount":"10","recipient":"ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v"}}, {"amount":parseCoins("1okt"),"gas":"200000"}, "", null);
  console.log(res3);
  const res4 = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq"}})
  console.log(res4);
}

main();
