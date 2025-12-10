import type { Element, Isotope } from "@/types/chemistry";

const DEFAULT_API_BASE = "http://localhost:4000";

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE;

export const fetchElements = async (): Promise<Element[]> => {
  const res = await fetch(`${getBaseUrl()}/api/elements`);

  if (!res.ok) {
    throw new Error(`Failed to load elements: ${res.statusText}`);
  }

  return res.json();
};

export const fetchElement = async (symbol: string): Promise<Element> => {
  const res = await fetch(`${getBaseUrl()}/api/elements/${symbol}`);

  if (!res.ok) {
    throw new Error(`Element ${symbol} not found.`);
  }

  return res.json();
};

export const fetchIsotope = async (
  symbol: string,
  isotopeId: string
): Promise<{ element: Element; isotope: Isotope }> => {
  const res = await fetch(
    `${getBaseUrl()}/api/elements/${symbol}/isotopes/${isotopeId}`
  );

  if (!res.ok) {
    throw new Error(`Isotope ${isotopeId} not found for ${symbol}.`);
  }

  return res.json();
};
