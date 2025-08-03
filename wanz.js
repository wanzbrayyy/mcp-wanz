import fetch from "node-fetch";
const query = {
  prompt: "judul dan link 5 berita terbaru tentang teknologi",
  url: "https://www.cnnindonesia.com/teknologi"
};

fetch("http://localhost:3000/extract-web-data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(query)
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
