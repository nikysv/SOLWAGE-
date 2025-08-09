export const NETWORKS = {
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: import.meta.env.VITE_SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
    explorer:
      import.meta.env.VITE_SEPOLIA_EXPLORER_URL ||
      "https://sepolia.etherscan.io",
    currency: "ETH",
  },
};

export const DEFAULT_NETWORK = "sepolia";

export const GAS_CONFIG = {
  maxFeePerGasGwei: 2,
  maxPriorityFeePerGasGwei: 1,
};
