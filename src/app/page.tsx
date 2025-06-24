"use client";
import HighlightText from "@/components/misc/highlight";
import { AnimatedBeamDemo } from "@/components/misc/AnimatedBeam";
import { FileTreeDemo } from "@/components/misc/FileTree";
import { useRef, useEffect } from "react";
import SplitType from "split-type";
import { SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RegisterYourInterest from "@/components/landing-page/RegisterYourInterest";
import ContactUs from "@/components/landing-page/Contact-Us";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Particles from "@/components/misc/Particles";
import VoiceOver from "@/components/misc/VoiceOver";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });
    const subHeroSplit = new SplitText(".subtitle", { type: "chars, words" });

    gsap.from(heroSplit.chars, {
      y: -180,
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(subHeroSplit.chars, {
      x: -120, // Start from left
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.04,
      delay: 0.3,
    });

    gsap.to(".title", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".title",
        start: "top top",
        end: "top -60%",
        scrub: true,
      },
    });

    gsap.to(".subtitle", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".subtitle",
        start: "top top",
        end: "top -60%",
        scrub: true,
      },
    });
  }, []);
  // const highlightRef = useRef(null);
  // const gregRef = useRef(null);
  // useEffect(() => {
  //   // HighlightText scroll-trigger animation
  //   let split: SplitType | null = null;
  //   if (highlightRef.current) {
  //     split = new SplitType(highlightRef.current, { types: "words" });

  //     gsap.fromTo(
  //       split.words,
  //       {
  //         y: 80,
  //         opacity: 0,
  //         rotate: 8,
  //         scale: 0.95,
  //         filter: "blur(6px)",
  //       },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         rotate: 0,
  //         scale: 1,
  //         filter: "blur(0px)",
  //         stagger: 0.06,
  //         duration: 1.1,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: highlightRef.current,
  //           start: "top 80%",
  //         },
  //       },
  //     );
  //   }

  //   return () => {
  //     if (split) {
  //       split.revert();
  //     }
  //   };
  // }, []);

  return (
    <>
      <main className="flex flex-col gap-40 px-20 overflow-hidden ">
        <div className="flex flex-col items-center justify-center  h-screen relative">
          <div className=" absolute top-0 w-screen h-screen z-30 pointer-events-none">
            <Particles />
          </div>
          <div className="flex flex-col items-center justify-center gap-5 z-50">
            <p className="title tracking-wider font-extrabold text-5xl md:text-8xl text-blue-500 text-center">
              GREG.
            </p>

            <p className="tracking-wider font-extrabold text-3xl md:text-5xl text-blue-500 text-center subtitle">
              Post Sales Reinvented
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center gap-20">
            <HighlightText
              className=" text-heading-one"
              text="Account Management isn't meant to be paper work"
            />
            <div>
              <BoxReveal>
                <p className=" font-extrabold text-4xl lg:text-6xl align-middle text-center md:text-justify">
                  Yet... We spend 50% of our time doing it
                </p>
              </BoxReveal>
            </div>
          </div>
        </div>
        {/* Demo Section */}
        <div className="flex items-center  justify-center">
          <div className="flex flex-row gap-5  items-center">
            <div className="flex-1">
              <h2 className="">
                Let Greg, your AI-powered assistant, handle the admin chaos
              </h2>
              <h2>So you can focus on what moves the needle, your customers</h2>
            </div>
            <div className="flex-1">
              <VoiceOver />
            </div>
          </div>
        </div>

        <div className="flex items-center  justify-center">
          <div className="flex flex-row gap-5  items-center w-full ">
            <div className="flex-1">
              <h2 className="">
                Let Greg, your AI-powered assistant, handle the admin chaos
              </h2>
              <h2>So you can focus on what moves the needle, your customers</h2>
            </div>
            <div className="flex-1">
              <VoiceOver />
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-center w-full">
          <div className="flex flex-row gap-5  items-center justify-center w-full">
            <div className="flex-1 items-center justify-center flex">
              <RegisterYourInterest />
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
