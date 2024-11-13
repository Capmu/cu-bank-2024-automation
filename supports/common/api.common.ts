export async function registerUser(
  accountId: string,
  password: string,
  name: string
) {
  const url = `${process.env.CUBANK_BE_URL}/api/v1/auth/register`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    accountId: accountId,
    password: password,
    name: name,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
