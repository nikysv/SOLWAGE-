export const NETWORKS = {
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io",
    currency: "ETH",
  },
};

export const DEFAULT_NETWORK = "sepolia";

export const GAS_CONFIG = {
  maxFeePerGasGwei: 2,
  maxPriorityFeePerGasGwei: 1,
};
