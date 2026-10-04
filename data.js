// Single source of truth for all site content.
// Source: LinkedIn profile PDF export (Profile (1).pdf, 2026-10-04) + topmate.io/nishanta_banik.
// Phone and email from the PDF are intentionally NOT published.

window.SITE = {
  name: "Nishanta Banik",
  initials: "NB",
  role: "Senior Platform Engineer · DevSecOps & GitOps Architect",
  base: "Berlin, Germany",
  timezone: "Europe/Berlin",
  years: "16+",
  followers: "8K",
  appsMigrated: "30+",

  about: [
    "I debug Kubernetes clusters and run in the cold German forest. Both teach me the same thing: consistency beats intensity.",
    "16 years ago, I started as a storage admin in Bangalore. Today I architect multi-cloud systems in Berlin. I've migrated 30+ applications to Kubernetes and led DevOps for companies like Sonova, Wipro, Capgemini and Publicis Sapient. I hold Google Cloud Professional Architect and Azure Architect certifications, and recently graduated from a MERN full-stack bootcamp to understand what developers actually deal with.",
    "I moved to Germany on a Blue Card and lost my job mid-winter. I rebuilt my career while learning German, and started running to cope with the stress. I haven't stopped since.",
  ],

  cares: [
    "Platforms that developers can actually use",
    "Security that is built into the workflow",
    "Automation that reduces repeated manual work",
  ],

  // Shown in the rotating "Principles" widget.
  principles: [
    "Build systems that survive failure — I've seen too many that didn't.",
    "Document like you're teaching your past self.",
    "Automate the boring stuff so humans can do interesting work.",
    "Security isn't optional, it's foundational.",
    "Consistency beats intensity.",
  ],

  interests: ["Running", "Breathwork", "Self-mastery", "Long-term growth", "German culture"],
  runStreak: "1,371+ days",
  languages: [["English", "Full professional"], ["Bengali", "Full professional"], ["Hindi", "Full professional"], ["German", "Elementary"]],

  stack: [
    ["Cloud", ["Google Cloud", "AWS", "Azure", "GKE", "Cloud Armor"]],
    ["IaC", ["Terraform", "Terraform Enterprise", "Atlantis", "Ansible"]],
    ["GitOps", ["FluxCD", "ArgoCD", "Kustomize", "Helm"]],
    ["Containers", ["Kubernetes", "Docker", "Istio"]],
    ["CI/CD", ["GitHub Actions", "GitLab CI", "Jenkins"]],
    ["Observability", ["Prometheus", "Grafana Cloud", "Loki", "Tempo", "OpenTelemetry", "Jaeger", "ELK"]],
    ["DevSecOps", ["Vault", "Kyverno", "Trivy", "CIS benchmarks", "OAuth 2.0 / JWT"]],
    ["Dev", ["Node.js", "Express", "MERN", "Redis"]],
  ],

  certifications: [
    "Google Cloud Professional Cloud Architect",
    "Azure Architect",
    "Microsoft Azure Administrator (AZ-103)",
    "VMware Certified Professional 5 – Data Center Virtualization",
    "Information Storage Associate v2 (EMCISA)",
    "IBM XIV Storage System Technical Solutions V4",
    "IBM System Storage DS8000 Technical Solutions V3",
  ],

  experience: [
    {
      company: "MediaMarktSaturn", role: "Senior Platform Engineer", dates: "Nov 2025 – Present", place: "Ingolstadt",
      summary: "Cloud platform for the MMS Payment Platform on Google Cloud.",
      points: [
        "Architected the foundational Terraform Enterprise blueprint and GCP infrastructure across Dev, QA and Production",
        "Enterprise GitOps with Flux & Kustomize — automated, zero-downtime releases for payment microservices and UIs",
        "Secure multi-environment landing zones: GKE, Cloud Armor, least-privilege IAM, Artifact Registry",
        "CI/CD release engineering with GitHub Actions, WIF and secure artifact promotion",
        "CIS benchmarks and critical CVE remediation across payment repositories",
        "Centralised observability (PLGT) with SLIs/SLOs for 99.9%+ uptime on customer-facing payments",
      ],
    },
    {
      company: "PSI Software", role: "Senior Platform Engineer", dates: "May 2025 – Aug 2025", place: "Berlin",
      summary: "Platform engineer for the platform integration project, reporting to the Head of Platform.",
      points: [
        "Production Kubernetes with workload identity, policy-as-code and admission controls — incidents −45%, compliance +20%",
        "Prometheus, Grafana, Loki & OpenTelemetry — alert fatigue −60%, MTTR −40%",
        "CI/CD with image scanning, policy gates and progressive rollout — critical vulns −55%, rollbacks halved",
      ],
    },
    {
      company: "Kerberos Compliance", role: "DevSecOps Engineer", dates: "May 2024 – Nov 2024", place: "Cologne",
      summary: "Software, Security & Operations for an anti-money-laundering SaaS.",
      points: [
        "Microservices on AWS & GCP with Kubernetes and Terraform — downtime −40%, scalability +50%",
        "ArgoCD, Helm & Istio platform; GitOps with Atlantis — deployment efficiency +60%",
        "Kyverno, Trivy & Vault — vulnerabilities −45%; PLG, Jaeger, Tempo — 99.5% uptime",
        "APIs serving 200,000+ monthly active users",
      ],
    },
    {
      company: "symmedia", role: "Senior Cloud DevOps Engineer", dates: "May 2023 – Aug 2023", place: "Berlin",
      summary: "Enterprise IoT, data and microservice platforms on GCP and Azure.",
      points: [
        "OAuth 2.0 / JWT security work towards SOC 2 Type II compliance",
        "Terraform & Ansible automation — deployment time −50%",
        "Redis caching — database load −70%",
      ],
    },
    {
      company: "Sonova Group", role: "Senior Site Reliability Engineer", dates: "Jun 2022 – Apr 2023", place: "Berlin",
      summary: "Monolith-to-microservices on Kubernetes.",
      points: [
        "Migrated a 3-tier app to microservices on Kubernetes — performance +40%",
        "GitHub Actions CI/CD — release cycle from bi-weekly to weekly",
        "Cloud cost optimisation — €290k saved in a year",
      ],
    },
    {
      company: "Wipro Digital", role: "Cloud DevOps Architect", dates: "Aug 2021 – May 2022", place: "Bengaluru",
      summary: "Enterprise data solutions and applications across GCP, AWS and Azure.",
      points: ["Scaled CI/CD and DevSecOps practice; Kubernetes workflows +28% faster; cloud cost control"],
    },
    {
      company: "Publicis Sapient", role: "Senior Associate – Cloud & DevOps", dates: "Sep 2020 – Jul 2021", place: "Bengaluru",
      summary: "Cloud migration, cloud-native delivery and DevSecOps across GCP, AWS and Azure.",
      points: [],
    },
    {
      company: "Capgemini", role: "Senior Technical Consultant", dates: "Jan 2016 – May 2020", place: "",
      summary: "Cloud DevOps consulting.",
      points: ["Led monolith-to-microservices migration on AWS, Azure & GCP — €3M+ annual savings for a major bank"],
    },
  ],

  earlier: [
    ["ISGN", "Senior Consultant – IT & Infrastructure", "2015"],
    ["Wipro", "Senior Infrastructure Engineer", "2011 – 2015"],
    ["Testing Planet", "Senior Lead Engineer", "2010 – 2011"],
    ["Collabera", "Senior System Engineer", "2008 – 2010"],
    ["R. K. Degree Institute of Technologies", "System Administrator", "2005 – 2008"],
  ],

  education: [
    { school: "WBS Coding School", degree: "Full Stack Web & App Dev Bootcamp", dates: "2024 – 2025" },
    { school: "Sikkim Manipal University", degree: "Master of Science (M.Sc.)", dates: "2004 – 2006" },
    { school: "Cachar College", degree: "B.Sc., Chemistry", dates: "2000 – 2004" },
  ],

  // Selected work — highlights from the experience above.
  work: [
    { title: "MMS Payment Platform", org: "MediaMarktSaturn", tags: ["GCP", "TFE", "FluxCD", "GKE"], desc: "Terraform Enterprise blueprint, GitOps and secure landing zones for customer-facing payments at 99.9%+ uptime." },
    { title: "Policy-driven Kubernetes", org: "PSI Software", tags: ["Kubernetes", "Policy-as-code", "OTel"], desc: "Workload identity, admission controls and observability — incidents −45%, MTTR −40%." },
    { title: "Multi-cloud AML platform", org: "Kerberos Compliance", tags: ["AWS", "GCP", "ArgoCD", "Istio"], desc: "Kubernetes-native platform with GitOps via Atlantis and Vault/Kyverno/Trivy security." },
    { title: "Monolith → Microservices", org: "Sonova Group", tags: ["Kubernetes", "GitHub Actions"], desc: "3-tier app moved to Kubernetes; weekly releases and €290k annual cloud savings." },
    { title: "Banking cloud migration", org: "Capgemini", tags: ["AWS", "Azure", "GCP"], desc: "Led microservices migration across three clouds — €3M+ annual savings." },
  ],

  book: {
    title: "Getting Started with Google Kubernetes Engine",
    by: "Co-authored with Nilanjana Saha",
    publisher: "BPB Publications, 2025",
    where: "Available on Amazon and Google Play",
    url: "https://bpbonline.com/products/getting-started-with-google-kubernetes-engine",
  },

  writesAbout: [
    "Platform engineering best practices",
    "DevSecOps lessons from real production incidents",
    "What running teaches about consistency in engineering",
    "Adapting to German work culture as an Indian immigrant",
    "Building resilient systems — cloud and personal habits",
    "Tech career growth in Germany and Europe",
  ],

  mentoring: {
    intro: "Help engineering teams build better platforms. Help engineers grow better careers. I mentor people moving into Cloud & DevOps — and those planning a move to Germany / Europe.",
    url: "https://topmate.io/nishanta_banik",
    sessions: [
      ["Free consultation", "15 min"],
      ["Career guidance in Cloud / DevOps", "39 min"],
      ["Ask me anything — Cloud, DevOps, Full-stack", "29 min"],
      ["CV / Resume review", "59 min"],
      ["Job change to Europe / Germany", "29 min"],
    ],
  },

  links: [
    { label: "LinkedIn", handle: "in/nishantabanik", url: "https://www.linkedin.com/in/nishantabanik/" },
    { label: "X", handle: "@nishantabanik81", url: "https://x.com/nishantabanik81" },
    { label: "GitHub", handle: "nishantabanik", url: "https://github.com/nishantabanik" },
    { label: "Topmate", handle: "nishanta_banik", url: "https://topmate.io/nishanta_banik" },
    { label: "Malt", handle: "nishantabanik", url: "https://www.malt.com/profile/nishantabanik" },
  ],
};
