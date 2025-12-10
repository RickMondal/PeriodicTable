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

const buildQuarks = (protons: number, neutrons: number): QuarkBreakdown => ({
  up: protons * 2 + neutrons,
  down: protons + neutrons * 2,
});

const buildIsotope = (
  element: Pick<Element, "atomicNumber" | "symbol">,
  options: Omit<Isotope, "id" | "particleBreakdown"> & {
    positrons?: number;
  }
): Isotope => {
  const { neutrons, positrons = 0 } = options;
  const protons = element.atomicNumber;
  const electrons = Math.max(protons - positrons, 0);

  return {
    ...options,
    id: `${element.symbol}-${protons + neutrons}`,
    particleBreakdown: {
      protons,
      neutrons,
      electrons,
      positrons,
      quarks: buildQuarks(protons, neutrons),
    },
  };
};

export const elements: Element[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hydrogen",
    group: 1,
    period: 1,
    category: "diatomic nonmetal",
    atomicMass: 1.008,
    summary:
      "Hydrogen is the simplest element. Its single proton and electron make it a flexible building block for chemistry and stellar fusion.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 1, symbol: "H" },
        {
          name: "Protium",
          neutrons: 0,
          abundance: "99.9885%",
          description:
            "The most common hydrogen isotope; a single proton orbited by one electron. Featured widely in organic chemistry and water.",
          bohrModel: {
            shells: [1],
            electronConfiguration: "1s1",
            notes: "Single electron in the first shell with no neutron core simplifies the Bohr view.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 1, symbol: "H" },
        {
          name: "Deuterium",
          neutrons: 1,
          abundance: "0.0115%",
          description:
            "Stable hydrogen isotope with one neutron. Used in nuclear reactors and as a tracer in chemical reactions.",
          bohrModel: {
            shells: [1],
            electronConfiguration: "1s1",
            notes: "Adds a neutron to the nucleus, doubling mass while keeping the same electron layout.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 1, symbol: "H" },
        {
          name: "Tritium",
          neutrons: 2,
          halfLife: "12.32 years",
          abundance: "Trace",
          description:
            "Radioactive hydrogen isotope that glows softly in phosphor paints and powers fusion research experiments.",
          bohrModel: {
            shells: [1],
            electronConfiguration: "1s1",
            notes: "Two neutrons create a heavier core that slowly beta decays, emitting energetic electrons.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Helium",
    group: 18,
    period: 1,
    category: "noble gas",
    atomicMass: 4.0026,
    summary:
      "Helium is an inert gas that refuses to react. It fuels superfluid experiments and keeps balloons aloft with cheerful resistance.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 2, symbol: "He" },
        {
          name: "Helium-3",
          neutrons: 1,
          abundance: "0.000137%",
          description:
            "Lightweight helium isotope prized for cryogenics and speculative fusion concepts. Its nucleus is nimble and quantum-friendly.",
          bohrModel: {
            shells: [2],
            electronConfiguration: "1s2",
            notes: "Two tightly bound electrons complete the first shell, creating a closed, spherically symmetric cloud.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 2, symbol: "He" },
        {
          name: "Helium-4",
          neutrons: 2,
          abundance: "99.999863%",
          description:
            "Dominant helium isotope forming a perfectly paired nucleus. When cooled, it slithers without friction as a superfluid.",
          bohrModel: {
            shells: [2],
            electronConfiguration: "1s2",
            notes: "Balanced protons and neutrons create a rock-steady alpha particle at the nucleus.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: "Lithium",
    group: 1,
    period: 2,
    category: "alkali metal",
    atomicMass: 6.94,
    summary:
      "Lithium is a soft, silvery alkali metal that stores energy densely in batteries and glows crimson in fireworks.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 3, symbol: "Li" },
        {
          name: "Lithium-6",
          neutrons: 3,
          abundance: "7.5%",
          description:
            "Lithium-6 captures neutrons eagerly and moderates nuclear reactors. Its nucleus is slightly asymmetric and reactive.",
          bohrModel: {
            shells: [2, 1],
            electronConfiguration: "1s2 2s1",
            notes: "Two electrons fill the first shell while a solitary valence electron awaits chemical adventures.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 3, symbol: "Li" },
        {
          name: "Lithium-7",
          neutrons: 4,
          abundance: "92.5%",
          description:
            "Stable lithium isotope residing in rechargeable batteries. The heavier core settles the lattice during charge cycles.",
          bohrModel: {
            shells: [2, 1],
            electronConfiguration: "1s2 2s1",
            notes: "Extra neutron stabilizes the nucleus without changing the lone valence electron.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 4,
    symbol: "Be",
    name: "Beryllium",
    group: 2,
    period: 2,
    category: "alkaline earth metal",
    atomicMass: 9.0122,
    summary:
      "Beryllium is light yet rigid, used in aerospace structures and X-ray windows thanks to its transparency to energetic photons.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 4, symbol: "Be" },
        {
          name: "Beryllium-9",
          neutrons: 5,
          abundance: "100%",
          description:
            "Only stable beryllium isotope. Its nucleus vibrates subtly, giving rise to beryllium's stiffness and brittleness.",
          bohrModel: {
            shells: [2, 2],
            electronConfiguration: "1s2 2s2",
            notes: "Pair of valence electrons keeps bonds directional and somewhat restrained.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 4, symbol: "Be" },
        {
          name: "Beryllium-10",
          neutrons: 6,
          abundance: "Trace",
          halfLife: "1.39 Myr",
          description:
            "Cosmogenic isotope produced by cosmic rays striking oxygen. Scientists date geological processes with its gentle decay.",
          bohrModel: {
            shells: [2, 2],
            electronConfiguration: "1s2 2s2",
            notes: "An extra neutron gives the nucleus a slightly elongated energy landscape.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 5,
    symbol: "B",
    name: "Boron",
    group: 13,
    period: 2,
    category: "metalloid",
    atomicMass: 10.81,
    summary:
      "Boron balances between metal and non-metal, fueling strong borosilicate glass and innovative semiconductor dopants.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 5, symbol: "B" },
        {
          name: "Boron-10",
          neutrons: 5,
          abundance: "19.9%",
          description:
            "Boron-10 devours thermal neutrons, making it a control agent in reactors and a shield in radiation therapy.",
          bohrModel: {
            shells: [2, 3],
            electronConfiguration: "1s2 2s2 2p1",
            notes: "Three valence electrons form directional covalent bonds in boron-rich materials.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 5, symbol: "B" },
        {
          name: "Boron-11",
          neutrons: 6,
          abundance: "80.1%",
          description:
            "Stable boron isotope giving strength to boron fibers and acting as a slow-neutron absorber with minimal gamma radiation.",
          bohrModel: {
            shells: [2, 3],
            electronConfiguration: "1s2 2s2 2p1",
            notes: "Balanced nucleus supports boron's icosahedral crystal structures.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: "Carbon",
    group: 14,
    period: 2,
    category: "polyatomic nonmetal",
    atomicMass: 12.011,
    summary:
      "Carbon constructs life, graphite, and dazzling diamonds. Its versatility stems from four valence electrons and tiny atomic size.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 6, symbol: "C" },
        {
          name: "Carbon-12",
          neutrons: 6,
          abundance: "98.93%",
          description:
            "Benchmark isotope defining the atomic mass unit. Its symmetric nucleus underpins organic molecules everywhere.",
          bohrModel: {
            shells: [2, 4],
            electronConfiguration: "1s2 2s2 2p2",
            notes: "Four valence electrons enable tetrahedral bonding that shapes hydrocarbons and diamond lattices.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 6, symbol: "C" },
        {
          name: "Carbon-13",
          neutrons: 7,
          abundance: "1.07%",
          description:
            "NMR-friendly isotope whose nuclear spin lets chemists map complex molecules with clarity.",
          bohrModel: {
            shells: [2, 4],
            electronConfiguration: "1s2 2s2 2p2",
            notes: "Slightly heavier core shifts vibrational spectra used to monitor metabolic pathways.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 6, symbol: "C" },
        {
          name: "Carbon-14",
          neutrons: 8,
          abundance: "Trace",
          halfLife: "5730 years",
          description:
            "Radiocarbon isotope forged in the upper atmosphere. Archaeologists rely on its decay clock to date human history.",
          bohrModel: {
            shells: [2, 4],
            electronConfiguration: "1s2 2s2 2p2",
            notes: "Radioactive beta decay converts a neutron into a proton and electron, slowly transforming the atom into nitrogen.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 7,
    symbol: "N",
    name: "Nitrogen",
    group: 15,
    period: 2,
    category: "diatomic nonmetal",
    atomicMass: 14.007,
    summary:
      "Nitrogen blankets our atmosphere as stubborn N2 molecules. Lightning and microbes coax it into biologically useful forms.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 7, symbol: "N" },
        {
          name: "Nitrogen-14",
          neutrons: 7,
          abundance: "99.63%",
          description:
            "Dominant nitrogen isotope whose paired nucleons keep the nucleus stable and spin-balanced.",
          bohrModel: {
            shells: [2, 5],
            electronConfiguration: "1s2 2s2 2p3",
            notes: "Three half-filled p orbitals encourage strong triple bonds between nitrogen atoms.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 7, symbol: "N" },
        {
          name: "Nitrogen-15",
          neutrons: 8,
          abundance: "0.37%",
          description:
            "Stable isotope used as a tracer in metabolic studies. Its extra neutron slightly shifts molecular vibrations.",
          bohrModel: {
            shells: [2, 5],
            electronConfiguration: "1s2 2s2 2p3",
            notes: "Unpaired nuclear spin unlocks sensitive NMR experiments on peptides and DNA.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: "Oxygen",
    group: 16,
    period: 2,
    category: "diatomic nonmetal",
    atomicMass: 15.999,
    summary:
      "Oxygen feeds fires and respiration alike. Its eager electron appetite drives combustion and metabolism.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 8, symbol: "O" },
        {
          name: "Oxygen-16",
          neutrons: 8,
          abundance: "99.757%",
          description:
            "Standard oxygen isotope, forged in stellar helium burning and inhaled with every breath.",
          bohrModel: {
            shells: [2, 6],
            electronConfiguration: "1s2 2s2 2p4",
            notes: "Two unpaired electrons give oxygen its paramagnetism and reactive personality.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 8, symbol: "O" },
        {
          name: "Oxygen-17",
          neutrons: 9,
          abundance: "0.038%",
          description:
            "Rare isotope that acts as a tracer in hydrology and medical magnetic resonance.",
          bohrModel: {
            shells: [2, 6],
            electronConfiguration: "1s2 2s2 2p4",
            notes: "Nuclear spin of 5/2 enables high-resolution NMR of biomolecules.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 8, symbol: "O" },
        {
          name: "Oxygen-18",
          neutrons: 10,
          abundance: "0.205%",
          description:
            "Heavy oxygen isotope records paleoclimate history through ice cores and carbonates.",
          bohrModel: {
            shells: [2, 6],
            electronConfiguration: "1s2 2s2 2p4",
            notes: "Extra neutrons tighten the nucleus slightly, altering vibrational spectra in water.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 9,
    symbol: "F",
    name: "Fluorine",
    group: 17,
    period: 2,
    category: "halogen",
    atomicMass: 18.998,
    summary:
      "Fluorine is the most electronegative element, carving bonds in Teflon and powering tooth enamel via fluoride.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 9, symbol: "F" },
        {
          name: "Fluorine-19",
          neutrons: 10,
          abundance: "100%",
          description:
            "The sole stable fluorine isotope. Its nuclear spin of 1/2 makes it a star in NMR spectroscopy.",
          bohrModel: {
            shells: [2, 7],
            electronConfiguration: "1s2 2s2 2p5",
            notes: "An almost-filled p shell drives fluorine's hunger for electrons and intense reactivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 9, symbol: "F" },
        {
          name: "Fluorine-18",
          neutrons: 9,
          halfLife: "109.8 min",
          abundance: "Synthetic",
          description:
            "Positron-emitting isotope essential for PET scans. It illuminates metabolic hotspots inside the human body.",
          positrons: 1,
          bohrModel: {
            shells: [2, 7],
            electronConfiguration: "1s2 2s2 2p5",
            notes: "During decay a positron emerges, quickly annihilating with an electron to produce diagnostic gamma rays.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: "Neon",
    group: 18,
    period: 2,
    category: "noble gas",
    atomicMass: 20.180,
    summary:
      "Neon glows in electrified tubes with iconic crimson light. It stays aloof chemically thanks to a full valence shell.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 10, symbol: "Ne" },
        {
          name: "Neon-20",
          neutrons: 10,
          abundance: "90.48%",
          description:
            "Most abundant neon isotope, filling signage and providing cryogenic refrigeration.",
          bohrModel: {
            shells: [2, 8],
            electronConfiguration: "1s2 2s2 2p6",
            notes: "Complete second shell seals Neon from chemical reactions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 10, symbol: "Ne" },
        {
          name: "Neon-21",
          neutrons: 11,
          abundance: "0.27%",
          description:
            "Stable isotope that helps geologists measure mantle degassing and cosmic ray exposure ages.",
          bohrModel: {
            shells: [2, 8],
            electronConfiguration: "1s2 2s2 2p6",
            notes: "Nuclear spin facilitates noble-gas NMR experiments.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 10, symbol: "Ne" },
        {
          name: "Neon-22",
          neutrons: 12,
          abundance: "9.25%",
          description:
            "Heavy neon isotope enriched in meteorites, hinting at presolar grain histories.",
          bohrModel: {
            shells: [2, 8],
            electronConfiguration: "1s2 2s2 2p6",
            notes: "Slightly heavier nucleus influences isotopic fractionation in the atmosphere.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: "Sodium",
    group: 1,
    period: 3,
    category: "alkali metal",
    atomicMass: 22.990,
    summary:
      "Sodium reacts vigorously with water, yet its ions pulse through nerves and season our food.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 11, symbol: "Na" },
        {
          name: "Sodium-23",
          neutrons: 12,
          abundance: "100%",
          description:
            "Stable sodium isotope that dominates biology and Earth's crustal salts.",
          bohrModel: {
            shells: [2, 8, 1],
            electronConfiguration: "1s2 2s2 2p6 3s1",
            notes: "Single 3s valence electron leaps readily during ionic bonding.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 11, symbol: "Na" },
        {
          name: "Sodium-22",
          neutrons: 11,
          halfLife: "2.6 years",
          abundance: "Synthetic",
          description:
            "Gamma-emitting isotope used to trace sodium transport in medical diagnostics.",
          bohrModel: {
            shells: [2, 8, 1],
            electronConfiguration: "1s2 2s2 2p6 3s1",
            notes: "Radioactive decay emits energetic photons detectable outside the body.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: "Magnesium",
    group: 2,
    period: 3,
    category: "alkaline earth metal",
    atomicMass: 24.305,
    summary:
      "Magnesium is lightweight and burns with blinding light. In biology it centers chlorophyll, capturing sunlight for plants.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 12, symbol: "Mg" },
        {
          name: "Magnesium-24",
          neutrons: 12,
          abundance: "78.99%",
          description:
            "Most common magnesium isotope, forming lightweight alloys and biological cofactors.",
          bohrModel: {
            shells: [2, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2",
            notes: "Pair of 3s electrons give magnesium its +2 ionic chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 12, symbol: "Mg" },
        {
          name: "Magnesium-25",
          neutrons: 13,
          abundance: "10.00%",
          description:
            "Stable isotope used in NMR to investigate enzymes and geological processes.",
          bohrModel: {
            shells: [2, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2",
            notes: "Nuclear spin of 5/2 enriches magnetic resonance studies.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 12, symbol: "Mg" },
        {
          name: "Magnesium-26",
          neutrons: 14,
          abundance: "11.01%",
          description:
            "Heavy magnesium isotope records early solar system events in meteorites.",
          bohrModel: {
            shells: [2, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2",
            notes: "Slight mass increase shifts vibrational frequencies in minerals.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: "Aluminium",
    group: 13,
    period: 3,
    category: "post-transition metal",
    atomicMass: 26.982,
    summary:
      "Light, malleable aluminium resists corrosion by quickly forming a protective oxide skin. It structures aircraft and beverage cans alike.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 13, symbol: "Al" },
        {
          name: "Aluminium-27",
          neutrons: 14,
          abundance: "100%",
          description:
            "Only stable aluminium isotope, anchoring lightweight alloys across engineering.",
          bohrModel: {
            shells: [2, 8, 3],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p1",
            notes: "Single 3p electron participates in metallic bonding and oxidation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 13, symbol: "Al" },
        {
          name: "Aluminium-26",
          neutrons: 13,
          halfLife: "717,000 years",
          abundance: "Trace",
          description:
            "Radioisotope emitting positrons and gamma rays, useful in studying cosmic ray interactions.",
          positrons: 1,
          bohrModel: {
            shells: [2, 8, 3],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p1",
            notes: "Decay gently reshapes the nucleus, releasing detectable positrons.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: "Silicon",
    group: 14,
    period: 3,
    category: "metalloid",
    atomicMass: 28.085,
    summary:
      "Silicon forms the backbone of rocks and microchips, switching between glassy networks and crystalline wafers with ease.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 14, symbol: "Si" },
        {
          name: "Silicon-28",
          neutrons: 14,
          abundance: "92.23%",
          description:
            "Primary silicon isotope used in semiconductor manufacturing and precise kilogram definitions.",
          bohrModel: {
            shells: [2, 8, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p2",
            notes: "Four valence electrons allow tetrahedral networks in silicates and silicon chips.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 14, symbol: "Si" },
        {
          name: "Silicon-29",
          neutrons: 15,
          abundance: "4.67%",
          description:
            "Stable isotope used in solid-state NMR to probe glasses and zeolites.",
          bohrModel: {
            shells: [2, 8, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p2",
            notes: "Nuclear spin of 1/2 makes it NMR active despite low abundance.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 14, symbol: "Si" },
        {
          name: "Silicon-30",
          neutrons: 16,
          abundance: "3.10%",
          description:
            "Heavy silicon isotope that subtly changes vibrational modes in minerals and circuits.",
          bohrModel: {
            shells: [2, 8, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p2",
            notes: "Extra neutrons deepen the nuclear potential well without altering electronic structure.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: "Phosphorus",
    group: 15,
    period: 3,
    category: "polyatomic nonmetal",
    atomicMass: 30.974,
    summary:
      "Phosphorus glows faintly in air and energizes DNA backbones. Its allotropes range from waxy white to robust red forms.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 15, symbol: "P" },
        {
          name: "Phosphorus-31",
          neutrons: 16,
          abundance: "100%",
          description:
            "Stable phosphorus isotope embedded in ATP and cell membranes, powering biochemistry.",
          bohrModel: {
            shells: [2, 8, 5],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p3",
            notes: "Three half-filled p orbitals support tetrahedral phosphorus chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 15, symbol: "P" },
        {
          name: "Phosphorus-32",
          neutrons: 17,
          halfLife: "14.3 days",
          abundance: "Synthetic",
          description:
            "Beta-emitting radioisotope tracing metabolic pathways and illuminating DNA synthesis in labs.",
          bohrModel: {
            shells: [2, 8, 5],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p3",
            notes: "Energetic beta decay lets researchers follow phosphorus within living cells.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: "Sulfur",
    group: 16,
    period: 3,
    category: "polyatomic nonmetal",
    atomicMass: 32.06,
    summary:
      "Sulfur smells like matches and hot springs, forming colorful crystals and essential amino acids.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 16, symbol: "S" },
        {
          name: "Sulfur-32",
          neutrons: 16,
          abundance: "94.99%",
          description:
            "Most common sulfur isotope, woven into proteins and volcanic emissions alike.",
          bohrModel: {
            shells: [2, 8, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p4",
            notes: "Two lone pairs and two bonding pairs grant sulfur flexible oxidation states.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 16, symbol: "S" },
        {
          name: "Sulfur-33",
          neutrons: 17,
          abundance: "0.75%",
          description:
            "Stable sulfur isotope with nuclear spin 3/2, enabling rare sulfur NMR spectroscopy.",
          bohrModel: {
            shells: [2, 8, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p4",
            notes: "Slightly heavier nucleus influences isotopic ratios in geochemical studies.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 16, symbol: "S" },
        {
          name: "Sulfur-34",
          neutrons: 18,
          abundance: "4.25%",
          description:
            "Stable isotope used to trace microbial sulfur cycling and volcanic processes.",
          bohrModel: {
            shells: [2, 8, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p4",
            notes: "Heavier sulfur variants shift vibrational spectra in sulfates.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: "Chlorine",
    group: 17,
    period: 3,
    category: "halogen",
    atomicMass: 35.45,
    summary:
      "Chlorine disinfects water and forms salts with sodium. Its greenish gas is reactive yet essential in biology.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 17, symbol: "Cl" },
        {
          name: "Chlorine-35",
          neutrons: 18,
          abundance: "75.78%",
          description:
            "Common chlorine isotope paired with sodium in table salt.",
          bohrModel: {
            shells: [2, 8, 7],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p5",
            notes: "Almost-filled valence shell makes chlorine a strong oxidizer.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 17, symbol: "Cl" },
        {
          name: "Chlorine-37",
          neutrons: 20,
          abundance: "24.22%",
          description:
            "Stable isotope used to monitor groundwater flow and volcanic emissions.",
          bohrModel: {
            shells: [2, 8, 7],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p5",
            notes: "Extra neutrons subtly shift chlorine vibrational signatures.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: "Argon",
    group: 18,
    period: 3,
    category: "noble gas",
    atomicMass: 39.948,
    summary:
      "Argon fills light bulbs and shields welding arcs. Chemically inert, it drifts through the atmosphere unnoticed.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 18, symbol: "Ar" },
        {
          name: "Argon-36",
          neutrons: 18,
          abundance: "0.34%",
          description:
            "Light argon isotope tracing atmospheric escape and planetary formation.",
          bohrModel: {
            shells: [2, 8, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6",
            notes: "Closed shells lock argon into chemical silence.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 18, symbol: "Ar" },
        {
          name: "Argon-38",
          neutrons: 20,
          abundance: "0.06%",
          description:
            "Rare isotope formed by stellar nucleosynthesis and cosmic ray interactions.",
          bohrModel: {
            shells: [2, 8, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6",
            notes: "Mass variations support radiometric dating of groundwater.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 18, symbol: "Ar" },
        {
          name: "Argon-40",
          neutrons: 22,
          abundance: "99.60%",
          description:
            "Dominant argon isotope produced by potassium decay, locking geological clocks in minerals.",
          bohrModel: {
            shells: [2, 8, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6",
            notes: "Stable nucleus underpins K-Ar radiometric dating methods.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: "Potassium",
    group: 1,
    period: 4,
    category: "alkali metal",
    atomicMass: 39.0983,
    summary:
      "Potassium is a reactive alkali metal that flashes violet in flame tests and stabilizes nerve impulses inside living cells.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 19, symbol: "K" },
        {
          name: "Potassium-39",
          neutrons: 20,
          abundance: "93.2581%",
          description:
            "Dominant potassium isotope that salts oceans and guides intracellular signaling with its agile 4s valence electron.",
          bohrModel: {
            shells: [2, 8, 8, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s1",
            notes: "Single 4s electron leaps readily, driving vigorous reactions with water and halogens.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 19, symbol: "K" },
        {
          name: "Potassium-40",
          neutrons: 21,
          halfLife: "1.248 billion years",
          abundance: "0.0117%",
          description:
            "Naturally radioactive isotope whose slow beta decay contributes to Earth's internal heat budget.",
          bohrModel: {
            shells: [2, 8, 8, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s1",
            notes: "Metastable nucleus occasionally emits energetic electrons or captures orbital electrons to relieve imbalance.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 19, symbol: "K" },
        {
          name: "Potassium-41",
          neutrons: 22,
          abundance: "6.7302%",
          description:
            "Stable heavy potassium isotope that dampens lattice vibrations in potash minerals and fertilizers.",
          bohrModel: {
            shells: [2, 8, 8, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s1",
            notes: "Valence structure mirrors the lighter isotope, keeping chemical behavior consistent across natural samples.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: "Calcium",
    group: 2,
    period: 4,
    category: "alkaline earth metal",
    atomicMass: 40.078,
    summary:
      "Calcium strengthens bones, cements, and stars alike, crystallizing into sturdy lattices while serving as a cellular messenger.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 20, symbol: "Ca" },
        {
          name: "Calcium-40",
          neutrons: 20,
          abundance: "96.941%",
          description:
            "Most common calcium isotope, forming the backbone of chalk, limestone, and skeletal minerals.",
          bohrModel: {
            shells: [2, 8, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s2",
            notes: "Pair of 4s electrons departs readily to produce the hardy Ca2+ ion.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 20, symbol: "Ca" },
        {
          name: "Calcium-42",
          neutrons: 22,
          abundance: "0.647%",
          description:
            "Stable heavy isotope that records paleoenvironmental changes through subtle fractionation in shells and stalagmites.",
          bohrModel: {
            shells: [2, 8, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s2",
            notes: "Extra neutrons barely perturb the electron cloud, so chemistry mirrors lighter calcium.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 20, symbol: "Ca" },
        {
          name: "Calcium-44",
          neutrons: 24,
          abundance: "2.086%",
          description:
            "Isotope enriched in supernova ejecta, giving cosmochemists clues about stellar nucleosynthesis pathways.",
          bohrModel: {
            shells: [2, 8, 8, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 4s2",
            notes: "The fully filled 4s pair leaves calcium strongly ionic and willing to polymerize silicates.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 21,
    symbol: "Sc",
    name: "Scandium",
    group: 3,
    period: 4,
    category: "transition metal",
    atomicMass: 44.9559,
    summary:
      "Scandium is a lightweight transition metal that stiffens aluminum alloys and glows with intense lines in metal-halide lamps.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 21, symbol: "Sc" },
        {
          name: "Scandium-45",
          neutrons: 24,
          abundance: "100%",
          description:
            "Only stable scandium isotope, anchoring the metal's limited terrestrial supply in rare minerals.",
          bohrModel: {
            shells: [2, 8, 9, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d1 4s2",
            notes: "Single 3d electron introduces transition-metal chemistry while the 4s pair aids alloy formation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 21, symbol: "Sc" },
        {
          name: "Scandium-46",
          neutrons: 25,
          halfLife: "83.8 days",
          abundance: "Synthetic",
          description:
            "Positron-emitting isotope used in PET scans and tracing scandium behavior in advanced manufacturing.",
          positrons: 1,
          bohrModel: {
            shells: [2, 8, 9, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d1 4s2",
            notes: "Decay showers the lattice with gamma rays, revealing diffusion paths inside alloys.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 21, symbol: "Sc" },
        {
          name: "Scandium-47",
          neutrons: 26,
          halfLife: "3.35 days",
          abundance: "Synthetic",
          description:
            "Beta-emitting isotope explored for targeted radiotherapy and theranostic applications.",
          bohrModel: {
            shells: [2, 8, 9, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d1 4s2",
            notes: "Short-lived nucleus provides intense radiation bursts before relaxing to stable titanium.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 22,
    symbol: "Ti",
    name: "Titanium",
    group: 4,
    period: 4,
    category: "transition metal",
    atomicMass: 47.867,
    summary:
      "Titanium is strong, light, and corrosion-resistant, making it a staple of aerospace structures and biomedical implants.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 22, symbol: "Ti" },
        {
          name: "Titanium-46",
          neutrons: 24,
          abundance: "8.25%",
          description:
            "Minor stable isotope helping isotope geochemists fingerprint planetary differentiation.",
          bohrModel: {
            shells: [2, 8, 10, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d2 4s2",
            notes: "Two 3d electrons bolster metallic bonding, granting titanium its impressive strength-to-weight ratio.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 22, symbol: "Ti" },
        {
          name: "Titanium-47",
          neutrons: 25,
          abundance: "7.44%",
          description:
            "Stable isotope whose nuclear spin enables solid-state NMR on catalysts and advanced materials.",
          bohrModel: {
            shells: [2, 8, 10, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d2 4s2",
            notes: "Occupies a balanced 3d subshell that resists corrosion even in seawater.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 22, symbol: "Ti" },
        {
          name: "Titanium-48",
          neutrons: 26,
          abundance: "73.72%",
          description:
            "Dominant titanium isotope, forged during explosive nucleosynthesis of massive stars.",
          bohrModel: {
            shells: [2, 8, 10, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d2 4s2",
            notes: "Heavier nucleus keeps vibrational modes low, ideal for stiff aerospace alloys.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 23,
    symbol: "V",
    name: "Vanadium",
    group: 5,
    period: 4,
    category: "transition metal",
    atomicMass: 50.9415,
    summary:
      "Vanadium adds toughness to steel, colors glass vivid blues, and stores energy in large-flow batteries.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 23, symbol: "V" },
        {
          name: "Vanadium-50",
          neutrons: 27,
          abundance: "0.25%",
          description:
            "Rare stable isotope that participates in double-beta decay research thanks to its long-lived excited states.",
          bohrModel: {
            shells: [2, 8, 11, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d3 4s2",
            notes: "Three 3d electrons enable multiple oxidation states for catalysis and pigments.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 23, symbol: "V" },
        {
          name: "Vanadium-51",
          neutrons: 28,
          abundance: "99.75%",
          description:
            "Main vanadium isotope, hardening alloys in jet engines and vanadium redox batteries.",
          bohrModel: {
            shells: [2, 8, 11, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d3 4s2",
            notes: "Versatile electron configuration flips between +2 and +5 states with ease.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 24,
    symbol: "Cr",
    name: "Chromium",
    group: 6,
    period: 4,
    category: "transition metal",
    atomicMass: 51.9961,
    summary:
      "Chromium resists tarnish and lends shimmering color to rubies, stainless steel, and vivid pigments.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 24, symbol: "Cr" },
        {
          name: "Chromium-52",
          neutrons: 28,
          abundance: "83.789%",
          description:
            "Chief chromium isotope safeguarding stainless steel from corrosion via self-healing oxide layers.",
          bohrModel: {
            shells: [2, 8, 13, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d5 4s1",
            notes: "Half-filled 3d subshell stabilizes unusual oxidation states key to chromate chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 24, symbol: "Cr" },
        {
          name: "Chromium-53",
          neutrons: 29,
          abundance: "9.501%",
          description:
            "Stable isotope letting cosmochemists date meteorites through Cr-Mn chronometry.",
          bohrModel: {
            shells: [2, 8, 13, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d5 4s1",
            notes: "Supports magnetic ordering in chromium alloys at low temperatures.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 24, symbol: "Cr" },
        {
          name: "Chromium-54",
          neutrons: 30,
          abundance: "2.365%",
          description:
            "Heavier chromium isotope enriching the reflective coatings that protect spacecraft and appliances.",
          bohrModel: {
            shells: [2, 8, 13, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d5 4s1",
            notes: "Mass increase slightly shifts optical phonons, altering chrome plating hues.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 25,
    symbol: "Mn",
    name: "Manganese",
    group: 7,
    period: 4,
    category: "transition metal",
    atomicMass: 54.938,
    summary:
      "Manganese toughens steel, catalyzes oxygen production in photosynthesis, and sparks purple fireworks.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 25, symbol: "Mn" },
        {
          name: "Manganese-55",
          neutrons: 30,
          abundance: "100%",
          description:
            "Only stable manganese isotope, forming the backbone of ferromanganese alloys used in construction.",
          bohrModel: {
            shells: [2, 8, 13, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d5 4s2",
            notes: "Half-filled 3d shell endows manganese with a rich palette of oxidation states from +2 to +7.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 25, symbol: "Mn" },
        {
          name: "Manganese-54",
          neutrons: 29,
          halfLife: "312 days",
          abundance: "Synthetic",
          description:
            "Gamma-emitting isotope employed for instrument calibration and tracing sediment transport.",
          bohrModel: {
            shells: [2, 8, 13, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d5 4s2",
            notes: "Decays to chromium while releasing diagnostic radiation for industrial gauges.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 26,
    symbol: "Fe",
    name: "Iron",
    group: 8,
    period: 4,
    category: "transition metal",
    atomicMass: 55.845,
    summary:
      "Iron is the structural backbone of planets and skyscrapers, forming alloys that range from ductile steel to hard cast iron.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 26, symbol: "Fe" },
        {
          name: "Iron-56",
          neutrons: 30,
          abundance: "91.754%",
          description:
            "Most abundant iron isotope, forged in stellar furnaces and locking into hematite, magnetite, and steel.",
          bohrModel: {
            shells: [2, 8, 14, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d6 4s2",
            notes: "Balanced 3d6 configuration supports ferromagnetism central to transformers and motors.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 26, symbol: "Fe" },
        {
          name: "Iron-57",
          neutrons: 31,
          abundance: "2.119%",
          description:
            "Stable isotope prized for Moessbauer spectroscopy, revealing hyperfine interactions in iron compounds.",
          bohrModel: {
            shells: [2, 8, 14, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d6 4s2",
            notes: "Slightly heavier nucleus refines vibrational modes used to study planetary cores.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 26, symbol: "Fe" },
        {
          name: "Iron-58",
          neutrons: 32,
          abundance: "0.282%",
          description:
            "Rare stable isotope marking supernova contributions within meteorites and extraterrestrial samples.",
          bohrModel: {
            shells: [2, 8, 14, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d6 4s2",
            notes: "Extra neutron pair subtly shifts lattice stiffness in austitic steels.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 27,
    symbol: "Co",
    name: "Cobalt",
    group: 9,
    period: 4,
    category: "transition metal",
    atomicMass: 58.9332,
    summary:
      "Cobalt colors glass deep blue, powers rechargeable batteries, and sits at the heart of vitamin B12.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 27, symbol: "Co" },
        {
          name: "Cobalt-59",
          neutrons: 32,
          abundance: "100%",
          description:
            "Only stable cobalt isotope, crystallizing into magnetic alloys and essential biological cofactors.",
          bohrModel: {
            shells: [2, 8, 15, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d7 4s2",
            notes: "Magnetic 3d7 arrangement underpins high-temperature superalloys and magnetic recording media.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 27, symbol: "Co" },
        {
          name: "Cobalt-60",
          neutrons: 33,
          halfLife: "5.27 years",
          abundance: "Synthetic",
          description:
            "Powerful gamma source sterilizing medical equipment and delivering targeted radiotherapy.",
          bohrModel: {
            shells: [2, 8, 15, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d7 4s2",
            notes: "Radioactive decay showers cobalt-60 rods with energetic photons used in cancer treatment.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 28,
    symbol: "Ni",
    name: "Nickel",
    group: 10,
    period: 4,
    category: "transition metal",
    atomicMass: 58.6934,
    summary:
      "Nickel is a silvery-white metal that forms corrosion-resistant alloys and catalyzes hydrogenation reactions.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 28, symbol: "Ni" },
        {
          name: "Nickel-58",
          neutrons: 30,
          abundance: "68.077%",
          description:
            "Most abundant nickel isotope, contributing to durable stainless steels and coinage.",
          bohrModel: {
            shells: [2, 8, 16, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d8 4s2",
            notes: "3d8 configuration gives nickel its ferromagnetic personality at low temperatures.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 28, symbol: "Ni" },
        {
          name: "Nickel-60",
          neutrons: 32,
          abundance: "26.223%",
          description:
            "Stable isotope documenting the decay of now-extinct iron-60 in meteorite parent bodies.",
          bohrModel: {
            shells: [2, 8, 16, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d8 4s2",
            notes: "Massive nucleus damps vibrations, beneficial for precision magnetic alloys.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 28, symbol: "Ni" },
        {
          name: "Nickel-62",
          neutrons: 34,
          abundance: "3.635%",
          description:
            "One of the most tightly bound nuclei known, relevant to supernova nucleosynthesis energy balances.",
          bohrModel: {
            shells: [2, 8, 16, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d8 4s2",
            notes: "High binding energy makes nickel-62 a benchmark for nuclear stability calculations.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 29,
    symbol: "Cu",
    name: "Copper",
    group: 11,
    period: 4,
    category: "transition metal",
    atomicMass: 63.546,
    summary:
      "Copper conducts electricity efficiently, patinas to a verdigris glow, and has shaped human technology for millennia.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 29, symbol: "Cu" },
        {
          name: "Copper-63",
          neutrons: 34,
          abundance: "69.15%",
          description:
            "The most common copper isotope, coursing through electrical wiring and bronze alloys.",
          bohrModel: {
            shells: [2, 8, 18, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s1",
            notes: "A single 4s electron above a filled 3d shell grants copper its metallic luster and conductivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 29, symbol: "Cu" },
        {
          name: "Copper-65",
          neutrons: 36,
          abundance: "30.85%",
          description:
            "Stable heavy copper isotope that subtly shifts isotope ratios in geological ore deposits.",
          bohrModel: {
            shells: [2, 8, 18, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s1",
            notes: "Extra neutrons steady the nucleus without disturbing copper's excellent conductivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 29, symbol: "Cu" },
        {
          name: "Copper-64",
          neutrons: 35,
          halfLife: "12.7 hours",
          abundance: "Synthetic",
          description:
            "Versatile medical isotope used for both diagnostic PET imaging and targeted radiotherapy.",
          positrons: 1,
          bohrModel: {
            shells: [2, 8, 18, 1],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s1",
            notes: "Beta-plus decay floods detectors with coincident photons useful in cancer diagnostics.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 30,
    symbol: "Zn",
    name: "Zinc",
    group: 12,
    period: 4,
    category: "transition metal",
    atomicMass: 65.38,
    summary:
      "Zinc galvanizes steel, forms brass with copper, and is essential for enzymes and immune health.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 30, symbol: "Zn" },
        {
          name: "Zinc-64",
          neutrons: 34,
          abundance: "48.63%",
          description:
            "Primary zinc isotope protective against corrosion when alloyed onto iron surfaces.",
          bohrModel: {
            shells: [2, 8, 18, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2",
            notes: "Filled 3d and 4s shells render zinc diamagnetic and chemically consistent.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 30, symbol: "Zn" },
        {
          name: "Zinc-66",
          neutrons: 36,
          abundance: "27.90%",
          description:
            "Stable zinc isotope that records biological fractionation in shells and metabolic studies.",
          bohrModel: {
            shells: [2, 8, 18, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2",
            notes: "Mass differences tweak vibrational spectra used in isotope geochemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 30, symbol: "Zn" },
        {
          name: "Zinc-68",
          neutrons: 38,
          abundance: "18.75%",
          description:
            "Heavy zinc isotope that supports overall nuclear stability and acts as a precursor to gallium radioisotopes.",
          bohrModel: {
            shells: [2, 8, 18, 2],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2",
            notes: "Heavier nucleus subtly alters diffusion in galvanizing baths.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 31,
    symbol: "Ga",
    name: "Gallium",
    group: 13,
    period: 4,
    category: "post-transition metal",
    atomicMass: 69.723,
    summary:
      "Gallium melts in your hand yet forms critical semiconductors like GaAs and GaN for LEDs and power electronics.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 31, symbol: "Ga" },
        {
          name: "Gallium-69",
          neutrons: 38,
          abundance: "60.11%",
          description:
            "Common gallium isotope generating direct band gaps in gallium-based compound semiconductors.",
          bohrModel: {
            shells: [2, 8, 18, 3],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p1",
            notes: "Loose 4p electron enables low melting point and covalent bonding in optoelectronics.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 31, symbol: "Ga" },
        {
          name: "Gallium-71",
          neutrons: 40,
          abundance: "39.89%",
          description:
            "Stable isotope vital to nuclear solid-state detectors and solar cell research.",
          bohrModel: {
            shells: [2, 8, 18, 3],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p1",
            notes: "Maintains gallium's softness while reinforcing crystal fields in GaN LEDs.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 31, symbol: "Ga" },
        {
          name: "Gallium-67",
          neutrons: 36,
          halfLife: "3.26 days",
          abundance: "Synthetic",
          description:
            "Gamma-emitting tracer used to image inflammation and tumors via nuclear medicine scans.",
          bohrModel: {
            shells: [2, 8, 18, 3],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p1",
            notes: "Neutral chemistry mirrors stable gallium, keeping biological targeting predictable before decay.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 32,
    symbol: "Ge",
    name: "Germanium",
    group: 14,
    period: 4,
    category: "metalloid",
    atomicMass: 72.63,
    summary:
      "Germanium bridges metal and non-metal behavior, enabling infrared optics, fiber optics, and early transistor technology.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 32, symbol: "Ge" },
        {
          name: "Germanium-70",
          neutrons: 38,
          abundance: "20.5%",
          description:
            "Stable isotope contributing to the refractive properties prized in infrared lenses.",
          bohrModel: {
            shells: [2, 8, 18, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p2",
            notes: "Four valence electrons balance covalent and metallic bonding in semiconductors.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 32, symbol: "Ge" },
        {
          name: "Germanium-72",
          neutrons: 40,
          abundance: "27.4%",
          description:
            "Stable isotope used alongside enriched germanium detectors hunting for neutrinoless double beta decay.",
          bohrModel: {
            shells: [2, 8, 18, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p2",
            notes: "Electronic structure supports direct bandgap tuning in alloyed semiconductors.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 32, symbol: "Ge" },
        {
          name: "Germanium-74",
          neutrons: 42,
          abundance: "36.5%",
          description:
            "Heavy germanium isotope influencing isotope geochemistry in hydrothermal ore deposits.",
          bohrModel: {
            shells: [2, 8, 18, 4],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p2",
            notes: "Mass shifts vibrational modes within Ge-Si alloys used in photonics.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 33,
    symbol: "As",
    name: "Arsenic",
    group: 15,
    period: 4,
    category: "metalloid",
    atomicMass: 74.9216,
    summary:
      "Arsenic toggles between toxic and useful, preserving wood, doping semiconductors, and tracing groundwater flow.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 33, symbol: "As" },
        {
          name: "Arsenic-75",
          neutrons: 42,
          abundance: "100%",
          description:
            "Stable arsenic isotope present in minerals like arsenopyrite and crucial for semiconductor devices such as GaAs.",
          bohrModel: {
            shells: [2, 8, 18, 5],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p3",
            notes: "Three 4p electrons enable covalent networks and complex oxidation chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 33, symbol: "As" },
        {
          name: "Arsenic-74",
          neutrons: 41,
          halfLife: "17.8 days",
          abundance: "Synthetic",
          description:
            "Gamma-emitting isotope explored for diagnostic imaging of tumors and metabolic pathways.",
          bohrModel: {
            shells: [2, 8, 18, 5],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p3",
            notes: "Decays to germanium while mimicking arsenic's coordination chemistry in vivo.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 34,
    symbol: "Se",
    name: "Selenium",
    group: 16,
    period: 4,
    category: "polyatomic nonmetal",
    atomicMass: 78.971,
    summary:
      "Selenium captures sunlight in solar cells, tones glass ruby red, and fine-tunes antioxidant enzymes.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 34, symbol: "Se" },
        {
          name: "Selenium-80",
          neutrons: 46,
          abundance: "49.61%",
          description:
            "Most abundant selenium isotope, lending its flexibility to photovoltaic chalcogenide materials.",
          bohrModel: {
            shells: [2, 8, 18, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4",
            notes: "Two lone pairs and two bonding pairs allow polymeric chain formation and diverse oxidation states.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 34, symbol: "Se" },
        {
          name: "Selenium-78",
          neutrons: 44,
          abundance: "23.77%",
          description:
            "Stable isotope used to probe enzymatic kinetics and geochemical redox processes.",
          bohrModel: {
            shells: [2, 8, 18, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4",
            notes: "Electron cloud supports semiconductor behavior when alloyed with tellurium and cadmium.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 34, symbol: "Se" },
        {
          name: "Selenium-82",
          neutrons: 48,
          abundance: "8.73%",
          description:
            "Heavy selenium isotope central to double-beta decay experiments investigating neutrino mass.",
          bohrModel: {
            shells: [2, 8, 18, 6],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4",
            notes: "Added neutrons stiffen the nucleus while leaving selenium's reactive lone pairs intact.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 35,
    symbol: "Br",
    name: "Bromine",
    group: 17,
    period: 4,
    category: "halogen",
    atomicMass: 79.904,
    summary:
      "Bromine is a deep red liquid halogen used in flame retardants, photographic chemicals, and medical imaging.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 35, symbol: "Br" },
        {
          name: "Bromine-79",
          neutrons: 44,
          abundance: "50.69%",
          description:
            "Stable bromine isotope vital to brominated flame retardants and certain sedative compounds.",
          bohrModel: {
            shells: [2, 8, 18, 7],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p5",
            notes: "Nearly filled 4p shell powers bromine's oxidizing strength and diatomic liquid state.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 35, symbol: "Br" },
        {
          name: "Bromine-81",
          neutrons: 46,
          abundance: "49.31%",
          description:
            "Equally abundant stable isotope balancing natural bromine and enhancing NMR sensitivity.",
          bohrModel: {
            shells: [2, 8, 18, 7],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p5",
            notes: "Heavy nucleus slightly alters vibrational spectra of brominated organics.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 36,
    symbol: "Kr",
    name: "Krypton",
    group: 18,
    period: 4,
    category: "noble gas",
    atomicMass: 83.798,
    summary:
      "Krypton is a noble gas that fills flash lamps, traces airflow, and glows pale violet in ionized tubes.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 36, symbol: "Kr" },
        {
          name: "Krypton-84",
          neutrons: 48,
          abundance: "56.987%",
          description:
            "Most common krypton isotope, lending inert density to lighting and insulating fills in windows.",
          bohrModel: {
            shells: [2, 8, 18, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6",
            notes: "Closed-shell noble gas with perfectly filled p orbitals, resisting chemical bonding.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 36, symbol: "Kr" },
        {
          name: "Krypton-86",
          neutrons: 50,
          abundance: "17.279%",
          description:
            "Stable isotope once used to define the meter via its orange-red spectral line.",
          bohrModel: {
            shells: [2, 8, 18, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6",
            notes: "Spectrally pure emission serves as a calibration reference for high-precision optics.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 36, symbol: "Kr" },
        {
          name: "Krypton-83",
          neutrons: 47,
          abundance: "11.593%",
          description:
            "Stable isotope whose nuclear spin supports magnetic resonance studies of gases and porous materials.",
          bohrModel: {
            shells: [2, 8, 18, 8],
            electronConfiguration: "1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6",
            notes: "Slightly lighter nucleus enhances mobility in cryogenic krypton mixtures.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 37,
    symbol: "Rb",
    name: "Rubidium",
    group: 1,
    period: 5,
    category: "alkali metal",
    atomicMass: 85.4678,
    summary:
      "Rubidium ignites with water, tinting flames crimson while serving as a clockwork atom for precision timing.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 37, symbol: "Rb" },
        {
          name: "Rubidium-85",
          neutrons: 48,
          abundance: "72.17%",
          description:
            "Primary stable rubidium isotope present in minerals like lepidolite and pollucite.",
          bohrModel: {
            shells: [2, 8, 18, 8, 1],
            electronConfiguration: "[Kr] 5s1",
            notes: "Single 5s electron vaults outward easily, accounting for rubidium's vigorous reactivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 37, symbol: "Rb" },
        {
          name: "Rubidium-87",
          neutrons: 50,
          halfLife: "48.8 billion years",
          abundance: "27.83%",
          description:
            "Radioactive yet long-lived isotope used in Rubidium-87 atomic clocks and geochronology.",
          bohrModel: {
            shells: [2, 8, 18, 8, 1],
            electronConfiguration: "[Kr] 5s1",
            notes: "Slow beta decay barely disturbs the valence electron, enabling stable optical transitions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 37, symbol: "Rb" },
        {
          name: "Rubidium-86",
          neutrons: 49,
          halfLife: "18.6 days",
          abundance: "Synthetic",
          description:
            "Gamma-emitting tracer used to study ion transport in biological and geological systems.",
          bohrModel: {
            shells: [2, 8, 18, 8, 1],
            electronConfiguration: "[Kr] 5s1",
            notes: "Chemically mimics stable rubidium while illuminating ionic diffusion paths.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 38,
    symbol: "Sr",
    name: "Strontium",
    group: 2,
    period: 5,
    category: "alkaline earth metal",
    atomicMass: 87.62,
    summary:
      "Strontium glows bright red in fireworks, strengthens bone implants, and records ancient ocean chemistry.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 38, symbol: "Sr" },
        {
          name: "Strontium-88",
          neutrons: 50,
          abundance: "82.58%",
          description:
            "Dominant stable strontium isotope, precipitating as celestine and strontianite.",
          bohrModel: {
            shells: [2, 8, 18, 8, 2],
            electronConfiguration: "[Kr] 5s2",
            notes: "Paired 5s electrons shed readily to form Sr2+, enabling vivid flame coloration.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 38, symbol: "Sr" },
        {
          name: "Strontium-86",
          neutrons: 48,
          abundance: "9.86%",
          description:
            "Stable isotope used to track past seawater composition and climate shifts via isotope ratios.",
          bohrModel: {
            shells: [2, 8, 18, 8, 2],
            electronConfiguration: "[Kr] 5s2",
            notes: "Electron configuration remains ionic-friendly despite neutron variation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 38, symbol: "Sr" },
        {
          name: "Strontium-90",
          neutrons: 52,
          halfLife: "28.8 years",
          abundance: "Trace",
          description:
            "Fission product monitored in environmental studies due to its bioaccumulation in bones.",
          bohrModel: {
            shells: [2, 8, 18, 8, 2],
            electronConfiguration: "[Kr] 5s2",
            notes: "Radioactive decay to yttrium emits energetic beta particles impacting bone tissue.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 39,
    symbol: "Y",
    name: "Yttrium",
    group: 3,
    period: 5,
    category: "transition metal",
    atomicMass: 88.9059,
    summary:
      "Yttrium fortifies phosphors, lasers, and high-temperature superconductors with its adaptable 4d electron.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 39, symbol: "Y" },
        {
          name: "Yttrium-89",
          neutrons: 50,
          abundance: "100%",
          description:
            "Only stable yttrium isotope, filling rare-earth minerals and enabling YAG laser crystals.",
          bohrModel: {
            shells: [2, 8, 18, 9, 2],
            electronConfiguration: "[Kr] 4d1 5s2",
            notes: "Lone 4d electron participates in strong ionic and covalent bonds central to ceramic toughness.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 39, symbol: "Y" },
        {
          name: "Yttrium-90",
          neutrons: 51,
          halfLife: "64.1 hours",
          abundance: "Synthetic",
          description:
            "Beta-emitting isotope used in targeted radiotherapy, especially for liver cancer treatments.",
          bohrModel: {
            shells: [2, 8, 18, 9, 2],
            electronConfiguration: "[Kr] 4d1 5s2",
            notes: "Decay to zirconium releases high-energy particles utilized in medical microspheres.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 39, symbol: "Y" },
        {
          name: "Yttrium-88",
          neutrons: 49,
          halfLife: "106.6 days",
          abundance: "Synthetic",
          description:
            "Gamma emitter for calibration sources and tracing processes in industry.",
          bohrModel: {
            shells: [2, 8, 18, 9, 2],
            electronConfiguration: "[Kr] 4d1 5s2",
            notes: "Energetic emissions make it useful for imaging and detector tuning.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 40,
    symbol: "Zr",
    name: "Zirconium",
    group: 4,
    period: 5,
    category: "transition metal",
    atomicMass: 91.224,
    summary:
      "Zirconium resists corrosion, clads nuclear fuel rods, and forms dazzling cubic zirconia gems.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 40, symbol: "Zr" },
        {
          name: "Zirconium-90",
          neutrons: 50,
          abundance: "51.45%",
          description:
            "Most abundant zirconium isotope, stabilizing oxides used in ceramics and nuclear reactors.",
          bohrModel: {
            shells: [2, 8, 18, 10, 2],
            electronConfiguration: "[Kr] 4d2 5s2",
            notes: "Two 4d electrons enable durable metallic bonds and corrosion resistance.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 40, symbol: "Zr" },
        {
          name: "Zirconium-91",
          neutrons: 51,
          abundance: "11.22%",
          description:
            "Stable isotope that aids neutron capture studies thanks to its nuclear spin.",
          bohrModel: {
            shells: [2, 8, 18, 10, 2],
            electronConfiguration: "[Kr] 4d2 5s2",
            notes: "Supports thermal immunity in zirconium alloys used inside reactors.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 40, symbol: "Zr" },
        {
          name: "Zirconium-94",
          neutrons: 54,
          abundance: "17.38%",
          description:
            "Heavy stable isotope contributing to zircon age dating and geochemical tracing.",
          bohrModel: {
            shells: [2, 8, 18, 10, 2],
            electronConfiguration: "[Kr] 4d2 5s2",
            notes: "High neutron count enhances stability without altering zirconium's chemistry.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 41,
    symbol: "Nb",
    name: "Niobium",
    group: 5,
    period: 5,
    category: "transition metal",
    atomicMass: 92.9064,
    summary:
      "Niobium toughens superconducting magnets and enables heat-resistant alloys for aerospace applications.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 41, symbol: "Nb" },
        {
          name: "Niobium-93",
          neutrons: 52,
          abundance: "100%",
          description:
            "The sole stable niobium isotope, anchoring superconducting radio-frequency cavities.",
          bohrModel: {
            shells: [2, 8, 18, 12, 1],
            electronConfiguration: "[Kr] 4d4 5s1",
            notes: "Anomalous electron distribution (4d4 5s1) enhances metallic bonding and superconductivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 41, symbol: "Nb" },
        {
          name: "Niobium-94",
          neutrons: 53,
          halfLife: "20,300 years",
          abundance: "Trace",
          description:
            "Long-lived cosmogenic isotope used to investigate meteoritic exposure ages.",
          bohrModel: {
            shells: [2, 8, 18, 12, 1],
            electronConfiguration: "[Kr] 4d4 5s1",
            notes: "Radiogenic decay to zirconium informs planetary chronology.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 41, symbol: "Nb" },
        {
          name: "Niobium-95",
          neutrons: 54,
          halfLife: "35 days",
          abundance: "Synthetic",
          description:
            "Beta-emitting isotope that helps trace niobium behavior in catalysts and alloys.",
          bohrModel: {
            shells: [2, 8, 18, 12, 1],
            electronConfiguration: "[Kr] 4d4 5s1",
            notes: "Radioactive transmutation maps diffusion pathways in high-temperature materials.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 42,
    symbol: "Mo",
    name: "Molybdenum",
    group: 6,
    period: 5,
    category: "transition metal",
    atomicMass: 95.95,
    summary:
      "Molybdenum thrives in extreme heat, catalyzes nitrogen fixation, and fortifies high-strength steels.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 42, symbol: "Mo" },
        {
          name: "Molybdenum-98",
          neutrons: 56,
          abundance: "24.13%",
          description:
            "Most abundant molybdenum isotope, reinforcing alloy steels and turbine components.",
          bohrModel: {
            shells: [2, 8, 18, 13, 1],
            electronConfiguration: "[Kr] 4d5 5s1",
            notes: "Half-filled 4d shell enhances catalytic activity in industrial processes.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 42, symbol: "Mo" },
        {
          name: "Molybdenum-96",
          neutrons: 54,
          abundance: "16.68%",
          description:
            "Stable isotope tracking molybdenum cycling in biological systems and soils.",
          bohrModel: {
            shells: [2, 8, 18, 13, 1],
            electronConfiguration: "[Kr] 4d5 5s1",
            notes: "Supports redox flexibility required in molybdoenzymes.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 42, symbol: "Mo" },
        {
          name: "Molybdenum-100",
          neutrons: 58,
          abundance: "9.63%",
          description:
            "Heavy stable isotope studied for double-beta decay and nuclear structure research.",
          bohrModel: {
            shells: [2, 8, 18, 13, 1],
            electronConfiguration: "[Kr] 4d5 5s1",
            notes: "Serves as a target for producing technetium-99m medical isotopes.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 43,
    symbol: "Tc",
    name: "Technetium",
    group: 7,
    period: 5,
    category: "transition metal",
    atomicMass: 98,
    summary:
      "Technetium is the first synthetic element discovered, valued for diagnostic imaging despite lacking stable isotopes.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 43, symbol: "Tc" },
        {
          name: "Technetium-99m",
          neutrons: 56,
          halfLife: "6.0 hours",
          abundance: "Synthetic",
          description:
            "Metastable isotope powering nuclear medicine scans with precise gamma emissions.",
          bohrModel: {
            shells: [2, 8, 18, 14, 1],
            electronConfiguration: "[Kr] 4d5 5s2",
            notes: "Decay from the metastable state releases diagnostic photons while leaving minimal radiation dose.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 43, symbol: "Tc" },
        {
          name: "Technetium-99",
          neutrons: 56,
          halfLife: "211,000 years",
          abundance: "Synthetic",
          description:
            "Ground-state isotope produced from molybdenum fission, decaying slowly to stable ruthenium.",
          bohrModel: {
            shells: [2, 8, 18, 14, 1],
            electronConfiguration: "[Kr] 4d5 5s2",
            notes: "Serves as the daughter product of molybdenum-99 generators used in hospitals.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 43, symbol: "Tc" },
        {
          name: "Technetium-98",
          neutrons: 55,
          halfLife: "4.2 million years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope providing insight into nucleosynthesis in red giant stars.",
          bohrModel: {
            shells: [2, 8, 18, 14, 1],
            electronConfiguration: "[Kr] 4d5 5s2",
            notes: "Presence in stellar spectra confirmed the s-process inside stars.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 44,
    symbol: "Ru",
    name: "Ruthenium",
    group: 8,
    period: 5,
    category: "transition metal",
    atomicMass: 101.07,
    summary:
      "Ruthenium hardens platinum, catalyzes hydrogenation, and forms conductive inks for electronics.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 44, symbol: "Ru" },
        {
          name: "Ruthenium-102",
          neutrons: 58,
          abundance: "31.6%",
          description:
            "Most abundant ruthenium isotope, reinforcing electrical contacts and catalytic surfaces.",
          bohrModel: {
            shells: [2, 8, 18, 15, 1],
            electronConfiguration: "[Kr] 4d7 5s1",
            notes: "Dense 4d electrons support multiple oxidation states and robust catalysis.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 44, symbol: "Ru" },
        {
          name: "Ruthenium-101",
          neutrons: 57,
          abundance: "17.1%",
          description:
            "Stable isotope participating in electrochemical studies and surface science.",
          bohrModel: {
            shells: [2, 8, 18, 15, 1],
            electronConfiguration: "[Kr] 4d7 5s1",
            notes: "Magnetic properties aid research on spintronic materials.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 44, symbol: "Ru" },
        {
          name: "Ruthenium-104",
          neutrons: 60,
          abundance: "18.7%",
          description:
            "Stable isotope contributing to isotope geochemistry and catalytic behavior.",
          bohrModel: {
            shells: [2, 8, 18, 15, 1],
            electronConfiguration: "[Kr] 4d7 5s1",
            notes: "Heavier nucleus subtly modifies vibrational modes in ruthenates.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 45,
    symbol: "Rh",
    name: "Rhodium",
    group: 9,
    period: 5,
    category: "transition metal",
    atomicMass: 102.9055,
    summary:
      "Rhodium shines brightest in catalytic converters and reflective coatings resistant to tarnish.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 45, symbol: "Rh" },
        {
          name: "Rhodium-103",
          neutrons: 58,
          abundance: "100%",
          description:
            "Sole stable rhodium isotope, anchoring the metal's catalytic performance in automotive exhaust systems.",
          bohrModel: {
            shells: [2, 8, 18, 16, 1],
            electronConfiguration: "[Kr] 4d8 5s1",
            notes: "Electron configuration promotes strong chemisorption of nitrogen oxides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 45, symbol: "Rh" },
        {
          name: "Rhodium-102",
          neutrons: 57,
          halfLife: "207 days",
          abundance: "Synthetic",
          description:
            "Long-lived isotope used to study rhodium behavior under irradiation.",
          bohrModel: {
            shells: [2, 8, 18, 16, 1],
            electronConfiguration: "[Kr] 4d8 5s1",
            notes: "Decays to ruthenium while tracing catalytic site durability.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 45, symbol: "Rh" },
        {
          name: "Rhodium-101",
          neutrons: 56,
          halfLife: "3.3 years",
          abundance: "Synthetic",
          description:
            "Radioisotope employed in neutron activation analysis and radiography.",
          bohrModel: {
            shells: [2, 8, 18, 16, 1],
            electronConfiguration: "[Kr] 4d8 5s1",
            notes: "Decay energy assists in nondestructive material testing.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 46,
    symbol: "Pd",
    name: "Palladium",
    group: 10,
    period: 5,
    category: "transition metal",
    atomicMass: 106.42,
    summary:
      "Palladium soaks up hydrogen, accelerates cross-coupling reactions, and adorns jewelry with a lustrous sheen.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 46, symbol: "Pd" },
        {
          name: "Palladium-106",
          neutrons: 60,
          abundance: "27.33%",
          description:
            "Stable isotope contributing to catalytic converters and fine jewelry alloys.",
          bohrModel: {
            shells: [2, 8, 18, 18],
            electronConfiguration: "[Kr] 4d10",
            notes: "Filled 4d shell grants chemical stability and resistance to tarnish.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 46, symbol: "Pd" },
        {
          name: "Palladium-108",
          neutrons: 62,
          abundance: "26.46%",
          description:
            "Stable isotope used to monitor geochemical processes and hydrogen absorption.",
          bohrModel: {
            shells: [2, 8, 18, 18],
            electronConfiguration: "[Kr] 4d10",
            notes: "Heavier nucleus fine-tunes phonon modes relevant to superconducting hydrides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 46, symbol: "Pd" },
        {
          name: "Palladium-110",
          neutrons: 64,
          abundance: "11.72%",
          description:
            "Stable isotope highlighting isotopic fractionation in catalytic cycles.",
          bohrModel: {
            shells: [2, 8, 18, 18],
            electronConfiguration: "[Kr] 4d10",
            notes: "Mass differences influence hydrogen storage kinetics in palladium lattices.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 47,
    symbol: "Ag",
    name: "Silver",
    group: 11,
    period: 5,
    category: "transition metal",
    atomicMass: 107.8682,
    summary:
      "Silver is the most conductive metal, enabling advanced electronics, photography, and antimicrobial coatings.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 47, symbol: "Ag" },
        {
          name: "Silver-107",
          neutrons: 60,
          abundance: "51.839%",
          description:
            "Stable silver isotope that forms sterling alloys and reflective mirrors.",
          bohrModel: {
            shells: [2, 8, 18, 18, 1],
            electronConfiguration: "[Kr] 4d10 5s1",
            notes: "Single 5s electron drives outstanding electrical and thermal conductivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 47, symbol: "Ag" },
        {
          name: "Silver-109",
          neutrons: 62,
          abundance: "48.161%",
          description:
            "Stable isotope used in metallurgical studies and nuclear magnetic resonance.",
          bohrModel: {
            shells: [2, 8, 18, 18, 1],
            electronConfiguration: "[Kr] 4d10 5s1",
            notes: "Nuclear spin of 109Ag enables Moessbauer and NMR investigations of alloys.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 47, symbol: "Ag" },
        {
          name: "Silver-110m",
          neutrons: 63,
          halfLife: "249.8 days",
          abundance: "Synthetic",
          description:
            "Metastable isotope emitting gamma rays for industrial radiography and research.",
          bohrModel: {
            shells: [2, 8, 18, 18, 1],
            electronConfiguration: "[Kr] 4d10 5s1",
            notes: "Isomeric transition releases photons useful in calibration sources.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 48,
    symbol: "Cd",
    name: "Cadmium",
    group: 12,
    period: 5,
    category: "post-transition metal",
    atomicMass: 112.414,
    summary:
      "Cadmium stabilizes pigments, quantum dots, and rechargeable batteries, though careful handling is required.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 48, symbol: "Cd" },
        {
          name: "Cadmium-112",
          neutrons: 64,
          abundance: "24.13%",
          description:
            "Stable isotope key to producing tunable cadmium selenide quantum dots.",
          bohrModel: {
            shells: [2, 8, 18, 18, 2],
            electronConfiguration: "[Kr] 4d10 5s2",
            notes: "Filled valence shell keeps cadmium chemistry largely ionic.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 48, symbol: "Cd" },
        {
          name: "Cadmium-110",
          neutrons: 62,
          abundance: "12.49%",
          description:
            "Stable isotope that absorbs neutrons efficiently, used in control rods and shielding.",
          bohrModel: {
            shells: [2, 8, 18, 18, 2],
            electronConfiguration: "[Kr] 4d10 5s2",
            notes: "Strong neutron capture cross-section underpins reactor safety components.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 48, symbol: "Cd" },
        {
          name: "Cadmium-114",
          neutrons: 66,
          abundance: "28.73%",
          description:
            "Heaviest naturally abundant cadmium isotope, tracking environmental contamination.",
          bohrModel: {
            shells: [2, 8, 18, 18, 2],
            electronConfiguration: "[Kr] 4d10 5s2",
            notes: "Mass shifts vibrational frequencies leveraged in isotope geochemistry.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 49,
    symbol: "In",
    name: "Indium",
    group: 13,
    period: 5,
    category: "post-transition metal",
    atomicMass: 114.818,
    summary:
      "Indium forms transparent conductive coatings, solders microelectronics, and softens low-melting alloys.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 49, symbol: "In" },
        {
          name: "Indium-115",
          neutrons: 66,
          halfLife: "4.41 quadrillion years",
          abundance: "95.7%",
          description:
            "Quasi-stable isotope dominating natural indium, slowly beta decaying to tin.",
          bohrModel: {
            shells: [2, 8, 18, 18, 3],
            electronConfiguration: "[Kr] 4d10 5s2 5p1",
            notes: "Soft metal behavior arises from the lone 5p electron above filled shells.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 49, symbol: "In" },
        {
          name: "Indium-113",
          neutrons: 64,
          abundance: "4.3%",
          description:
            "Stable isotope used as a gamma-ray emitter in nuclear medicine diagnostics.",
          bohrModel: {
            shells: [2, 8, 18, 18, 3],
            electronConfiguration: "[Kr] 4d10 5s2 5p1",
            notes: "Nuclear spin enables Moessbauer spectroscopy of indium compounds.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 49, symbol: "In" },
        {
          name: "Indium-111",
          neutrons: 62,
          halfLife: "2.8 days",
          abundance: "Synthetic",
          description:
            "Medically useful isotope for imaging white blood cell distribution and tumor localization.",
          bohrModel: {
            shells: [2, 8, 18, 18, 3],
            electronConfiguration: "[Kr] 4d10 5s2 5p1",
            notes: "Chemically tracks stable indium compounds during biological targeting.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 50,
    symbol: "Sn",
    name: "Tin",
    group: 14,
    period: 5,
    category: "post-transition metal",
    atomicMass: 118.71,
    summary:
      "Tin coats steel cans, solders electronics, and exhibits intriguing allotropes sensitive to temperature.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 50, symbol: "Sn" },
        {
          name: "Tin-120",
          neutrons: 70,
          abundance: "32.9%",
          description:
            "Common tin isotope reinforcing corrosion-resistant coatings and bronze alloys.",
          bohrModel: {
            shells: [2, 8, 18, 18, 4],
            electronConfiguration: "[Kr] 4d10 5s2 5p2",
            notes: "Two 5p electrons facilitate flexible bonding that supports tin's malleability.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 50, symbol: "Sn" },
        {
          name: "Tin-118",
          neutrons: 68,
          abundance: "24.0%",
          description:
            "Stable isotope used to trace tin contamination and alloy homogeneity.",
          bohrModel: {
            shells: [2, 8, 18, 18, 4],
            electronConfiguration: "[Kr] 4d10 5s2 5p2",
            notes: "Supports a mix of ionic and covalent bonding in stannates and organotin compounds.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 50, symbol: "Sn" },
        {
          name: "Tin-124",
          neutrons: 74,
          abundance: "5.8%",
          description:
            "Heavy stable isotope used in neutrino mass experiments via double-beta decay searches.",
          bohrModel: {
            shells: [2, 8, 18, 18, 4],
            electronConfiguration: "[Kr] 4d10 5s2 5p2",
            notes: "Extra neutrons stiffen the nucleus while leaving tin's metallic bonding intact.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 51,
    symbol: "Sb",
    name: "Antimony",
    group: 15,
    period: 5,
    category: "metalloid",
    atomicMass: 121.76,
    summary:
      "Antimony hardens lead, enhances flame retardants, and lends semiconducting power to III-V compounds.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 51, symbol: "Sb" },
        {
          name: "Antimony-121",
          neutrons: 70,
          abundance: "57.36%",
          description:
            "Stable isotope common in stibnite ores and optoelectronic materials.",
          bohrModel: {
            shells: [2, 8, 18, 18, 5],
            electronConfiguration: "[Kr] 4d10 5s2 5p3",
            notes: "Three 5p electrons produce semimetal behavior with directional bonding.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 51, symbol: "Sb" },
        {
          name: "Antimony-123",
          neutrons: 72,
          abundance: "42.64%",
          description:
            "Stable isotope utilized in nuclear medicine for imaging and therapeutic compounds.",
          bohrModel: {
            shells: [2, 8, 18, 18, 5],
            electronConfiguration: "[Kr] 4d10 5s2 5p3",
            notes: "Nuclear spin aids Moessbauer spectroscopy of antimony-bearing materials.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 51, symbol: "Sb" },
        {
          name: "Antimony-124",
          neutrons: 73,
          halfLife: "60.2 days",
          abundance: "Synthetic",
          description:
            "Gamma emitter used for industrial radiography and tracer studies.",
          bohrModel: {
            shells: [2, 8, 18, 18, 5],
            electronConfiguration: "[Kr] 4d10 5s2 5p3",
            notes: "Decay photons calibrate detectors for radiation monitoring.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 52,
    symbol: "Te",
    name: "Tellurium",
    group: 16,
    period: 5,
    category: "metalloid",
    atomicMass: 127.6,
    summary:
      "Tellurium blends metallic and nonmetallic traits, enabling thermoelectric devices and CdTe solar cells.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 52, symbol: "Te" },
        {
          name: "Tellurium-128",
          neutrons: 76,
          abundance: "31.74%",
          description:
            "Stable isotope forming the backbone of telluride thermoelectric materials.",
          bohrModel: {
            shells: [2, 8, 18, 18, 6],
            electronConfiguration: "[Kr] 4d10 5s2 5p4",
            notes: "Lone pairs drive anisotropic bonding that supports thermoelectric efficiency.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 52, symbol: "Te" },
        {
          name: "Tellurium-130",
          neutrons: 78,
          abundance: "34.08%",
          description:
            "Stable isotope important for double-beta decay experiments probing neutrino properties.",
          bohrModel: {
            shells: [2, 8, 18, 18, 6],
            electronConfiguration: "[Kr] 4d10 5s2 5p4",
            notes: "Extra neutrons heighten nuclear stability while maintaining semiconductor behavior.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 52, symbol: "Te" },
        {
          name: "Tellurium-126",
          neutrons: 74,
          abundance: "18.95%",
          description:
            "Stable isotope aiding isotope geochemistry in volcanic and hydrothermal systems.",
          bohrModel: {
            shells: [2, 8, 18, 18, 6],
            electronConfiguration: "[Kr] 4d10 5s2 5p4",
            notes: "Supports polar covalent bonding with metals in thermoelectric alloys.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 53,
    symbol: "I",
    name: "Iodine",
    group: 17,
    period: 5,
    category: "halogen",
    atomicMass: 126.90447,
    summary:
      "Iodine sublimes to violet vapor, disinfects wounds, and fuels thyroid chemistry and contrast imaging.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 53, symbol: "I" },
        {
          name: "Iodine-127",
          neutrons: 74,
          abundance: "100%",
          description:
            "Only stable iodine isotope, essential for thyroid hormones and iodized salt.",
          bohrModel: {
            shells: [2, 8, 18, 18, 7],
            electronConfiguration: "[Kr] 4d10 5s2 5p5",
            notes: "Nearly complete 5p shell drives strong oxidizing ability and halogen bonding.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 53, symbol: "I" },
        {
          name: "Iodine-131",
          neutrons: 78,
          halfLife: "8.0 days",
          abundance: "Synthetic",
          description:
            "Beta- and gamma-emitting isotope used to treat thyroid disorders and monitor metabolic activity.",
          bohrModel: {
            shells: [2, 8, 18, 18, 7],
            electronConfiguration: "[Kr] 4d10 5s2 5p5",
            notes: "Targets thyroid tissue due to rapid uptake of iodide ions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 53, symbol: "I" },
        {
          name: "Iodine-129",
          neutrons: 76,
          halfLife: "15.7 million years",
          abundance: "Trace",
          description:
            "Long-lived isotope used to date groundwater and study nuclear waste migration.",
          bohrModel: {
            shells: [2, 8, 18, 18, 7],
            electronConfiguration: "[Kr] 4d10 5s2 5p5",
            notes: "Slow decay provides a chronometer for environmental and astrophysical processes.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 54,
    symbol: "Xe",
    name: "Xenon",
    group: 18,
    period: 5,
    category: "noble gas",
    atomicMass: 131.293,
    summary:
      "Xenon fills high-intensity lamps, ion thrusters, and medical anesthesia circuits with heavy, inert gas.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 54, symbol: "Xe" },
        {
          name: "Xenon-132",
          neutrons: 78,
          abundance: "26.91%",
          description:
            "Most abundant xenon isotope, shaping isotope signatures in Earth's atmosphere and mantle.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8],
            electronConfiguration: "[Kr] 4d10 5s2 5p6",
            notes: "Closed-shell noble gas exhibits weak interactions but plays a role in trapped noble gases.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 54, symbol: "Xe" },
        {
          name: "Xenon-129",
          neutrons: 75,
          abundance: "26.4%",
          description:
            "Stable isotope used in MRI contrast and fundamental quantum physics experiments.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8],
            electronConfiguration: "[Kr] 4d10 5s2 5p6",
            notes: "Nuclear spin enables hyperpolarized xenon imaging of lung function.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 54, symbol: "Xe" },
        {
          name: "Xenon-131",
          neutrons: 77,
          abundance: "21.23%",
          description:
            "Stable isotope whose nuclear properties underpin precision clocks and inert gas detectors.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8],
            electronConfiguration: "[Kr] 4d10 5s2 5p6",
            notes: "Supports cryogenic detectors searching for dark matter via nuclear recoils.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 55,
    symbol: "Cs",
    name: "Cesium",
    group: 1,
    period: 6,
    category: "alkali metal",
    atomicMass: 132.90545196,
    summary:
      "Cesium is a soft, golden alkali metal that fuels atomic clocks and sparks with explosive vigor upon contact with water.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 55, symbol: "Cs" },
        {
          name: "Cesium-133",
          neutrons: 78,
          abundance: "100%",
          description:
            "Only stable cesium isotope, defining the SI second via its hyperfine transition.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 1],
            electronConfiguration: "[Xe] 6s1",
            notes: "Single 6s electron transitions underpin the precision of cesium fountain clocks.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 55, symbol: "Cs" },
        {
          name: "Cesium-135",
          neutrons: 80,
          halfLife: "2.3 million years",
          abundance: "Trace",
          description:
            "Long-lived fission product tracked in nuclear waste management and groundwater migration.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 1],
            electronConfiguration: "[Xe] 6s1",
            notes: "Slow beta decay gradually converts the nucleus to barium while the valence electron remains mobile.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 55, symbol: "Cs" },
        {
          name: "Cesium-137",
          neutrons: 82,
          halfLife: "30.17 years",
          abundance: "Trace",
          description:
            "Prominent gamma-emitting isotope used in industrial gauges and medical radiotherapy.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 1],
            electronConfiguration: "[Xe] 6s1",
            notes: "Radioactive decay releases energetic photons monitored in environmental surveys.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 56,
    symbol: "Ba",
    name: "Barium",
    group: 2,
    period: 6,
    category: "alkaline earth metal",
    atomicMass: 137.327,
    summary:
      "Barium imparts a green flame, opacifies medical imaging suspensions, and stabilizes high-temperature ceramics.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 56, symbol: "Ba" },
        {
          name: "Barium-138",
          neutrons: 82,
          abundance: "71.7%",
          description:
            "Most abundant barium isotope, settling into heavy barite minerals and x-ray contrast agents.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 2],
            electronConfiguration: "[Xe] 6s2",
            notes: "Pair of 6s electrons leaves barium eager to form Ba2+ for sulfate and titanate compounds.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 56, symbol: "Ba" },
        {
          name: "Barium-137",
          neutrons: 81,
          abundance: "11.2%",
          description:
            "Stable isotope that inherits activity from decaying cesium-137 and anchors isotope geochemistry.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 2],
            electronConfiguration: "[Xe] 6s2",
            notes: "Valence shell remains ionic across isotopic variations, supporting barite crystallization.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 56, symbol: "Ba" },
        {
          name: "Barium-130",
          neutrons: 74,
          abundance: "0.106%",
          description:
            "Rare isotope undergoing double beta decay, offering clues about neutrino mass.",
          bohrModel: {
            shells: [2, 8, 18, 18, 8, 2],
            electronConfiguration: "[Xe] 6s2",
            notes: "Ultra-slow decay leaves subtle tracks studied with low-background detectors.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 57,
    symbol: "La",
    name: "Lanthanum",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 138.90547,
    summary:
      "Lanthanum inaugurates the lanthanide series, brightening camera lenses and hybrid vehicle batteries.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 57, symbol: "La" },
        {
          name: "Lanthanum-139",
          neutrons: 82,
          abundance: "99.91%",
          description:
            "Preeminent stable lanthanum isotope, shaping rare-earth catalysts and glass additives.",
          bohrModel: {
            shells: [2, 8, 18, 18, 9, 2],
            electronConfiguration: "[Xe] 5d1 6s2",
            notes: "Transition-ready 5d electron enhances optical and catalytic behavior.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 57, symbol: "La" },
        {
          name: "Lanthanum-138",
          neutrons: 81,
          halfLife: "105 billion years",
          abundance: "0.09%",
          description:
            "Primordial radioisotope valuable for dating meteoritic differentiation.",
          bohrModel: {
            shells: [2, 8, 18, 18, 9, 2],
            electronConfiguration: "[Xe] 5d1 6s2",
            notes: "Sparse occurrence yet significant for geochronological chronometers.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 57, symbol: "La" },
        {
          name: "Lanthanum-140",
          neutrons: 83,
          halfLife: "40.3 hours",
          abundance: "Trace",
          description:
            "Fission product used to calibrate gamma spectroscopy and tracer studies.",
          bohrModel: {
            shells: [2, 8, 18, 18, 9, 2],
            electronConfiguration: "[Xe] 5d1 6s2",
            notes: "Decay to cerium releases diagnostic gamma rays in reactor monitoring.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 58,
    symbol: "Ce",
    name: "Cerium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 140.116,
    summary:
      "Cerium polishes glass, stores oxygen in catalytic converters, and toggles between +3 and +4 oxidation states with ease.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 58, symbol: "Ce" },
        {
          name: "Cerium-140",
          neutrons: 82,
          abundance: "88.48%",
          description:
            "Dominant stable isotope that cycles redox states in automotive catalysts.",
          bohrModel: {
            shells: [2, 8, 18, 19, 9, 2],
            electronConfiguration: "[Xe] 4f1 5d1 6s2",
            notes: "Partially filled 4f and 5d orbitals grant flexible valence chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 58, symbol: "Ce" },
        {
          name: "Cerium-142",
          neutrons: 84,
          abundance: "11.08%",
          description:
            "Stable isotope useful in tracing rare-earth element fractionation during magmatic processes.",
          bohrModel: {
            shells: [2, 8, 18, 19, 9, 2],
            electronConfiguration: "[Xe] 4f1 5d1 6s2",
            notes: "Extra neutrons stabilize the nucleus without quenching catalytic potential.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 58, symbol: "Ce" },
        {
          name: "Cerium-139",
          neutrons: 81,
          halfLife: "137.6 days",
          abundance: "Synthetic",
          description:
            "Gamma-emitting isotope used to monitor cerium distribution in environmental systems.",
          bohrModel: {
            shells: [2, 8, 18, 19, 9, 2],
            electronConfiguration: "[Xe] 4f1 5d1 6s2",
            notes: "Decay to praseodymium supports tracer studies in hydrology.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 59,
    symbol: "Pr",
    name: "Praseodymium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 140.90766,
    summary:
      "Praseodymium colors glass yellow-green, powers high-strength magnets, and supports aircraft alloys.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 59, symbol: "Pr" },
        {
          name: "Praseodymium-141",
          neutrons: 82,
          abundance: "100%",
          description:
            "Only stable praseodymium isotope, integral to Nd-Pr-Fe-B magnet alloys.",
          bohrModel: {
            shells: [2, 8, 18, 21, 8, 2],
            electronConfiguration: "[Xe] 4f3 6s2",
            notes: "Multiple 4f electrons produce strong magnetic moments and vibrant optics.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 59, symbol: "Pr" },
        {
          name: "Praseodymium-143",
          neutrons: 84,
          halfLife: "13.6 days",
          abundance: "Synthetic",
          description:
            "Beta-emitting isotope enabling tracer experiments in metallurgy and combustion.",
          bohrModel: {
            shells: [2, 8, 18, 21, 8, 2],
            electronConfiguration: "[Xe] 4f3 6s2",
            notes: "Chemically mirrors stable praseodymium, easing environmental tracking.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 59, symbol: "Pr" },
        {
          name: "Praseodymium-142",
          neutrons: 83,
          halfLife: "19.1 hours",
          abundance: "Synthetic",
          description:
            "Short-lived isotope observed in reactor fuel cycles and astrophysical nucleosynthesis.",
          bohrModel: {
            shells: [2, 8, 18, 21, 8, 2],
            electronConfiguration: "[Xe] 4f3 6s2",
            notes: "Rapid decay cascades to neodymium while emitting energetic beta particles.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 60,
    symbol: "Nd",
    name: "Neodymium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 144.242,
    summary:
      "Neodymium powers the strongest permanent magnets, fuels purple lasers, and shapes rare-earth glass.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 60, symbol: "Nd" },
        {
          name: "Neodymium-142",
          neutrons: 82,
          abundance: "27.2%",
          description:
            "Stable isotope essential to neodymium magnet alloys used in motors and generators.",
          bohrModel: {
            shells: [2, 8, 18, 22, 8, 2],
            electronConfiguration: "[Xe] 4f4 6s2",
            notes: "Four 4f electrons generate robust magnetic anisotropy.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 60, symbol: "Nd" },
        {
          name: "Neodymium-143",
          neutrons: 83,
          abundance: "12.2%",
          description:
            "Stable isotope used to fingerprint mantle differentiation and crust formation.",
          bohrModel: {
            shells: [2, 8, 18, 22, 8, 2],
            electronConfiguration: "[Xe] 4f4 6s2",
            notes: "Provides isotopic ratios for Sm-Nd geochronology.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 60, symbol: "Nd" },
        {
          name: "Neodymium-150",
          neutrons: 90,
          abundance: "5.6%",
          description:
            "Heavy stable isotope investigated for double-beta decay and neutrino studies.",
          bohrModel: {
            shells: [2, 8, 18, 22, 8, 2],
            electronConfiguration: "[Xe] 4f4 6s2",
            notes: "Massive nucleus contributes to high density of Nd-based magnets.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 61,
    symbol: "Pm",
    name: "Promethium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 145,
    summary:
      "Promethium is a rare synthetic lanthanide that glows in luminous paint and beta batteries despite lacking stable isotopes.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 61, symbol: "Pm" },
        {
          name: "Promethium-145",
          neutrons: 84,
          halfLife: "17.7 years",
          abundance: "Synthetic",
          description:
            "Longest-lived promethium isotope powering radioisotope betavoltaic cells for space probes.",
          bohrModel: {
            shells: [2, 8, 18, 23, 8, 2],
            electronConfiguration: "[Xe] 4f5 6s2",
            notes: "Persistent beta decay emits low-energy electrons harnessed in long-life batteries.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 61, symbol: "Pm" },
        {
          name: "Promethium-147",
          neutrons: 86,
          halfLife: "2.62 years",
          abundance: "Synthetic",
          description:
            "Commercially produced isotope for luminous signal lights and thickness gauges.",
          bohrModel: {
            shells: [2, 8, 18, 23, 8, 2],
            electronConfiguration: "[Xe] 4f5 6s2",
            notes: "Beta emissions excite phosphors without requiring external power.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 61, symbol: "Pm" },
        {
          name: "Promethium-148m",
          neutrons: 87,
          halfLife: "41.3 days",
          abundance: "Synthetic",
          description:
            "Metastable isotope useful in tracing rare-earth element processing streams.",
          bohrModel: {
            shells: [2, 8, 18, 23, 8, 2],
            electronConfiguration: "[Xe] 4f5 6s2",
            notes: "Isomeric transition to ground state releases distinctive gamma rays.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 62,
    symbol: "Sm",
    name: "Samarium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 150.36,
    summary:
      "Samarium bolsters permanent magnets, neutron absorbers, and cancer therapy sources with versatile 4f electrons.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 62, symbol: "Sm" },
        {
          name: "Samarium-152",
          neutrons: 90,
          abundance: "26.8%",
          description:
            "Stable isotope contributing to SmCo magnets that withstand extreme temperatures.",
          bohrModel: {
            shells: [2, 8, 18, 24, 8, 2],
            electronConfiguration: "[Xe] 4f6 6s2",
            notes: "Six 4f electrons create strong magnetic anisotropy and high coercivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 62, symbol: "Sm" },
        {
          name: "Samarium-149",
          neutrons: 87,
          abundance: "13.8%",
          description:
            "Stable isotope with an enormous neutron capture cross section, vital in reactor control rods.",
          bohrModel: {
            shells: [2, 8, 18, 24, 8, 2],
            electronConfiguration: "[Xe] 4f6 6s2",
            notes: "Absorbs neutrons efficiently without altering valence chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 62, symbol: "Sm" },
        {
          name: "Samarium-153",
          neutrons: 91,
          halfLife: "46.3 hours",
          abundance: "Synthetic",
          description:
            "Beta-emitting isotope used to palliate bone pain in metastatic cancer patients.",
          bohrModel: {
            shells: [2, 8, 18, 24, 8, 2],
            electronConfiguration: "[Xe] 4f6 6s2",
            notes: "Radiopharmaceuticals exploit its affinity for bone tissue.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 63,
    symbol: "Eu",
    name: "Europium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 151.964,
    summary:
      "Europium ignites red phosphors in displays, secures anti-counterfeiting inks, and moderates reactors.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 63, symbol: "Eu" },
        {
          name: "Europium-151",
          neutrons: 88,
          abundance: "47.8%",
          description:
            "Stable isotope central to red-emitting phosphors used in LEDs and fluorescent lamps.",
          bohrModel: {
            shells: [2, 8, 18, 25, 8, 2],
            electronConfiguration: "[Xe] 4f7 6s2",
            notes: "Half-filled 4f shell provides sharp luminescent transitions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 63, symbol: "Eu" },
        {
          name: "Europium-153",
          neutrons: 90,
          abundance: "52.2%",
          description:
            "Stable isotope used to measure neutron flux and study geochemical fractionation.",
          bohrModel: {
            shells: [2, 8, 18, 25, 8, 2],
            electronConfiguration: "[Xe] 4f7 6s2",
            notes: "Captures neutrons readily, influencing reactor burnup calculations.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 63, symbol: "Eu" },
        {
          name: "Europium-152",
          neutrons: 89,
          halfLife: "13.5 years",
          abundance: "Synthetic",
          description:
            "Gamma-emitting isotope ideal for calibrating radiation detectors and studying rare-earth diffusion.",
          bohrModel: {
            shells: [2, 8, 18, 25, 8, 2],
            electronConfiguration: "[Xe] 4f7 6s2",
            notes: "Decays to samarium while preserving 4f electron occupancy.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 64,
    symbol: "Gd",
    name: "Gadolinium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 157.25,
    summary:
      "Gadolinium enhances MRI contrast, absorbs neutrons, and forms magnetocaloric materials for cooling.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 64, symbol: "Gd" },
        {
          name: "Gadolinium-157",
          neutrons: 93,
          abundance: "15.65%",
          description:
            "Stable isotope with the highest neutron capture cross section known, crucial for reactor shielding.",
          bohrModel: {
            shells: [2, 8, 18, 25, 9, 2],
            electronConfiguration: "[Xe] 4f7 5d1 6s2",
            notes: "Dual 4f and 5d electrons enable strong magnetic and neutron-absorbing behavior.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 64, symbol: "Gd" },
        {
          name: "Gadolinium-155",
          neutrons: 91,
          abundance: "14.80%",
          description:
            "Stable isotope that moderates neutron flux in control rods and reactor poisons.",
          bohrModel: {
            shells: [2, 8, 18, 25, 9, 2],
            electronConfiguration: "[Xe] 4f7 5d1 6s2",
            notes: "High magnetic moment supports magnetocaloric refrigeration research.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 64, symbol: "Gd" },
        {
          name: "Gadolinium-158",
          neutrons: 94,
          abundance: "24.84%",
          description:
            "Stable isotope that influences isotope ratios in geological and astrophysical samples.",
          bohrModel: {
            shells: [2, 8, 18, 25, 9, 2],
            electronConfiguration: "[Xe] 4f7 5d1 6s2",
            notes: "Supports contrast enhancement in targeted MRI agents.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 65,
    symbol: "Tb",
    name: "Terbium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 158.92535,
    summary:
      "Terbium emits green light in phosphors, reinforces magnets, and fuels magnetostrictive actuators.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 65, symbol: "Tb" },
        {
          name: "Terbium-159",
          neutrons: 94,
          abundance: "100%",
          description:
            "Only stable terbium isotope, dominating green phosphor materials and giant magnetostrictive alloys.",
          bohrModel: {
            shells: [2, 8, 18, 27, 8, 2],
            electronConfiguration: "[Xe] 4f9 6s2",
            notes: "Rich 4f population generates strong magneto-optical effects.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 65, symbol: "Tb" },
        {
          name: "Terbium-160",
          neutrons: 95,
          halfLife: "72.3 days",
          abundance: "Synthetic",
          description:
            "Gamma emitter used in industrial radiography and research on neutron capture therapy.",
          bohrModel: {
            shells: [2, 8, 18, 27, 8, 2],
            electronConfiguration: "[Xe] 4f9 6s2",
            notes: "Decay to dysprosium releases high-energy photons for nondestructive testing.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 65, symbol: "Tb" },
        {
          name: "Terbium-157",
          neutrons: 92,
          halfLife: "70 years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope aiding activation analysis and neutron capture studies.",
          bohrModel: {
            shells: [2, 8, 18, 27, 8, 2],
            electronConfiguration: "[Xe] 4f9 6s2",
            notes: "Chemically follows stable terbium, simplifying tracer experiments.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 66,
    symbol: "Dy",
    name: "Dysprosium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 162.5,
    summary:
      "Dysprosium stabilizes high-temperature magnets, regulates reactor control rods, and glows in lighting phosphors.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 66, symbol: "Dy" },
        {
          name: "Dysprosium-164",
          neutrons: 98,
          abundance: "28.2%",
          description:
            "Stable isotope reinforcing Nd-Fe-B magnets against demagnetization at elevated temperatures.",
          bohrModel: {
            shells: [2, 8, 18, 28, 8, 2],
            electronConfiguration: "[Xe] 4f10 6s2",
            notes: "Ten 4f electrons create strong magnetic anisotropy and neutron absorption.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 66, symbol: "Dy" },
        {
          name: "Dysprosium-163",
          neutrons: 97,
          abundance: "24.9%",
          description:
            "Stable isotope used in Moessbauer spectroscopy and isotope geochemistry of rare-earth deposits.",
          bohrModel: {
            shells: [2, 8, 18, 28, 8, 2],
            electronConfiguration: "[Xe] 4f10 6s2",
            notes: "Supports control rods through robust neutron capture cross sections.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 66, symbol: "Dy" },
        {
          name: "Dysprosium-166",
          neutrons: 100,
          halfLife: "80.6 hours",
          abundance: "Synthetic",
          description:
            "Beta emitter researched for targeted radiotherapy and neutron capture therapy.",
          bohrModel: {
            shells: [2, 8, 18, 28, 8, 2],
            electronConfiguration: "[Xe] 4f10 6s2",
            notes: "Decays to holmium while releasing beta particles suited for medical implants.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 67,
    symbol: "Ho",
    name: "Holmium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 164.93033,
    summary:
      "Holmium boasts the highest magnetic moment of any natural element, empowering magnets, lasers, and MRI shielding.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 67, symbol: "Ho" },
        {
          name: "Holmium-165",
          neutrons: 98,
          abundance: "100%",
          description:
            "Only stable holmium isotope, anchoring powerful magnetic alloys and fiber lasers.",
          bohrModel: {
            shells: [2, 8, 18, 29, 8, 2],
            electronConfiguration: "[Xe] 4f11 6s2",
            notes: "Eleven 4f electrons give holmium exceptional magnetic dipole strength.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 67, symbol: "Ho" },
        {
          name: "Holmium-166",
          neutrons: 99,
          halfLife: "26.8 hours",
          abundance: "Synthetic",
          description:
            "Therapeutic isotope used in radioembolization to treat liver cancers.",
          bohrModel: {
            shells: [2, 8, 18, 29, 8, 2],
            electronConfiguration: "[Xe] 4f11 6s2",
            notes: "Emits beta particles and gamma rays for imaging-guided therapy.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 67, symbol: "Ho" },
        {
          name: "Holmium-163",
          neutrons: 96,
          halfLife: "4,570 years",
          abundance: "Synthetic",
          description:
            "Electron-capture isotope studied for neutrino mass measurements via calorimetry.",
          bohrModel: {
            shells: [2, 8, 18, 29, 8, 2],
            electronConfiguration: "[Xe] 4f11 6s2",
            notes: "Low-energy decay allows precise spectroscopy of emitted electrons.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 68,
    symbol: "Er",
    name: "Erbium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 167.259,
    summary:
      "Erbium amplifies fiber-optic signals, produces pink glass, and supports mid-infrared lasers.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 68, symbol: "Er" },
        {
          name: "Erbium-166",
          neutrons: 98,
          abundance: "33.6%",
          description:
            "Stable isotope central to erbium-doped fiber amplifiers for telecommunications.",
          bohrModel: {
            shells: [2, 8, 18, 30, 8, 2],
            electronConfiguration: "[Xe] 4f12 6s2",
            notes: "4f transitions emit 1.55 um light ideal for optical communications.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 68, symbol: "Er" },
        {
          name: "Erbium-167",
          neutrons: 99,
          abundance: "22.9%",
          description:
            "Stable isotope whose nuclear spin enables neutron scattering and resonance studies.",
          bohrModel: {
            shells: [2, 8, 18, 30, 8, 2],
            electronConfiguration: "[Xe] 4f12 6s2",
            notes: "Energy levels underpin tunable lasers used in dermatology.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 68, symbol: "Er" },
        {
          name: "Erbium-168",
          neutrons: 100,
          abundance: "26.8%",
          description:
            "Stable isotope that contributes to isotope fractionation analyses in geological samples.",
          bohrModel: {
            shells: [2, 8, 18, 30, 8, 2],
            electronConfiguration: "[Xe] 4f12 6s2",
            notes: "Maintains sharp emission lines for precise optical amplification.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 69,
    symbol: "Tm",
    name: "Thulium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 168.93422,
    summary:
      "Thulium powers portable x-ray sources, compact lasers, and research into next-generation electronics.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 69, symbol: "Tm" },
        {
          name: "Thulium-169",
          neutrons: 100,
          abundance: "100%",
          description:
            "Only stable thulium isotope, enabling x-ray emitters and blue laser crystals.",
          bohrModel: {
            shells: [2, 8, 18, 31, 8, 2],
            electronConfiguration: "[Xe] 4f13 6s2",
            notes: "Nearly filled 4f shell delivers unique luminescent transitions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 69, symbol: "Tm" },
        {
          name: "Thulium-170",
          neutrons: 101,
          halfLife: "128.6 days",
          abundance: "Synthetic",
          description:
            "Beta and gamma emitter used for industrial radiography and brachytherapy.",
          bohrModel: {
            shells: [2, 8, 18, 31, 8, 2],
            electronConfiguration: "[Xe] 4f13 6s2",
            notes: "Decay photons provide compact radiation sources.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 69, symbol: "Tm" },
        {
          name: "Thulium-171",
          neutrons: 102,
          halfLife: "1.92 years",
          abundance: "Synthetic",
          description:
            "Isotope applied in tracing thulium behavior within advanced materials.",
          bohrModel: {
            shells: [2, 8, 18, 31, 8, 2],
            electronConfiguration: "[Xe] 4f13 6s2",
            notes: "Decay sequence informs handling of rare-earth recycling streams.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 70,
    symbol: "Yb",
    name: "Ytterbium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 173.045,
    summary:
      "Ytterbium forms ultracold atomic clocks, fiber lasers, and alloying agents that improve stainless steel.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 70, symbol: "Yb" },
        {
          name: "Ytterbium-174",
          neutrons: 104,
          abundance: "31.8%",
          description:
            "Stable isotope used in frequency standards and optical lattice clock experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 8, 2],
            electronConfiguration: "[Xe] 4f14 6s2",
            notes: "Filled 4f shell yields closed-shell behavior with precise spectroscopic lines.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 70, symbol: "Yb" },
        {
          name: "Ytterbium-171",
          neutrons: 101,
          abundance: "14.3%",
          description:
            "Stable isotope whose nuclear spin is exploited in quantum information research.",
          bohrModel: {
            shells: [2, 8, 18, 32, 8, 2],
            electronConfiguration: "[Xe] 4f14 6s2",
            notes: "Supports narrow-line cooling transitions in cold-atom setups.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 70, symbol: "Yb" },
        {
          name: "Ytterbium-173",
          neutrons: 103,
          abundance: "16.1%",
          description:
            "Stable isotope that enriches hyperfine structure measurements and isotope geochemistry.",
          bohrModel: {
            shells: [2, 8, 18, 32, 8, 2],
            electronConfiguration: "[Xe] 4f14 6s2",
            notes: "Maintains isotropic bonding that enhances stainless steel toughness.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 71,
    symbol: "Lu",
    name: "Lutetium",
    group: 3,
    period: 6,
    category: "lanthanide",
    atomicMass: 174.9668,
    summary:
      "Lutetium caps the lanthanide series, densifying scintillators, catalysts, and PET imaging detectors.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 71, symbol: "Lu" },
        {
          name: "Lutetium-175",
          neutrons: 104,
          abundance: "97.41%",
          description:
            "Stable isotope foundational to lutetium oxyorthosilicate scintillators in PET scanners.",
          bohrModel: {
            shells: [2, 8, 18, 32, 9, 2],
            electronConfiguration: "[Xe] 4f14 5d1 6s2",
            notes: "Filled 4f and single 5d electron create high density and catalytic activity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 71, symbol: "Lu" },
        {
          name: "Lutetium-176",
          neutrons: 105,
          halfLife: "37.6 billion years",
          abundance: "2.59%",
          description:
            "Quasi-stable isotope used for Lu-Hf geochronology and tracing crustal evolution.",
          bohrModel: {
            shells: [2, 8, 18, 32, 9, 2],
            electronConfiguration: "[Xe] 4f14 5d1 6s2",
            notes: "Small abundance yet critical for radiometric dating of zircons.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 71, symbol: "Lu" },
        {
          name: "Lutetium-177",
          neutrons: 106,
          halfLife: "6.7 days",
          abundance: "Synthetic",
          description:
            "Radiotherapeutic isotope targeting neuroendocrine tumors with precision beta radiation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 9, 2],
            electronConfiguration: "[Xe] 4f14 5d1 6s2",
            notes: "Chemically tracks stable lutetium, easing chelation for targeted therapy.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 72,
    symbol: "Hf",
    name: "Hafnium",
    group: 4,
    period: 6,
    category: "transition metal",
    atomicMass: 178.486,
    summary:
      "Hafnium resists corrosion, stabilizes superalloys, and moderates neutrons in nuclear reactors.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 72, symbol: "Hf" },
        {
          name: "Hafnium-180",
          neutrons: 108,
          abundance: "35.1%",
          description:
            "Stable isotope bolstering high-temperature alloys in jet engines and rocket nozzles.",
          bohrModel: {
            shells: [2, 8, 18, 32, 10, 2],
            electronConfiguration: "[Xe] 4f14 5d2 6s2",
            notes: "Strong 5d bonding raises melting point and corrosion resistance.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 72, symbol: "Hf" },
        {
          name: "Hafnium-178",
          neutrons: 106,
          abundance: "27.3%",
          description:
            "Stable isotope probed for isomeric energy storage and release applications.",
          bohrModel: {
            shells: [2, 8, 18, 32, 10, 2],
            electronConfiguration: "[Xe] 4f14 5d2 6s2",
            notes: "Isomeric 178m2Hf stores high-energy gamma emissions for research.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 72, symbol: "Hf" },
        {
          name: "Hafnium-182",
          neutrons: 110,
          abundance: "27.0%",
          description:
            "Stable isotope pairing with tungsten-182 in chronometers for early solar system differentiation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 10, 2],
            electronConfiguration: "[Xe] 4f14 5d2 6s2",
            notes: "Supports isotope geochemistry unlocking planetary core formation timings.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 73,
    symbol: "Ta",
    name: "Tantalum",
    group: 5,
    period: 6,
    category: "transition metal",
    atomicMass: 180.94788,
    summary:
      "Tantalum resists corrosion, enabling biomedical implants, capacitors, and high-temperature alloys.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 73, symbol: "Ta" },
        {
          name: "Tantalum-181",
          neutrons: 108,
          abundance: "99.988%",
          description:
            "Stable isotope dominating natural tantalum, sustaining corrosion-proof electronics.",
          bohrModel: {
            shells: [2, 8, 18, 32, 11, 2],
            electronConfiguration: "[Xe] 4f14 5d3 6s2",
            notes: "D-block electrons confer exceptional resistance to chemical attack.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 73, symbol: "Ta" },
        {
          name: "Tantalum-180m",
          neutrons: 107,
          halfLife: ">1015 years",
          abundance: "0.012%",
          description:
            "Metastable isotope with extraordinary longevity, intriguing for fundamental physics.",
          bohrModel: {
            shells: [2, 8, 18, 32, 11, 2],
            electronConfiguration: "[Xe] 4f14 5d3 6s2",
            notes: "Isomeric state stores energy in an exotic high-spin configuration.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 73, symbol: "Ta" },
        {
          name: "Tantalum-182",
          neutrons: 109,
          halfLife: "114.4 days",
          abundance: "Synthetic",
          description:
            "Radiotracer used for studying tantalum diffusion in alloys and superalloy development.",
          bohrModel: {
            shells: [2, 8, 18, 32, 11, 2],
            electronConfiguration: "[Xe] 4f14 5d3 6s2",
            notes: "Decays to tungsten while mapping high-temperature transport.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 74,
    symbol: "W",
    name: "Tungsten",
    group: 6,
    period: 6,
    category: "transition metal",
    atomicMass: 183.84,
    summary:
      "Tungsten boasts the highest melting point of any metal, lighting filaments, drill bits, and armor-piercing projectiles.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 74, symbol: "W" },
        {
          name: "Tungsten-184",
          neutrons: 110,
          abundance: "30.6%",
          description:
            "Stable isotope contributing to tungsten carbide tooling and incandescent filaments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 12, 2],
            electronConfiguration: "[Xe] 4f14 5d4 6s2",
            notes: "Dense 5d electrons yield extreme hardness and melting point.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 74, symbol: "W" },
        {
          name: "Tungsten-186",
          neutrons: 112,
          abundance: "28.4%",
          description:
            "Stable isotope valuable for Hf-W chronometry and planetary core formation studies.",
          bohrModel: {
            shells: [2, 8, 18, 32, 12, 2],
            electronConfiguration: "[Xe] 4f14 5d4 6s2",
            notes: "Supports heavy, stiff alloys for aerospace and defense.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 74, symbol: "W" },
        {
          name: "Tungsten-182",
          neutrons: 108,
          abundance: "26.5%",
          description:
            "Stable isotope paired with hafnium-182 to unravel early solar system differentiation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 12, 2],
            electronConfiguration: "[Xe] 4f14 5d4 6s2",
            notes: "Refractory nature secures tungsten's role in extreme environments.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 75,
    symbol: "Re",
    name: "Rhenium",
    group: 7,
    period: 6,
    category: "transition metal",
    atomicMass: 186.207,
    summary:
      "Rhenium withstands searing heat, alloying superalloys for jet engines and catalyzing high-octane fuels.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 75, symbol: "Re" },
        {
          name: "Rhenium-185",
          neutrons: 110,
          abundance: "37.4%",
          description:
            "Stable isotope that strengthens nickel-based superalloys operating above 1,000 degC.",
          bohrModel: {
            shells: [2, 8, 18, 32, 13, 2],
            electronConfiguration: "[Xe] 4f14 5d5 6s2",
            notes: "d-electron richness supplies creep resistance in turbine blades.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 75, symbol: "Re" },
        {
          name: "Rhenium-187",
          neutrons: 112,
          abundance: "62.6%",
          description:
            "Stable isotope whose beta decay (half-life 41 billion years) underpins Re-Os geochronology.",
          bohrModel: {
            shells: [2, 8, 18, 32, 13, 2],
            electronConfiguration: "[Xe] 4f14 5d5 6s2",
            notes: "Slow decay anchors dating of ore deposits and planetary differentiation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 75, symbol: "Re" },
        {
          name: "Rhenium-188",
          neutrons: 113,
          halfLife: "17.0 hours",
          abundance: "Synthetic",
          description:
            "Therapeutic isotope used in rhenium-labeled radiopharmaceuticals for cancer treatment.",
          bohrModel: {
            shells: [2, 8, 18, 32, 13, 2],
            electronConfiguration: "[Xe] 4f14 5d5 6s2",
            notes: "Beta emissions deliver localized doses while gamma rays enable imaging.",
          },
        }
      ),
    ],
  },
  {
          atomicNumber: 76,
          symbol: "Os",
          name: "Osmium",
          group: 8,
          period: 6,
          category: "transition metal",
          atomicMass: 190.23,
          summary:
            "Osmium is the densest naturally occurring element, hardening pen tips, electrical contacts, and catalysts.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 76, symbol: "Os" },
              {
                name: "Osmium-192",
                neutrons: 116,
                abundance: "40.8%",
                description:
                  "Stable isotope shaping dense alloys for wear-resistant components.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 14, 2],
                  electronConfiguration: "[Xe] 4f14 5d6 6s2",
                  notes: "Dense electron cloud grants extreme hardness and catalytic prowess.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 76, symbol: "Os" },
              {
                name: "Osmium-190",
                neutrons: 114,
                abundance: "26.4%",
                description:
                  "Stable isotope used in Os-Ir geochronology and mantle plume studies.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 14, 2],
                  electronConfiguration: "[Xe] 4f14 5d6 6s2",
                  notes: "Isotopic ratios reveal crust-mantle interactions over geologic time.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 76, symbol: "Os" },
              {
                name: "Osmium-187",
                neutrons: 111,
                abundance: "1.6%",
                description:
                  "Stable isotope produced by rhenium decay, crucial to Re-Os dating of ore bodies.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 14, 2],
                  electronConfiguration: "[Xe] 4f14 5d6 6s2",
                  notes: "Serves as endpoint in the Re-Os chronometer system.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 77,
          symbol: "Ir",
          name: "Iridium",
          group: 9,
          period: 6,
          category: "transition metal",
          atomicMass: 192.217,
          summary:
            "Iridium resists corrosion, records impacts in geological layers, and catalyzes fine chemical syntheses.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 77, symbol: "Ir" },
              {
                name: "Iridium-191",
                neutrons: 114,
                abundance: "37.3%",
                description:
                  "Stable isotope used in industrial catalysts and radiography sources when activated.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 15, 2],
                  electronConfiguration: "[Xe] 4f14 5d7 6s2",
                  notes: "Robust 5d electrons resist oxidation even at high temperatures.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 77, symbol: "Ir" },
              {
                name: "Iridium-193",
                neutrons: 116,
                abundance: "62.7%",
                description:
                  "Stable isotope essential to the platinum group's catalytic and electronic properties.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 15, 2],
                  electronConfiguration: "[Xe] 4f14 5d7 6s2",
                  notes: "High density and corrosion resistance support aerospace components.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 77, symbol: "Ir" },
              {
                name: "Iridium-192",
                neutrons: 115,
                halfLife: "73.8 days",
                abundance: "Synthetic",
                description:
                  "Gamma-emitting isotope widely used in industrial radiography and brachytherapy.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 15, 2],
                  electronConfiguration: "[Xe] 4f14 5d7 6s2",
                  notes: "Provides intense gamma rays for weld inspection and cancer treatment.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 78,
          symbol: "Pt",
          name: "Platinum",
          group: 10,
          period: 6,
          category: "transition metal",
          atomicMass: 195.084,
          summary:
            "Platinum resists tarnish, anchors catalytic converters, and shapes jewelry prized for its luster.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 78, symbol: "Pt" },
              {
                name: "Platinum-195",
                neutrons: 117,
                abundance: "33.8%",
                description:
                  "Stable isotope supporting platinum's role in catalysts and electrical contacts.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 17, 1],
                  electronConfiguration: "[Xe] 4f14 5d9 6s1",
                  notes: "Nearly filled 5d shell yields noble-metal behavior with strong catalytic sites.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 78, symbol: "Pt" },
              {
                name: "Platinum-194",
                neutrons: 116,
                abundance: "32.9%",
                description:
                  "Stable isotope whose abundance influences isotopic fingerprints of ore deposits.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 17, 1],
                  electronConfiguration: "[Xe] 4f14 5d9 6s1",
                  notes: "Supports the high corrosion resistance of platinum group metals.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 78, symbol: "Pt" },
              {
                name: "Platinum-196",
                neutrons: 118,
                abundance: "25.3%",
                description:
                  "Stable isotope used to study platinum catalysts and isotopic fractionation in geochemistry.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 17, 1],
                  electronConfiguration: "[Xe] 4f14 5d9 6s1",
                  notes: "Contributes to platinum's capacity to adsorb hydrogen and oxygen.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 79,
          symbol: "Au",
          name: "Gold",
          group: 11,
          period: 6,
          category: "transition metal",
          atomicMass: 196.966569,
          summary:
            "Gold is prized for its malleable, non-tarnishing radiance, wiring electronics and backing global finance.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 79, symbol: "Au" },
              {
                name: "Gold-197",
                neutrons: 118,
                abundance: "100%",
                description:
                  "Only stable gold isotope, forming coins, dental alloys, and fine electrical contacts.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 1],
                  electronConfiguration: "[Xe] 4f14 5d10 6s1",
                  notes: "Relativistic effects contract the 6s orbital, producing gold's characteristic color.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 79, symbol: "Au" },
              {
                name: "Gold-198",
                neutrons: 119,
                halfLife: "2.7 days",
                abundance: "Synthetic",
                description:
                  "Beta-emitting isotope applied in brachytherapy and tracer studies in metallurgy.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 1],
                  electronConfiguration: "[Xe] 4f14 5d10 6s1",
                  notes: "Decay to mercury emits gamma rays used in imaging.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 79, symbol: "Au" },
              {
                name: "Gold-199",
                neutrons: 120,
                halfLife: "3.14 days",
                abundance: "Synthetic",
                description:
                  "Radioisotope for targeted therapy research and tracing gold deposition in fluids.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 1],
                  electronConfiguration: "[Xe] 4f14 5d10 6s1",
                  notes: "Allows observation of gold complexes during ore formation.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 80,
          symbol: "Hg",
          name: "Mercury",
          group: 12,
          period: 6,
          category: "post-transition metal",
          atomicMass: 200.592,
          summary:
            "Mercury is a liquid metal at room temperature, used in scientific instruments, lighting, and amalgams with caution.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 80, symbol: "Hg" },
              {
                name: "Mercury-202",
                neutrons: 122,
                abundance: "29.9%",
                description:
                  "Stable isotope contributing to mercury's dense, liquid properties.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 2],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2",
                  notes: "Filled 6s shell keeps mercury metallic yet weakly bonded, allowing liquidity.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 80, symbol: "Hg" },
              {
                name: "Mercury-200",
                neutrons: 120,
                abundance: "23.1%",
                description:
                  "Stable isotope that aids tracing mercury pollution and biogeochemical cycling.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 2],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2",
                  notes: "Isotope shifts reveal environmental fractionation mechanisms.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 80, symbol: "Hg" },
              {
                name: "Mercury-199",
                neutrons: 119,
                abundance: "16.9%",
                description:
                  "Stable isotope with nuclear spin used in atomic clocks and precision magnetometry.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 2],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2",
                  notes: "Supports spin-precession experiments probing fundamental symmetries.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 81,
          symbol: "Tl",
          name: "Thallium",
          group: 13,
          period: 6,
          category: "post-transition metal",
          atomicMass: 204.38,
          summary:
            "Thallium behaves like a heavy aluminum analog, used in electronics, optics, and scintillation detectors despite toxicity.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 81, symbol: "Tl" },
              {
                name: "Thallium-203",
                neutrons: 122,
                abundance: "29.5%",
                description:
                  "Stable isotope participating in low-melting alloys and specialty electronics.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 3],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p1",
                  notes: "Three valence electrons enable varied oxidation states in inorganic chemistry.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 81, symbol: "Tl" },
              {
                name: "Thallium-205",
                neutrons: 124,
                abundance: "70.5%",
                description:
                  "Stable isotope used in nuclear medicine for myocardial perfusion imaging when activated.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 3],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p1",
                  notes: "Provides isotopic signatures for tracing ore deposits.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 81, symbol: "Tl" },
              {
                name: "Thallium-201",
                neutrons: 120,
                halfLife: "3.04 days",
                abundance: "Synthetic",
                description:
                  "Gamma-emitting isotope employed in cardiac stress tests and tumor imaging.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 3],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p1",
                  notes: "Biologically mimics potassium, enabling targeted uptake in heart muscle.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 82,
          symbol: "Pb",
          name: "Lead",
          group: 14,
          period: 6,
          category: "post-transition metal",
          atomicMass: 207.2,
          summary:
            "Lead is dense, malleable, and protective against radiation, with a long history in plumbing, batteries, and shielding.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 82, symbol: "Pb" },
              {
                name: "Lead-206",
                neutrons: 124,
                abundance: "24.1%",
                description:
                  "Stable isotope produced in the uranium-238 decay chain, vital for geochronology.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 4],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p2",
                  notes: "Four valence electrons support +2 oxidation state in soft metal chemistry.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 82, symbol: "Pb" },
              {
                name: "Lead-207",
                neutrons: 125,
                abundance: "22.1%",
                description:
                  "Stable isotope formed from uranium-235 decay, used in U-Pb dating of zircons.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 4],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p2",
                  notes: "Supports weighted shielding in radiation protection gear.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 82, symbol: "Pb" },
              {
                name: "Lead-208",
                neutrons: 126,
                abundance: "52.4%",
                description:
                  "Doubly magic stable isotope that caps the thorium-232 decay chain, exceptionally stable.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 4],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p2",
                  notes: "Extra stability makes lead-208 a benchmark in nuclear structure studies.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 83,
          symbol: "Bi",
          name: "Bismuth",
          group: 15,
          period: 6,
          category: "post-transition metal",
          atomicMass: 208.9804,
          summary:
            "Bismuth is brittle yet uniquely dense, forming colorful crystals, pharmaceuticals, and low-melting alloys.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 83, symbol: "Bi" },
              {
                name: "Bismuth-209",
                neutrons: 126,
                halfLife: "1.9x1019 years",
                abundance: "100%",
                description:
                  "Effectively stable isotope underpinning bismuth subsalicylate and fusible alloys.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 5],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p3",
                  notes: "Slow alpha decay is so rare that bismuth behaves as a stable element.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 83, symbol: "Bi" },
              {
                name: "Bismuth-210",
                neutrons: 127,
                halfLife: "5.01 days",
                abundance: "Synthetic",
                description:
                  "Alpha and beta emitter in the uranium decay series, used in radiochemistry research.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 5],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p3",
                  notes: "Decay progression helps map natural radioactivity.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 83, symbol: "Bi" },
              {
                name: "Bismuth-212",
                neutrons: 129,
                halfLife: "60.6 minutes",
                abundance: "Synthetic",
                description:
                  "Isotope emitting energetic alpha particles for targeted alpha therapy research.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 5],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p3",
                  notes: "Short half-life delivers intense radiation doses in experimental treatments.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 84,
          symbol: "Po",
          name: "Polonium",
          group: 16,
          period: 6,
          category: "post-transition metal",
          atomicMass: 209,
          summary:
            "Polonium is a rare, highly radioactive chalcogen that heats radioisotope thermoelectric generators and static eliminators.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 84, symbol: "Po" },
              {
                name: "Polonium-210",
                neutrons: 126,
                halfLife: "138.4 days",
                abundance: "Synthetic",
                description:
                  "Alpha emitter producing intense heat for compact nuclear batteries and static brushes.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 6],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p4",
                  notes: "Emits high-energy alpha particles requiring strict handling protocols.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 84, symbol: "Po" },
              {
                name: "Polonium-208",
                neutrons: 124,
                halfLife: "2.9 years",
                abundance: "Synthetic",
                description:
                  "Alpha emitter appearing in uranium decay chains, used in neutron sources when combined with beryllium.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 6],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p4",
                  notes: "Alpha emission liberates neutrons upon striking light elements.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 84, symbol: "Po" },
              {
                name: "Polonium-209",
                neutrons: 125,
                halfLife: "103 years",
                abundance: "Synthetic",
                description:
                  "Longest-lived polonium isotope, offering extended heat output for specialized devices.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 6],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p4",
                  notes: "Radiogenic heating capabilities exceed those of plutonium-238 on a per gram basis.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 85,
          symbol: "At",
          name: "Astatine",
          group: 17,
          period: 6,
          category: "halogen",
          atomicMass: 210,
          summary:
            "Astatine is an elusive, radioactive halogen predicted to behave like a metallic iodine in chemistry and targeted radiotherapy.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 85, symbol: "At" },
              {
                name: "Astatine-211",
                neutrons: 126,
                halfLife: "7.2 hours",
                abundance: "Synthetic",
                description:
                  "Alpha emitter explored for targeted alpha therapy due to its suitable decay energy.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 7],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p5",
                  notes: "Chemistry parallels iodine, enabling biological targeting before rapid decay.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 85, symbol: "At" },
              {
                name: "Astatine-210",
                neutrons: 125,
                halfLife: "8.1 hours",
                abundance: "Synthetic",
                description:
                  "Beta emitter produced in bismuth targets bombarded with alpha particles.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 7],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p5",
                  notes: "Quickly decays to polonium, releasing both beta and alpha radiation.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 85, symbol: "At" },
              {
                name: "Astatine-213",
                neutrons: 128,
                halfLife: "125 nanoseconds",
                abundance: "Synthetic",
                description:
                  "Extremely short-lived isotope observed in nuclear reaction studies.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 7],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p5",
                  notes: "Decay is essentially instantaneous, offering data on heavy halogen nuclear structure.",
                },
              }
            ),
          ],
        },
        {
          atomicNumber: 86,
          symbol: "Rn",
          name: "Radon",
          group: 18,
          period: 6,
          category: "noble gas",
          atomicMass: 222,
          summary:
            "Radon is a radioactive noble gas seeping from soils, monitored for health risks and used in geophysical studies.",
          isotopes: [
            buildIsotope(
              { atomicNumber: 86, symbol: "Rn" },
              {
                name: "Radon-222",
                neutrons: 136,
                halfLife: "3.82 days",
                abundance: "Trace",
                description:
                  "Primary radon isotope produced in uranium decay, posing indoor air hazards.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 8],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p6",
                  notes: "Noble gas electron shell remains closed even as the nucleus decays via alpha emission.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 86, symbol: "Rn" },
              {
                name: "Radon-220",
                neutrons: 134,
                halfLife: "55.6 seconds",
                abundance: "Trace",
                description:
                  "Thorium decay product known as thoron, used to trace ventilation and soil gas transport.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 8],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p6",
                  notes: "Rapid decay emits alpha particles for environmental tracer studies.",
                },
              }
            ),
            buildIsotope(
              { atomicNumber: 86, symbol: "Rn" },
              {
                name: "Radon-219",
                neutrons: 133,
                halfLife: "3.96 seconds",
                abundance: "Trace",
                description:
                  "Actinium decay product leveraged in earthquake and volcanic gas monitoring.",
                bohrModel: {
                  shells: [2, 8, 18, 32, 18, 8],
                  electronConfiguration: "[Xe] 4f14 5d10 6s2 6p6",
                  notes: "Short half-life offers a rapid tracer for subsurface gas release events.",
                },
              }
            ),
          ],
          },
  {
    atomicNumber: 87,
    symbol: "Fr",
    name: "Francium",
    group: 1,
    period: 7,
    category: "alkali metal",
    atomicMass: 223,
    summary:
      "Francium is the rarest alkali metal, flashing with violent reactivity and existing only as fleeting radioactive grains.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 87, symbol: "Fr" },
        {
          name: "Francium-223",
          neutrons: 136,
          halfLife: "21.8 minutes",
          abundance: "Trace",
          description:
            "Most stable francium isotope, formed in actinium decay chains and used to probe atomic parity violation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 1],
            electronConfiguration: "[Rn] 7s1",
            notes: "Loose 7s electron ensures alkali-style chemistry in optical trapping experiments.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 87, symbol: "Fr" },
        {
          name: "Francium-221",
          neutrons: 134,
          halfLife: "4.9 minutes",
          abundance: "Trace",
          description:
            "Short-lived daughter of actinium-225 that helps benchmark heavy atom ion traps.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 1],
            electronConfiguration: "[Rn] 7s1",
            notes: "Ionization energies expose strong relativistic effects in the 7s orbital.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 87, symbol: "Fr" },
        {
          name: "Francium-225",
          neutrons: 138,
          halfLife: "3.9 minutes",
          abundance: "Synthetic",
          description:
            "Produced in accelerator targets for atomic structure experiments on extreme s-block metals.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 1],
            electronConfiguration: "[Rn] 7s1",
            notes: "Electropositive nucleus cascades through alpha decay within minutes.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 88,
    symbol: "Ra",
    name: "Radium",
    group: 2,
    period: 7,
    category: "alkaline earth metal",
    atomicMass: 226,
    summary:
      "Radium glows with intense radioactivity, once painted into luminous dials and now harnessed in cancer therapies.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 88, symbol: "Ra" },
        {
          name: "Radium-226",
          neutrons: 138,
          halfLife: "1600 years",
          abundance: "Trace",
          description:
            "Longest-lived radium nuclide powering legacy radiography sources and scientific standards.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 2],
            electronConfiguration: "[Rn] 7s2",
            notes: "Paired 7s electrons yield alkaline earth chemistry despite extreme radioactivity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 88, symbol: "Ra" },
        {
          name: "Radium-224",
          neutrons: 136,
          halfLife: "3.6 days",
          abundance: "Trace",
          description:
            "Member of the thorium series used for short-range alpha therapy.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 2],
            electronConfiguration: "[Rn] 7s2",
            notes: "Rapid alpha decay showers daughters that continue the thorium chain.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 88, symbol: "Ra" },
        {
          name: "Radium-223",
          neutrons: 135,
          halfLife: "11.4 days",
          abundance: "Synthetic",
          description:
            "Targeted alpha therapy agent for metastatic bone cancer treatments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 8, 2],
            electronConfiguration: "[Rn] 7s2",
            notes: "Bone-seeking chemistry concentrates radiation directly in tumors.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 89,
    symbol: "Ac",
    name: "Actinium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 227,
    summary:
      "Actinium launches the actinide series, glowing blue as it drives neutron sources and medical treatments.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 89, symbol: "Ac" },
        {
          name: "Actinium-227",
          neutrons: 138,
          halfLife: "21.8 years",
          abundance: "Trace",
          description:
            "Naturally occurring actinium isotope powering neutron emitters and decay chain studies.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 9, 2],
            electronConfiguration: "[Rn] 6d1 7s2",
            notes: "f and d electrons sit close in energy, foreshadowing actinide complexity.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 89, symbol: "Ac" },
        {
          name: "Actinium-225",
          neutrons: 136,
          halfLife: "10.0 days",
          abundance: "Synthetic",
          description:
            "Key isotope for targeted alpha therapy, feeding the 213Bi generator system.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 9, 2],
            electronConfiguration: "[Rn] 6d1 7s2",
            notes: "Alpha decay chain provides concentrated medical radiation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 89, symbol: "Ac" },
        {
          name: "Actinium-228",
          neutrons: 139,
          halfLife: "6.1 hours",
          abundance: "Synthetic",
          description:
            "Beta emitter produced in reactors for tracing thorium-series equilibria.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 9, 2],
            electronConfiguration: "[Rn] 6d1 7s2",
            notes: "Short half-life makes it useful for rapid tracer experiments.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 90,
    symbol: "Th",
    name: "Thorium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 232.0377,
    summary:
      "Thorium is a fertile nuclear fuel powering molten salt reactor designs and lighting historic mantles.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 90, symbol: "Th" },
        {
          name: "Thorium-232",
          neutrons: 142,
          halfLife: "14.05 billion years",
          abundance: "99.98%",
          description:
            "Primordial thorium isotope that breeds fissile uranium-233 in reactor fuel cycles.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 10, 2],
            electronConfiguration: "[Rn] 6d2 7s2",
            notes: "Extended 6d orbitals support tetravalent chemistry and fertile behavior.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 90, symbol: "Th" },
        {
          name: "Thorium-230",
          neutrons: 140,
          halfLife: "75,400 years",
          abundance: "Trace",
          description:
            "Uranium-series intermediate used to date corals and young geological formations.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 10, 2],
            electronConfiguration: "[Rn] 6d2 7s2",
            notes: "Supports uranium-thorium dating across Quaternary timescales.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 90, symbol: "Th" },
        {
          name: "Thorium-229",
          neutrons: 139,
          halfLife: "7,340 years",
          abundance: "Trace",
          description:
            "Isotope studied for low-energy nuclear isomer lasers and precision clocks.",
          bohrModel: {
            shells: [2, 8, 18, 32, 18, 10, 2],
            electronConfiguration: "[Rn] 6d2 7s2",
            notes: "Unique nuclear isomer may enable next-generation time standards.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 91,
    symbol: "Pa",
    name: "Protactinium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 231.0359,
    summary:
      "Protactinium is a rare actinide prized for geochemical dating and studies of 5f electron behavior.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 91, symbol: "Pa" },
        {
          name: "Protactinium-231",
          neutrons: 140,
          halfLife: "32,760 years",
          abundance: "Trace",
          description:
            "Longest-lived protactinium nuclide used in ocean circulation and sediment age models.",
          bohrModel: {
            shells: [2, 8, 18, 32, 20, 9, 2],
            electronConfiguration: "[Rn] 5f2 6d1 7s2",
            notes: "5f electrons begin to dominate the chemistry of the actinide series.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 91, symbol: "Pa" },
        {
          name: "Protactinium-233",
          neutrons: 142,
          halfLife: "27.0 days",
          abundance: "Synthetic",
          description:
            "Intermediary in the thorium fuel cycle en route to uranium-233 production.",
          bohrModel: {
            shells: [2, 8, 18, 32, 20, 9, 2],
            electronConfiguration: "[Rn] 5f2 6d1 7s2",
            notes: "Decays by beta emission, completing breeder fuel conversions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 91, symbol: "Pa" },
        {
          name: "Protactinium-230",
          neutrons: 139,
          halfLife: "17.4 days",
          abundance: "Synthetic",
          description:
            "Laboratory isotope for probing early actinide oxidation states.",
          bohrModel: {
            shells: [2, 8, 18, 32, 20, 9, 2],
            electronConfiguration: "[Rn] 5f2 6d1 7s2",
            notes: "Reacts strongly with oxygen, highlighting actinide redox versatility.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 92,
    symbol: "U",
    name: "Uranium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 238.02891,
    summary:
      "Uranium fuels reactors and weapons, while also tracing groundwater flow and dating early solar system solids.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 92, symbol: "U" },
        {
          name: "Uranium-238",
          neutrons: 146,
          halfLife: "4.47 billion years",
          abundance: "99.27%",
          description:
            "Dominant uranium isotope whose slow decay powers Earth's geothermal heat and dating methods.",
          bohrModel: {
            shells: [2, 8, 18, 32, 21, 9, 2],
            electronConfiguration: "[Rn] 5f3 6d1 7s2",
            notes: "High-mass nucleus sustains alpha decay chains spanning millions of years.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 92, symbol: "U" },
        {
          name: "Uranium-235",
          neutrons: 143,
          halfLife: "703.8 million years",
          abundance: "0.72%",
          description:
            "Fissile isotope enabling thermal reactors and early nuclear technology.",
          bohrModel: {
            shells: [2, 8, 18, 32, 21, 9, 2],
            electronConfiguration: "[Rn] 5f3 6d1 7s2",
            notes: "Readily sustains chain reactions with thermal neutrons.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 92, symbol: "U" },
        {
          name: "Uranium-234",
          neutrons: 142,
          halfLife: "245,500 years",
          abundance: "0.0054%",
          description:
            "Decay product of uranium-238 used in uranium-series dating.",
          bohrModel: {
            shells: [2, 8, 18, 32, 21, 9, 2],
            electronConfiguration: "[Rn] 5f3 6d1 7s2",
            notes: "Maintains secular equilibrium in natural uranium deposits.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 93,
    symbol: "Np",
    name: "Neptunium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 237,
    summary:
      "Neptunium bridges uranium and plutonium chemistry, appearing in spent fuel and advanced reactor cycles.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 93, symbol: "Np" },
        {
          name: "Neptunium-237",
          neutrons: 144,
          halfLife: "2.14 million years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope guiding waste storage strategies and neutron detection technologies.",
          bohrModel: {
            shells: [2, 8, 18, 32, 22, 9, 2],
            electronConfiguration: "[Rn] 5f4 6d1 7s2",
            notes: "Exhibits multiple oxidation states instrumental in separations chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 93, symbol: "Np" },
        {
          name: "Neptunium-239",
          neutrons: 146,
          halfLife: "2.36 days",
          abundance: "Synthetic",
          description:
            "Intermediate in plutonium production, formed by neutron capture on uranium-238.",
          bohrModel: {
            shells: [2, 8, 18, 32, 22, 9, 2],
            electronConfiguration: "[Rn] 5f4 6d1 7s2",
            notes: "Beta decay swiftly converts it to fissile plutonium-239.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 93, symbol: "Np" },
        {
          name: "Neptunium-236",
          neutrons: 143,
          halfLife: "154,000 years",
          abundance: "Synthetic",
          description:
            "Isotope used to benchmark neutron capture cross sections in advanced reactors.",
          bohrModel: {
            shells: [2, 8, 18, 32, 22, 9, 2],
            electronConfiguration: "[Rn] 5f4 6d1 7s2",
            notes: "Long half-life informs transmutation design studies.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 94,
    symbol: "Pu",
    name: "Plutonium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 244,
    summary:
      "Plutonium powers deep-space missions, nuclear weapons, and fuels complex metallurgical research.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 94, symbol: "Pu" },
        {
          name: "Plutonium-239",
          neutrons: 145,
          halfLife: "24,110 years",
          abundance: "Synthetic",
          description:
            "Key fissile isotope fabricated in reactors and essential to nuclear energy history.",
          bohrModel: {
            shells: [2, 8, 18, 32, 24, 8, 2],
            electronConfiguration: "[Rn] 5f6 7s2",
            notes: "Alloys into multiple allotropic phases, challenging materials scientists.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 94, symbol: "Pu" },
        {
          name: "Plutonium-240",
          neutrons: 146,
          halfLife: "6,561 years",
          abundance: "Synthetic",
          description:
            "Even-mass isotope whose spontaneous fission influences reactor-grade plutonium quality.",
          bohrModel: {
            shells: [2, 8, 18, 32, 24, 8, 2],
            electronConfiguration: "[Rn] 5f6 7s2",
            notes: "High spontaneous fission rate complicates weapons design.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 94, symbol: "Pu" },
        {
          name: "Plutonium-238",
          neutrons: 144,
          halfLife: "87.7 years",
          abundance: "Synthetic",
          description:
            "Heat source fueling radioisotope thermoelectric generators for spacecraft.",
          bohrModel: {
            shells: [2, 8, 18, 32, 24, 8, 2],
            electronConfiguration: "[Rn] 5f6 7s2",
            notes: "Steady alpha decay delivers reliable thermal output for decades.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 95,
    symbol: "Am",
    name: "Americium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 243,
    summary:
      "Americium sits in smoke detectors, research reactors, and neutron radiography sources.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 95, symbol: "Am" },
        {
          name: "Americium-241",
          neutrons: 146,
          halfLife: "432.6 years",
          abundance: "Synthetic",
          description:
            "Household smoke detector isotope emitting alpha particles for ionization sensors.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 8, 2],
            electronConfiguration: "[Rn] 5f7 7s2",
            notes: "Half-filled 5f shell stabilizes trivalent chemistry in solids.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 95, symbol: "Am" },
        {
          name: "Americium-243",
          neutrons: 148,
          halfLife: "7,370 years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope supporting actinide chemistry research and neutron sources.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 8, 2],
            electronConfiguration: "[Rn] 5f7 7s2",
            notes: "Provides sustained alpha emission for sealed source technology.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 95, symbol: "Am" },
        {
          name: "Americium-242m",
          neutrons: 147,
          halfLife: "141 years",
          abundance: "Synthetic",
          description:
            "Metastable isomer with exceptionally high fission cross section for advanced reactor concepts.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 8, 2],
            electronConfiguration: "[Rn] 5f7 7s2",
            notes: "Isomeric state allows fast-spectrum reactors to reach criticality with minimal fuel mass.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 96,
    symbol: "Cm",
    name: "Curium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 247,
    summary:
      "Curium glows from intense alpha decay, powering space batteries and neutron sources.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 96, symbol: "Cm" },
        {
          name: "Curium-244",
          neutrons: 148,
          halfLife: "18.1 years",
          abundance: "Synthetic",
          description:
            "Common curium isotope feeding radioisotope thermoelectric generators and neutron sources.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 9, 2],
            electronConfiguration: "[Rn] 5f7 6d1 7s2",
            notes: "Maintains strong magnetic moments useful in solid-state studies.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 96, symbol: "Cm" },
        {
          name: "Curium-247",
          neutrons: 151,
          halfLife: "15.6 million years",
          abundance: "Synthetic",
          description:
            "Long-lived curium isotope informing actinide geochemistry and cosmic ray exposure dating.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 9, 2],
            electronConfiguration: "[Rn] 5f7 6d1 7s2",
            notes: "Near-stable lifetime enables precise measurement of decay schemes.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 96, symbol: "Cm" },
        {
          name: "Curium-242",
          neutrons: 146,
          halfLife: "162.8 days",
          abundance: "Synthetic",
          description:
            "Intense alpha emitter used in compact power sources and neutron radiography.",
          bohrModel: {
            shells: [2, 8, 18, 32, 25, 9, 2],
            electronConfiguration: "[Rn] 5f7 6d1 7s2",
            notes: "High specific activity demands remote handling systems.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 97,
    symbol: "Bk",
    name: "Berkelium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 247,
    summary:
      "Berkelium seeds the discovery of heavier elements and aids transuranic separation science.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 97, symbol: "Bk" },
        {
          name: "Berkelium-249",
          neutrons: 152,
          halfLife: "330 days",
          abundance: "Synthetic",
          description:
            "Workhorse isotope for producing superheavy element targets like californium and lawrencium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 27, 8, 2],
            electronConfiguration: "[Rn] 5f9 7s2",
            notes: "Readily forms Bk3+ in aqueous solution, easing chemical separations.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 97, symbol: "Bk" },
        {
          name: "Berkelium-247",
          neutrons: 150,
          halfLife: "1,380 years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope supporting research into actinide lattice dynamics.",
          bohrModel: {
            shells: [2, 8, 18, 32, 27, 8, 2],
            electronConfiguration: "[Rn] 5f9 7s2",
            notes: "Displays complex magnetic ordering at cryogenic temperatures.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 97, symbol: "Bk" },
        {
          name: "Berkelium-250",
          neutrons: 153,
          halfLife: "3.2 hours",
          abundance: "Synthetic",
          description:
            "Short-lived isotope used to benchmark rapid chemical separation techniques.",
          bohrModel: {
            shells: [2, 8, 18, 32, 27, 8, 2],
            electronConfiguration: "[Rn] 5f9 7s2",
            notes: "Quick decay demands automated chemistry to study its properties.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 98,
    symbol: "Cf",
    name: "Californium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 251,
    summary:
      "Californium emits a torrent of neutrons, igniting reactors, radiography, and geophysical logging.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 98, symbol: "Cf" },
        {
          name: "Californium-252",
          neutrons: 154,
          halfLife: "2.65 years",
          abundance: "Synthetic",
          description:
            "Powerful spontaneous fission source producing billions of neutrons per second.",
          bohrModel: {
            shells: [2, 8, 18, 32, 28, 8, 2],
            electronConfiguration: "[Rn] 5f10 7s2",
            notes: "Portable neutron source for well logging and startup of research reactors.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 98, symbol: "Cf" },
        {
          name: "Californium-251",
          neutrons: 153,
          halfLife: "898 years",
          abundance: "Synthetic",
          description:
            "Long-lived isotope for neutron multiplicity calibration and physics experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 28, 8, 2],
            electronConfiguration: "[Rn] 5f10 7s2",
            notes: "Provides sustained neutron emission with manageable heat load.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 98, symbol: "Cf" },
        {
          name: "Californium-249",
          neutrons: 151,
          halfLife: "351 years",
          abundance: "Synthetic",
          description:
            "Isotope used in mass spectrometry standards and heavy-element synthesis.",
          bohrModel: {
            shells: [2, 8, 18, 32, 28, 8, 2],
            electronConfiguration: "[Rn] 5f10 7s2",
            notes: "Balances workable half-life with strong neutron emission.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 99,
    symbol: "Es",
    name: "Einsteinium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 252,
    summary:
      "Einsteinium glows in the dark, illuminating the chemistry of late actinides and seeding superheavy experiments.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 99, symbol: "Es" },
        {
          name: "Einsteinium-252",
          neutrons: 153,
          halfLife: "471.7 days",
          abundance: "Synthetic",
          description:
            "Tracer isotope for mapping heavy-element chemical behavior.",
          bohrModel: {
            shells: [2, 8, 18, 32, 29, 8, 2],
            electronConfiguration: "[Rn] 5f11 7s2",
            notes: "Thermal glow betrays intense alpha decay in milligram samples.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 99, symbol: "Es" },
        {
          name: "Einsteinium-253",
          neutrons: 154,
          halfLife: "20.5 days",
          abundance: "Synthetic",
          description:
            "Quickly decaying isotope used to generate berkelium-249 feedstock.",
          bohrModel: {
            shells: [2, 8, 18, 32, 29, 8, 2],
            electronConfiguration: "[Rn] 5f11 7s2",
            notes: "High specific activity necessitates remote handling and cryogenic storage.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 99, symbol: "Es" },
        {
          name: "Einsteinium-254",
          neutrons: 155,
          halfLife: "275.7 days",
          abundance: "Synthetic",
          description:
            "Isotope suited to neutron-capture studies probing the end of the actinide series.",
          bohrModel: {
            shells: [2, 8, 18, 32, 29, 8, 2],
            electronConfiguration: "[Rn] 5f11 7s2",
            notes: "Detailed spectroscopy reveals fine structure of 5f electron transitions.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 100,
    symbol: "Fm",
    name: "Fermium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 257,
    summary:
      "Fermium marks the limit of elements formed in thermonuclear tests, offering a gateway to transfermium chemistry.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 100, symbol: "Fm" },
        {
          name: "Fermium-257",
          neutrons: 157,
          halfLife: "100.5 days",
          abundance: "Synthetic",
          description:
            "Most stable fermium nuclide studied in tracer-scale chemical experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 30, 8, 2],
            electronConfiguration: "[Rn] 5f12 7s2",
            notes: "Showcases divalent states uncommon in lighter actinides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 100, symbol: "Fm" },
        {
          name: "Fermium-255",
          neutrons: 155,
          halfLife: "20.1 hours",
          abundance: "Synthetic",
          description:
            "Fast-decaying isotope used to measure neutron capture on heavy actinides.",
          bohrModel: {
            shells: [2, 8, 18, 32, 30, 8, 2],
            electronConfiguration: "[Rn] 5f12 7s2",
            notes: "Short-lived samples must be prepared in-situ for analysis.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 100, symbol: "Fm" },
        {
          name: "Fermium-258",
          neutrons: 158,
          halfLife: "370 microseconds",
          abundance: "Synthetic",
          description:
            "Even-even fermium isotope notable for near-symmetric fission.",
          bohrModel: {
            shells: [2, 8, 18, 32, 30, 8, 2],
            electronConfiguration: "[Rn] 5f12 7s2",
            notes: "Ultra-short half-life highlights the edge of nuclear stability.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 101,
    symbol: "Md",
    name: "Mendelevium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 258,
    summary:
      "Mendelevium honors the periodic table's architect and expands single-atom chemistry techniques.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 101, symbol: "Md" },
        {
          name: "Mendelevium-258",
          neutrons: 157,
          halfLife: "51.5 days",
          abundance: "Synthetic",
          description:
            "Isotope enabling aqueous chemistry experiments one atom at a time.",
          bohrModel: {
            shells: [2, 8, 18, 32, 31, 8, 2],
            electronConfiguration: "[Rn] 5f13 7s2",
            notes: "Prefers divalent state in solution, unlike most lighter actinides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 101, symbol: "Md" },
        {
          name: "Mendelevium-256",
          neutrons: 155,
          halfLife: "1.17 hours",
          abundance: "Synthetic",
          description:
            "Short-lived isotope produced via einsteinium bombardment for spectroscopy.",
          bohrModel: {
            shells: [2, 8, 18, 32, 31, 8, 2],
            electronConfiguration: "[Rn] 5f13 7s2",
            notes: "Alpha decay cascades quickly to fermium daughters.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 101, symbol: "Md" },
        {
          name: "Mendelevium-259",
          neutrons: 158,
          halfLife: "4.6 hours",
          abundance: "Synthetic",
          description:
            "Isotope used to study recoil chemistry in gas-phase experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 31, 8, 2],
            electronConfiguration: "[Rn] 5f13 7s2",
            notes: "Demonstrates volatility trends of late actinides.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 102,
    symbol: "No",
    name: "Nobelium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 259,
    summary:
      "Nobelium crowns the actinide series with divalent chemistry and fleeting half-lives.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 102, symbol: "No" },
        {
          name: "Nobelium-259",
          neutrons: 157,
          halfLife: "58 minutes",
          abundance: "Synthetic",
          description:
            "Most stable nobelium isotope, exhibiting unusual +2 oxidation state.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 2],
            electronConfiguration: "[Rn] 5f14 7s2",
            notes: "Filled 5f shell leads to alkaline-earth-like chemistry.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 102, symbol: "No" },
        {
          name: "Nobelium-255",
          neutrons: 153,
          halfLife: "3.1 minutes",
          abundance: "Synthetic",
          description:
            "Isotope for time-resolved chromatography of superheavy elements.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 2],
            electronConfiguration: "[Rn] 5f14 7s2",
            notes: "Quick decay challenges separation science instrumentation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 102, symbol: "No" },
        {
          name: "Nobelium-252",
          neutrons: 150,
          halfLife: "2.4 seconds",
          abundance: "Synthetic",
          description:
            "Highly unstable isotope mapping decay chains toward seaborgium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 2],
            electronConfiguration: "[Rn] 5f14 7s2",
            notes: "Alpha spectra help verify superheavy element discovery claims.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 103,
    symbol: "Lr",
    name: "Lawrencium",
    group: 3,
    period: 7,
    category: "actinide",
    atomicMass: 262,
    summary:
      "Lawrencium blurs the end of the actinides, sporting a 7p valence electron and noble-metal tendencies.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 103, symbol: "Lr" },
        {
          name: "Lawrencium-262",
          neutrons: 159,
          halfLife: "3.6 hours",
          abundance: "Synthetic",
          description:
            "Longest-lived lawrencium isotope for chemical investigation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 3],
            electronConfiguration: "[Rn] 5f14 7s2 7p1",
            notes: "Quasi-noble behavior hints at a new transition series beyond actinides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 103, symbol: "Lr" },
        {
          name: "Lawrencium-261",
          neutrons: 158,
          halfLife: "44 minutes",
          abundance: "Synthetic",
          description:
            "Isotope produced in berkelium bombardments for spectroscopy.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 3],
            electronConfiguration: "[Rn] 5f14 7s2 7p1",
            notes: "Alpha decay populates nobelium daughters used to tag reactions.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 103, symbol: "Lr" },
        {
          name: "Lawrencium-260",
          neutrons: 157,
          halfLife: "2.7 minutes",
          abundance: "Synthetic",
          description:
            "Short-lived isotope mapping decay chains toward dubnium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 8, 3],
            electronConfiguration: "[Rn] 5f14 7s2 7p1",
            notes: "Helps correlate discovery of element 105 via genetic decay chains.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    group: 4,
    period: 7,
    category: "transition metal",
    atomicMass: 267,
    summary:
      "Rutherfordium extends group 4 into relativistic territory, challenging periodic trends.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 104, symbol: "Rf" },
        {
          name: "Rutherfordium-267",
          neutrons: 163,
          halfLife: "1.3 hours",
          abundance: "Synthetic",
          description:
            "Relatively long-lived isotope enabling gas-phase chromatography experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 10, 2],
            electronConfiguration: "[Rn] 5f14 6d2 7s2",
            notes: "Shows group 4-like chloride volatility consistent with hafnium analogues.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 104, symbol: "Rf" },
        {
          name: "Rutherfordium-265",
          neutrons: 161,
          halfLife: "13 hours",
          abundance: "Synthetic",
          description:
            "Isotope observed in cold-fusion reactions with lead targets.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 10, 2],
            electronConfiguration: "[Rn] 5f14 6d2 7s2",
            notes: "Alpha decay chains provide fingerprints for element confirmation.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 104, symbol: "Rf" },
        {
          name: "Rutherfordium-263",
          neutrons: 159,
          halfLife: "10 minutes",
          abundance: "Synthetic",
          description:
            "Quickly decaying isotope detected in the earliest Rf discovery experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 10, 2],
            electronConfiguration: "[Rn] 5f14 6d2 7s2",
            notes: "Decay energies helped assign the element's atomic number.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 105,
    symbol: "Db",
    name: "Dubnium",
    group: 5,
    period: 7,
    category: "transition metal",
    atomicMass: 268,
    summary:
      "Dubnium anchors group 5 superheavy chemistry with fleeting ions studied atom by atom.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 105, symbol: "Db" },
        {
          name: "Dubnium-268",
          neutrons: 163,
          halfLife: "29 hours",
          abundance: "Synthetic",
          description:
            "Longest-lived dubnium isotope supporting aqueous chemistry experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 11, 2],
            electronConfiguration: "[Rn] 5f14 6d3 7s2",
            notes: "Forms DbOCl3 gas, mirroring niobium chemistry under relativistic influences.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 105, symbol: "Db" },
        {
          name: "Dubnium-270",
          neutrons: 165,
          halfLife: "1.3 days",
          abundance: "Synthetic",
          description:
            "Isotope produced in hot-fusion reactions with calcium projectiles.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 11, 2],
            electronConfiguration: "[Rn] 5f14 6d3 7s2",
            notes: "Alpha decay cascades trace connections to roentgenium daughters.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 105, symbol: "Db" },
        {
          name: "Dubnium-262",
          neutrons: 157,
          halfLife: "34 seconds",
          abundance: "Synthetic",
          description:
            "Highly unstable isotope that provided early evidence of element 105.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 11, 2],
            electronConfiguration: "[Rn] 5f14 6d3 7s2",
            notes: "Rapid alpha decay to lawrencium confirmed its placement in group 5.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 106,
    symbol: "Sg",
    name: "Seaborgium",
    group: 6,
    period: 7,
    category: "transition metal",
    atomicMass: 269,
    summary:
      "Seaborgium honors the discoverer of many actinides and extends tungsten-like chemistry into superheavy realms.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 106, symbol: "Sg" },
        {
          name: "Seaborgium-269",
          neutrons: 163,
          halfLife: "14 minutes",
          abundance: "Synthetic",
          description:
            "Isotope with sufficient lifetime for on-line chemistry comparisons to tungsten.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 12, 2],
            electronConfiguration: "[Rn] 5f14 6d4 7s2",
            notes: "Forms volatile oxychloride species akin to group 6 analogues.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 106, symbol: "Sg" },
        {
          name: "Seaborgium-271",
          neutrons: 165,
          halfLife: "2.4 minutes",
          abundance: "Synthetic",
          description:
            "Alpha emitter created in reactions with 248Cm targets and 26Mg beams.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 12, 2],
            electronConfiguration: "[Rn] 5f14 6d4 7s2",
            notes: "Decay sequence identifies hassium descendants.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 106, symbol: "Sg" },
        {
          name: "Seaborgium-263",
          neutrons: 157,
          halfLife: "1 second",
          abundance: "Synthetic",
          description:
            "Short-lived nuclide marking the discovery of element 106.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 12, 2],
            electronConfiguration: "[Rn] 5f14 6d4 7s2",
            notes: "Single-atom detection confirmed trans-lawrencium production.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 107,
    symbol: "Bh",
    name: "Bohrium",
    group: 7,
    period: 7,
    category: "transition metal",
    atomicMass: 270,
    summary:
      "Bohrium extends group 7 with fleeting atoms studied through recoil separators and alpha decay genetics.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 107, symbol: "Bh" },
        {
          name: "Bohrium-270",
          neutrons: 163,
          halfLife: "61 seconds",
          abundance: "Synthetic",
          description:
            "Relatively long-lived isotope enabling preliminary chemical characterisation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 13, 2],
            electronConfiguration: "[Rn] 5f14 6d5 7s2",
            notes: "Predicted to form volatile oxychloride similar to rhenium.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 107, symbol: "Bh" },
        {
          name: "Bohrium-271",
          neutrons: 164,
          halfLife: "35 seconds",
          abundance: "Synthetic",
          description:
            "Isotope observed in cold fusion of bismuth with chromium projectiles.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 13, 2],
            electronConfiguration: "[Rn] 5f14 6d5 7s2",
            notes: "Alpha decay to meitnerium reveals odd-even staggering effects.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 107, symbol: "Bh" },
        {
          name: "Bohrium-274",
          neutrons: 167,
          halfLife: "75 seconds",
          abundance: "Synthetic",
          description:
            "Heaviest bohrium nuclide produced via 249Bk and 26Mg reactions.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 13, 2],
            electronConfiguration: "[Rn] 5f14 6d5 7s2",
            notes: "Provides insight into shell effects near neutron number 162.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 108,
    symbol: "Hs",
    name: "Hassium",
    group: 8,
    period: 7,
    category: "transition metal",
    atomicMass: 270,
    summary:
      "Hassium exhibits osmium-like chemistry, produced atom-by-atom in fusion reactions.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 108, symbol: "Hs" },
        {
          name: "Hassium-270",
          neutrons: 162,
          halfLife: "10 seconds",
          abundance: "Synthetic",
          description:
            "Isotope used to study gas-phase oxide formation mirroring osmium tetroxide.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 14, 2],
            electronConfiguration: "[Rn] 5f14 6d6 7s2",
            notes: "Volatile HsO4 suggests strong group 8 periodicity persists.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 108, symbol: "Hs" },
        {
          name: "Hassium-271",
          neutrons: 163,
          halfLife: "2 minutes",
          abundance: "Synthetic",
          description:
            "Longest-lived hassium isotope enabling repeated chemical experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 14, 2],
            electronConfiguration: "[Rn] 5f14 6d6 7s2",
            notes: "Alpha decay links hassium to seaborgium daughters.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 108, symbol: "Hs" },
        {
          name: "Hassium-277",
          neutrons: 169,
          halfLife: "11 minutes",
          abundance: "Synthetic",
          description:
            "Heaviest hassium isotope produced in hot-fusion reactions with 248Cm.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 14, 2],
            electronConfiguration: "[Rn] 5f14 6d6 7s2",
            notes: "Helps trace decay chains reaching element 109.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 109,
    symbol: "Mt",
    name: "Meitnerium",
    group: 9,
    period: 7,
    category: "transition metal",
    atomicMass: 278,
    summary:
      "Meitnerium honors a pioneer of nuclear science, glimpsed only through split-second decay signatures.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 109, symbol: "Mt" },
        {
          name: "Meitnerium-278",
          neutrons: 169,
          halfLife: "4.5 seconds",
          abundance: "Synthetic",
          description:
            "Longest-lived meitnerium nuclide created in bismuth and iron fusion.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 15, 2],
            electronConfiguration: "[Rn] 5f14 6d7 7s2",
            notes: "Allows rudimentary chemical predictions for group 9 superheavy metals.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 109, symbol: "Mt" },
        {
          name: "Meitnerium-276",
          neutrons: 167,
          halfLife: "0.7 seconds",
          abundance: "Synthetic",
          description:
            "Isotope identified in the original discovery of element 109.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 15, 2],
            electronConfiguration: "[Rn] 5f14 6d7 7s2",
            notes: "Alpha decay to bohrium established its placement in the periodic table.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 109, symbol: "Mt" },
        {
          name: "Meitnerium-274",
          neutrons: 165,
          halfLife: "0.44 seconds",
          abundance: "Synthetic",
          description:
            "Short-lived nuclide assisting decay-chain assignment for darmstadtium production.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 15, 2],
            electronConfiguration: "[Rn] 5f14 6d7 7s2",
            notes: "Links cold fusion products to heavier elements via alpha cascades.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    group: 10,
    period: 7,
    category: "transition metal",
    atomicMass: 281,
    summary:
      "Darmstadtium continues the platinum group deep into the superheavy landscape.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 110, symbol: "Ds" },
        {
          name: "Darmstadtium-281",
          neutrons: 171,
          halfLife: "12.7 seconds",
          abundance: "Synthetic",
          description:
            "Provides sufficient time for limited chemical interaction studies.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 16, 2],
            electronConfiguration: "[Rn] 5f14 6d8 7s2",
            notes: "Predicted to behave like a noble metal with enhanced relativistic effects.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 110, symbol: "Ds" },
        {
          name: "Darmstadtium-279",
          neutrons: 169,
          halfLife: "0.18 seconds",
          abundance: "Synthetic",
          description:
            "Detected in early cold-fusion experiments using nickel targets.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 16, 2],
            electronConfiguration: "[Rn] 5f14 6d8 7s2",
            notes: "Alpha decay to hassium confirms group 10 lineage.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 110, symbol: "Ds" },
        {
          name: "Darmstadtium-281m",
          neutrons: 171,
          halfLife: "0.9 seconds",
          abundance: "Synthetic",
          description:
            "Metastable isomer revealing excited nuclear configurations in superheavy elements.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 16, 2],
            electronConfiguration: "[Rn] 5f14 6d8 7s2",
            notes: "Isomeric state hints at deformation effects in high-Z nuclei.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 111,
    symbol: "Rg",
    name: "Roentgenium",
    group: 11,
    period: 7,
    category: "transition metal",
    atomicMass: 282,
    summary:
      "Roentgenium continues the coinage metals into the relativistic frontier with ephemeral atoms.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 111, symbol: "Rg" },
        {
          name: "Roentgenium-282",
          neutrons: 171,
          halfLife: "2.1 minutes",
          abundance: "Synthetic",
          description:
            "Longest-lived roentgenium isotope, likely forming noble-metal-like complexes.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 17, 2],
            electronConfiguration: "[Rn] 5f14 6d9 7s2",
            notes: "Predicted to favor +1 oxidation states akin to gold.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 111, symbol: "Rg" },
        {
          name: "Roentgenium-280",
          neutrons: 169,
          halfLife: "7.2 seconds",
          abundance: "Synthetic",
          description:
            "Isotope produced in bismuth and nickel fusion experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 17, 2],
            electronConfiguration: "[Rn] 5f14 6d9 7s2",
            notes: "Alpha decays to meitnerium, anchoring discovery data.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 111, symbol: "Rg" },
        {
          name: "Roentgenium-279",
          neutrons: 168,
          halfLife: "0.17 seconds",
          abundance: "Synthetic",
          description:
            "Short-lived nuclide that helped confirm element 111 synthesis.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 17, 2],
            electronConfiguration: "[Rn] 5f14 6d9 7s2",
            notes: "Energetic alpha decay signals were key to identification.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 112,
    symbol: "Cn",
    name: "Copernicium",
    group: 12,
    period: 7,
    category: "transition metal",
    atomicMass: 285,
    summary:
      "Copernicium continues the zinc group with predictions of noble-gas-like volatility.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 112, symbol: "Cn" },
        {
          name: "Copernicium-285",
          neutrons: 173,
          halfLife: "29 seconds",
          abundance: "Synthetic",
          description:
            "Relatively long-lived isotope supporting first gas-phase adsorption measurements.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 2],
            electronConfiguration: "[Rn] 5f14 6d10 7s2",
            notes: "Shows weak metal-surface bonding consistent with expected volatilities.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 112, symbol: "Cn" },
        {
          name: "Copernicium-283",
          neutrons: 171,
          halfLife: "4 minutes",
          abundance: "Synthetic",
          description:
            "Isotope confirming element 112 through decay to darmstadtium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 2],
            electronConfiguration: "[Rn] 5f14 6d10 7s2",
            notes: "Potentially gaseous at room temperature due to relativistic stabilization.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 112, symbol: "Cn" },
        {
          name: "Copernicium-281",
          neutrons: 169,
          halfLife: "90 seconds",
          abundance: "Synthetic",
          description:
            "Shorter-lived isotope observed in early discovery campaigns.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 2],
            electronConfiguration: "[Rn] 5f14 6d10 7s2",
            notes: "Alpha decay to darmstadtium aids element confirmation.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 113,
    symbol: "Nh",
    name: "Nihonium",
    group: 13,
    period: 7,
    category: "post-transition metal",
    atomicMass: 286,
    summary:
      "Nihonium was the first element discovered in Asia, revealing superheavy p-block behavior.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 113, symbol: "Nh" },
        {
          name: "Nihonium-286",
          neutrons: 173,
          halfLife: "20 seconds",
          abundance: "Synthetic",
          description:
            "Longest-lived nihonium isotope, studied via alpha decay to moscovium daughters.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 3],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p1",
            notes: "Relativistic contraction of 7p orbitals shapes its chemical expectations.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 113, symbol: "Nh" },
        {
          name: "Nihonium-284",
          neutrons: 171,
          halfLife: "2 seconds",
          abundance: "Synthetic",
          description:
            "Isotope identified through 118Og decay chains.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 3],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p1",
            notes: "Alpha decay cascades track back to element 117 synthesis.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 113, symbol: "Nh" },
        {
          name: "Nihonium-285",
          neutrons: 172,
          halfLife: "5 seconds",
          abundance: "Synthetic",
          description:
            "Nuclide helping map the island of stability through odd-even effects.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 3],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p1",
            notes: "Observation supports assignment of element 113's discovery credit.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 114,
    symbol: "Fl",
    name: "Flerovium",
    group: 14,
    period: 7,
    category: "post-transition metal",
    atomicMass: 289,
    summary:
      "Flerovium hints at superheavy noble behavior, possibly bordering on gas-like volatility.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 114, symbol: "Fl" },
        {
          name: "Flerovium-289",
          neutrons: 175,
          halfLife: "2.1 seconds",
          abundance: "Synthetic",
          description:
            "Isotope with the longest observed flerovium half-life so far.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 4],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p2",
            notes: "Outer electrons may experience strong relativistic stabilization, akin to noble gases.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 114, symbol: "Fl" },
        {
          name: "Flerovium-288",
          neutrons: 174,
          halfLife: "0.7 seconds",
          abundance: "Synthetic",
          description:
            "Isotope produced in calcium-48 and plutonium fusion experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 4],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p2",
            notes: "Alpha decay to copernicium verifies reaction channels.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 114, symbol: "Fl" },
        {
          name: "Flerovium-290",
          neutrons: 176,
          halfLife: "19 seconds",
          abundance: "Synthetic",
          description:
            "Predicted longer-lived isotope guiding searches for the island of stability.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 4],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p2",
            notes: "Theorists expect semi-magic behavior near neutron number 184.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 115,
    symbol: "Mc",
    name: "Moscovium",
    group: 15,
    period: 7,
    category: "post-transition metal",
    atomicMass: 290,
    summary:
      "Moscovium opens the heaviest pnictogen column with extremely short-lived atoms.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 115, symbol: "Mc" },
        {
          name: "Moscovium-290",
          neutrons: 175,
          halfLife: "0.65 seconds",
          abundance: "Synthetic",
          description:
            "Observed in multi-nucleon transfer reactions with americium targets.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 5],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p3",
            notes: "Rapid alpha decay feeds element 113 nuclides.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 115, symbol: "Mc" },
        {
          name: "Moscovium-289",
          neutrons: 174,
          halfLife: "0.2 seconds",
          abundance: "Synthetic",
          description:
            "Isotope documented in the joint Dubna-Livermore discovery experiments.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 5],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p3",
            notes: "Alpha decay chain helped certify element 115.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 115, symbol: "Mc" },
        {
          name: "Moscovium-288",
          neutrons: 173,
          halfLife: "0.12 seconds",
          abundance: "Synthetic",
          description:
            "Shortest-lived moscovium nuclide yet observed, terminating in dubnium daughters.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 5],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p3",
            notes: "Signals the steep drop in stability beyond neutron number 174.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 116,
    symbol: "Lv",
    name: "Livermorium",
    group: 16,
    period: 7,
    category: "post-transition metal",
    atomicMass: 293,
    summary:
      "Livermorium lies near the predicted island of stability, though its atoms decay in milliseconds.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 116, symbol: "Lv" },
        {
          name: "Livermorium-293",
          neutrons: 177,
          halfLife: "60 milliseconds",
          abundance: "Synthetic",
          description:
            "Longest-lived livermorium isotope observed to date.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 6],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p4",
            notes: "Alpha decay cascades connect it to flerovium and copernicium daughters.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 116, symbol: "Lv" },
        {
          name: "Livermorium-292",
          neutrons: 176,
          halfLife: "18 milliseconds",
          abundance: "Synthetic",
          description:
            "Nuclide recorded in calcium-48 bombardments of curium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 6],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p4",
            notes: "Marks the main pathway discovered in 2000s superheavy campaigns.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 116, symbol: "Lv" },
        {
          name: "Livermorium-291",
          neutrons: 175,
          halfLife: "7 milliseconds",
          abundance: "Synthetic",
          description:
            "Shortest-lived isotope measured for element 116, ending in moscovium daughters.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 6],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p4",
            notes: "Helps map odd-even staggering near neutron shell closures.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 117,
    symbol: "Ts",
    name: "Tennessine",
    group: 17,
    period: 7,
    category: "halogen",
    atomicMass: 294,
    summary:
      "Tennessine is a superheavy halogen with chemistry yet to be observed directly.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 117, symbol: "Ts" },
        {
          name: "Tennessine-294",
          neutrons: 177,
          halfLife: "78 milliseconds",
          abundance: "Synthetic",
          description:
            "Most stable tennessine isotope, produced via berkelium and calcium fusion.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 7],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p5",
            notes: "Alpha decay sequences reveal descent toward nihonium and roentgenium.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 117, symbol: "Ts" },
        {
          name: "Tennessine-293",
          neutrons: 176,
          halfLife: "14 milliseconds",
          abundance: "Synthetic",
          description:
            "Isotope observed alongside element 117's discovery confirmation.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 7],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p5",
            notes: "Alpha decay to element 115 rounds out the decay chain.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 117, symbol: "Ts" },
        {
          name: "Tennessine-292",
          neutrons: 175,
          halfLife: "2 milliseconds",
          abundance: "Synthetic",
          description:
            "Fast-decaying nuclide that broadens the dataset for theoretical models.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 7],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p5",
            notes: "Contributes to mapping the approach to the predicted island of stability.",
          },
        }
      ),
    ],
  },
  {
    atomicNumber: 118,
    symbol: "Og",
    name: "Oganesson",
    group: 18,
    period: 7,
    category: "noble gas",
    atomicMass: 294,
    summary:
      "Oganesson closes the seventh period, a noble gas in name but likely a unique, highly polarizable solid.",
    isotopes: [
      buildIsotope(
        { atomicNumber: 118, symbol: "Og" },
        {
          name: "Oganesson-294",
          neutrons: 176,
          halfLife: "0.7 milliseconds",
          abundance: "Synthetic",
          description:
            "Only confirmed oganesson isotope, detected via alpha decay to livermorium.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 8],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p6",
            notes: "Extreme relativistic effects likely make it far less inert than lighter noble gases.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 118, symbol: "Og" },
        {
          name: "Oganesson-295",
          neutrons: 177,
          halfLife: "Predicted",
          abundance: "Synthetic",
          description:
            "Theorized isotope expected to exhibit slightly longer half-life near the island of stability.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 8],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p6",
            notes: "Awaiting experimental confirmation from next-generation accelerator facilities.",
          },
        }
      ),
      buildIsotope(
        { atomicNumber: 118, symbol: "Og" },
        {
          name: "Oganesson-296",
          neutrons: 178,
          halfLife: "Predicted",
          abundance: "Synthetic",
          description:
            "Hypothetical nuclide lying on the proposed island of stability with enhanced lifetime.",
          bohrModel: {
            shells: [2, 8, 18, 32, 32, 18, 8],
            electronConfiguration: "[Rn] 5f14 6d10 7s2 7p6",
            notes: "Nuclear models suggest semi-magic behavior at neutron number 178.",
          },
        }
      ),
    ],
  },
];
