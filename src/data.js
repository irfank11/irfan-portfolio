// ✏️ Edit everything about the site here.
export const person = {
  name: 'Irfan',
  fullName: 'Irfan Khan',
  role: 'Java Backend Developer',
  tagline: ['JAVA BACKEND DEVELOPER', 'AI / ML ENTHUSIAST', 'PROBLEM SOLVER'],
  intro: 'MCA student building scalable Spring Boot services and GenAI products powered by RAG and vector search.',
  photo: '/profile.jpg', // put your photo at public/profile.jpg
  email: 'irfank1191326@gmail.com',
  github: 'https://github.com/irfank11',
  linkedin: 'https://linkedin.com/in/irfan-khan-26498823a',
  about: [
    "I'm an MCA student at Jamia Millia Islamia who enjoys turning messy problems into clean, well-tested backend systems. My core stack is Java and Spring Boot, and I'm increasingly drawn to GenAI: retrieval-augmented generation, embeddings and vector databases.",
    "I'm looking for software engineering internships and fresher roles where I can ship real products, learn from strong teams and grow into a backend / AI engineer.",
  ],
  interests: ['Backend Architecture', 'GenAI & RAG', 'Vector Databases', 'API Design'],
}

export const nav = [
  ['About', '#about'], ['Education', '#education'], ['Skills', '#skills'],
  ['Projects', '#projects'], ['Contact', '#contact'],
]

export const education = [
  { school: 'Jamia Millia Islamia, New Delhi', degree: 'Master of Computer Applications (MCA)', years: '2025 – 2027', note: 'CGPA 9.00 · Student Placement Cell member' },
  { school: 'Central University of Rajasthan', degree: 'B.Sc.', years: '2022 – 2025', note: 'CGPA 8.45' },
]

export const skills = {
  'Programming Languages': ['Java', 'Python', 'SQL'],
  'Backend Development': ['Spring Boot', 'REST APIs', 'RAG Pipelines', 'GenAI / LLM Integration'],
  Databases: ['MySQL', 'PostgreSQL', 'Vector Databases'],
}

// demo: paste the live URL here once a project is deployed (shows as "Live Demo (soon)" while empty).
// cover: path/URL to the project's homepage screenshot. Empty = generated placeholder.
export const projects = [
  { title: 'MediAssist AI', hue: 200, cover: '', desc: 'Full-stack RAG healthcare assistant that answers medical queries from curated documents using retrieval and LLM generation.', stack: ['Java', 'Spring Boot', 'RAG', 'Vector DB', 'React'], github: 'https://github.com/irfank11', demo: '' },
  { title: 'Campus Knowledge Assistant', hue: 260, cover: '', desc: 'RAG chatbot that lets students ask questions against college documents and get grounded, sourced answers.', stack: ['Python', 'RAG', 'Embeddings', 'React'], github: 'https://github.com/irfank11/campus-knowledge-assistant', demo: '' },
  { title: 'Anas & Sons Jewellers', hue: 38, cover: '', desc: 'Luxury 3D showroom website for a jewellery store in Jamia Nagar, New Delhi.', stack: ['React', 'Three.js', 'Tailwind'], github: '', demo: '' },
  { title: 'Marwar Hospital', hue: 160, cover: '', desc: 'Premium, research-first website for a hospital in Parbatsar, Rajasthan.', stack: ['React', 'TypeScript', 'Tailwind', '3D'], github: '', demo: '' },
]
