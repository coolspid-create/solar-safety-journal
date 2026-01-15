export interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string; // Added full content
    category: string;
    date: string;
    imageUrl: string;
    author: string;
}

export const articles: Article[] = [
    {
        id: 1,
        title: "New Safety Regulations for Solar Plants in 2026",
        excerpt: "The Ministry of Energy announces stricter safety protocols for large-scale photovoltaic (PV) installations starting next month.",
        content: `
      <p>The Ministry of Energy has officially announced a new set of safety regulations for large-scale photovoltaic (PV) installations, effective from February 1st, 2026. These new guidelines aim to minimize electrical hazards and ensure the long-term structural integrity of solar power plants.</p>
      <h3>Key Changes</h3>
      <ul>
        <li><strong>Mandatory Arc Fault Protection:</strong> All new inverters must be equipped with advanced arc-fault circuit interrupters (AFCI).</li>
        <li><strong>Regular Thermal Imaging Inspections:</strong> Operators are now required to conduct drone-based thermal imaging inspections at least twice a year.</li>
        <li><strong>Enhanced Grounding Standards:</strong> Improved earthing protocols to prevent lightning damage.</li>
      </ul>
      <p>Industry experts believe these measures will reduce accident rates by 30% over the next five years, although initial compliance costs may increase for operators.</p>
    `,
        category: "정책/법규",
        date: "Jan 12, 2026",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
        author: "Kim Min-soo"
    },
    {
        id: 2,
        title: "Optimizing Efficiency: Best Practices for Summer Maintenance",
        excerpt: "Heat waves can actually reduce solar panel efficiency. Learn the top maintenance strategies to keep your output high.",
        content: `
      <p>While solar panels love the sun, they don't necessarily love the heat. Excessive temperatures can degrade performance by 0.5% for every degree Celsius above 25°C.</p>
      <h3>Top Maintenance Tips</h3>
      <p>1. <strong>Cleaning:</strong> Dust and pollen accumulation can be severe in summer. Schedule early morning cleanings.</p>
      <p>2. <strong>Cooling Systems:</strong> Passive air cooling gaps behind panels must remain unobstructed.</p>
      <p>2. <strong>Inverter Check:</strong> Ensure inverter cooling fans are operational to prevent derating.</p>
    `,
        category: "유지보수",
        date: "Jan 10, 2026",
        imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000",
        author: "Lee Ji-hyun"
    },
    {
        id: 3,
        title: "Global Solar Market Trends: What to Expect in Q1",
        excerpt: "Analysts predict a surge in residential solar adoptions. We break down the numbers and what it means for local installers.",
        content: "<p>The global solar market is poised for another record-breaking quarter...</p>",
        category: "산업 뉴스",
        date: "Jan 08, 2026",
        imageUrl: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000",
        author: "Park Joon"
    },
    {
        id: 4,
        title: "Worker Safety: Preventing Electrical Hazards",
        excerpt: "Electrical shock is a primary risk in PV maintenance. Review the essential PPE and lockout/tagout procedures.",
        content: "<p>Working with high-voltage DC arrays requires strict adherence to safety protocols...</p>",
        category: "안전 가이드",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1626305953930-589e4722a490?auto=format&fit=crop&q=80&w=1000",
        author: "Choi Young"
    }
];
