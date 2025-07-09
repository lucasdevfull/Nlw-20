"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createRoom } from "@/hooks/rooms";
import type { CreateRoomFormData } from "@/types/rooms";
import { createRoomSchema } from "../../schema/room";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function CreateRoomForm() {
	const { mutateAsync } = createRoom();
	const createRoomForm = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	async function handleCreateRoom(data: CreateRoomFormData) {
		await mutateAsync(data);
		await createRoomForm.reset();
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Criar Sala</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...createRoomForm}>
					<form
						onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={createRoomForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome da sala</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Digite o nome da sala" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={createRoomForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome da sala</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Criar sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
