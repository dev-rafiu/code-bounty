const BITNOB_API = "https://api.bitnob.com/api/v1";

export const sendBitcoin = async (toAddress: string, amount: string) => {
  // Simple API call to Bitnob
  const response = await fetch(`${BITNOB_API}/transactions/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BITNOB_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: toAddress,
      amount: amount,
      currency: "BTC",
    }),
  });
  return response.json();
};
