import { ethers } from "ethers";
import { NETWORKS, DEFAULT_NETWORK, GAS_CONFIG } from "./config.js";
import { db } from "../../config/firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

class SmartWalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.currentNetwork = DEFAULT_NETWORK;
  }

  // Inicializar provider y signer sin MetaMask
  async initializeProvider() {
    try {
      const network = NETWORKS[this.currentNetwork];
      this.provider = new ethers.JsonRpcProvider(network.rpcUrl);

      // Crear un signer temporal para pruebas (en producción usarías un signer real)
      const privateKey = ethers.Wallet.createRandom().privateKey;
      this.signer = new ethers.Wallet(privateKey, this.provider);

      return true;
    } catch (error) {
      console.error("Error inicializando provider:", error);
      throw error;
    }
  }

  async getBalance(address) {
    try {
      if (!this.provider) {
        await this.initializeProvider();
      }
      const balanceWei = await this.provider.getBalance(address);
      return ethers.formatEther(balanceWei);
    } catch (error) {
      console.warn("No se pudo obtener balance, usando 0:", error);
      return "0";
    }
  }

  // Crear Safe Wallet simulada (versión simplificada)
  async createSafeWallet(userId, owners = []) {
    try {
      if (!this.signer) {
        await this.initializeProvider();
      }

      console.log("🎭 Creando Smart Wallet simulada para usuario:", userId);

      const network = NETWORKS[this.currentNetwork];
      const safeAddress = `0x${Math.random().toString(16).substr(2, 40)}`;

      const safeAccountConfig = {
        owners: owners.length > 0 ? owners : [await this.signer.getAddress()],
        threshold: 1,
        fallbackHandler: "0x0000000000000000000000000000000000000000",
      };

      // Intentar guardar en Firebase, pero no fallar si hay problemas de permisos
      try {
        await this.saveSafeWalletToFirebase(
          userId,
          safeAddress,
          safeAccountConfig
        );
        console.log("💾 Smart Wallet guardada en Firebase:", safeAddress);
      } catch (firebaseError) {
        console.warn(
          "⚠️ No se pudo guardar en Firebase (continuando):",
          firebaseError
        );
        // Continuar sin guardar en Firebase
      }

      console.log("✅ Smart Wallet simulada creada:", safeAddress);
      return {
        safeAddress,
        owners: safeAccountConfig.owners,
        threshold: safeAccountConfig.threshold,
        network: this.currentNetwork,
        isSimulated: true,
      };
    } catch (error) {
      console.error("Error creando Smart Wallet simulada:", error);
      // Crear una wallet básica como último recurso
      const fallbackAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      return {
        safeAddress: fallbackAddress,
        owners: [
          (await this.signer?.getAddress()) ||
            "0x0000000000000000000000000000000000000000",
        ],
        threshold: 1,
        network: this.currentNetwork,
        isSimulated: true,
        isFallback: true,
      };
    }
  }

  // Guardar Safe Wallet en Firebase (opcional)
  async saveSafeWalletToFirebase(userId, safeAddress, config) {
    try {
      const safeWalletData = {
        userId,
        safeAddress,
        owners: config.owners,
        threshold: config.threshold,
        network: this.currentNetwork,
        chainId: NETWORKS[this.currentNetwork].chainId,
        createdAt: new Date().toISOString(),
        status: "active",
        balance: "0",
        transactions: [],
      };

      await setDoc(doc(db, "smartWallets", safeAddress), safeWalletData);

      // Actualizar usuario con la dirección de la wallet
      await updateDoc(doc(db, "users", userId), {
        smartWalletAddress: safeAddress,
        walletCreatedAt: new Date().toISOString(),
      });

      console.log("💾 Safe Wallet guardada en Firebase:", safeAddress);
    } catch (error) {
      console.error("Error guardando Safe Wallet en Firebase:", error);
      throw error;
    }
  }

  // Obtener información de la Safe Wallet
  async getSafeWalletInfo(safeAddress) {
    try {
      const docRef = doc(db, "smartWallets", safeAddress);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Safe Wallet no encontrada");
      }
    } catch (error) {
      console.error("Error obteniendo información de Safe Wallet:", error);
      throw error;
    }
  }

  // Enviar transacción simulada
  async sendTransaction(safeAddress, to, value, data = "0x") {
    try {
      if (!this.signer) {
        await this.initializeProvider();
      }

      console.log("🎭 Simulando transacción desde:", safeAddress, "a:", to);

      const receipt = {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        from: await this.signer.getAddress(),
        to,
        value: ethers.parseEther(value.toString()),
        gasUsed: ethers.parseUnits("21000", "wei"),
        status: 1,
        blockNumber: Math.floor(Math.random() * 1000000),
      };

      // Intentar actualizar en Firebase, pero no fallar si hay problemas
      try {
        await this.updateTransactionInFirebase(safeAddress, receipt);
      } catch (firebaseError) {
        console.warn(
          "⚠️ No se pudo actualizar transacción en Firebase:",
          firebaseError
        );
      }

      console.log("🎭 Transacción simulada:", receipt.hash);
      return receipt;
    } catch (error) {
      console.error("Error enviando transacción:", error);
      throw error;
    }
  }

  // Actualizar transacción en Firebase (opcional)
  async updateTransactionInFirebase(safeAddress, receipt) {
    try {
      const transactionData = {
        hash: receipt.hash,
        from: receipt.from,
        to: receipt.to,
        value: receipt.value.toString(),
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status,
        blockNumber: receipt.blockNumber,
        timestamp: new Date().toISOString(),
      };

      const docRef = doc(db, "smartWallets", safeAddress);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const transactions = currentData.transactions || [];
        transactions.push(transactionData);

        await updateDoc(docRef, {
          transactions,
          lastTransactionAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error actualizando transacción en Firebase:", error);
      throw error;
    }
  }
}

export default SmartWalletService;
