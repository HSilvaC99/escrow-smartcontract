import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const fs = require("fs");
const infuraProjectId = vars.get("INFURA_API_KEY");
const mnemonic = vars.get("MNEMONIC");

const config: HardhatUserConfig = {
  networks: {
  sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
  },
  solidity: {
    version: "0.8.27",
  },
};

export default config;
