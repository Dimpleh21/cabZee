import Image from "next/image";
import Car from "../../../public/car2.png";
import MainForm from "./MainForm";

export default function Landing() {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src={Car}
        alt="car"
        className="opacity-30 h-[400px] w-full object-cover"
      />

      {/* Form Positioned on top of image */}
      <div className="flex gap-7 pl-8">
        <div className="absolute top-[200px] left-[100px] flex gap-[300px] ">
          <div className="text-white text-sm lg:text-lg w-full max-w-md leading-relaxed z-10">
            <p>
              <strong className="text-2xl text-yellow-200">CabZee</strong> is a
              student-only carpooling platform that makes traveling between
              college, home, or events easy and affordable. Whether you're
              <span className="text-yellow-200">
                {" "}
                heading home for the weekend{" "}
              </span>
              or
              <span className="text-yellow-200">
                {" "}
                catching a ride to the next campus fest,{" "}
              </span>
              CabZee connects you with fellow students going the same way. Share
              rides, split costs, and make the journey part of the experience
              all within a trusted student community.
            </p>
          </div>
          <div>
            <MainForm />
          </div>
        </div>
      </div>
    </div>
  );
}
