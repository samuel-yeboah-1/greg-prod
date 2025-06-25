"use client";
import HighlightText from "@/components/misc/highlight";
import gsap from "gsap";
import RegisterYourInterest from "@/components/landing-page/RegisterYourInterest";
import ContactUs from "@/components/landing-page/Contact-Us";
import { BoxReveal } from "@/components/magicui/box-reveal";
import VoiceOver from "@/components/misc/VoiceOver";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  useEffect(() => {
    let titleSplit: any = null;
    let subtitleSplit: any = null;
    const container = containerRef.current;
    const sections = sectionsRef.current;

    if (titleRef.current) {
      titleSplit = new SplitText(titleRef.current, { type: "words,chars" });
      gsap.from(titleSplit.chars, {
        y: 100,
        opacity: 0,
        duration: 2,
        stagger: 0.05,
        ease: "bounce.out",
      });
    }

    if (subtitleRef.current) {
      subtitleSplit = new SplitText(subtitleRef.current, {
        type: "words,chars",
      });
      gsap.from(subtitleSplit.words, {
        y: 100,
        opacity: 0,
        duration: 2,
        stagger: 0.05,
        ease: "elastic.inOut",
      });
    }

    gsap.set(sections, {
      y: "100vh",
      opacity: 0,
    });
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=300%", // Adjust this based on how much scroll you want
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const sectionCount = sections.length;
        sections.forEach((section, index) => {
          // Calculate when each section should start animating
          const sectionStart = index / sectionCount;
          const sectionEnd = (index + 1) / sectionCount;

          if (progress >= sectionStart && progress <= sectionEnd) {
            // Calculate progress within this section
            const sectionProgress =
              (progress - sectionStart) / (sectionEnd - sectionStart);

            // Animate the section in
            gsap.to(section, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          } else if (progress < sectionStart) {
            // Keep section below screen
            gsap.set(section, {
              y: "100vh",
              opacity: 0,
            });
          }
        });
      },
    });
    return () => {
      if (titleSplit) titleSplit.revert();
      if (subtitleSplit) subtitleSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  return (
    <>
      <main className="flex flex-col gap-20  overflow-hidden items-center px-36">
        <div className="flex flex-col items-center justify-center  h-screen relative">
          <div className="flex flex-col items-center justify-center gap-5">
            <p
              ref={titleRef}
              className="title tracking-wider font-extrabold text-5xl md:text-8xl text-blue-500 text-center"
            >
              GREG.
            </p>

            <p
              ref={subtitleRef}
              className="tracking-wider font-extrabold text-3xl md:text-5xl text-blue-500 text-center subtitle"
            >
              Post Sales Reinvented
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center gap-10">
            <HighlightText
              className=" title tracking-wider font-extrabold text-3xl md:text-3xl text-center"
              text="Account Management isn't meant to be paper work"
            />
            <div>
              <BoxReveal>
                <HighlightText
                  text="Yet... We spend 50% of our time doing it"
                  className="text-heading-three"
                />
              </BoxReveal>
            </div>
          </div>
        </div>
        {/* Demo Section */}

        <div className="h-[400vh]">
          {" "}
          {/* Extra height to enable scrolling */}
          <div
            ref={containerRef}
            className="flex items-center justify-center flex-row gap-10 h-screen"
          >
            <div className="flex-1 flex flex-col gap-20">
              <section
                ref={addToRefs}
                className="flex items-center justify-center flex-col gap-10"
              >
                <h2 className="text-heading-three">
                  Let Greg, your AI-powered assistant, handle the admin
                  chaos{" "}
                </h2>
                <h2 className="text-heading-three">
                  So you can focus on what actually moves the needle: your
                  customers.
                </h2>
              </section>

              <section
                ref={addToRefs}
                className="flex items-center justify-center flex-col gap-10"
              >
                <h2 className="text-heading-three">
                  Get in line before Greg starts ghosting humans.
                  <br />
                  Early users get first dibs, feedback perks, and eternal glory.
                </h2>
              </section>

              <section ref={addToRefs} className="flex w-full">
                <RegisterYourInterest />
              </section>
            </div>

            <div className="flex-1">
              <VoiceOver />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-center"></div>
        <ContactUs />
      </main>
    </>
  );
}
