import { extractErrorMessage } from "./errors";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      signal: AbortSignal.timeout(10000),
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return {
        datas: null,
        error: {
          code: response.status,
          message: response.statusText,
        },
      };
    }

    const datas = (await response.json()) as User[];
    return { error: null, code: response.status, datas };
  } catch (error: unknown) {
    return { message: extractErrorMessage(error) };
  }
}
