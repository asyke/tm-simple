export default async function handler(req, res) {
  if (!global.token) {
    console.log("🔐 Fetching token...");
    global.token = "token_" + Date.now();
  }

  res.status(200).json({ token: global.token });
}