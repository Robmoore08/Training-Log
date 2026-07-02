const SHEET_URL = "https://script.google.com/macros/s/AKfycbydmEN5OeCVFr4OHOfmw0mK9usqnLMWdOa7dYkzvmy5L3sMElTJZoh_4H8kRaKyfgYG/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { action, run, id } = req.query;
    let url = `${SHEET_URL}?action=${action}`;
    if (run) url += `&run=${encodeURIComponent(run)}`;
    if (id) url += `&id=${id}`;

    const response = await fetch(url, {
      redirect: "follow",
      headers: { "Accept": "application/json" }
    });

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res.status(200).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
