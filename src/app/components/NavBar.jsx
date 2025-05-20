import Leaf from "../../../public/cute_leaf.png";
import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
  return (
    <div className="pl-6 pr-4 pt-4 text-xl flex gap-[600px] items-center ">
      <div>
        <Link href="/">CabZee</Link>
      </div>
      <div className="flex gap-6">
        <div className=" p-4  flex items-center justify-center text-lg">
          <Link href="/">Home</Link>
        </div>
        <div className=" p-4  flex items-center justify-center text-lg">
          <Link href={"/your-rides"}>Your rides</Link>
        </div>
        <div className=" p-4  flex items-center justify-center text-lg">
          Publish
        </div>
        <div className="h-12 w-12 p-4 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-md flex items-center justify-center">
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
          </div>
        </div>
        <div className="">
          <Image src={Leaf} height={12} width={50} alt="helo" />
        </div>
      </div>
    </div>
  );
}
