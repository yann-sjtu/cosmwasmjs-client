import { CosmWasmClient } from "cosmwasm";

// console.log(CosmWasmClient);

// This is your rpc endpoint
//const rpcEndpoint = "https://rpc.cliffnet.cosmwasm.com:443/";
const rpcEndpoint = "localhost:26657"

async function main() {
    const client = await CosmWasmClient.connect(rpcEndpoint);
    console.log(client);
    const chainID = await client.getChainId();
    console.log("chainID",chainID);
    const height = await client.getHeight();
    console.log("height",height);
    const codes = await client.getCodes();
    console.log("codes",codes);
    var account  = await client.getAccount("ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v")
    console.log("account",account)
    var sequence = await client.getSequence("ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v")
    console.log("sequence",sequence)
    var block = await client.getBlock(2)
    console.log("block",block)
    var balance = await client.getBalance("ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v","okt")
    console.log("balance",balance)
}

main();
