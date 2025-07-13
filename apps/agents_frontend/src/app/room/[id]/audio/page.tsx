'use client'
import { http } from "@/common/client";
import { Button } from "@/components/ui/button";
import { RoomParams } from "@/types/rooms";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";


const isRecordingSupported = !!navigator.mediaDevices 
    && typeof navigator.mediaDevices.getUserMedia === 'function' 
    && typeof window.MediaRecorder;

export default function Audio() {
    const { id } = useParams<RoomParams>();

    const [isRecording, setIsRecording] = useState(false);
    const recorderRef = useRef<MediaRecorder | null>(null);

    function stopRecording() {
        setIsRecording(false);
        if (recorderRef.current && recorderRef.current.state === 'inactive') {
            recorderRef.current.stop();
        }
    }

    async function uploadAudio(data: Blob) {
        const formData = new FormData();
        formData.append('file', data, 'audio.webm');


        const response = await http.post(`/rooms/${id}/audio`, formData);


    }
    async function startRecording() {
        if(!isRecordingSupported) {
            alert('Seu navegador não suporta gravacao de áudio');
            return;
        }

        setIsRecording(true);

        const audio = await navigator.mediaDevices.getUserMedia({ audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
        }});

        recorderRef.current = new MediaRecorder(audio,{
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64000,
        });

        recorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                uploadAudio(event.data);
            }
        }

        recorderRef.current.onstart = () => {
            console.log('Gravação iniciada');
        }

        recorderRef.current.onstop = () => {
            console.log('Gravação encerrada');
        }

        recorderRef.current.start();
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {isRecording ? (
                <Button onClick={stopRecording}>Parar a Gravação</Button>
            ) :
                <Button onClick={startRecording}>Gravar áudio</Button>
            }
            {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
        </div>
    )
}