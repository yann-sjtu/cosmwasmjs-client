import { SigningCosmWasmClient, Secp256k1HdWallet, coin, parseCoins } from "cosmwasm";
import { stringToPath } from "@cosmjs/crypto";
import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";

// This is your rpc endpoint
const rpcEndpoint = "localhost:26657";

// Using a random generated mnemonic
const mnemonic1 = "palace cube bitter light woman side pave cereal donor bronze twice work";
const mnemonic2= "puzzle glide follow cruel say burst deliver wild tragic galaxy lumber offer";

var wallet1 ;
var wallet2 ;
var filedata;
var contractaddress;
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
  wallet1 = await Secp256k1HdWallet.fromMnemonic(mnemonic1, {hdPaths:[path], "prefix":"ex"});
  console.log(wallet1.mnemonic);
  const accs = await wallet1.getAccounts();
  console.log(accs);

  wallet2 = await Secp256k1HdWallet.fromMnemonic(mnemonic2, {hdPaths:[path], "prefix":"ex"});
  console.log(wallet2.mnemonic);
  const accs2 = await wallet2.getAccounts();
  console.log(accs2);


  // const cwclient = await SigningCosmWasmClient.connectWithSigner(
  //     rpcEndpoint,
  //     wallet1,
  // );
  // const res = await cwclient.sendTokens( accs2[0].address,accs[0].address, parseCoins("1000000000000000000wei"), {"amount":parseCoins("20000000000000wei"),"gas":"200000"});
  // console.log(res);

  //console.log("cwclient",cwclient);
  // const codes = await client.getCodes();
  // console.log(codes);
  // const contract = await client.getContract("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27");
  // console.log(contract);
  // const res = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq"}})
  // console.log(res);
  // const res2 = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v"}})
  // console.log(res2);
  //const res3 = await client.execute("ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq", "ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"transfer":{"amount":"10","recipient":"ex1h0j8x0v9hs4eq6ppgamemfyu4vuvp2sl0q9p3v"}}, {"amount":parseCoins("1okt"),"gas":"200000"}, "", null);
  // console.log(res3);
  // const res4 = await client.queryContractSmart("ex14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s6fqu27", {"balance":{"address":"ex1eutyuqqase3eyvwe92caw8dcx5ly8s544q3hmq"}})
  // console.log(res4);
}

document.getElementById("oInput").addEventListener('change', function selectedFilechanged( ) {
  console.log(this.files);
  var reader = new FileReader();
  reader.readAsArrayBuffer(this.files[0]);//读取文件的内容
  reader.onload = function () {
    filedata = this.result
  }
});

document.getElementById("upload").addEventListener('click', async function selectedFilechanged( ) {
  var accs = await wallet1.getAccounts()
  var address = accs[0].address
  console.log("upload",address)
  const cwclient = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      wallet1,
      {
        "gasPrice":"10000000wei"
      }
  );

  console.log("wasm updalod addr",address)
  var result = await cwclient.upload(address,filedata,{"amount":parseCoins("100000000000000000wei"),"gas":"20000000"})
  console.log("wasm upload",result)
  var codes = await cwclient.getCodes()
  console.log("get codes",codes)
  var codeId = result.codeId
  var code = await cwclient.getCodeDetails(codeId)
  console.log("get code",code)

  var tx = await cwclient.getTx(result.transactionHash)
  console.log("get tx",tx)

  tx = await cwclient.searchTx({ height: result.height })
  console.log("search tx",tx)


  var initMsg = {"verifier":address, "beneficiary":address}
  const info = await cwclient.instantiate(address, codeId, initMsg, "hello world", {"amount":parseCoins("200000000000000000wei"),"gas":"20000000"},{"funds":[{"denom":"okt","amount":"100000000000000000000"}],"admin":address});
  console.log("wasm init",info);
  var contract = await cwclient.getContract(info.contractAddress);
  console.log("get contract",contract);
  contractaddress = info.contractAddress
  var contracts = await cwclient.getContracts(codeId)
  console.log("get contracts",contracts)
  var status = await cwclient.queryContractSmart(contractaddress,{"verifier":{}})
  console.log("queryContractSmart",status)
  var result = await cwclient.execute(address,contractaddress,{"release":{}},{"amount":parseCoins("200000000000000000wei"),"gas":"20000000"})
  console.log("wasm execute",result)


  var contract = await cwclient.getContract(info.contractAddress);
  console.log("get contract admin",contract.admin)
  var accs2 = await wallet2.getAccounts()

  var result = await cwclient.updateAdmin(address,contractaddress,accs2[0].address,{"amount":parseCoins("200000000000000000wei"),"gas":"20000000"})
  console.log("update admin",result)

  var contract = await cwclient.getContract(info.contractAddress);
  console.log("get contract admin",contract.admin)

  cwclient.disconnect()
  var contract = await cwclient.getContract(info.contractAddress);
  console.log("get contract admin",contract.admin)

});

document.getElementById("upgrade").addEventListener('click', async function selectedFilechanged1( ) {
  const cwclient = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      wallet2,
  );
  var accs2 = await wallet2.getAccounts()

  var result = await cwclient.upload(accs2[0].address,filedata,{"amount":parseCoins("200000000000000000wei"),"gas":"20000000"})
  console.log("wasm upload", result)
  var codes = await cwclient.getCodes()
  console.log("get codes",codes)
  var codeId = result.codeId
  var code = await cwclient.getCodeDetails(codeId)
  console.log("get code",code)

  var tx = await cwclient.getTx(result.transactionHash)
  console.log("get tx",tx)

  tx = await cwclient.searchTx({ height: result.height })
  console.log("search tx",tx)

  var result = await cwclient.migrate(accs2[0].address,contractaddress,codeId,{"payout": accs2[0].address},{"amount":parseCoins("200000000000000000wei"),"gas":"20000000"})
  console.log("wasm migrate",result)

  var account = await cwclient.getAccount(accs2[0].address)
  console.log("get account",account)
  var contract = await cwclient.getContract(contractaddress);
  console.log("get contract",contract)

  var history = await cwclient.getContractCodeHistory(contractaddress);
  console.log("get contract",history)

  var result = await cwclient.clearAdmin(accs2[0].address,contractaddress,{"amount":parseCoins("200000000000000000wei"),"gas":"20000000"})
  console.log("wasm clear admin", result)
  var contract = await cwclient.getContract(contractaddress);
  console.log("get contract admin",contract.admin)
});

//ArrayBuffer转字符串
function ab2str(u,f) {
  var b = new Blob([u]);
  var r = new FileReader();
  r.readAsText(b, 'utf-8');
  r.onload = function (){if(f)f.call(null,r.result)}
}
//字符串转字符串ArrayBuffer
function str2ab(s,f) {
  var b = new Blob([s],{type:'text/plain;charset=utf-8'});
  var r = new FileReader();
  r.readAsArrayBuffer(b);
  r.onload = function (){if(f)f.call(null,r.result)}
}


main();
