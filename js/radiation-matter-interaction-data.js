window.radiationMatterOverview = {
  id: "overview",
  title: "Radiation–Matter Interaction",
  category: "START HERE",
  description: "Follow the journey of an X-ray beam through matter and learn how its interactions shape the radiographic image.",
  keywords: "overview introduction interaction transmission attenuation scatter absorption image contrast dose",
  sections: [
    {
      heading: "What happens when an X-ray beam meets matter?",
      paragraphs: [
        "As an X-ray beam passes through a patient or another material, individual photons encounter atoms. A photon may pass through without interaction, change direction through scattering, or transfer some or all of its energy to matter.",
        "These outcomes occur independently for each photon. The beam that emerges is therefore a statistical mixture: fewer primary photons remain, and some scattered photons travel in new directions."
      ]
    },
    {
      heading: "Why the interactions matter in radiography",
      paragraphs: [
        "Differential attenuation creates the pattern of transmitted radiation that forms the image. Photoelectric absorption contributes to subject contrast, while Compton scatter can add unwanted exposure at the detector and reduce contrast.",
        "The same energy transfers that enable imaging also deposit energy in tissue. Understanding the balance between transmission, absorption, and scatter helps explain beam quality, image quality, and radiation protection."
      ],
      callout: "Explore the topics in order, or use the lesson search to jump directly to a concept."
    }
  ]
};

window.radiationMatterTopics = [
  {
    id: "fundamentals-of-interaction",
    title: "Fundamentals of Interaction",
    category: "Fundamentals",
    keywords: "attenuation transmission absorption scattering image contrast",
    description: "See how transmission, scattering, and absorption describe the possible outcomes for an X-ray photon.",
    sections: [
      {
        heading: "Three possible outcomes",
        paragraphs: [
          "A photon that crosses the material without interacting is transmitted. A photon that changes direction is scattered. A photon that transfers all or part of its energy is absorbed or otherwise removed from the primary beam.",
          "Attenuation describes the reduction in the number of primary photons along the beam. It results from interactions that remove photons from the original direction, not simply from energy disappearing."
        ]
      },
      {
        heading: "From individual events to an image",
        paragraphs: [
          "The probability of an interaction depends on photon energy and the material's composition and thickness. Across a patient, different tissues attenuate the beam by different amounts, producing different detector signals.",
          "Useful image contrast depends on preserving differences in transmission. Scatter reaching the detector adds signal that is not aligned with the primary beam and can obscure those differences."
        ],
        callout: "The four broad interaction outcomes studied here are coherent scatter, Compton scatter, photoelectric absorption, and high-energy photon interactions."
      }
    ]
  },
  {
    id: "nature-of-x-ray-photons",
    title: "Nature of X-ray Photons",
    category: "Fundamentals",
    keywords: "electromagnetic radiation wave particle duality ionizing energy beam",
    description: "Understand X-rays as packets of electromagnetic energy and how photons behave in an imaging beam.",
    points: [
      "An X-ray photon is a discrete packet of electromagnetic energy with no rest mass or electric charge.",
      "X-rays travel at the speed of light and can be described by both wave and particle models.",
      "A photon may be transmitted, scattered, or absorbed when it encounters matter."
    ],
    sections: [
      {
        heading: "A quantum of electromagnetic energy",
        paragraphs: [
          "X-rays are electromagnetic radiation. In the photon model, the beam consists of individual quanta that carry energy but have no rest mass and no electric charge. In vacuum they travel at the speed of light.",
          "The wave description is useful for wavelength and frequency, while the photon description is especially useful for explaining discrete interactions with atoms and electrons."
        ]
      },
      {
        heading: "Photons in an imaging beam",
        paragraphs: [
          "An X-ray beam contains photons with a range of energies. Each photon follows its own probabilistic path through matter: it may be transmitted, scattered, or absorbed. The collective outcome determines attenuation and detector exposure."
        ]
      }
    ]
  },
  {
    id: "photon-energy-frequency-wavelength",
    title: "Photon Energy, Frequency and Wavelength",
    category: "Fundamentals",
    keywords: "Planck constant E=h nu lambda c frequency wavelength keV beam quality",
    description: "Connect photon energy with frequency and wavelength, and see why beam quality affects interactions.",
    points: [
      "Photon energy is related to frequency by E = hν, where h is Planck's constant.",
      "Frequency and wavelength are related by c = λν; a higher frequency means a shorter wavelength.",
      "In diagnostic imaging, photon energy is commonly expressed in kiloelectronvolts (keV)."
    ],
    sections: [
      {
        heading: "Energy, frequency, and wavelength",
        paragraphs: [
          "Photon energy increases with frequency and decreases with wavelength. Consequently, high-energy X-ray photons have short wavelengths and high frequencies.",
          "In diagnostic practice, photon energy is commonly expressed in kiloelectronvolts (keV). Tube potential influences the range and maximum energy of photons produced by an X-ray tube."
        ],
        equation: "E = hν = hc/λ",
        note: "E is photon energy, h is Planck's constant, ν is frequency, c is the speed of light, and λ is wavelength."
      },
      {
        heading: "Why energy matters",
        paragraphs: [
          "Changing photon energy changes the relative likelihood of interaction processes and the penetrating ability of the beam. Beam quality therefore affects both image formation and patient exposure."
        ]
      }
    ]
  },
  {
    id: "atomic-structure-electron-binding-energy",
    title: "Atomic Structure and Electron Binding Energy",
    category: "Fundamentals",
    keywords: "atom nucleus electron shells K L M ionization binding energy atomic number",
    description: "Review electron shells, binding energy, and the energy required to remove an orbital electron.",
    points: [
      "Electrons occupy shells around a small, positively charged nucleus; inner-shell electrons are generally more tightly bound.",
      "Binding energy is the energy needed to remove an electron from its shell.",
      "An incident photon can eject a bound electron only when its energy exceeds that electron's binding energy."
    ],
    relatedHref: "radiation-physics.html#shells",
    relatedLabel: "Read the existing lesson on electron shells and binding energy",
    sections: [
      {
        heading: "The atom and its electron shells",
        paragraphs: [
          "An atom has a small nucleus containing protons and neutrons, surrounded by electrons in permitted energy states. The inner K shell is closest to the nucleus; L, M, and higher shells lie progressively farther away.",
          "Inner-shell electrons are generally more tightly bound than outer-shell electrons. The binding energy depends on the element and the electron shell."
        ]
      },
      {
        heading: "Binding energy and ionization",
        paragraphs: [
          "Binding energy is the minimum energy required to remove an electron from its shell. If an interaction ejects the electron, the atom is ionized and an electron vacancy remains; later transitions may release characteristic radiation or energy to another electron."
        ],
        callout: "The existing Radiation Physics lesson includes a fuller review of atomic structure, electron shells, and binding energy.",
        linkLabel: "Open the existing lesson",
        linkHref: "radiation-physics.html#shells"
      }
    ]
  },
  {
    id: "interaction-cross-section-probability",
    title: "Interaction Cross-section and Probability",
    category: "Fundamentals",
    keywords: "chance likelihood target area atom probability interaction cross section",
    description: "Learn how interaction cross-section describes the likelihood of a photon interaction.",
    points: [
      "A cross-section is a measure of the probability that a specified interaction will occur.",
      "Interaction probability depends on photon energy and the composition of the material.",
      "A larger cross-section means the interaction is more likely under the same conditions."
    ],
    sections: [
      {
        heading: "A measure of interaction likelihood",
        paragraphs: [
          "An interaction cross-section represents the effective probability or target area for a particular interaction. It is not a literal hard boundary around the atom; it is a useful way to quantify how likely a specified event is.",
          "Cross-sections vary with photon energy and the properties of the material. The total probability of interaction can be considered as the combined contributions of the available processes."
        ]
      },
      {
        heading: "Probability through a material",
        paragraphs: [
          "Increasing the number of atoms encountered, for example by increasing material thickness or density, generally increases the chance that a photon will interact. Even when the probability is known, the path of any one photon remains probabilistic."
        ]
      }
    ]
  },
  {
    id: "coherent-rayleigh-scattering",
    title: "Coherent (Rayleigh) Scattering",
    category: "Scattering",
    keywords: "elastic classical coherent Rayleigh low energy direction no ionization",
    description: "Explore elastic scattering in which a photon changes direction with negligible energy transfer.",
    points: [
      "The photon interacts with the atom as a whole and induces a brief oscillation of its electrons.",
      "The scattered photon has essentially the same energy as the incident photon, but travels in a new direction.",
      "No ionization occurs; coherent scattering contributes relatively little to diagnostic-image formation."
    ],
    sections: [
      {
        heading: "Elastic scattering",
        paragraphs: [
          "In coherent, or Rayleigh, scattering, the incident photon interacts with the atom as a whole and briefly causes its electrons to oscillate. The atom is not ionized.",
          "The photon leaves in a different direction with essentially unchanged energy. Because there is no meaningful energy transfer, this is described as elastic scattering."
        ]
      },
      {
        heading: "Relevance to radiography",
        paragraphs: [
          "Coherent scattering is more associated with lower photon energies and makes a relatively small contribution in routine diagnostic imaging compared with Compton scatter. It can still redirect photons away from the primary beam."
        ]
      }
    ]
  },
  {
    id: "incoherent-compton-scattering",
    title: "Incoherent (Compton) Scattering",
    category: "Scattering",
    keywords: "inelastic recoil electron scattered photon energy loss image fog contrast radiation",
    description: "Follow the interaction between an X-ray photon and a loosely bound electron, a major source of scatter.",
    points: [
      "An incident photon transfers part of its energy to an outer-shell electron, which is ejected as a recoil electron.",
      "The lower-energy scattered photon changes direction and can reach the detector from an unwanted path.",
      "Compton scatter reduces image contrast and contributes to occupational and patient radiation exposure."
    ],
    sections: [
      {
        heading: "Photon and electron interaction",
        paragraphs: [
          "In Compton scattering, an incident photon interacts with a loosely bound electron. The photon transfers part of its energy to the electron, ejecting it as a recoil electron, and continues as a scattered photon with lower energy.",
          "The scattered photon's direction and energy depend on the angle of scatter. This is an inelastic interaction because energy is transferred to the electron."
        ]
      },
      {
        heading: "Effects on image and protection",
        paragraphs: [
          "Scattered photons may reach the detector from directions unrelated to the original beam path. This adds unwanted exposure and reduces subject contrast. Compton scatter is also an important source of occupational exposure, which is why distance, shielding, and collimation matter."
        ]
      }
    ]
  },
  {
    id: "photoelectric-effect",
    title: "Photoelectric Effect",
    category: "Photon Absorption",
    keywords: "complete absorption photoelectron inner shell characteristic radiation atomic number contrast",
    description: "Understand complete photon absorption, electron ejection, and the role of photoelectric interactions in image contrast.",
    points: [
      "The incident photon is completely absorbed while transferring its energy to a bound inner-shell electron.",
      "The ejected photoelectron receives the photon energy minus the electron's binding energy.",
      "Photoelectric absorption depends strongly on material atomic number and photon energy, supporting subject contrast while increasing absorbed dose."
    ],
    sections: [
      {
        heading: "Complete photon absorption",
        paragraphs: [
          "In the photoelectric effect, an incident photon transfers all its energy to a bound electron, usually from an inner shell. The photon ceases to exist and the ejected electron is called a photoelectron.",
          "The photoelectron's kinetic energy is approximately the incident photon energy minus the electron's binding energy. The resulting shell vacancy may be filled by another electron, with energy released as characteristic radiation or an Auger electron."
        ],
        equation: "K.E. of photoelectron = photon energy − electron binding energy"
      },
      {
        heading: "Image contrast and absorbed dose",
        paragraphs: [
          "Photoelectric absorption varies strongly with the absorber's atomic number and decreases as photon energy increases. Differences in absorption between tissues contribute to subject contrast.",
          "Because the photon energy is deposited locally through secondary electrons, photoelectric interactions also contribute to absorbed dose."
        ]
      }
    ]
  },
  {
    id: "pair-production",
    title: "Pair Production",
    category: "Photon Absorption",
    keywords: "electron positron annihilation 1.022 MeV threshold nucleus high energy",
    description: "Study the conversion of a high-energy photon into an electron–positron pair near a nucleus.",
    points: [
      "Near a nucleus, a sufficiently energetic photon can be converted into an electron and a positron.",
      "At least 1.022 MeV is needed to provide the combined rest-mass energy of the two particles.",
      "The positron eventually annihilates with an electron, producing two 511 keV photons; this process is not significant in diagnostic radiography."
    ],
    sections: [
      {
        heading: "Conversion into a particle pair",
        paragraphs: [
          "In the electromagnetic field near a nucleus, a high-energy photon can be converted into an electron and a positron. The nucleus helps conserve momentum during the process.",
          "At least 1.022 MeV is required to provide the combined rest-mass energy of the electron and positron. Any photon energy above this threshold appears as kinetic energy of the particles and recoil."
        ],
        equation: "Minimum photon energy = 2mₑc² = 1.022 MeV"
      },
      {
        heading: "Positron annihilation",
        paragraphs: [
          "After slowing down, the positron can annihilate with an electron. The rest mass is converted into two photons, typically 511 keV each, travelling in nearly opposite directions.",
          "Pair production is a high-energy interaction and is not significant at diagnostic radiography energies."
        ]
      }
    ]
  },
  {
    id: "photodisintegration",
    title: "Photodisintegration",
    category: "Photon Absorption",
    keywords: "nuclear absorption neutron proton giant resonance high energy megavoltage",
    description: "Learn how a very high-energy photon can be absorbed by a nucleus and eject a nuclear particle.",
    points: [
      "A high-energy photon may be absorbed directly by a nucleus rather than interacting with orbital electrons.",
      "The excited nucleus can eject a neutron, proton, or other nuclear particle.",
      "Photodisintegration requires photon energies far above those used in routine diagnostic X-ray imaging."
    ],
    sections: [
      {
        heading: "Photon absorption by the nucleus",
        paragraphs: [
          "In photodisintegration, a sufficiently energetic photon is absorbed by the nucleus. The resulting excited nucleus may release a neutron, proton, or another nuclear particle if the energy is sufficient.",
          "The threshold depends on the nucleus and the separation energy of the particle that is emitted. This nuclear process differs from interactions with orbital electrons."
        ]
      },
      {
        heading: "Clinical context",
        paragraphs: [
          "Photodisintegration requires energies far above those used for routine diagnostic radiography. It is relevant to high-energy photon applications and radiation-protection considerations around some megavoltage facilities."
        ]
      }
    ]
  },
  {
    id: "linear-attenuation-coefficient",
    title: "Attenuation and Linear Attenuation Coefficient",
    category: "Radiation Attenuation",
    keywords: "mu linear attenuation coefficient thickness intensity exponential narrow beam inverse length",
    description: "Relate primary-beam reduction to material thickness using the linear attenuation coefficient.",
    points: [
      "The linear attenuation coefficient (μ) describes the probability of photon removal per unit distance in a material.",
      "For a narrow monoenergetic beam, transmission follows I = I₀e⁻μˣ, where x is material thickness.",
      "The value depends on photon energy and the absorbing material; its units are inverse length, such as cm⁻¹."
    ],
    sections: [
      {
        heading: "Definition of the linear coefficient",
        paragraphs: [
          "The linear attenuation coefficient, represented by μ, describes the fractional reduction in primary photon intensity per unit thickness of a material. It includes the combined probability of interactions that remove photons from the primary beam.",
          "Its value depends on both photon energy and material composition. Common units are cm⁻¹ or m⁻¹."
        ],
        equation: "I = I₀e⁻ᵘˣ",
        note: "I₀ is the incident intensity, I is transmitted intensity, μ is the linear attenuation coefficient, and x is material thickness."
      },
      {
        heading: "Exponential attenuation",
        paragraphs: [
          "For a narrow, monoenergetic beam, each additional layer removes a constant fraction of the photons remaining, producing exponential rather than linear reduction.",
          "A broad clinical beam includes scatter and a range of photon energies, so measurements may differ from the simple narrow-beam model."
        ]
      }
    ]
  },
  {
    id: "mass-attenuation-coefficient",
    title: "Mass Attenuation Coefficient",
    category: "Radiation Attenuation",
    keywords: "mu over rho density normalized cm2 per gram material comparison",
    description: "Compare attenuation across materials while accounting for density.",
    points: [
      "The mass attenuation coefficient is the linear attenuation coefficient divided by material density: μ/ρ.",
      "It reduces the direct influence of density, making it useful for comparing material interaction properties.",
      "Its common units are cm²/g; multiplying μ/ρ by density gives the linear coefficient μ."
    ],
    sections: [
      {
        heading: "Normalize attenuation by density",
        paragraphs: [
          "The mass attenuation coefficient is the linear attenuation coefficient divided by the density of the material. It expresses attenuation per unit mass thickness and is useful when comparing substances whose physical densities differ.",
          "For a mixture or compound, the mass attenuation coefficient depends on the constituent elements and their proportions."
        ],
        equation: "μ/ρ = mass attenuation coefficient",
        note: "μ is the linear attenuation coefficient and ρ is material density. Common units for μ/ρ are cm²/g."
      },
      {
        heading: "Connection to linear attenuation",
        paragraphs: [
          "Multiplying the mass attenuation coefficient by density gives the linear attenuation coefficient. Both coefficients depend on photon energy; neither should be treated as a fixed material constant across all beam energies."
        ],
        equation: "μ = ρ(μ/ρ)"
      }
    ]
  },
  {
    id: "half-value-layer",
    title: "Half-Value Layer (HVL)",
    category: "Radiation Attenuation",
    keywords: "half value layer first half intensity quality penetrating power 0.693 mu",
    description: "Measure beam quality by finding the thickness that reduces intensity to one half.",
    points: [
      "The HVL is the thickness of a specified material that reduces the measured beam intensity to half its initial value.",
      "For a monoenergetic narrow beam, HVL = ln(2)/μ, approximately 0.693/μ.",
      "A larger HVL generally indicates a more penetrating beam; diagnostic beams are polyenergetic, so measured HVL is an effective value."
    ],
    sections: [
      {
        heading: "Definition and calculation",
        paragraphs: [
          "The half-value layer is the thickness of a specified absorber needed to reduce the measured beam intensity to half its initial value. It is a practical measure of X-ray beam quality and penetrating ability.",
          "For an ideal narrow monoenergetic beam, the exponential attenuation equation gives the following relationship."
        ],
        equation: "HVL = ln(2)/μ ≈ 0.693/μ"
      },
      {
        heading: "Interpreting HVL",
        paragraphs: [
          "A higher HVL generally indicates a more penetrating beam. Because clinical X-ray beams are polyenergetic, lower-energy photons are preferentially removed as the beam passes through an absorber; the measured HVL is therefore an effective value and subsequent HVLs may differ."
        ]
      }
    ]
  },
  {
    id: "tenth-value-layer",
    title: "Tenth-Value Layer (TVL)",
    category: "Radiation Attenuation",
    keywords: "tenth value layer tenth 10 percent shielding ln 10 attenuation",
    description: "Calculate the shielding thickness that reduces radiation intensity to one tenth.",
    points: [
      "The TVL is the thickness of a specified material that reduces beam intensity to one tenth of its initial value.",
      "For a monoenergetic narrow beam, TVL = ln(10)/μ, approximately 2.303/μ.",
      "TVL is used in radiation shielding calculations; broad-beam scatter and buildup can affect practical shielding."
    ],
    sections: [
      {
        heading: "Definition and relationship",
        paragraphs: [
          "The tenth-value layer is the absorber thickness that reduces the measured intensity to one tenth of its initial value. It is commonly used to describe shielding effectiveness for a specified radiation quality and material.",
          "For a narrow monoenergetic beam, the TVL follows from the exponential attenuation law."
        ],
        equation: "TVL = ln(10)/μ ≈ 2.303/μ"
      },
      {
        heading: "Using TVL in shielding",
        paragraphs: [
          "Several TVLs ideally reduce the primary beam by successive factors of ten. In real shielding calculations, beam spectrum, geometry, scattered radiation, and buildup must also be considered; TVL alone is not a complete shielding design."
        ]
      }
    ]
  },
  {
    id: "clinical-applications-summary",
    title: "Clinical Applications and Summary",
    category: "APPLY & REVIEW",
    keywords: "clinical imaging contrast patient dose scatter shielding collimation optimization summary",
    description: "Bring interaction physics together to understand image contrast, patient dose, and practical radiation protection.",
    sections: [
      {
        heading: "Apply the concepts to an X-ray examination",
        paragraphs: [
          "The detector records transmitted primary photons. Differences in attenuation between tissues create the signal differences used to form the image. Photoelectric absorption can increase subject contrast, while Compton scatter adds unwanted detector exposure and degrades contrast.",
          "Photon energy, patient thickness, field size, and the materials in the beam all influence the balance of transmission, absorption, and scatter. Technique selection aims to achieve the required diagnostic information while keeping exposure optimized."
        ]
      },
      {
        heading: "Practical protection and image quality",
        paragraphs: [
          "Accurate collimation limits irradiated volume and reduces scatter production. Appropriate beam quality, exposure factors, grid use when indicated, and sound positioning help manage image quality and dose.",
          "For staff protection, maximize distance from the patient and scatter source, use appropriate shielding, and follow local radiation-safety procedures."
        ]
      },
      {
        heading: "Key takeaways",
        paragraphs: [
          "Photon interactions are probabilistic and depend on energy and material. Coherent and Compton processes scatter photons; the photoelectric effect absorbs the photon and ejects an electron; pair production and photodisintegration occur only at much higher energies.",
          "Attenuation describes removal from the primary beam. The linear and mass attenuation coefficients quantify it, while HVL and TVL express how much absorber is needed to reduce intensity by a defined fraction."
        ],
        callout: "Use these principles to explain how an image is formed, why scatter lowers contrast, and why radiation protection is essential."
      }
    ]
  }
];
