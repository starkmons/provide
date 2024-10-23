import { useAccount, useConnect } from "@starknet-react/core";

export function WalletBar() {
	const { address } = useAccount();

	return (
		<div className="w-full py-2 h-24 border-b border-primary">
			{address ? <ConnectedWallet address={address} /> : <ConnectWallet />}
		</div>
	);
}

function ConnectedWallet({ address }: { address: `0x${string}` }) {
	return (
		<div className="h-full flex flex-col justify-center">
			{address.substring(0, 4)}...{address.slice(-4)}
		</div>
	);
}

function ConnectWallet() {
	const { connect, connectors, status } = useConnect();

	return (
		<div>
			<div className="font-medium">Connect Wallet: </div>
			{connectors.map((connector) => (
				<button
					key={connector.id}
					onClick={() => connect({ connector })}
					disabled={status === "pending"}
				>
					{connector.name}
				</button>
			))}
		</div >
	);
}