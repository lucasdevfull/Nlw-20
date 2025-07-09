import type z from "zod";
import type { createRoomSchema } from "../../schema/room";

export type GetRoomsResponse = {
	data: Array<{
		roomId: string;
		name: string;
		questionsCount: number;
		createdAt: string;
	}>;
};

export type CreateRoomRequest = z.infer<typeof createRoomSchema>;
