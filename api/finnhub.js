export default async function handler(req, res) {
  const { endpoint, symbol, category, from, to } = req.query;
  const token = process.env.FINHUB_KEY;
  if (!token) return res.status(500).json({ error: 'FINHUB_KEY is missing' });

  let url = `https://finnhub.io/api/v1/${endpoint}?token=${token}`;
  if (symbol) url += `&symbol=${symbol}`;
  if (category) url += `&category=${category}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
