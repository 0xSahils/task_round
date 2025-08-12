import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API is running in development mode" });
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
