import logo from './logo.svg';
import './App.css';
import WrappedWeb3ReactProvider from "./chain/WrappedWeb3ReactProvider";
import Web3ConnectionManager from "./chain/Web3ConnectionManager";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";


export function BNBBalance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            let z = ethers.utils.formatEther(balance);
            setBalance(z);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
    <br />
    Account: {account}
    <br />
    BNB balance: {balance}
      
    </>
  );
}

function App() {
  return (
    <WrappedWeb3ReactProvider>
      <Web3ConnectionManager>
        
      <div className="App">
      <header className="App-header">        
        <p>
          Basic Vegaswap template
          <BNBBalance />
        </p>
        
      </header>
    </div>

      </Web3ConnectionManager>
    </WrappedWeb3ReactProvider>
  );
}

export default App;
