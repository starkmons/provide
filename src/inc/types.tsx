export interface Beast {
	token_id: string,
	prefix: string;
	name: string;
	suffix: string;
	type: string;
	tier: number;
	level: number;
	health: number;
	image: string;
}

export interface BeastNFTData {
	token_id: string,
	metadata: {
		image: string;
		attributes: Attribute[];
	}
}

export interface Attribute {
	display_type: string | null;
	trait_type: string;
	value: string | number;
};
