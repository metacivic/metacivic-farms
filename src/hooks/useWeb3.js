import { useEffect, useState, useRef } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';
import { getWeb3NoAccount } from '../utils/web3';

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { ethereum } = useWallet();
  const refEth = useRef(ethereum);
  const [web3, setweb3] = useState(
		ethereum ? new Web3(ethereum) : getWeb3NoAccount(),
  );

  useEffect(() => {
    if (ethereum !== refEth.current) {
      setweb3(ethereum ? new Web3(ethereum) : getWeb3NoAccount());
      refEth.current = ethereum;
    }
  }, [ethereum]);

  return web3;
};

export default useWeb3;
