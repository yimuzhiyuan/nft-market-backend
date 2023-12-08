import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");
// 0xd9145CCE52D386f254917e481eB44e9943F39138
export async function mint(address, uri) {
    const provider = new JsonRpcProvider(process.env.RPC);
    const signer = await provider.getSigner()
    const MyNFTAbi = JSON.parse(fs.readFileSync('./abis/MyNFT.json'));
    const MyNFTContract = new ethers.Contract(process.env.NFT, MyNFTAbi, signer);
    const result = await MyNFTContract.safeMint(address, uri);
    console.log(result.hash);
}
// mint('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'https://ipfs.io/ipfs/QmZ4tj')