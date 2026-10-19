/**
 * Ambient background: a slowly drifting field of contour lines.
 *
 * The page is laid out like a technical document, so the background is a survey
 * grid rather than a gradient — lines that flow like air currents and never
 * settle. Two copies of each tile sit side by side and translate by exactly one
 * tile, so the loop is seamless and nothing ever jumps.
 *
 * Pure CSS and pure SVG: it keeps moving with no JavaScript, costs one
 * composited transform per layer, and never touches layout.
 */

const TILE = 1600;
const HEIGHT = 1000;

type WaveConfig = {
  count: number;
  top: number;
  gap: number;
  amplitude: number;
  /** Must divide TILE / 2 so the tile joins itself without a seam. */
  period: number;
  phase: number;
};

type Layer = {
  waves: WaveConfig;
  /** Index of the one line drawn in the accent colour. */
  accentIndex?: number;
  duration: string;
  reverse?: boolean;
  opacity: number;
};

const LAYERS: Layer[] = [
  {
    // Fine, quick, close together — reads as texture more than as lines.
    waves: { count: 12, top: 30, gap: 84, amplitude: 22, period: 200, phase: 0.4 },
    duration: "150s",
    opacity: 0.075,
  },
  {
    // The main readable flow, with a single accent line to give it a pulse.
    waves: { count: 7, top: 90, gap: 150, amplitude: 44, period: 400, phase: 2.1 },
    accentIndex: 2,
    duration: "240s",
    reverse: true,
    opacity: 0.085,
  },
  {
    // Broad, slow, barely there — the layer you notice last.
    waves: { count: 4, top: 140, gap: 260, amplitude: 76, period: 800, phase: 4.3 },
    duration: "340s",
    opacity: 0.06,
  },
];

/**
 * Builds one tile of a wave as a chain of cubic curves.
 *
 * Consecutive segments alternate direction and share their tangent at the join,
 * so the result is smooth rather than scalloped.
 */
function buildWave({
  count,
  top,
  gap,
  amplitude,
  period,
  phase,
}: WaveConfig): string[] {
  const paths: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const y = top + i * gap + Math.sin(phase + i * 0.9) * 18;
    const amp = amplitude * (0.65 + ((i * 37) % 60) / 100);
    const segments = Math.ceil(TILE / period);

    let d = `M 0 ${y.toFixed(1)}`;

    for (let s = 0; s < segments; s += 1) {
      const dir = s % 2 === 0 ? -1 : 1;
      const a = (amp * dir).toFixed(1);
      d += ` c ${(period * 0.25).toFixed(1)} ${a}, ${(period * 0.75).toFixed(1)} ${a}, ${period} 0`;
    }

    paths.push(d);
  }

  return paths;
}

export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {LAYERS.map((layer, layerIndex) => {
        const paths = buildWave(layer.waves);

        return (
          <svg
            key={layerIndex}
            data-direction={layer.reverse ? "right" : "left"}
            className="ambient-layer text-ink absolute inset-y-0 left-0 h-full w-[200%]"
            style={{ animationDuration: layer.duration }}
            viewBox={`0 0 ${TILE * 2} ${HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
          >
            {paths.map((d, pathIndex) => {
              const isAccent = pathIndex === layer.accentIndex;

              return (
                <g
                  key={pathIndex}
                  stroke={isAccent ? "var(--accent)" : "currentColor"}
                  strokeWidth={isAccent ? 1.4 : 1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={
                    isAccent ? Math.min(0.3, layer.opacity * 3) : layer.opacity
                  }
                >
                  {/* The tile, then an identical copy one tile to the right. */}
                  <path d={d} />
                  <path d={d} transform={`translate(${TILE} 0)`} />
                </g>
              );
            })}
          </svg>
        );
      })}
    </div>
  );
}
