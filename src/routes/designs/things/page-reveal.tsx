import { createFileRoute } from "@tanstack/react-router";
import { RepeatIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/designs/things/page-reveal")({
  component: RouteComponent,
});

function RouteComponent() {
  const [key, setKey] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);
    // Delay matches your final iris animation delay (2s)
    const timer = setTimeout(() => setShowVideo(true), 2000);
    return () => clearTimeout(timer);
  }, [key]);

  return (
    <main className="flex flex-col gap-4 w-full items-center">
      {key !== 0 && (
        <section
          className="bg-black border border-black w-4/5 h-auto aspect-video relative overflow-hidden"
          key={key}
        >
          <div className="absolute inset-0 z-10 bg-sky-400 w-full h-full animate-in slide-in-from-top duration-500 delay-500 fill-mode-both ease-out"></div>
          <div className="absolute inset-0 z-20 bg-yellow-300 w-full h-full animate-in slide-in-from-top duration-500 delay-650 fill-mode-both ease-out"></div>
          <div className="absolute inset-0 z-30 bg-white w-full h-full animate-in slide-in-from-top duration-500 delay-800 fill-mode-both ease-out"></div>
          <div className="absolute top-0 left-0 w-full aspect-square z-40 translate-y-[10%] scale-200">
            <div
              className="
            absolute inset-0 z-10 rounded-full bg-cyan-400
            [--fill:0%]
            animate-[iris-both_1s_ease-out_1.5s_both]
            [mask-image:conic-gradient(from_0deg,white_0%,white_var(--fill),transparent_var(--fill),transparent_calc(100%-var(--fill)),white_calc(100%-var(--fill)))]
          "
            />
            <div
              className="
            absolute inset-0 z-20 rounded-full bg-yellow-300
            [--fill:0%]
            animate-[iris-both_1s_ease-out_1.65s_both]
            [mask-image:conic-gradient(from_0deg,white_0%,white_var(--fill),transparent_var(--fill),transparent_calc(100%-var(--fill)),white_calc(100%-var(--fill)))]
          "
            />
            <div
              className="
            absolute inset-0 z-20 rounded-full bg-white
            [--fill:0%]
            animate-[iris-both_1s_ease-out_1.8s_both]
            [mask-image:conic-gradient(from_0deg,white_0%,white_var(--fill),transparent_var(--fill),transparent_calc(100%-var(--fill)),white_calc(100%-var(--fill)))]
          "
            />
            <div
              className="
            absolute inset-0 z-30 rounded-full
            [--fill:0%]
            animate-[iris-both_1s_ease-out_2s_both]
            [mask-image:conic-gradient(from_0deg,white_0%,white_var(--fill),transparent_var(--fill),transparent_calc(100%-var(--fill)),white_calc(100%-var(--fill)))]
          "
            >
              <div className="w-full h-full flex items-center justify-center bg-gray-100 -translate-y-[16%]">
                {showVideo && (
                  <iframe
                    width="560"
                    height="315"
                    /* mute=1 is REQUIRED for autoplay to work in most browsers */
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <button
        className="bg-slate-50 px-4 py-2 w-fit flex gap-2 items-center text-sm cursor-pointer"
        onClick={() => setKey((key) => key + 1)}
      >
        <RepeatIcon className="size-4" />
        Play Animation
      </button>
    </main>
  );
}
