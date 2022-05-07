import { SigningCosmWasmClient, Secp256k1HdWallet, coin, parseCoins } from "cosmwasm";
import { stringToPath } from "@cosmjs/crypto";
import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";

// This is your rpc endpoint
const rpcEndpoint = "localhost:26657";

// Using a random generated mnemonic
const mnemonic = "palace cube bitter light woman side pave cereal donor bronze twice work";

async function main() {
  // Create a wallet
  //const path = stringToPath("m/44'/996'/0'/0/0");
  //const path = stringToPath("m/44'/118'/0'/0/0")
  // const path = [
  //   Slip10RawIndex.hardened(44),
  //   Slip10RawIndex.hardened(60),
  //   Slip10RawIndex.hardened(0),
  //   Slip10RawIndex.normal(0),
  //   Slip10RawIndex.normal(0),
  // ];
  const path = stringToPath("m/44'/118'/0'/0/0");
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {hdPaths:[path], "prefix":"wasm"});
  console.log(wallet.mnemonic);
  const accs = await wallet.getAccounts();
  console.log('@@@@',accs);

  // Using
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    wallet,
  );
  console.log(client);
  const codes = await client.getCodes();
  console.log(codes);
  const contract = await client.getContract("wasm1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqhs9hr8");
  console.log(contract);
  const res = await client.queryContractSmart("wasm1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqhs9hr8", {"balance":{"address":"wasm1eutyuqqase3eyvwe92caw8dcx5ly8s54h4k8mu"}})
  console.log(res);
  const res2 = await client.queryContractSmart("wasm1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqhs9hr8", {"balance":{"address":"wasm1cs6528nz3vjemjf4k0ypr2yawdqw3p5yly5yvs"}})
  console.log(res2);
  const res3 = await client.execute("wasm1eutyuqqase3eyvwe92caw8dcx5ly8s54h4k8mu", "wasm1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqhs9hr8", {"transfer":{"amount":"10","recipient":"wasm1cs6528nz3vjemjf4k0ypr2yawdqw3p5yly5yvs"}}, {"amount":parseCoins("1ustake"),"gas":"200000"}, "", null);
  console.log(res3);
  const res4 = await client.queryContractSmart("wasm1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqhs9hr8", {"balance":{"address":"wasm1eutyuqqase3eyvwe92caw8dcx5ly8s54h4k8mu"}})
  console.log(res4);
}

main();
