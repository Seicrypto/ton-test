import React, { useState, useEffect } from "react";

const Connect = () => {
    const [address, setAddress] = useState("");
  
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
  
    useEffect(() => {
      // After  initialize dApp
      // check if your dApp had an access to wallet and run auto-connect
      const account = localStorage.getItem("OpenMask");
      if (!account) return;
  
      connect();
    }, []);
  
    return (
      <div>
        <button onClick={connect}>
          Connect OpenMask
        </button>
        {address && (
          <div>{address}<br /></div>
        )}
      </div>
    );

  };

  export default Connect;