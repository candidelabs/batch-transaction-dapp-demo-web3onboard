import React from "react";
import { useState } from "react";
import { toHex, truncateAddress } from "./utils";
import { useConnectWallet } from "@web3-onboard/react";

const BatchTransactions = () => {
  const [{ wallet }] = useConnectWallet();
  const [userOpHash, setuserOpHash] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState();

  const account = wallet?.accounts[0].address;

  // send a self-transfer of 1 wei, two times, in a single transaction
  const sendBundledCalls = async () => {
    if (!wallet?.provider) return;

    const value = toHex(1);
    const calls = [
      {
        chainId: 5,
        from: account,
        calls: [
          {
            to: account,
            value,
            data: "0x",
            gas: "0x76c0",
          },
          {
            to: account,
            value,
            data: "0x",
            gas: "0x76c0",
          },
        ],
      },
    ];
    console.log(calls);
    try {
      const userOpHash = await wallet.provider.request({
        method: "wallet_sendFunctionCallBundle",
        params: calls,
      });
      if (userOpHash && userOpHash.startsWith("0x")) {
        setuserOpHash(userOpHash);
      }
    } catch (error) {
      setError(error);
    }
  };

  // function to ask the wallet to return the bundle status
  const getBundleStatus = async (userOpHash) => {
    if (!wallet?.provider) return;
    try {
      const status = await wallet.provider.request({
        method: "wallet_getBundleStatus",
        params: [userOpHash],
      });
      if (status) {
        const response = JSON.parse(status).calls[0].status;
        setStatus(response);
      }
    } catch (error) {
      setError(error);
    }
  };

  // function to delegate showing the bundle status to the wallet
  const showBundleStatusInWallet = async (userOpHash) => {
    if (!wallet?.provider) return;
    try {
      const status = await wallet.provider.request({
        method: "wallet_showBundleStatus",
        params: [userOpHash],
      });
      if (status) {
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div>
        <h1>Batch Transactions Demo</h1>
        <h3>This demo demonstractes how to send a batch of transaction to a smart wallet</h3>
        <div>
          <p>{`Account: ${truncateAddress(account)}`}</p>
        </div>
        {account && (
          <div>
            <button onClick={sendBundledCalls}>Send Bundled Txs</button>
            <br />
            <br />
            <button
              onClick={() => getBundleStatus(userOpHash)}
              disabled={!userOpHash}
            >
              Check Bundle Status
            </button>
            <br />
            <br />
            {status !== undefined ? <p>Status: {status}</p> : null}
            <button
              onClick={() => showBundleStatusInWallet(userOpHash)}
              disabled={!userOpHash}
            >
              Show Status in Wallet
            </button>
          </div>
        )}
        <p>{error ? error.message : null}</p>
      </div>
    </>
  );
};

export default BatchTransactions;
