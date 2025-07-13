import { CreateRoomForm } from "@/components/room-form";
import { RoomList } from "@/components/room-list";

// async function createRoom(body: CreateRoomRequest) {
// 				const { data } = await http.post<APiResponse<{ roomId: string }>>(
// 					"/rooms",
// 					JSON.stringify(body),
// 					{
// 						headers: {
// 							"Content-Type": "application/json",
// 						},
// 					},
// 				);
// 				return { data };
// }
export default async function CreateRoom() {
	// const { data } = await http.get<APiResponse<GetRoomsResponse>>("/rooms",{
	// 	next: {
	// 		tags: ["create-room"]
	// 	}
	// });
	// const revalidate = async() => {
	// 	"use server"
	// 	revalidateTag("create-room");
	// }
	return (
		<div className="min-h-screen p-4">
			<div className="mx-auto max-w-4xl">
				<div className="grid grid-cols-2 items-start gap-8">
					<CreateRoomForm  />
					<RoomList  />
				</div>
			</div>
		</div>
	);
}
