import Lottie from "lottie-react";
import LottieAnimation from "../../assets/lottie/Animation - 1751718515836.json";
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-svh">
      <Lottie
        animationData={LottieAnimation}
        loop
        autoplay
        className="w-36 h-36"
      />
      <p className="mt-4 text-lg font-bold text-gray-800">
        Loading, please wait...
      </p>
    </div>
  );
}
