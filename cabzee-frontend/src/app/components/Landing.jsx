"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Car from "../../../public/car1.png";
import MainForm from "./MainForm";
import { motion } from "framer-motion";
import { PointerHighlight } from "./ui/pointer-highlight";
import { AnimatedModalDemo } from "./somepage";
import { useRouter } from "next/navigation";
export default function Landing() {
  const router = useRouter();

  return (
    <div className="flex relative w-full p-8 gap-[80px]">
      <div className="flex flex-col w-full">
        <div className="min-h-screen flex flex-col mt-[20px] px-4 text-left ">
          {/* Headline */}
          <motion.h1
            className="text-[40px] font-semibold tracking-tight leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PointerHighlight
              rectangleClassName="bg-sky-200 border-sky-200 dark:border-sky-200 leading-loose border-2 p-4"
              pointerClassName="text-yellow-500 h-3 w-3"
              containerClassName="inline-block mr-1"
            >
              <span className="relative z-10">Now Students,</span>
            </PointerHighlight>
            There is no need to say,"Take me too, please!"
          </motion.h1>

          {/* Subheading */}

          <motion.div
            className="text-md sm:text-lg text-gray-600 mt-3 max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Just book using{" "}
            <span>
              <b>CabZee</b>
            </span>{" "}
            and Share rides, split costs, and make the journey part of the
            experience all within a trusted student community.
          </motion.div>

          <motion.div
            className="mt-6 mr-52"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MainForm />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="lg:flex lg:w-1/2 h-screen mt-14 mr-16 flex flex-col"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Image
          src={Car}
          alt="car"
          className="h-[350px] w-[400px] object-cover rounded-lg z-0"
        />

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-[17px] mt-8 text-left">
            Going somewhere and have some space in your car?
          </p>
          <button
            className="bg-black text-sm text-white rounded-lg mt-8 h-10 p-3 cursor-pointer"
            onClick={() => router.push("/publish")}
          >
            Publish
          </button>
        </motion.div>
      </motion.div>
      {/* <div className="absolute bottom-0 right-0 w-[400px] h-[400px]">
        <AnimatedModalDemo />
      </div> */}
    </div>
  );
}
