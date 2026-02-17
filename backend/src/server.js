import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`ICE SPOT backend running on http://localhost:${port}`);
});
