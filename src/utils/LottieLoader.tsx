import animation from "../../public/animation/bird.json";
import { useLottie } from "lottie-react";

export default function LottieLoader() {
  const { View } = useLottie({
    animationData: animation,
    loop: true,
  });

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
      <div className="w-48 h-48">{View}</div>
    </div>
  );
}
