"use client";
import Magnet from "@/components/misc/magnet";
import Link from "next/link";
import { CoolMode } from "@/components/misc/cool-mode";
import { Button } from "@/components/ui/button";
import HighlightText from "@/components/misc/highlight";
import { AnimatedBeamDemo } from "@/components/misc/AnimatedBeam";
import { FileTreeDemo } from "@/components/misc/FileTree";
import { useRef, useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutUsSection } from "@/components/landing-page/About-Us";
import RegisterYourInterest from "@/components/landing-page/RegisterYourInterest";
import ContactUs from "@/components/landing-page/Contact-Us";
import Folder from "@/blocks/Components/Folder/Folder";
import Orb from "@/blocks/Components/Orb/Orb";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const highlightRef = useRef(null);
  const gregRef = useRef(null);
  useEffect(() => {
    // HighlightText scroll-trigger animation
    let split: SplitType | null = null;
    if (highlightRef.current) {
      split = new SplitType(highlightRef.current, { types: "words" });

      gsap.fromTo(
        split.words,
        {
          y: 80,
          opacity: 0,
          rotate: 8,
          scale: 0.95,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.06,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: highlightRef.current,
            start: "top 80%",
          },
        },
      );
      if (gregRef.current) {
        split = new SplitType(gregRef.current, { types: "words" });
        gsap.fromTo(
          split.words,
          {
            x: 0,
            yoyo: true,
            rotation: 360,
            duration: 2,
            ease: "bounce.inOut",
          },
          {
            x: 150,
          },
        );
      }
    }

    return () => {
      if (split) {
        split.revert();
      }
    };
  }, []);
  return (
    <>
      <main className="flex flex-col gap-40 ">
        <div className="flex flex-col gap-20 items-center justify-center  h-screen overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-5">
            <p
              ref={gregRef}
              className="tracking-wider font-extrabold text-5xl md:text-8xl text-blue-500 text-center"
            >
              GREG.
            </p>

            <p className="tracking-wider font-extrabold text-3xl md:text-5xl text-blue-500 text-center">
              Post Sales Reinvented
            </p>
          
          </div>

          {/* <Link href="/register">
            <Button className="bg-black text-white dark:bg-blue-500 dark:text-white">
              Register your interest
            </Button>
          </Link> */}
        </div>
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-20">
            <HighlightText
              className="tracking-wider font-extrabold text-5xl lg:text-8xl align-middle text-center md:text-justify"
              text="Account Management isn't meant to be paperwork"
            />
            <div>
              <p>Yet... We spend 50% of our time doing it</p>
            </div>
          </div>
        </div>
        {/* Demo Section */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 w-full">
            <div className="flex-1 flex flex-col justify-center items-center">
              <FileTreeDemo />
            </div>
            <div className="flex-1 flex flex-col justify-between items-stretch">
              <div className="mb-4 self-start">
                <p>Greg your AI-Powered assistant can handle the admin chaos</p>
              </div>
              <div className="self-end">
                <Folder />
              </div>
            </div>
          </div>
          <div>
            <div>
              
            <p>So you can focus on what actually moves the needle, your customers</p>
            </div>
            <div>

            </div>
          <div className="flex-1 w-full">
              <AnimatedBeamDemo />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          <div>
            <Orb />
          </div>
          <div>
            <p>
              Get in line before Greg starts ghosting humans.
              <br />
              Early users get first dibs, feedbacks perks, and eternal glory
            </p>
          </div>
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-2 w-full p-14"
          id="register-your-interest"
        >
          <RegisterYourInterest />
        </div>
        </div>
        <ContactUs />
      </main>
    </>
  );
}
