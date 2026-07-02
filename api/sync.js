const SHEET_URL = "https://script.google.com/macros/s/AKfycbwKTn0YeNFLWEzn-gKkwy4KjowDtAdYoU4syog3CX6Z9qEGM6iAlCB8MwhwTrDXOYQ/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const { action, run, id } = req.query;
      let url = `${SHEET_URL}?action=${action}`;
      if (run) url += `&run=${run}`;
      if (id) url += `&id=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
