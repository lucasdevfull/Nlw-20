"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/common/client";
import type { CreateRoomRequest, GetRoomsResponse } from "@/types/rooms";
import type { APiResponse } from "@/types/base";
import { useSearchParams } from "next/navigation";

async function getRooms(page: string | null, limit: string | null) {
	let url = "/rooms";
	if (page && limit) {
		url = `/rooms?page=${page}&limit=${limit}`;
	}
	const { data } = await http.get<APiResponse<GetRoomsResponse>>(url);
	return data;
}

export function useGetRooms() {
	const params = useSearchParams();

	return useQuery({
		queryKey: ["get-rooms", params.get("page"), params.get("limit")],
		staleTime: 1000 * 60 * 5,
		queryFn: async () => {
			const result = await getRooms(params.get("page"), params.get("limit"));
			return result;
		},
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
