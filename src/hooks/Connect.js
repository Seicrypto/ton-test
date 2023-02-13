import React, { useEffect, useState } from 'react';

export default function Connect () {
    const [network, setNetwork] = useState("");
  
    const switchNetwork = async () => {
        console.log("tonConnect");
      const provider = window.ton ?? {};
      console.log("provider openmask",provider ,provider.isOpenMask);
      if (!provider?.isOpenMask) return;
  
      try {
        await provider.send("wallet_switchChain", "mainnet");
      } catch (e) {
        console.error(e);
      }
    };
  
    useEffect(() => {
      const provider = window.ton ?? {};
      if (!provider?.isOpenMask) return;
  
      // Initial chainId value
      provider.send("wallet_getChain").then((chainId) => setNetwork(chainId));
  
      // Subscribe to change network
      provider.on("chainChanged", setNetwork);
      return () => {
        // Unsubscribe
        provider.off("chainChanged", setNetwork);
      };
    }, []);
  
    if (network !== "mainnet") {
      return (
        <div>
          <button onClick={switchNetwork}>
            Switch to Mainnet
          </button>
        </div>
      );
    }
  
    return <Connect />;
  };