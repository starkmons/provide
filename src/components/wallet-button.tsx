import { useAccount, useConnect } from "@starknet-react/core";

export function WalletBar() {
	const { address } = useAccount();

	return (
		<div className="w-full py-2 h-24">
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

export const CTAButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
	const clrClass = props.disabled ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700";
	return (
		<button
			{...props}
			className={`text-white font-semibold py-2 px-6 rounded-lg ${clrClass} ${props.className}`}
		/>
	);
};

function ConnectWallet() {
	const { connect, connectors, status } = useConnect();

	return (
		<div>
			{connectors.map((connector) => (
				<CTAButton
					key={connector.id}
					onClick={() => connect({ connector })}
					disabled={status === "pending"}
				>
					{connector.name}
				</CTAButton>
			))}
		</div >
	);
}