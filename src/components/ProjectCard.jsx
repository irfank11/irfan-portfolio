import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProjectCard({ p }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const spring = { stiffness: 180, damping: 18 }
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), spring)
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), spring)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        onMouseMove={move} onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="glass flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {p.cover ? (
            <img src={p.cover} alt={`${p.title} homepage`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center" style={{ background: `linear-gradient(135deg, hsl(${p.hue} 70% 35%), hsl(${p.hue + 50} 60% 12%))` }}>
              <span className="mono text-xs tracking-widest text-white/70">PLACEHOLDER COVER</span>
            </div>
          )}
          <h3 style={{ transform: 'translateZ(50px)' }} className="absolute bottom-3 left-4 text-xl font-semibold text-white drop-shadow">{p.title}</h3>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <p className="text-sm leading-relaxed text-[var(--mut)]">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="mono rounded-full border border-[var(--bd)] px-2.5 py-1 text-[11px]">{s}</span>)}
          </div>
          <div className="mt-auto flex gap-4 pt-2 text-sm">
            {p.github ? <a className="hover:text-[var(--acc)]" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a> : <span className="opacity-45">GitHub (soon)</span>}
            {p.demo ? <a className="hover:text-[var(--acc)]" href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a> : <span className="opacity-45">Live Demo (soon)</span>}
          </div>
        </div>
      </motion.article>
    </div>
  )
}
