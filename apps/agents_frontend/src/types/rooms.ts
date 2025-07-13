import type z from "zod";
import type { createRoomSchema } from "../../schema/room";

export type GetRoomsResponse = {
	previusPage: number | null;
	nextPage: number | null;
	page: number;
	totalPages: number;
	data: Array<{
		roomId: string;
		name: string;
		questionsCount: number;
		createdAt: string;
	}>;
};

export type CreateRoomRequest = z.infer<typeof createRoomSchema>;


export type RoomParams = {
	id: string;
};