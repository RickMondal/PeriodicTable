export interface BohrModel {
  shells: number[];
  electronConfiguration: string;
  notes?: string;
}

export interface QuarkBreakdown {
  up: number;
  down: number;
}

export interface ParticleBreakdown {
  protons: number;
  neutrons: number;
  electrons: number;
  quarks: QuarkBreakdown;
  positrons?: number;
}

export interface Isotope {
  id: string;
  name: string;
  neutrons: number;
  abundance: string;
  description: string;
  halfLife?: string;
  bohrModel: BohrModel;
  particleBreakdown: ParticleBreakdown;
}

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  group: number;
  period: number;
  category: string;
  atomicMass: number;
  summary: string;
  appearance?: string;
  isotopes: Isotope[];
}
