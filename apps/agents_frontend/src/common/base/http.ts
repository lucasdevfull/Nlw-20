export class HttpClient {
	private baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get<T>(url: string, init?: RequestInit | undefined): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, init);
		const data = (await response.json()) as T;
		return data;
	}

	async post<T>(
		url: string,
		requestBody?: BodyInit | null,
		init?: RequestInit | undefined,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			...init,
			method: "POST",
			body: requestBody,
		});
		const data = (await response.json()) as T;
		return data;
	}

	async put<T>(
		url: string,
		requestBody?: BodyInit | null,
		init?: RequestInit | undefined,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			...init,
			method: "PUT",
			body: requestBody,
		});
		const data = (await response.json()) as T;
		return data;
	}

	async delete<T>(url: string, init?: RequestInit | undefined): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			...init,
			method: "DELETE",
		});
		const data = (await response.json()) as T;
		return data;
	}
}
