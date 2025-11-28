export const contractAddress = "0xd659553678bFbBB76a23e68176caD74039de47DF";

// Export only the ABI array expected by viem/wagmi
export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "by",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newColor",
        "type": "string"
      }
    ],
    "name": "ColorChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getColor",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_color",
        "type": "string"
      }
    ],
    "name": "setColor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;