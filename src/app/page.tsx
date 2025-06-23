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
      <main className="flex flex-col gap-40">
        <div className="flex flex-col gap-20 items-center justify-center  h-screen overflow-hidden">
          <div className="flex flex-row items-center justify-center">
            <Magnet className="tracking-wider font-extrabold text-5xl md:text-8xl text-blue-500 text-center">
              <span ref={gregRef}>GREG.</span>
            </Magnet>
          </div>

          <Link href="/register">
            <Button className="bg-black text-white dark:bg-blue-500 dark:text-white">
              Register your interest
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <HighlightText
              ref={highlightRef}
              className="tracking-wider font-extrabold text-5xl lg:text-8xl align-middle text-center md:text-justify"
              text="Integrate With Your App"
            />
          </div>

          {/* Demo Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex-1 w-full">
              <FileTreeDemo />
            </div>
            <div className="flex-1 w-full">
              <AnimatedBeamDemo />
            </div>
          </div>
        </div>
        {/* About Us Section */}
        <AboutUsSection />
        {/* Register Section */}
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-2 w-full p-14"
          id="register-your-interest"
        >
          <RegisterYourInterest />
        </div>
        <ContactUs />
      </main>
    </>
  );
}
