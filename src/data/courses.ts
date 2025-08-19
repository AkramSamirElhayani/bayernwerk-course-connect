export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  duration: string;
  level: string;
  image: string;
  price?: string;
  category: string;
  objectives: string[];
  prerequisites: string[];
  curriculum: string[];
  targetAudience: string[];
}

export const courses: Course[] = [
  {
    id: "electrical-safety",
    title: "Electrical Safety Training",
    description: "Comprehensive safety training for electrical work environments and equipment handling.",
    fullDescription: "This comprehensive electrical safety training program covers essential safety protocols, hazard identification, and protective measures for working with electrical systems. Participants will learn current safety standards, proper use of personal protective equipment, and emergency response procedures.",
    duration: "2 days",
    level: "All levels",
    image: "src/assets/course-safety.jpg",
    price: "€450",
    category: "Safety",
    objectives: [
      "Understand electrical hazards and risk assessment",
      "Master proper use of personal protective equipment",
      "Learn lockout/tagout procedures",
      "Develop emergency response skills",
      "Comply with current safety regulations"
    ],
    prerequisites: [
      "Basic understanding of electrical systems",
      "Completed workplace safety orientation"
    ],
    curriculum: [
      "Electrical hazards identification",
      "Safety regulations and standards",
      "Personal protective equipment",
      "Lockout/tagout procedures",
      "Emergency response and first aid",
      "Practical safety exercises"
    ],
    targetAudience: [
      "Electrical technicians",
      "Maintenance personnel",
      "Safety supervisors",
      "Field service engineers"
    ]
  },
  {
    id: "smart-grid-technology",
    title: "Smart Grid Technology",
    description: "Advanced training on modern smart grid systems, digital infrastructure, and grid management.",
    fullDescription: "Explore the future of energy distribution with our smart grid technology course. Learn about digital transformation in the energy sector, advanced metering infrastructure, grid automation, and the integration of renewable energy sources into modern electrical grids.",
    duration: "3 days",
    level: "Intermediate",
    image: "src/assets/course-smartgrid.jpg",
    price: "€680",
    category: "Technology",
    objectives: [
      "Understand smart grid architecture and components",
      "Learn advanced metering infrastructure (AMI)",
      "Master grid automation and control systems",
      "Explore renewable energy integration",
      "Develop grid optimization strategies"
    ],
    prerequisites: [
      "Basic electrical engineering knowledge",
      "Understanding of power systems",
      "Computer literacy"
    ],
    curriculum: [
      "Smart grid fundamentals",
      "Advanced metering infrastructure",
      "Grid automation systems",
      "Renewable energy integration",
      "Cybersecurity in smart grids",
      "Hands-on lab exercises"
    ],
    targetAudience: [
      "Power system engineers",
      "Grid operators",
      "Energy consultants",
      "Technology managers"
    ]
  },
  {
    id: "renewable-energy-systems",
    title: "Renewable Energy Systems",
    description: "Complete guide to renewable energy technologies, integration strategies, and system optimization.",
    fullDescription: "Master the fundamentals and advanced concepts of renewable energy systems including solar, wind, and storage technologies. This course covers design principles, integration challenges, and optimization strategies for sustainable energy solutions.",
    duration: "4 days",
    level: "Intermediate",
    image: "src/assets/course-renewable.jpg",
    price: "€850",
    category: "Renewable Energy",
    objectives: [
      "Understand renewable energy technologies",
      "Learn system design and integration",
      "Master energy storage solutions",
      "Develop optimization strategies",
      "Explore future energy trends"
    ],
    prerequisites: [
      "Electrical engineering background",
      "Basic understanding of power systems",
      "Mathematics and physics knowledge"
    ],
    curriculum: [
      "Solar energy systems",
      "Wind power technology",
      "Energy storage solutions",
      "Grid integration challenges",
      "System optimization",
      "Case studies and projects"
    ],
    targetAudience: [
      "Energy engineers",
      "Project managers",
      "Sustainability consultants",
      "Technical specialists"
    ]
  }
];