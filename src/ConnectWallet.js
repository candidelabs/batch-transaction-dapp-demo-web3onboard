import { useConnectWallet } from "@web3-onboard/react";

// create Connect Button for web3onboard
export default function ConnectWallet() {
  const [{ wallet, connecting }, connect] = useConnectWallet();

  if (wallet?.provider) {
    return null;
  }

  return (
    <div justifyContent="center" alignItems="center" h="100vh">
      <button
        disabled={connecting}
        onClick={() => connect()}
        className="button-connect"
      >
        Connect Wallet
      </button>
      <div>
        <p>Connect with a smart contract wallet</p>
      </div>
      <p>⚠️ This demo is on Goerli ⚠️</p>
    </div>
  );
}
