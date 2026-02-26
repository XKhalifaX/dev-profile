const blogsData = [
    {
        label: "Post 01 · Progress Log",
        title: "PERN Procurement App — Week 1 Foundation",
        date: "Feb 2026",
        readingTime: "4 min",
        summary: "Set up the core request workflow and baseline architecture for procurement handling.",
        paragraphs: [
            "This week focused on establishing a stable foundation for requisition creation, approval flow, and status tracking before scaling features.",
            "I implemented initial API routes, wired data models, and built a practical front-end flow for creating and reviewing requests.",
            "The main challenge was keeping UI state and API state consistent as status transitions happened quickly."
        ],
        challenge: "I standardized response shapes and centralized update handling so UI behavior stayed predictable during each state transition.",
        nextStep: "Add role-based approval rules and strengthen validation around invalid request transitions.",
        keyLearnings: [
            "Consistent API response contracts reduce front-end complexity.",
            "Mapping workflow states early prevents rework later.",
            "Reusable handlers make rapid iteration safer."
        ]
    },
    {
        label: "Post 02 · Progress Log",
        title: "PERN Procurement App — Week 2 Data Integrity",
        date: "Feb 2026",
        readingTime: "5 min",
        summary: "Shifted from baseline flow to reliability, validation, and audit-ready behavior.",
        paragraphs: [
            "This cycle focused on making request operations safer and traceable under multi-user conditions.",
            "I added stricter server-side validation and refined lifecycle constraints to prevent invalid transitions.",
            "I also prepared the path for immutable audit logging and idempotent request operations."
        ],
        challenge: "Balancing strict rules with smooth UX required clear, user-facing error messages while still enforcing non-negotiable data constraints.",
        nextStep: "Introduce dashboard metrics and optimize query performance for larger datasets.",
        keyLearnings: [
            "Data integrity decisions are easier early than as patches.",
            "Error clarity is part of system design, not just UI polish.",
            "Idempotency planning lowers duplicate-processing risk."
        ],
        image: "",
        imageAlt: ""
    }
];
