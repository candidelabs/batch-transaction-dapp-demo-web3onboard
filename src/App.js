import { Web3OnboardProvider, init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import ConnectWallet from "./ConnectWallet";
import BatchTransactions from "./BatchTransactions";

// define walletconnect init options
const wcV2InitOptions = {
  projectId: "db8f68cd5b030a694622fb4b4ffc2647",
  requiredChains: [5], // goerli
  additionalOptionalMethods: [
    "wallet_sendFunctionCallBundle",
    "wallet_showBundleStatus",
    "wallet_getBundleStatus"
  ], // pass our additional method
  dappUrl: "https://github.com/candidelabs/"
};
const walletConnect = walletConnectModule(wcV2InitOptions);

// web3onboard init
const web3Onboard = init({
  theme: "dark",
  apiKey: "1730eff0-9d50-4382-a3fe-89f0d34a2070", // blocknative api key
  wallets: [walletConnect],
  chains: [
    {
      id: "5",
      token: "ETH",
      label: "Goerli",
      rpcUrl: "https://goerli.infura.io/v3/7ce42d92316d41c7a60100949be6adad"
    }
  ],
  appMetadata: {
    name: "Batch Transaction Demo",
    icon:
      "https://www.iconbolt.com/iconsets/ant-design-fill/code-sandbox-square.svg",
    description: "Batch multiple transactions into a single one"
  }
});

export default function App() {
  return (
    <>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <ConnectWallet />
        <BatchTransactions />
      </Web3OnboardProvider>
    </>
  );
}
