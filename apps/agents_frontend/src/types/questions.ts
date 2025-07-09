export type CreateQuestionRequest = {
	question: string;
};

export type CreateQuestionResponse = {
	questionId: string;
	answer: string | null;
};

export type GetRoomQuestionsResponse = Array<{
	questionId: string;
	question: string;
	answer: string | null;
	createdAt: string;
	isGeneratingAnswer?: boolean;
}>;
