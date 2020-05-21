export interface BaseDocument {
	id: string;
	ref: firebase.firestore.DocumentReference;
	owner: string;
	ownerName: string;
	title: string;
	timeCreated: firebase.firestore.Timestamp;
}

export interface ChatRoom extends BaseDocument {
}

export interface Message extends BaseDocument {
	message: string;
}

export interface BlogArticle extends BaseDocument {
	content: any;
}

export interface TodoList extends BaseDocument {
}

export interface TodoItem extends BaseDocument {
	completed: boolean;
}
