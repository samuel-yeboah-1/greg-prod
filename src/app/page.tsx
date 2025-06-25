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
 
  return (
    <>
      <main className="flex flex-col gap-20  overflow-hidden items-center px-36">
        <div className="flex flex-col items-center justify-center  h-screen relative">
          {/* <div className=" absolute top-0 w-screen h-screen z-30 pointer-events-none">
            <Particles />
          </div> */}
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="title tracking-wider font-extrabold text-5xl md:text-8xl text-blue-500 text-center">
              GREG.
            </p>

            <p className="tracking-wider font-extrabold text-3xl md:text-5xl text-blue-500 text-center subtitle">
              Post Sales Reinvented
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-20">
            <HighlightText
              className=" title tracking-wider font-extrabold text-3xl md:text-3xl text-center"
              text="Account Management isn't meant to be paper work"
            />
            <div>
              <BoxReveal>
                <p className="text-heading-three">
                  Yet... We spend 50% of our time doing it
                </p>
              </BoxReveal>
            </div>
          </div>
        </div>
        {/* Demo Section */}
        
        <div className="flex items-center justify-center flex-row gap-10 h-screen">
          <div className="flex-1 flex items-center justify-center flex-col gap-10">
            <h2 className="text-heading-three">
              Let Greg, your AI-powered assistant, handle the admin chaos{" "}
            </h2>
            <h2 className="text-heading-three">
              So you can focus on what actually moves the needle: your customers.
            </h2>
          </div>
          <div className="flex-1">
            <VoiceOver />
          </div>
        </div>

        <div className="flex items-center justify-center flex-row gap-10 h-screen">
          <div className="flex-1 flex items-center justify-center flex-col gap-10">
            <h2 className="text-heading-three">
              Get in line before Greg starts ghosting humans.
            <br />
              Early users get first dibs, feedback perks, and eternal glory.
            </h2>
          </div>
          <div className="flex-1">
            <VoiceOver />
          </div>
        </div>
      

        <div className="flex flex-row gap-5 items-center justify-center w-full">
          <div className="flex-1 items-center justify-center flex">
            <RegisterYourInterest />
          </div>
          <div className="flex-1">
            <VoiceOver />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-center"></div>
        <ContactUs />
      </main>
    </>
  );
}
