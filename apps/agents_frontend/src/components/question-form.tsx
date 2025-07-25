import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/hooks/questions";
import { CreateQuestionFormData } from "@/types/questions";
import { createQuestionSchema } from "../../schema/questions";

interface QuestionFormProps {
	roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
	const { mutateAsync } = useCreateQuestion(roomId);

	const form = useForm<CreateQuestionFormData>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: "",
		},
	});

	async function handleCreateQuestion(data: CreateQuestionFormData) {
		await mutateAsync(data);
	}

	const { isSubmitting } = form.formState;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma Pergunta</CardTitle>
				<CardDescription>
					Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={form.handleSubmit(handleCreateQuestion)}
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua Pergunta</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[100px]"
											disabled={isSubmitting}
											placeholder="O que você gostaria de saber?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isSubmitting} type="submit">
							Enviar pergunta
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
