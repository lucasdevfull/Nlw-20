import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/common/client";
import { APiResponse } from "@/types/base";
import type {
	CreateQuestionRequest,
	CreateQuestionResponse,
	GetRoomQuestionsResponse,
} from "@/types/questions";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (body: CreateQuestionRequest) => {
			const { data } = await http.post<APiResponse<CreateQuestionResponse>>(
				`/rooms/${roomId}/questions`,
				JSON.stringify(body),
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			return data;
		},

		// Executa no momento que for feita a chamada p/ API
		onMutate({ question }) {
			const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
				"get-questions",
				roomId,
			]);

			const questionsArray = questions ?? [];

			const newQuestion = {
				questionId: crypto.randomUUID(),
				question,
				answer: null,
				createdAt: new Date().toISOString(),
				isGeneratingAnswer: true,
			};

			queryClient.setQueryData<GetRoomQuestionsResponse>(
				["get-questions", roomId],
				[newQuestion, ...questionsArray],
			);

			return { newQuestion, questions };
		},

		onSuccess(data, _variables, context) {
			queryClient.setQueryData<GetRoomQuestionsResponse>(
				["get-questions", roomId],
				(questions) => {
					if (!questions) {
						return questions;
					}

					if (!context.newQuestion) {
						return questions;
					}

					return questions.map((question) => {
						if (question.questionId === context.newQuestion.questionId) {
							return {
								...context.newQuestion,
								id: data.questionId,
								answer: data.answer,
								isGeneratingAnswer: false,
							};
						}

						return question;
					});
				},
			);
		},

		onError(_error, _variables, context) {
			if (context?.questions) {
				queryClient.setQueryData<GetRoomQuestionsResponse>(
					["get-questions", roomId],
					context.questions,
				);
			}
		},

		// onSuccess: () => {
		//   queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
		// },
	});
}

export function useRoomQuestions(roomId: string) {
	return useQuery({
		queryKey: ["get-questions", roomId],
		queryFn: async () => {
			const { data } = await http.get<APiResponse<GetRoomQuestionsResponse>>(
				`/rooms/${roomId}/questions`,
			);

			return data;
		},
	});
}
