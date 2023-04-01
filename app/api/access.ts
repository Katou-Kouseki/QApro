import md5 from "spark-md5";

export function getAccessCodes(): Set<string> {
  const code = process.env.CODE;

  try {
    const codes = (code?.split(",") ?? [])
      .filter((v) => !!v)
      .map((v) => md5.hash(v.trim()));
    return new Set(codes);
  } catch (e) {
    return new Set();
  }
}

export const ACCESS_CODES = getAccessCodes();
export const IS_IN_DOCKER = process.env.DOCKER;

export async function requestAccessCheck(code: string) {
  const url = process.env.ACCESS_CHECK_URL
  const response = (await fetch(`${url}?code=${code}`, {
    method: "GET",
  })) as Response;
  const data = response.body;
  const reader = data?.getReader();
  const decoder = new TextDecoder("utf-8");

  const { value } = await reader?.read() as any;
  let char = decoder.decode(value);
  let parse = JSON.parse(char) || {};

  if (parse?.code !== 200) {
    return parse.msg
  }
  return true
};