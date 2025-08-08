// Constantes de blockchain para Soroban/Stellar
// IDs de contratos inteligentes simulados para el prototipo

export const SOROBAN_ESCROW_CONTRACT_ID =
  "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGDZSVM";
export const SOROBAN_PAYMENT_CONTRACT_ID =
  "CBQHNAXSI55GX2GN6D67GK7BHYHPH24SRHZWQ4YEKUJQ32JZJFGN7XQM";
export const SOROBAN_REPUTATION_CONTRACT_ID =
  "CAQR5AFDZFQ43TRDZ5ZSQ2AS3NLSF2FGT3O4WQFBKMH2JZRPV2WN4QZR";
export const SOROBAN_REFERRAL_CONTRACT_ID =
  "CAQR5AFDZFQ43TRDZ5ZSQ2AS3NLSF2FGT3O4WQFBKMH2JZRPV2WN4QZR";

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
  networkPassphrase: "Test SDF Network ; September 2015",
  rpcUrl: "https://soroban-testnet.stellar.org",
  explorerUrl: SOROBAN_EXPLORER_BASE_URL,
};
