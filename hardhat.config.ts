import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const fs = require("fs");
const path = require("path");
const infuraProjectId = fs.readFileSync(path.join(__dirname, ".infura")).toString().trim();
const secret = fs.readFileSync(path.join(__dirname, ".secret")).toString().trim();

const config: HardhatUserConfig = {
  networks: {
  sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: {
        mnemonic: secret,
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
