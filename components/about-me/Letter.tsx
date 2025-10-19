import React from 'react';
import Image from 'next/image';
import AquaWolfPFP from '@/public/images/svg/aquawolf-pfp.svg';

export default function Letter() {
  return (
    <div className="relative px-5 lg:px-0">
      <h2 className="text-transparent">About Me</h2>
      <div className="relative">
        {/* Letter Bottom */}
        <div className="absolute left-0 top-0 z-10 h-full w-full -rotate-1 rounded-lg bg-letter-middle lg:-rotate-2"></div>
        {/* Letter Middle */}
        <div className="absolute left-1 top-1 z-20 h-[98%] w-[98%] -rotate-1 rounded-lg bg-letter-bottom lg:left-3 lg:top-10 lg:h-[95%] lg:w-[98%] lg:rotate-3"></div>
        {/* Letter Top */}
        <div className="relative z-30 -rotate-1 rounded-lg bg-letter-top shadow-letter-top lg:rotate-2 lg:rounded-xl">
          <article className="space-y-4 p-4 text-base text-white/80 lg:space-y-5 lg:p-5 lg:px-24 lg:py-14 lg:text-2xl">
            <p>What&apos;s Up Everyone, I&apos;m AquaWolf from Miami, FL</p>
            <p>
              So, my story&apos;s kinda wild. Started my coding journey back in
              2016 learning the fundamentals, but I quickly got swept up in the
              JavaScript revolution that was transforming the web.
            </p>
            <p>
              React, TypeScript, Next.js, Node.js - I dove headfirst into the
              modern ecosystem. But what really captured me was the intersection
              of design and technology - mastering Figma, UI/UX principles, and
              creating interfaces that weren&apos;t just functional, but
              genuinely delightful.
            </p>
            <p>
              I became truly full-stack in the modern sense - designing
              intelligent user experiences in Figma, developing with
              cutting-edge frameworks, and deploying scalable applications. This
              wave carried me straight into the crypto craze of October 2021.
            </p>
            <p>
              Helped launch some really big NFT projects - DAW, TheLostKingdom &
              SuperFuzz. My code generated over 28m+ and I achieved massive
              personal success...
            </p>
            <p>But fuck, burnout hit me like a big 18 wheeler truck.</p>
            <p>I was lost, ship wrecked, stranded at sea with no boat.</p>
            <p>
              So I decided to shake things up. Went on a spiritual vision quest,
              traveling the world for 2 years, searching for meaning and healing
              from the chaos.
            </p>
            <p>
              Deep dive into consciousness, healing, and rediscovering what
              truly mattered. I was so broken I honestly didn&apos;t even want
              to code anymore, but eventually I found my way back to myself.
            </p>
            <p>
              And here&apos;s the beautiful part - I came back to find the world
              had transformed. AI wasn&apos;t just a buzzword anymore - it was
              revolutionizing how we build, design, and think about user
              experiences.
            </p>
            <p>
              Now I truly understand how everything connects. AI-powered design
              workflows, intelligent TypeScript applications, Next.js with
              built-in AI capabilities, the entire modern stack working in
              harmony. I can take an idea from AI-assisted design in Figma to
              production deployment with intelligent features baked in.
            </p>
            <p>So, now I&apos;m back in the mix, wearing a bunch of hats:</p>
            <ul className="list-disc pl-6">
              <li>
                AI-Powered Full-Stack Developer (TypeScript, React, Next.js)
              </li>
              <li>UI/UX Designer & AI Design Tools Expert</li>
              <li>DevOps Engineer (Modern Cloud & AI Infrastructure)</li>
              <li>Live Stream Coding (Building AI-Powered Projects)</li>
              <li>AI Integration Specialist & Creative Problem Solver</li>
            </ul>
            <p>
              My mission is to bridge the gap between AI, design, and
              development, creating intelligent end-to-end solutions from
              concept to deployment. I believe in building experiences that are
              not just technically robust but also beautifully designed,
              AI-enhanced, and meaningfully crafted for the future.
            </p>
            <p>
              Always open to connecting with fellow builders, designers, and AI
              enthusiasts. Whether it&apos;s discussing AI-powered design
              systems, modern TypeScript architectures, Next.js applications, or
              exploring the cutting edge of human-AI collaboration, I&apos;m
              here for it.
            </p>
            <p>Let&apos;s build the future together.</p>
            <div className="relative flex flex-col items-center gap-2">
              <div className="self-start">
                Wholeness & Balanced Vibrations 🙏
              </div>
            </div>
            <div className="mb-10 font-handwriting text-4xl lg:text-6xl">
              <div className="text-white">AquaWolf</div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Image src={AquaWolfPFP} alt="AquaWolf PFP" />
              </div>
              <div className="lg:ml-4">
                <div className="text-xl font-semibold text-white lg:text-2xl">
                  L4 DEV
                </div>
                <div className="text-[12px] lg:text-lg">
                 Desarrollador Full-Stack
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
