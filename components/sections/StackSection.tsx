import {
  rowOneSkills,
  rowTwoSkills,
  dbSkills,
} from "@/data/index";

export const StackSection = () => {
  return (
    <section
      id="stack"
      className="reveal min-h-[80vh] border-1.5 border-[#E2D9C8] rounded-3xl bg-[#F0EBE1] p-6 md:p-12 relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-16">
        <h2 className="text-[#1C1B1A] text-4xl md:text-6xl font-bold tracking-tight uppercase animate-chars">
          The Stack
          <br />
          Architecture
        </h2>
        <p className="font-mono text-sm max-w-xs mt-4 md:mt-0 text-[#4A4135] animate-lines">
          A conceptual overview of the technologies I utilize to build
          end-to-end solutions.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto py-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#D4C6B0] -translate-x-1/2 hidden md:block z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="nav-link bg-white border-1.5 border-[#E2D9C8] rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full border-1.5 border-[#1C1B1A] flex items-center justify-center mb-6">
              <span className="font-mono text-xs font-bold">01</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Client</h3>
            <p className="text-[#4A4135] mb-6 font-mono text-sm">
              Presentation & Logic
            </p>
            <div className="w-full border-t-1.5 border-[#E2D9C8] pt-4 flex flex-col gap-2">
              {rowOneSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#FAF8F5] rounded-lg py-2 border border-[#E2D9C8] text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="nav-link bg-[#1C1B1A] text-[#FAF8F5] border-1.5 border-[#1C1B1A] rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 md:mt-16">
            <div className="w-16 h-16 rounded-full border-1.5 border-[#FAF8F5] flex items-center justify-center mb-6">
              <span className="font-mono text-xs font-bold">02</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Server</h3>
            <p className="text-[#C2A878] mb-6 font-mono text-sm">
              API & Processing
            </p>
            <div className="w-full border-t-1.5 border-[#4A4135] pt-4 flex flex-col gap-2">
              {rowTwoSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#4A4135] rounded-lg py-2 border border-[#4A4135] text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="nav-link bg-white border-1.5 border-[#E2D9C8] rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full border-1.5 border-[#1C1B1A] flex items-center justify-center mb-6">
              <span className="font-mono text-xs font-bold">03</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Database</h3>
            <p className="text-[#4A4135] mb-6 font-mono text-sm">
              Storage & Caching
            </p>
            <div className="w-full border-t-1.5 border-[#E2D9C8] pt-4 flex flex-col gap-2">
              {dbSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#FAF8F5] rounded-lg py-2 border border-[#E2D9C8] text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};