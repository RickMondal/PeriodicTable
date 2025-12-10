import cors from "cors";
import express from "express";
import { elements } from "./data/elements";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/elements", (_req, res) => {
  res.json(elements);
});

app.get("/api/elements/:symbol", (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const element = elements.find((item) => item.symbol.toLowerCase() === symbol);

  if (!element) {
    return res.status(404).json({ error: `Element '${req.params.symbol}' not found.` });
  }

  res.json(element);
});

app.get("/api/elements/:symbol/isotopes/:isotopeId", (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const element = elements.find((item) => item.symbol.toLowerCase() === symbol);

  if (!element) {
    return res.status(404).json({ error: `Element '${req.params.symbol}' not found.` });
  }

  const isotope = element.isotopes.find((item) => item.id.toLowerCase() === req.params.isotopeId.toLowerCase());

  if (!isotope) {
    return res.status(404).json({
      error: `Isotope '${req.params.isotopeId}' not found for element '${req.params.symbol}'.`,
    });
  }

  res.json({ element, isotope });
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Express backend ready on http://localhost:${port}`);
});
