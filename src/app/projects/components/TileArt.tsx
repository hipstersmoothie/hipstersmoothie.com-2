import Image from "next/image";
import { IPhone, MacWindow, Watch } from "./Devices";

/**
 * The picture on a featured tile. Projects with screenshots get their devices; the rest get
 * a composition in their own palette, not a placeholder. Positioned inside the tile's art area.
 */
export function TileArt({ slug }: { slug: string }) {
  switch (slug) {
    case "sesh":
      return (
        <>
          <MacWindow
            src="/projects/sesh-mac.png"
            alt=""
            width={2784}
            height={1824}
            className="hidden md:block absolute left-[-3%] top-[9%] w-[158%]"
          />
          <IPhone
            src="/projects/sesh-iphone.png"
            alt=""
            className="absolute left-9 bottom-[-34%] w-[46%] md:left-auto md:right-7 md:bottom-[-5%] md:w-[26%] md:min-w-[130px]"
          />
          <Watch
            src="/projects/sesh-watch.png"
            alt=""
            className="absolute right-9 bottom-6 w-[30%] md:right-auto md:left-[-9%] md:bottom-9 md:w-[19%] md:min-w-[100px]"
          />
        </>
      );
    case "tcm":
      return <DefinitionGraph />;
    case "graze":
      return (
        <svg
          viewBox="0 0 1066 1066"
          aria-hidden="true"
          className="absolute right-[-10%] bottom-[-22%] w-[72%] max-w-[360px]"
        >
          <path className="fill-[#07c0c1] dark:fill-[#0f6f70]" d="M353.066 915c-195 0-298-105-298-334v-2c0-286 173-423 491-423 292 0 429 92 455.004 319H589.066c-4-10-16-16-42-16-45 0-66 29-66 95s17 88 63 88c34 0 48-11 55-31h-94V498h494v398h-375l-13-217c-23 190-119 236-258 236z" />
        </svg>
      );
    case "standard-reader":
      return (
        <>
          <Paper className="left-9 right-[40%] bottom-[-8%] h-[70%]" headWidth="70%" />
          <Paper className="left-[42%] right-9 bottom-[-20%] h-[70%] rotate-3" headWidth="50%" />
        </>
      );
    case "atstore":
      // at·store's hero: a heavy, tight headline with the one blue word, run off the tile's bottom.
      return (
        <p
          aria-hidden="true"
          className="absolute left-9 bottom-[-0.1em] m-0 font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,6vw,76px)] text-[var(--p-ink)] whitespace-nowrap"
        >
          Apps on the
          <br />
          <span className="text-[var(--p-accent)]">Atmosphere</span>
        </p>
      );
    case "contributions":
      return <MemberDots />;
    case "cocore":
      return (
        <>
          <pre className="hidden md:block absolute left-9 bottom-7 m-0 font-mono text-[12px] leading-relaxed text-[var(--p-accent)] opacity-90">{`receipt  at://did:plc:…/dev.cocore.receipt/3lq
job      llama-3.1-8b · 2,048 tok
signed   ✓  provider  ✓  verified`}</pre>
          <Image
            src="/projects/cocore-icon.png"
            alt=""
            width={1024}
            height={1024}
            sizes="220px"
            className="absolute right-9 bottom-[-10%] w-[44%] max-w-[220px] rounded-[22%] squircle shadow-[0_24px_48px_rgba(60,40,20,.25)] dark:shadow-[0_0_0_1px_rgba(255,255,255,.12)]"
          />
        </>
      );
    default:
      return null;
  }
}

/* contributions.fyi's chart: every member of Congress as a dot, placed by the PAC money they
   took, in party colors. Positions come from a seeded generator so server and client agree. */
function MemberDots() {
  let seed = 7;
  const rand = () => ((seed = (seed * 48271) % 2147483647) / 2147483647);
  const party = ["#2a78d6", "#e34948", "#2a78d6", "#e34948", "#2a78d6", "#e34948", "#2a78d6", "#e34948", "#3ba55d"];
  const dots = Array.from({ length: 160 }, (_, i) => {
    const x = 30 + rand() * 640;
    // more members cluster low; a few outliers float high
    const y = 420 - Math.pow(rand(), 2.2) * 380 - rand() * 20;
    return { x, y, c: party[i % party.length] };
  });
  return (
    <>
      <svg viewBox="0 0 700 460" aria-hidden="true" className="absolute left-[2%] right-0 bottom-0 w-[104%] max-w-none">
        <line x1="30" y1="428" x2="690" y2="428" className="stroke-[var(--p-ink)]" strokeOpacity=".25" />
        {[1, 2, 3].map((n) => (
          <line key={n} x1="30" y1={428 - n * 110} x2="690" y2={428 - n * 110} className="stroke-[var(--p-ink)]" strokeOpacity=".08" />
        ))}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="5.5" fill={d.c} fillOpacity=".9" />
        ))}
        <text x="30" y="452" fontSize="11" fontWeight="600" letterSpacing=".08em" className="fill-[var(--p-ink2)]">EVERY MEMBER OF CONGRESS, BY THE PAC MONEY THEY TOOK</text>
      </svg>
    </>
  );
}

/* tcm's hero: definitions as cards, named by hash, linked by what uses what. */
const nodes: [string, string, number, number, string][] = [
  // name, hash, x, y, dot color
  ["testTotal", "#49w9xr", 300, 24, "#58a6ff"],
  ["TAX_RATE", "#id21bs", 60, 84, "#a371f7"],
  ["total", "#iwk2em", 268, 150, "#a371f7"],
  ["App", "#bc8vwk", 520, 118, "#3fb950"],
  ["subtotal", "#tedj4z", 40, 238, "#a371f7"],
  ["CartView", "#yrz1bk", 470, 280, "#3fb950"],
  ["formatPrice", "#ua1613", 90, 372, "#a371f7"],
  ["getCart", "#fwvfzt", 330, 412, "#f0883e"],
  ["carts", "#z923cr", 540, 440, "#f0883e"],
];
const edges: [number, number][] = [[0, 2], [1, 2], [2, 5], [4, 2], [3, 5], [5, 7], [6, 5], [7, 8]];

function DefinitionGraph() {
  const w = 130;
  const h = 52;
  const centre = (i: number) => [nodes[i][2] + w / 2, nodes[i][3] + h / 2] as const;
  return (
    <svg
      viewBox="0 0 700 520"
      aria-hidden="true"
      className="absolute left-[4%] top-[6%] w-[118%] max-w-none font-mono"
    >
      {edges.map(([a, b], i) => {
        const [x1, y1] = centre(a);
        const [x2, y2] = centre(b);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-[#c8d1dc] dark:stroke-[#30363d]" strokeWidth="1.5" strokeDasharray={i === 1 ? "4 4" : undefined} />;
      })}
      {nodes.map(([name, hash, x, y, dot], i) => (
        <g key={name} transform={`translate(${x} ${y})`}>
          <rect
            width={w}
            height={h}
            rx="10"
            className={
              i === 1
                ? "fill-white stroke-[#bf8700] dark:fill-[#161b22] dark:stroke-[#d29922]"
                : "fill-white stroke-[#c8d1dc] dark:fill-[#161b22] dark:stroke-[#30363d]"
            }
            strokeWidth="1.5"
          />
          <circle cx="18" cy="20" r="4" fill={dot} />
          <text x="30" y="24" fontSize="13" fontWeight="700" className="fill-[#1f2328] dark:fill-[#e6edf3]">{name}</text>
          <text x="30" y="41" fontSize="11" className={i === 1 ? "fill-[#9a6700] dark:fill-[#d29922]" : "fill-[#59636e] dark:fill-[#8d96a0]"}>{hash}</text>
        </g>
      ))}
    </svg>
  );
}

function Paper({ className, headWidth }: { className: string; headWidth: string }) {
  return (
    <div className={`absolute bg-white dark:bg-[#2b2621] rounded-xl squircle p-[18px] shadow-[0_12px_40px_rgba(60,30,10,.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,.5)] ${className}`}>
      <i className="block h-3.5 rounded bg-[var(--p-accent)] mb-3.5" style={{ width: headWidth }} />
      {["100%", "100%", "80%", "100%", "60%"].map((w, i) => (
        <i key={i} className="block h-2 rounded bg-[#e9e2d6] dark:bg-[#3f372f] my-2" style={{ width: w }} />
      ))}
    </div>
  );
}
