import headacheHeroImage from "../assets/blog-headache-hero.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  content: {
    heading?: string;
    paragraphs: string[];
    list?: string[];
    image?: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-headaches-causes-testing-management",
    title: "Understanding Headaches: Causes, Testing, and Management",
    excerpt: "...",
    date: "August 4, 2026",
    image: headacheHeroImage,
    content: [
      {
        paragraphs: [
          "A headache is pain or discomfort felt in the head. While almost everyone experiences a headache at some point, the underlying cause can range from something minor and temporary to a sign of an underlying condition that needs attention.",
        ],
      },
      {
        heading: "What Causes Headaches?",
        paragraphs: [
          "Headache causes are generally grouped into three categories:",
        ],
      },
      {
        heading: "1. Organic Causes",
        paragraphs: [
          "These occur when there is an underlying disease process in the body. This includes acute infections such as malaria, meningitis, and other bacterial infections, as well as non-acute or structural causes such as intracranial hypotension (leakage of cerebrospinal fluid) or intracranial hypertension (overproduction of cerebrospinal fluid).",
        ],
      },
      {
        heading: "2. Inorganic Causes",
        paragraphs: [
          "These headaches occur without any underlying physical or structural problem. Mood disorders such as anxiety and tension-type headaches often fall into this category.",
        ],
      },
      {
        heading: "3. Idiopathic Headaches",
        paragraphs: [
          "These are headaches with no clearly identified cause. Migraine headaches and cluster headaches are common examples.",
        ],
      },
      {
        heading: "A Closer Look at the Causes",
        paragraphs: ["Breaking this down further:"],
        list: [
          "Organic causes: Acute infections (meningitis, vasculitis, malaria) and metabolic disorders (e.g. hyperthyroidism)",
          "Inorganic causes: Structural issues like brain tumors or bleeding in the brain, intracranial hypotension, idiopathic intracranial hypertension, primary anxiety and mood disorders, and autoimmune disorders where the body's immune system affects brain cells",
          "Idiopathic causes: Primary headache disorders such as migraine and cluster headaches, where no single known cause has been identified — though several hypotheses remain under discussion",
        ],
      },
      {
        heading: "What Tests Can Help Identify the Cause?",
        paragraphs: [
          "If you are experiencing persistent or concerning headaches, several tests can help determine what might be causing them, including a brain CT scan, an EEG, an MRI, and blood tests.",
        ],
      },
      {
        heading: "How Are Headaches Managed?",
        paragraphs: [
          "Management is directed at the underlying cause. For organic causes, treatment focuses on eradicating the underlying infection or condition. In some cases — such as headaches caused by a tumor — surgery may be necessary. Other approaches include drug therapy, and for headaches linked to mood disorders, cognitive behavioral therapy can be an effective form of mood therapy.",
        ],
      },
      {
        heading: "In Conclusion",
        paragraphs: [
          "Headaches can be caused by a variety of factors, and the good news is that all of them can be managed appropriately with the right diagnosis.",
          "Left untreated, headaches can affect your lifestyle, health, and day-to-day productivity. If you are experiencing recurring or concerning headaches, it is worth finding out what is causing them and getting proper management.",
        ],
      },
    ],
  },
];
