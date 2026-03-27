const express = require("express");

const app = express();
const PORT = 3000;

// fake token storage (in memory)
let token = null;
let isFetching = false;

// simulate login to Vault
async function loginToVault() {
  console.log("🔐 Logging into Vault...");
  return "token_" + Date.now();
}

// endpoint
app.get("/token", async (req, res) => {
  if (token) {
    return res.json({ token });
  }

  if (!isFetching) {
    isFetching = true;
    token = await loginToVault();
    isFetching = false;
    return res.json({ token });
  }

  // wait until token is ready
  const wait = () =>
    new Promise((resolve) => {
      const interval = setInterval(() => {
        if (token) {
          clearInterval(interval);
          resolve(token);
        }
      }, 50);
    });

  const result = await wait();
  res.json({ token: result });
});

app.listen(PORT, () => {
  console.log(`🚀 TM running on http://localhost:${PORT}`);
});
