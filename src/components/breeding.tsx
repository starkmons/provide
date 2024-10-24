import React, { useState } from 'react';
import { Beast } from '../inc/types';
import { CTAButton, WalletBar } from './wallet-button';

interface BeastCardProps {
	beast: Beast;
	isSelected?: boolean;
	onClick?: () => void;
}

const BeastCard: React.FC<BeastCardProps> = ({ beast, isSelected, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`flex flex-col items-center ${onClick ? 'cursor-pointer' : ''} transition-all`}
		>
			<img
				src={beast.image}
				alt={`${beast.prefix} ${beast.name} ${beast.suffix}`}
				className={`w-24 h-24 object-cover rounded-full ${isSelected ? 'ring-2 ring-gray-100' : ''}`}
			/>
			<div className="text-gray-400 mt-2 px-2 rounded-full text-xs">
				T{beast.tier} • Lv {beast.level}
			</div>
			<div className="text-center text-sm mb-2 text-gray-200">
				{beast.prefix} {beast.name} {beast.suffix}
			</div>
		</div>
	);
};

interface EmptySlotProps {
	onClick?: () => void;
}

const EmptySlot: React.FC<EmptySlotProps> = ({ onClick }) => (
	<div
		onClick={onClick}
		className={`flex flex-col items-center ${onClick ? 'cursor-pointer' : ''} transition-all`}
	>
		<div className={`w-24 h-24 object-cover rounded-full bg-gray-500`} />
		<div className="text-gray-400 mt-2 px-2 rounded-full text-xs">
			&mdash;
		</div>
		<div className="text-center text-sm mb-2 text-gray-200">
			Empty Slot
		</div>
	</div>
);

interface NFTBreedingInterfaceProps {
	beasts: Beast[];
	onBreed: (beast1: Beast, beast2: Beast) => void;
	children?: React.ReactNode;
	isWalletConnected: boolean;
}

const NFTBreedingInterface: React.FC<NFTBreedingInterfaceProps> = ({
	beasts,
	onBreed,
	children,
	isWalletConnected
}) => {
	const [selectedBeasts, setSelectedBeasts] = useState<Beast[]>([]);

	const toggleBeastSelection = (beast: Beast) => {
		if (selectedBeasts.find(b => b.token_id === beast.token_id)) {
			setSelectedBeasts(selectedBeasts.filter(b => b.token_id !== beast.token_id));
		} else if (selectedBeasts.length < 2) {
			setSelectedBeasts([...selectedBeasts, beast]);
		}
	};

	const initiateBreeding = () => {
		if (selectedBeasts.length === 2) {
			onBreed(selectedBeasts[0], selectedBeasts[1]);
		}
	};

	return (
		<>
			{/* Selected Beasts Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Selected Beasts ({selectedBeasts.length}/2)</h2>
				<div className="p-10 mx-auto grid grid-cols-2 gap-5 max-w-xl">
					{[0, 1].map((slot) => (
						selectedBeasts[slot]
							? <BeastCard
								key={selectedBeasts[slot].token_id}
								beast={selectedBeasts[slot]}
								isSelected={true}
							/>
							: <EmptySlot key={slot} />
					))}
				</div>
				<CTAButton
					onClick={initiateBreeding}
					disabled={selectedBeasts.length !== 2}
					className="mt-4 px-6 py-3 rounded text-white font-semibold bg-gray-300"
				>
					{selectedBeasts.length == 2 ? 'Start Breeding' : 'Select 2 Beasts to Breed'}
				</CTAButton>
			</div>

			{/* Beast Collection Grid */}
			<div>
				<h2 className="text-2xl font-bold mb-4">Your Beasts</h2>
				<div className="p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 text-center">
					{!isWalletConnected ? (
						<div className="col-span-full flex flex-col items-center justify-center p-8">
							<p className="text-gray-300 mb-4 text-lg">Connect your wallet to view and breed your beasts</p>

							<WalletBar />
						</div>
					) : (
						beasts.map((beast) => (
							<BeastCard
								key={beast.token_id}
								beast={beast}
								isSelected={selectedBeasts.some(b => b.token_id === beast.token_id)}
								onClick={() => toggleBeastSelection(beast)}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default NFTBreedingInterface;