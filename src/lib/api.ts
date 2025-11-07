const API_URL = "https://gorest.co.in/public/v2";
const TOKEN= '6a7f7dffb4ef246b7d1342ce4d8b26ffae5aba26cbed193a2d9a5b3ed55c0c38'




async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json();
}

const api = {
 async getUsers(params?: { page?: number; per_page?: number; name?: string }) {
  const query = new URLSearchParams();

 
  query.set("page", String(params?.page ?? 1));
  query.set("per_page", String(params?.per_page ?? 20));

 
  if (params?.name) {
    query.set("name", params.name);
  }

  return await request(`/users?${query.toString()}`);
},

  async updateUser(
    id: string,
    data: Partial<{ name: string; email: string; gender: string; status: string }>
  ) {
    return await request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },


};

export default api;