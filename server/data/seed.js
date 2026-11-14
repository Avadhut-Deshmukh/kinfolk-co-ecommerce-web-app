// Seed data for KINFOLK & CO.
export const SEED_PRODUCTS = [
  {
    id: 'kc-01',
    name: 'Hasami Matte Ceramic Pour-Over',
    subtitle: 'Hand-thrown stoneware dripper & carafe set',
    category: 'Tableware',
    price: 88,
    rating: 4.9,
    reviewCount: 42,
    stock: 14,
    badge: 'Bestseller',
    material: '100% Hasami Porcelain Clay, Raw Matte Glaze',
    dimensions: '18.5 cm H × 11.5 cm Ø (600 ml capacity)',
    origin: 'Nagasaki Prefecture, Japan',
    care: 'Dishwasher safe. Avoid sudden thermal shock.',
    description:
      'Engineered with internal spiral ribs for optimal extraction speed and heat retention. The unglazed exterior ring offers a warm, tactile grip during morning rituals.',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r1', author: 'Clara V.', date: '2 weeks ago', rating: 5, text: 'The matte texture feels incredible in hand. Pours cleanly without a single drip.', verified: true },
      { id: 'r2', author: 'Marcus T.', date: '1 month ago', rating: 5, text: 'Replaced my glass decanter with this. Keeps coffee noticeably warmer.', verified: true }
    ]
  },
  {
    id: 'kc-02',
    name: 'Atelier Cast-Iron Desk Lamp',
    subtitle: 'Warm dimmable architectural task lighting',
    category: 'Lighting',
    price: 245,
    rating: 4.8,
    reviewCount: 29,
    stock: 7,
    badge: 'Limited Edition',
    material: 'Sand-Cast Blackened Iron, Brushed Brass Rotary Switch',
    dimensions: '38 cm H × 24 cm Shade Ø · 2m Woven Linen Cord',
    origin: 'Aarhus, Denmark',
    care: 'Wipe with a dry microfibre cloth. Do not use chemical polishes.',
    description:
      'Anchored by a solid sand-cast iron base, this cantilevered luminaire casts a glare-free 2700K warm pool of light across desks and reading corners.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r3', author: 'Soren K.', date: '3 weeks ago', rating: 5, text: 'Heavy, substantial, and the brass dimmer switch has the most satisfying click.', verified: true }
    ]
  },
  {
    id: 'kc-03',
    name: 'Milled Anodized Pen Tray & Weight',
    subtitle: 'CNC-machined solid aluminum desk organizer',
    category: 'Workspace',
    price: 72,
    rating: 4.9,
    reviewCount: 64,
    stock: 22,
    badge: 'New Arrival',
    material: '6061 Aircraft-Grade Bead-Blasted Black Aluminum',
    dimensions: '22 cm L × 6.5 cm W × 1.8 cm H (480g)',
    origin: 'Stuttgart, Germany',
    care: 'Clean with damp cloth. Natural cork base prevents desk scratches.',
    description:
      'Milled from a single billet of aluminum with four precision flutes to cradle fountain pens, drafting pencils, and everyday studio instruments.',
    images: [
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r4', author: 'Elena R.', date: '5 days ago', rating: 5, text: 'Minimalist perfection. Holds my brass fountain pens securely.', verified: true }
    ]
  },
  {
    id: 'kc-04',
    name: 'Belgian Heavyweight Flax Linen Throw',
    subtitle: 'Stonewashed Oatmeal & Charcoal double-weave blanket',
    category: 'Textiles',
    price: 165,
    rating: 4.9,
    reviewCount: 51,
    stock: 11,
    badge: 'Bestseller',
    material: '100% OEKO-TEX Certified Long-Staple Belgian Flax (420 GSM)',
    dimensions: '210 cm × 150 cm with 3 cm eyelash fringe',
    origin: 'Ghent, Belgium',
    care: 'Machine wash cold on gentle cycle. Line dry or tumble dry low.',
    description:
      'Loomed in small batches from unbleached flax fibers and garment-washed with volcanic stones for an immediately lived-in drape.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r5', author: 'Hannah M.', date: '2 months ago', rating: 5, text: 'The weight is unreal. Breathable in summer and cozy in winter.', verified: true }
    ]
  },
  {
    id: 'kc-05',
    name: 'Kyoto Smoked Oak Tea Canister',
    subtitle: 'Airtight hand-turned wooden caddy with brass inner lid',
    category: 'Tableware',
    price: 110,
    rating: 4.7,
    reviewCount: 19,
    stock: 9,
    badge: null,
    material: 'Charred Japanese White Oak (Shou Sugi Ban) & Solid Brass',
    dimensions: '12.5 cm H × 9 cm Ø (200g loose leaf capacity)',
    origin: 'Kyoto, Japan',
    care: 'Wipe exterior with dry cloth only. Keep away from standing water.',
    description:
      'Precision woodturning creates a vacuum-tight friction seal that preserves delicate botanicals, matcha, and roasted coffee beans from light and humidity.',
    images: [
      'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r7', author: 'Kenji S.', date: '3 weeks ago', rating: 5, text: 'The aroma of the smoked oak is subtle and wonderful. Craftsman quality.', verified: true }
    ]
  },
  {
    id: 'kc-06',
    name: 'Monolith Travertine Bookend Pair',
    subtitle: 'Honed raw Italian cream limestone architectural blocks',
    category: 'Workspace',
    price: 138,
    rating: 4.9,
    reviewCount: 37,
    stock: 6,
    badge: 'Low Stock',
    material: '100% Unfilled Tivoli Cream Travertine Marble',
    dimensions: '17 cm H × 11 cm W × 7 cm D (3.8 kg pair)',
    origin: 'Tivoli, Italy',
    care: 'Dust with soft brush. Seal annually with natural stone wax.',
    description:
      'Cut from porous Roman travertine quarries, each pair celebrates raw geological veins and hand-chamfered 45-degree edges.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r6', author: 'Julian D.', date: '1 week ago', rating: 5, text: 'Holds heavy art monographs effortlessly. Looks like a gallery sculpture.', verified: true }
    ]
  },
  {
    id: 'kc-07',
    name: 'Washi Paper & Black Ash Lantern',
    subtitle: 'Cordless rechargeable ambient table sculpture',
    category: 'Lighting',
    price: 175,
    rating: 4.8,
    reviewCount: 33,
    stock: 15,
    badge: 'New Arrival',
    material: 'Hand-laid Kozu Mulberry Paper & Stained Ash Wood',
    dimensions: '29 cm H × 19 cm Ø · USB-C 40-Hour Battery',
    origin: 'Gifu, Japan',
    care: 'Dust gently with a dry feather duster.',
    description:
      'Inspired by traditional Gifu paper lanterns, this portable cordless lamp diffuses warm candlelight illumination through organic mulberry fibers.',
    images: [
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r8', author: 'Astrid B.', date: '1 month ago', rating: 5, text: 'The light is so soft and restful. We use it on the dining terrace every evening.', verified: true }
    ]
  },
  {
    id: 'kc-08',
    name: 'Bouclé & Raw Linen Cushion Cover',
    subtitle: 'Tactile heavy-slub woven accent pillow with hidden zip',
    category: 'Textiles',
    price: 68,
    rating: 4.7,
    reviewCount: 24,
    stock: 19,
    badge: null,
    material: '70% Undyed Belgian Linen, 30% Organic Merino Wool Bouclé',
    dimensions: '50 cm × 50 cm (Insert sold separately)',
    origin: 'Porto, Portugal',
    care: 'Spot clean or dry clean recommended.',
    description:
      'Contrasting matte charcoal piping frames a richly textured cream bouclé weave that brings architectural warmth to sofas and reading chairs.',
    images: [
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: [
      { id: 'r9', author: 'Leila C.', date: '2 weeks ago', rating: 4, text: 'Sublime texture, rich cream color that matches our minimalist sofa perfectly.', verified: true }
    ]
  },
  {
    id: 'kc-09',
    name: 'Kiso Hinoki Bath Bridge & Tray',
    subtitle: 'Aromatic Japanese cypress timber with drainage flutes',
    category: 'Tableware',
    price: 142,
    rating: 4.9,
    reviewCount: 18,
    stock: 8,
    badge: 'Limited Edition',
    material: '100% Old-Growth Kiso Hinoki Cypress, Untreated',
    dimensions: '82 cm L × 18 cm W × 3 cm H (1.2 kg)',
    origin: 'Nagano Prefecture, Japan',
    care: 'Rinse with clear water and air dry vertically away from direct sun.',
    description:
      'Naturally antibacterial and mildew-resistant, Kiso Hinoki releases an invigorating woodland fragrance when exposed to warm bath steam.',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: []
  },
  {
    id: 'kc-10',
    name: 'Mouth-Blown Fluted Glass Pendant',
    subtitle: 'Architectural opaline glass ceiling luminaire',
    category: 'Lighting',
    price: 290,
    rating: 4.9,
    reviewCount: 15,
    stock: 5,
    badge: 'Atelier Piece',
    material: 'Hand-Blown Opaline Borosilicate Glass & Aged Patinated Brass',
    dimensions: '32 cm Ø × 26 cm H · 3m Braided Cord',
    origin: 'Murano, Italy',
    care: 'Clean with soft dry lint-free cloth.',
    description:
      'Individually mouth-blown into ribbed cherrywood molds, producing microscopic irregularities that catch morning light like quiet architectural water.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: []
  },
  {
    id: 'kc-11',
    name: 'Hand-Hammered Solid Brass Desk Blotter',
    subtitle: 'Brushed living-finish desk protector with vegetable-tan leather backing',
    category: 'Workspace',
    price: 185,
    rating: 4.8,
    reviewCount: 22,
    stock: 10,
    badge: 'Bestseller',
    material: 'Solid Raw Brass 1.8mm with Tuscan Vegetable-Tanned Leather Base',
    dimensions: '60 cm W × 40 cm D × 0.4 cm H (2.4 kg)',
    origin: 'Florence, Italy',
    care: 'Develops a personal organic patina over decades. Polish with brass wax if high shine is preferred.',
    description:
      'Forged from heavy unlacquered brass, each blotter records your daily gestures and studio thoughts through subtle, warm atmospheric patina.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: []
  },
  {
    id: 'kc-12',
    name: 'Washed Waffle Linen Bath Towel Set',
    subtitle: 'Honeycombed long-staple flax bath sheet & hand towel',
    category: 'Textiles',
    price: 94,
    rating: 4.9,
    reviewCount: 31,
    stock: 16,
    badge: 'New Arrival',
    material: '100% Stonewashed European Flax (380 GSM Waffle Weave)',
    dimensions: 'Bath Sheet: 150 × 100 cm · Hand Towel: 70 × 50 cm',
    origin: 'Vilnius, Lithuania',
    care: 'Machine wash 40°C. Avoid fabric softeners to maintain quick absorption.',
    description:
      'Deep three-dimensional honeycomb texture exfoliates gently while drying four times faster than conventional terrycloth cotton.',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1000&q=85'
    ],
    reviews: []
  }
];

export const SEED_ORDERS = [
  {
    orderId: 'KC-89412',
    trackingNumber: 'TRK-98214-DK',
    date: 'October 28, 2026',
    status: 'In Transit',
    estimatedDelivery: 'November 13, 2026',
    subtotal: 253.0,
    discount: 0,
    shippingCost: 0,
    total: 253.0,
    giftWrap: true,
    giftNote: 'Warmest wishes on your new studio space.',
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    paymentId: 'pay_test_89412a9',
    shippingAddress: {
      fullName: 'Marcus Vance',
      email: 'm.vance@studio-arch.com',
      address: '42 Mercer Street, Apt 4B',
      city: 'New York',
      postalCode: '10013',
      country: 'United States'
    },
    items: [
      { id: 'kc-01', name: 'Hasami Matte Ceramic Pour-Over', qty: 1, price: 88, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' },
      { id: 'kc-04', name: 'Belgian Heavyweight Flax Linen Throw', qty: 1, price: 165, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

export const SEED_INQUIRIES = [
  {
    referenceId: 'KC-TRD-4921',
    inquiryType: 'Architect / Interior Trade Program',
    fullName: 'Sophia Lindqvist',
    email: 'sophia@arkitektur-cph.dk',
    reference: 'Project Villa Bellevue',
    message: 'Seeking batch pricing and sample finishes for 12 Atelier Cast-Iron Lamps for a boutique hotel in Copenhagen.',
    status: 'Under Review',
    createdAt: new Date('2026-11-01')
  }
];

