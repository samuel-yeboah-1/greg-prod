import { BoxReveal } from "../magicui/box-reveal";
export function RegisterInterestReveal() {
  return (
    <div className="size-full max-w-lg flex flex-col items-start justify-center overflow-hidden pt-12 pb-8 gap-6">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex flex-col items-start gap-2">
          <span className="text-[2.5rem] md:text-[3.2rem] font-black tracking-tight leading-tight text-blue-900 dark:text-blue-200 drop-shadow-sm">
            <span role="img" aria-label="wave">
              👋
            </span>{" "}
            Questions? Curious about Greg?
          </span>
          <span className="block w-12 h-1 bg-gradient-to-r from-[#5046e6] to-blue-400 rounded-full mt-1 mb-2" />
        </div>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-blue-100 leading-relaxed max-w-md mx-0 text-left">
          We’re still behind the scenes building something we think you’ll love.
          <br />
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            Drop us a note
          </span>{" "}
          — whether it’s feedback, interest, or just to say hi.
        </p>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-2 flex flex-col items-start gap-2">
          <a
            href="mailto:info@gregthe.ai"
            className="text-xl md:text-2xl font-bold text-[#5046e6] flex items-center gap-2 hover:underline hover:text-blue-700 transition-colors duration-200"
          >
            <span role="img" aria-label="mailbox">
              📬
            </span>{" "}
            info@gregthe.ai
          </a>
          <span className="text-xs text-gray-500 dark:text-blue-200 italic mt-1">
            (Real humans read this. Promise.)
          </span>
        </div>
      </BoxReveal>
    </div>
  );
}
