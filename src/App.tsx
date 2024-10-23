import React, { useEffect, useState } from 'react';
import { useAccount } from "@starknet-react/core";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WalletBar } from './components/wallet-button';

interface Beast {
  prefix: string;
  name: string;
  suffix: string;
  type: string;
  tier: number;
  level: number;
  health: number;
  image: string;
}

interface BeastNFTData {
  metadata: {
    image: string;
    attributes: Attribute[];
  }
}

interface Attribute {
  display_type: string | null;
  trait_type: string;
  value: string | number;
};

function extractBeastFromData(attributes: Attribute[]): Record<string, string | number> {
  return attributes.reduce((acc, attribute) => {
    acc[attribute.trait_type] = attribute.value;
    return acc;
  }, {} as Record<string, string | number>);
}

function App() {
  const { address } = useAccount();
  const [beasts, setBeasts] = useState<Beast[]>([]);

  useEffect(() => {
    if (address) {
      const address = '0x74cc33d3953874cd8cd07b153d8d868059b56433ea810b3257e2a5caa64234a';
      fetch(
        `https://api.marketplace.arkproject.dev/portfolio/${address}?items_per_page=50&collection=0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd`
      )
        .then(res => res.json())
        .then((res: { data: BeastNFTData[] }) => {
          console.log(res);
          const beasts = res.data.map(beast_data => {
            const { image, attributes } = beast_data.metadata;
            const beast = { ...extractBeastFromData(attributes), image };
            return beast as Beast;
          });
          setBeasts(beasts);
        })
        .catch(error => console.error('Error fetching beasts:', error));
    }
  }, [address]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <WalletBar></WalletBar>
      </div>
      <pre>
        {beasts.map(beast => <div className="card">
          <img src={beast.image} />
          <h3>{beast.prefix} {beast.name} {beast.suffix}</h3>
        </div>)}
      </pre>
    </>
  )
}

export default App
