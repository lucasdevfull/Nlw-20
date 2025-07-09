'use client';
import { http } from "@common/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type GetRooms = Array<{
	roomId: string;
	name: string;
}>

async function getRooms() {
	const data = await http.get<GetRooms>('/rooms');
	return data
}

export default function CreateRoom() {
	const { data, isLoading } = useQuery({
		queryKey: ['get-rooms'],
		queryFn: getRooms
	})
	return (
	<div>
		<div>CreateRoom</div>

		{isLoading && <p>Carregando...</p>}

		{data?.map(room => {
			return <Link href={`/room/${room.roomId}`} key={room.roomId}>{room.name}</Link>
		})}
	</div>
	)
}
