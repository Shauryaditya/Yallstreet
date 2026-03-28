export default async function handler(req, res) {
  const { function: fn, symbol, time_period, series_type } = req.query;
  const apikey = process.env.AV_KEY;
  if (!apikey) return res.status(500).json({ error: 'AV_KEY is missing' });

  const url = `https://www.alphavantage.co/query?function=${fn}&symbol=${symbol}&interval=daily&time_period=${time_period}&series_type=${series_type}&apikey=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
