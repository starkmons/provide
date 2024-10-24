import React, { useState } from 'react';
import { Beast } from '../inc/types';

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

