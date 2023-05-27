import { Web3Resolver } from "web3-domain-resolver";
import Axios from "axios";
const Web3 = require("web3");
const HOW3wallet = "0x051cC197F17A40edf16d67e3207A18a2E81AE238";
const backend = "https://dipbackend.how3.me";
// const backend = "http://localhost:8282";
const chain = "https://bsc-dataseed.binance.org/"
const web3 = new Web3(chain);
// import { createInstance } from 'dotbit'
// const dotbit = createInstance()
// import {NodeClient, WalletClient} from 'hs-client';
const web3resolver = new Web3Resolver();

export class HOW3Protocol {
    static async isAvailable(domain : string){
        const available : { platform: string, owner: string }[] =[];
    
        //ens, unstoppable, freename
        const resolvedDomain1 = await web3resolver.resolve(domain);
        // console.log(resolvedDomain1);
        if(resolvedDomain1!==undefined && resolvedDomain1.ownerAddress!==undefined){
            available.push({platform:resolvedDomain1.providerName, owner:resolvedDomain1.ownerAddress});
        }
        //space.id
        await Axios.get("https://api.prd.space.id/v1/getAddress?tld="+domain.split(".")[1]+"&domain="+domain)
        .then((response) => {
            // console.log(response.data);
            if(response.data.address!=="0x0000000000000000000000000000000000000000"&&response.data.code!==1){
                available.push({platform:"Space Id", owner:response.data.address});
            }
        })
        .catch((err) => console.log(err));
        // Aptos
        if(domain.split(".")[1]==="apt"){
            await Axios.get("https://www.aptosnames.com/api/mainnet/v1/address/"+domain)
            .then((response) => {
                // console.log(response.data);
                if(response.data.address){
                    available.push({platform:"Aptos", owner:response.data.address});
                }
            })
            .catch((err) => console.log(err));
        }
        //wns
        await Axios.get("https://resolver.wnsdomains.io/resolve/name="+domain)
        .then((response) => {
            // console.log(response.data);
            if(response.data.value!=="null"){
                available.push({platform:"WNS", owner:response.data.value});
            }
        })
        .catch(err=>{
            console.log(err);
        })
        //solana
        if(domain.split(".")[1]==="sol"){
        await Axios.get("https://sns-sdk-proxy.bonfida.workers.dev/resolve/"+domain)
        .then((response) => {
            // console.log(response.data);
            if(response.data.s!=="error"){
                available.push({platform:"Solana", owner:response.data.result});
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }
        //HOW3
        Axios.get("https://backend.how3.me/explore/" + domain)
        .then((response) => {
            if(response.data.wallet_address!==undefined){
                available.push({platform:"HOW3", owner:response.data.wallet_address});
            }
        })
        .catch((err) => console.log(err));
    
        //DID
        // await dotbit.records(domain).then(console.log)
    
        if(available.length==0){
            available.push({platform:"HOW3 Protocol", owner: "Domain Available!!"})
        }
    
        return available;
        // const resolvedDomain3  = NodeClient.getNameSta
    } 
    static hexEncode(domain:string){
    var result = '';
    for (var i=0; i<domain.length; i++) {
        result += domain.charCodeAt(i).toString(16);
    }
    return result;
    }


    static async register(domain: string, address: string, privateKey :string, evmaddress:string){
                await Axios.get(
                    backend+"/verify/" + domain + "/" + address
                  )
                    .then(async (response) => {
                      if (response.data == "Verified!!") {
                        let priceofBNB = 10000;
                        await Axios.get("https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT")
                        .then((response2) => {
                            // console.log(response.data);
                            priceofBNB=response2.data.price;
                        })
                        .catch(err=>{console.log(err)});
                        const signedTx = await  web3.eth.accounts.signTransaction({
                            to: HOW3wallet,
                            value: (20.0/priceofBNB)*(10**18),
                            gas: 2000000,
                            data:"0x"+this.hexEncode(domain)
                        },privateKey);
                        if(signedTx.rawTransaction!==undefined){
                        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(error:any, hash:any) {
                            if (!error) {
                            await Axios.get(backend+"/register/"+domain+"/"+address+"/"+hash+"/"+evmaddress)
                                .then((response3) => {
                                    console.log(response3.data);
                                })
                                .catch(err=>{console.log(err)});
                            } else {
                            console.log("❗Something went wrong while submitting your transaction:", error)
                            }
                            });
                        }
                      } else {
                        console.log("Failed Verification!!");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
            }
}                                                                                                      