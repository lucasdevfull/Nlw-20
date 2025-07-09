import { HttpClient } from "@common/base/http";
import { env } from "@/env";

export const http = new HttpClient("http://localhost:3333/api");
console.log(http);
