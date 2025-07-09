import z from "zod";

export const createRoomSchema = z.object({
	name: z.string().min(1, { message: "Inclua no mínimo 3 caracteres" }),
	description: z.string(),
});
