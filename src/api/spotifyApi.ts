
import Cookies from "js-cookie";

function getCsrfToken()
{
  return Cookies.get("XSRF-TOKEN");
}


// curently sending csrf token on GET - refactor later
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  retry = true,
): Promise<T | null> {
  const csrfToken = getCsrfToken();

  const res = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken && {"X-XSRF-TOKEN": csrfToken}),
      ...options?.headers, // if some additional headers add them
    },
    ...options,
  });
  if (res.status === 204) return null;
  if(res.status === 403 && retry){   
    await fetch("/api/csrf", { credentials: "include" }); 
    return apiFetch(path, options, false);
  }
  else if (!res.ok) throw new Error(`API error ${res.status}`);

  return res.json();
}

export async function apiGet<T>(path: string): Promise<T | null> {
  return apiFetch<T>(path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T | null> {
  return apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body)  
  })
}
export async function apiDelete<T>(path: string) {
  return apiFetch<T>(path, {method: "DELETE"});
}