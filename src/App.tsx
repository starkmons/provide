import React, { useEffect, useState } from 'react';
import { useAccount } from "@starknet-react/core";
import './App.css'
import { WalletBar } from './components/wallet-button';
import { Attribute, Beast, BeastNFTData } from './inc/types';
import BreedingInterface from './components/breeding';


function extractBeastFromData(attributes: Attribute[]): Record<string, string | number> {
  return attributes.reduce((acc, attribute) => {
    acc[attribute.trait_type] = attribute.value;
    return acc;
  }, {} as Record<string, string | number>);
}

function App() {
  const { address } = useAccount();
  const [loadingBeasts, setLoadingBeasts] = useState(true);
  const [beasts, setBeasts] = useState<Beast[]>([]);

  useEffect(() => {
    if (address) {
      const address = '0x74cc33d3953874cd8cd07b153d8d868059b56433ea810b3257e2a5caa64234a';
      fetch(
        `https://api.marketplace.arkproject.dev/portfolio/${address}?items_per_page=50&collection=0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd`
      )
        .then(res => res.json())
        .then((res: { data: BeastNFTData[] }) => {
          const beasts = res.data.map(beast_data => {
            const token_id = beast_data.token_id;
            const { image, attributes } = beast_data.metadata;
            const beast = { ...extractBeastFromData(attributes), image, token_id };
            return beast as Beast;
          });
          setBeasts(beasts);
          setLoadingBeasts(false);
        })
        .catch(error => console.error('Error fetching beasts:', error));
    }
  }, [address]);

  return (
    <BreedingInterface
      beasts={beasts}
      onBreed={(beast1, beast2) => {
        console.log(beast1, beast2);
      }}
      isWalletConnected={!!address}
    >
      {loadingBeasts ? (
        <h3>Loading...</h3>
      ) : (
        <h3>You have no beasts.</h3>
      )}
    </BreedingInterface>
  );
}

export default App
