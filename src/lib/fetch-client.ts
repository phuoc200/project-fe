type FetchOptions = {
  method?: string;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  const { method = "GET", body, headers = {}, ...customConfig } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export { fetchClient };
