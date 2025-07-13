"use client";
import { ArrowRight } from "lucide-react";
import { useGetRooms } from "@/hooks/rooms";
import { dayjs } from "../../utils/dayjs";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import Link from "next/link";
import { PaginationComponent } from "./pagination";

export function RoomList() {
	const { data, isLoading } = useGetRooms();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas recentes</CardTitle>
				<CardDescription>
					Acesso rápido para as salas criadas recentemente
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="text-muted-foreground text-sm">Carregando salas...</p>
				)}
				{data &&
					data.data.map(({ roomId, name, questionsCount, createdAt }) => {
						return (
							<Link href={`/room/${roomId}`} key={roomId}>
								<div className="flex items-center justify-between border p-3 hover:bg-accent">
									<div className="flex-1 flex flex-col gap-1">
										<h3 className="font-medium">{name}</h3>

										<div className="flex items-center gap-1">
											<Badge variant={"secondary"} className="text-xs">
												{questionsCount} pergunta(s)
											</Badge>
											<Badge variant={"secondary"} className="text-xs">
												{dayjs(createdAt).toISOString()}
											</Badge>
										</div>
									</div>

									<span className="flex items-center gap-1 text-sm">
										Entrar
										<ArrowRight className="size-3" />
									</span>
								</div>
							</Link>
						);
					})}
			</CardContent>
			{data && (
				<CardFooter className="flex items-center justify-between gap-3">
					<p className="text-muted-foreground grow text-sm" aria-live="polite">
						Page <span className="text-foreground">{data?.page}</span> of{" "}
						<span className="text-foreground">{data?.totalPages}</span>
					</p>
					<PaginationComponent {...data} />
				</CardFooter>
			)}
		</Card>
	);
}
