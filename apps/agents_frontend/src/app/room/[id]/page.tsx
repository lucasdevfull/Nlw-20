"use client";
import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import type { RoomParams } from "@/types/rooms";
import { ArrowLeft, Radio } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Room() {
	const { id } = useParams<RoomParams>();
	const router = useRouter();
	if (!id) {
		router.push("/");
	}
	return (
		<div className="min-h-screen bg-zinc-950">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<Link href="/">
							<Button variant="outline">
								<ArrowLeft className="mr-2 size-4" />
								Voltar ao Início
							</Button>
						</Link>
						<Link href={`/room/${id}/audio`}>
							<Button className="flex items-center gap-2" variant="secondary">
								<Radio className="size-4" />
								Gravar Áudio
							</Button>
						</Link>
					</div>
					<h1 className="mb-2 font-bold text-3xl text-foreground">
						Sala de Perguntas
					</h1>
					<p className="text-muted-foreground">
						Faça perguntas e receba respostas com IA
					</p>
				</div>

				<div className="mb-8">
					<QuestionForm roomId={id} />
				</div>

				<QuestionList roomId={id} />
			</div>
		</div>
	);
}
