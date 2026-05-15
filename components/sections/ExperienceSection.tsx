import { experienceData } from "@/data/index";

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="reveal min-h-[80vh] border-1.5 border-[#E2D9C8] rounded-3xl p-6 md:p-12 bg-white relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-16">
        <h2 className="text-[#1C1B1A] text-4xl md:text-6xl font-bold tracking-tight uppercase animate-chars">
          Operational
          <br />
          History
        </h2>
        <p className="font-mono text-sm max-w-xs mt-4 md:mt-0 text-[#4A4135] animate-lines">
          A chronological log of my professional engagements and architectural
          contributions.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto py-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#E2D9C8] -translate-x-1/2 hidden md:block z-0"></div>

        <div className="flex flex-col gap-12 md:gap-0 relative z-10">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isPresent = exp.period.toLowerCase().includes("present");

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } w-full items-center md:h-64 group cursor-none mt-8 md:mt-0`}
              >
                {/* Meta Info */}
                <div
                  className={`w-full md:w-1/2 flex flex-col text-left mb-4 md:mb-0 relative ${
                    isLeft
                      ? "md:pr-16 md:items-end md:text-right"
                      : "md:pl-16"
                  }`}
                >
                  <div className={`md:hidden absolute left-0 top-2 w-3 h-3 rounded-full ${isPresent ? "bg-green-500 animate-pulse" : "bg-[#1C1B1A]"}`}></div>
                  
                  <div className="pl-6 md:pl-0">
                    <span className="font-mono text-sm text-[#A38A5A] mb-2 inline-block">
                      {exp.period}
                    </span>
                    <h3 className="text-3xl font-bold uppercase tracking-tight mb-2 transition-transform duration-300 group-hover:translate-x-1">
                      {exp.title}
                    </h3>
                    <p className="font-mono text-sm text-[#1C1B1A] mb-3">
                      {exp.company}
                    </p>
                    <span className="text-[#1C1B1A] border border-[#D4C6B0] rounded-full px-3 py-1 bg-[#FAF8F5] text-xs inline-block">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* CENTRAL TIMELINE NODE */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 items-center justify-center z-20">
                  
                  {/* THE OUTER PULSE RING: Only visible if isPresent */}
                  {isPresent && (
                    <>
                      {/* Static glow */}
                      {/* <div className="absolute inset-0 rounded-full bg-green-500/20 scale-[2.5]"></div> */}
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 rounded-full border border-green-500 animate-ping scale-[1.5] opacity-75"></div>
                    </>
                  )}

                  {/* THE MAIN DOT: 
                      Turns black on hover via 'group-hover' 
                      Maintains green color if 'isPresent' and NOT hovered
                  */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-30 shadow-[0_0_0_4px_#ffffff]
                      ${isPresent 
                        ? "bg-green-500 border-green-600 group-hover:bg-[#1C1B1A] group-hover:border-[#1C1B1A]" 
                        : "bg-white border-[#1C1B1A] group-hover:bg-[#1C1B1A]"
                      }`}
                  ></div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    isLeft ? "md:pl-16" : "md:pr-16 text-left md:text-right"
                  }`}
                >
                  <div className="bg-[#FAF8F5] border-1.5 border-[#E2D9C8] p-6 rounded-2xl group-hover:bg-white transition-colors relative">
                    <div
                      className={`hidden md:block absolute top-1/2 w-3 h-3 bg-[#FAF8F5] border-[#E2D9C8] -translate-y-1/2 -rotate-45 group-hover:bg-white transition-colors ${
                        isLeft ? "-left-2 border-t-1.5 border-l-1.5" : "-right-2 border-b-1.5 border-r-1.5"
                      }`}
                    ></div>
                    
                    <div className="text-[#4A4135] text-sm leading-relaxed space-y-2">
                      {Array.isArray(exp.highlights) ? (
                        exp.highlights.map((h, i) => (
                          <p key={i}>— {h}</p>
                        ))
                      ) : (
                        <p>{exp.highlights}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};