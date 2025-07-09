"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/common/client";
import type { CreateRoomRequest, GetRoomsResponse } from "@/types/rooms";
import { APiResponse } from "@/types/base";

async function getRooms() {
	const { data } = await http.get<GetRoomsResponse>("/rooms");
	return data;
}

export function useGetRooms() {
	return useQuery({
		queryKey: ["get-rooms"],
		queryFn: getRooms,
	});
}

export function createRoom() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["create-room"],
		mutationFn: async (body: CreateRoomRequest) => {
			const { data } = await http.post<APiResponse<{ roomId: string }>>(
				"/rooms",
				JSON.stringify(body),
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			return { data };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-rooms"] });
		},
	});
}
