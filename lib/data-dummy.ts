export const dummyPortfolios = [
  {
    id: "p1",
    title: "Minimalist Japandi Lounge Chair",
    slug: "minimalist-japandi-lounge-chair",
    category: "Living",
    style: "Japandi",
    software_used: "Blender",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Desain kursi santai dengan perpaduan gaya Skandinavia dan Jepang. Menitikberatkan pada keindahan serat kayu jati solid dengan dudukan ergonomis.",
    is_featured: true,
  },
  {
    id: "p2",
    title: "Industrial Teak Dining Table",
    slug: "industrial-teak-dining-table",
    category: "Dining",
    style: "Industrial",
    software_used: "SketchUp + Enscape",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Meja makan kayu jati rustic dengan kaki besi hitam industrial. Dirancang untuk kafe atau ruang makan berkonsep open space.",
    is_featured: true,
  },
  {
    id: "p3",
    title: "Modern Classic Wardrobe Ukir",
    slug: "modern-classic-wardrobe-ukir",
    category: "Bedroom",
    style: "Ukir Jepara Modern",
    software_used: "Blender",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Lemari pakaian dengan sentuhan ukiran Jepara yang disederhanakan agar cocok untuk interior modern klasik.",
    is_featured: false,
  },
];

export const dummyInquiries = [
  {
    id: "i1",
    client_name: "Budi Santoso",
    client_whatsapp: "081234567890",
    furniture_type: "Kitchen Set Custom",
    deliverables_needed: "Render 3D & Working Drawing",
    notes_concept: "Warna natural wood dengan top table marmer putih",
    agreed_fee: null,
    status: "in_discussion",
    created_at: "2023-10-25T10:00:00Z"
  },
  {
    id: "i2",
    client_name: "Siska Dewi",
    client_whatsapp: "089876543210",
    furniture_type: "Meja Kasir Cafe",
    deliverables_needed: "Render Only",
    notes_concept: "Bentuk L-shape, gaya industrial dengan rak display di depan",
    agreed_fee: 1500000,
    status: "deal",
    created_at: "2023-10-26T14:30:00Z"
  }
];
