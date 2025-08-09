// Constantes de blockchain para Soroban/Stellar
// IDs de contratos inteligentes simulados para el prototipo

export const SOROBAN_ESCROW_CONTRACT_ID = import.meta.env
  .VITE_SOROBAN_ESCROW_CONTRACT_ID;
export const SOROBAN_PAYMENT_CONTRACT_ID = import.meta.env
  .VITE_SOROBAN_PAYMENT_CONTRACT_ID;
export const SOROBAN_REPUTATION_CONTRACT_ID = import.meta.env
  .VITE_SOROBAN_REPUTATION_CONTRACT_ID;
export const SOROBAN_REFERRAL_CONTRACT_ID = import.meta.env
  .VITE_SOROBAN_REFERRAL_CONTRACT_ID;

// URLs de exploradores de blockchain para Soroban
export const SOROBAN_EXPLORER_BASE_URL =
  "https://stellar.expert/explorer/testnet/contract";

// Funciones utilitarias
export const truncateContractId = (
  contractId,
  startChars = 6,
  endChars = 4
) => {
  if (!contractId || contractId.length <= startChars + endChars) {
    return contractId;
  }
  return `${contractId.slice(0, startChars)}...${contractId.slice(-endChars)}`;
};

export const getContractExplorerUrl = (contractId) => {
  return `${SOROBAN_EXPLORER_BASE_URL}/${contractId}`;
};

// Configuración de red Soroban
export const SOROBAN_NETWORK_CONFIG = {
  network: "Testnet",
  networkPassphrase:
    import.meta.env.VITE_SOROBAN_NETWORK_PASSPHRASE ||
    "Test SDF Network ; September 2015",
  rpcUrl:
    import.meta.env.VITE_SOROBAN_RPC_URL ||
    "https://soroban-testnet.stellar.org",
  explorerUrl: SOROBAN_EXPLORER_BASE_URL,
};
