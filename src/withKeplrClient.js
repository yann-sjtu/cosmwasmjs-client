import { setupWebKeplr } from "cosmwasm";

const config = {
  // chainId: "cliffnet-1",
  chainId: "cosmoshub-4",
  rpcEndpoint: "https://rpc.cliffnet.cosmwasm.com:443/",
  prefix: "wasm",
};

async function main() {
  const client = await setupWebKeplr(config);
  console.log(client);
}

main();
