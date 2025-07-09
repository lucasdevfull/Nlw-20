import { HttpClient } from "@common/base/http";
import { env } from "@/env";

export const http = new HttpClient(env.NEXT_PUBLIC_API_URL);
