import Link from "next/link";
import ParticipateModalClient from "../components/ParticipateModalClient";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

export default function HomePage() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-40 inset-0 flex items-center justify-center flex-col  px-4">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/100 font-bold to-white/40 text-3xl text-center md:text-4xl lg:text-7xl">
          Join the Decentralized Lottery
        </p>
        <div className=" mx-auto">
          <p className=" my-4 animate__animated animate__zoomIn text-lg bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/100 to-white/40">
            Participate in our decentralized lottery system where transparency
            and fairness are guaranteed. Connect your wallet and get started!
          </p>
          <div className="relative gap-2 flex justify-center animate__animated animate__fadeInUp">
            <Link href="/wallet">
              <div className="custom-button">Connect your wallet</div>
            </Link>
            <ParticipateModalClient />
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
