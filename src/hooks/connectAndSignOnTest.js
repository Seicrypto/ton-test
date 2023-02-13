import React, { useState, useEffect } from "react";

const Connect = () => {
    const [address, setAddress] = useState("");
    const [signature, setSignature] = useState("");
    const [network, setNetwork] = useState("");
  
    const connect = async () => {
      const provider = window.ton;
  
      try {
        const accounts = await provider.send("ton_requestAccounts");
        const account = accounts[0];
        setAddress(account);
  
        // Store account to user local storage to know
        // that yout dApp already have and access
        localStorage.setItem("OpenMask", account);
      } catch (e) {
        console.error(e);
      }

    };

    const switchNetwork = async () => {
      const provider = window.ton ?? {};
      if (!provider?.isOpenMask) return;

      try {
        await provider.send("wallet_switchChain", "testnet");
      }catch (e) {
        console.error(e)
      }
    }

    const signMessage = async () => {
        const provider = window.ton;


        try {
            const signature = await provider.send("ton_personalSign", {
                data: "Sign a word",
            });
            setSignature(signature);
            console.log(signature);
        } catch (e) {
            console.error(e);
        }
    };
  
    useEffect(() => {
      // After  initialize dApp
      // check if your dApp had an access to wallet and run auto-connect
      const account = localStorage.getItem("OpenMask");
      if (!account) return;
  
      connect();

      const provider = window.ton ?? {};
      if (!provider?.isOpenMask) return;

      provider.send("wallet_getChain").then((chainId) => setNetwork(chainId));

      provider.on("chainChanged", setNetwork);
      return () => {
        provider.off("chainChanged", setNetwork);
      };

    }, []);
  
    return (
      <div>
        <button onClick={connect}>
          Connect OpenMask
        </button>
        <button onClick={switchNetwork}>Switch to testnet</button>
        {address && (
          <div>{address}<br /> <button onClick={signMessage}>Sign message</button><br /> {signature && <div>{signature}</div>} </div>
        )}
      </div>
    );

  };

  export default Connect;