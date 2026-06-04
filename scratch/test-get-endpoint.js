async function check() {
  try {
    const res = await fetch('http://localhost:3000/api/tests');
    if (!res.ok) {
      console.error("HTTP error:", res.status);
      return;
    }
    const data = await res.json();
    console.log("--- API RESPONSE (FIRST 2 TESTS) ---");
    console.log(JSON.stringify(data.slice(0, 2), null, 2));
  } catch (err) {
    console.error("Error fetching API:", err.message);
  }
}

check();
