export interface ChatRoom {
	id: string;
	owner: string;
	ownerName: string;
	title: string;
}

export interface Message {
	id: string;
	ownerName: string;
	owner: string;
	message: string;
}

