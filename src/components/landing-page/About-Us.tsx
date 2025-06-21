import React from "react";

const aboutCards = [
  {
    title: "🔹 Core Identity & Value Proposition",
    items: [
      "Redefining Customer Success through AI-driven automation.",
      "From implementation to renewal — Greg powers every stage of the customer journey.",
      "Built for CSMs. Backed by AI. Designed to scale.",
      "Customer Success, without the guesswork.",
      "Turn documents into decisions with AI-powered insights."
    ]
  },
  {
    title: "🔹 Product Benefits & Differentiators",
    items: [
      "Upload. Ask. Act. Greg makes your customer data work for you.",
      "Surface KPIs, spot risks, and track milestones — all through chat.",
      "Say goodbye to manual parsing — Greg transforms unstructured documents into strategic clarity.",
      "Workflows built on intelligence, not input fields.",
      "Empower your team with always-on AI, built to understand your customers."
    ]
  },
  {
    title: "🔹 Technical Edge",
    items: [
      "Built for scalability and performance, Greg integrates seamlessly into your tech stack and scales effortlessly with your customer base.",
      "Whether you're managing onboarding, tracking milestones, or forecasting renewals, Greg ensures that every stage of the customer journey is powered by intelligence, not manual input.",
      "It’s not just a tool — it’s your partner in delivering consistent, data-driven customer success."
    ]
  },
  {
    title: "🔹 Greg bridges the gap",
    items: [
      "Greg bridges the gap between scattered customer data and strategic execution.",
      "Transforms unstructured documents into structured insights, empowering Customer Success teams to uncover key metrics, identify risks, and track progress without sifting through endless files or dashboards.",
      "Every interaction is enhanced by AI, allowing CSMs to ask questions, validate suggestions, and act with confidence — all within a streamlined, chat-first interface."
    ]
  }
];

export function AboutUsSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <h4 className="text-5xl md:text8xl">ABOUT US</h4>
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
        <div className="flex flex-col gap-8">
          {aboutCards.slice(0, 2).map((card, idx) => (
            <div
              key={card.title}
              className="about-card group bg-white/80 dark:bg-[#0a1832] rounded-2xl shadow-2xl p-6 md:p-8 w-[90vw] max-w-[500px] h-auto min-h-[340px] md:w-[500px] md:h-[380px] border border-blue-100 dark:border-blue-900 transition-transform duration-300 hover:-translate-y-2 hover:shadow-blue-200 dark:hover:shadow-blue-900/40 cursor-pointer flex flex-col"
            >
              <p className="text-lg text-gray-900 dark:text-blue-100 font-semibold">
                {card.title}
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-blue-200 space-y-1 flex-1">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className="transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {aboutCards.slice(2).map((card, idx) => (
            <div
              key={card.title}
              className="about-card group bg-white/80 dark:bg-[#0a1832] rounded-2xl shadow-2xl p-6 md:p-8 w-[90vw] max-w-[500px] h-auto min-h-[340px] md:w-[500px] md:h-[380px] border border-blue-100 dark:border-blue-900 transition-transform duration-300 hover:-translate-y-2 hover:shadow-blue-200 dark:hover:shadow-blue-900/40 cursor-pointer flex flex-col"
            >
              <p className="text-lg text-gray-900 dark:text-blue-100 font-semibold">
                {card.title}
              </p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-blue-200 space-y-1 flex-1">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className="transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
