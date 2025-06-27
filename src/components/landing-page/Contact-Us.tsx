import React from "react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

function ContactUs() {
  //To-do
  // const handleQuery = async () => {
  //   await handleQueryEmail
  // }
  return (
    <div className="w-full max-w-lg flex flex-col items-start justify-center overflow-hidden pt-12 pb-8 gap-6 px-4 sm:px-6 md:px-8 mx-auto">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex flex-col items-start gap-5 text-center">
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[3.2rem] font-black tracking-tight leading-tight text-blue-900 dark:text-blue-200 drop-shadow-sm">
            Questions?
          </span>
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[3.2rem] font-black tracking-tight leading-tight text-blue-900 dark:text-blue-200 drop-shadow-sm whitespace-nowrap">
            Curious about Greg?
          </span>
        </div>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="flex flex-col gap-5">
          <p className="text-sm xs:text-base md:text-lg font-medium text-gray-700 dark:text-blue-100 leading-relaxed max-w-md mx-0 text-left">
            We’re still behind the scenes building something we think you’ll
            love.
            <br />
            <span className="text-blue-700 dark:text-blue-300 font-semibold">
              Drop us a note
            </span>{" "}
            — whether it’s feedback, interest, or just to say hi.
          </p>
          <div>
            <div className=" flex flex-col gap-5">
              <Textarea />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-2 flex flex-col items-start gap-2">
          <span className="text-xs text-gray-500 dark:text-blue-200 italic mt-1">
            (Real humans read this. Promise.)
          </span>
        </div>
      </BoxReveal>
    </div>
  );
}

export default ContactUs;
