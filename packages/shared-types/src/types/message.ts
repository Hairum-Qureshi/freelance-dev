export type Message = {
	id: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	sender: {
		id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
	};
};
