import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { person, nav, education, skills, projects } from './data'
import ProjectCard from './components/ProjectCard'
const Scene = lazy(() => import('./components/Scene'))

const fade = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.6, ease: 'easeOut' } }

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-10 px-6 py-24">
      <motion.div {...fade}>
        <p className="mono text-xs uppercase tracking-[.3em] text-[var(--acc)]">{kicker}</p>
        <h2 className="mt-2 text-3xl font-semibold md:text-5xl">{title}</h2>
      </motion.div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function ThemeToggle({ dark, onClick }) {
  return (
    <button onClick={onClick} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} className="flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-orange-200 to-sky-200 p-0.5">
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} style={{ marginLeft: dark ? 0 : 'auto' }} className="block h-5 w-5 rounded-full bg-gradient-to-br from-orange-400 to-sky-400" />
    </button>
  )
}

function Avatar() {
  const [bad, setBad] = useState(false)
  return (
    <div className="glass grid h-24 w-24 place-items-center overflow-hidden rounded-full ring-2 ring-[var(--acc)]/40">
      {bad ? <span className="text-3xl font-semibold">{person.name[0]}</span> : <img src={person.photo} alt={`${person.name}, profile`} onError={() => setBad(true)} className="h-full w-full object-cover" />}
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => (localStorage.getItem('theme') || 'dark') === 'dark')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const form = e.target
    const d = new FormData(form)
    setSending(true); setStatus('Sending…')
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${person.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: d.get('name'), email: d.get('email'), _subject: d.get('subject'), message: d.get('message'), _captcha: 'false' }),
      })
      if (!r.ok) throw new Error()
      setStatus('Thanks! Your message was sent.'); form.reset()
    } catch {
      setStatus(`Couldn’t send. Please email me directly at ${person.email}.`)
    }
    setSending(false)
  }
  const field = 'w-full rounded-xl border border-[var(--bd)] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--acc)]'

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:p-2 focus:text-black">Skip to content</a>
      <nav aria-label="Primary" className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'glass' : ''}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="mono text-sm tracking-wider">{person.fullName}</a>
          <div className="flex items-center gap-6 text-sm">
            <ul className="hidden items-center gap-6 md:flex">
              {nav.map(([l, h]) => <li key={h}><a className="transition hover:text-[var(--acc)]" href={h}>{l}</a></li>)}
            </ul>
            <ThemeToggle dark={dark} onClick={() => setDark(!dark)} />
            <button className="md:hidden" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
        {open && (
          <ul className="flex flex-col gap-4 px-6 pb-5 md:hidden">
            {nav.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)}>{l}</a></li>)}
          </ul>
        )}
      </nav>

      <header id="home" className="relative h-screen min-h-[680px] overflow-hidden">
        <div className="absolute inset-0"><Suspense fallback={null}><Scene dark={dark} /></Suspense></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 text-center">
          <motion.div initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}><Avatar /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="mt-6 text-5xl font-medium tracking-tight sm:text-7xl md:text-8xl">I'M {person.name.toUpperCase()}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} className="mono mt-5 text-[11px] tracking-[.18em] sm:text-sm">{person.tagline.join('  |  ')}</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }} className="mt-5 max-w-xl text-[var(--mut)]">{person.intro}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }} className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-ghost">Contact Me</a>
          </motion.div>
          <div className="pointer-events-auto mt-6 flex gap-5 text-sm text-[var(--mut)]">
            <a className="hover:text-[var(--acc)]" href={person.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-[var(--acc)]" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-[var(--acc)]" href={`mailto:${person.email}`}>Email</a>
          </div>
        </div>
        <a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 z-10 grid h-10 w-6 -translate-x-1/2 place-items-center rounded-full border border-[var(--fg)]/60">
          <motion.span animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-xs">↓</motion.span>
        </a>
      </header>

      <main>
        <Section id="about" kicker="01 — About" title="Building reliable systems, with a taste for AI.">
          <motion.div {...fade} className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed text-[var(--mut)]">{person.about.map((t) => <p key={t}>{t}</p>)}</div>
            <div className="glass rounded-2xl p-6">
              <p className="mono mb-4 text-xs tracking-widest text-[var(--acc)]">CAREER INTERESTS</p>
              <ul className="space-y-3">{person.interests.map((i) => <li key={i} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)]" />{i}</li>)}</ul>
            </div>
          </motion.div>
        </Section>

        <Section id="education" kicker="02 — Education" title="Where I've studied.">
          <div className="space-y-4 border-l border-[var(--bd)] pl-6">
            {education.map((e) => (
              <motion.div key={e.school} {...fade} className="glass relative rounded-2xl p-6">
                <span className="absolute -left-[31px] top-8 h-3 w-3 rounded-full bg-[var(--acc)]" />
                <p className="mono text-xs text-[var(--acc)]">{e.years}</p>
                <h3 className="mt-1 text-xl font-semibold">{e.degree}</h3>
                <p className="text-[var(--mut)]">{e.school}</p>
                {e.note && <p className="mt-2 text-sm text-[var(--mut)] whitespace-pre-line">{e.note}</p>}
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" kicker="03 — Skills" title="Tools I work with.">
          <div className="grid gap-5 md:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <motion.div key={group} {...fade} whileHover={{ y: -6 }} className="glass rounded-2xl p-6">
                <h3 className="mono mb-5 text-xs tracking-widest text-[var(--acc)]">{group.toUpperCase()}</h3>
                <div className="flex flex-wrap gap-2">{items.map((s) => <span key={s} className="rounded-full border border-[var(--bd)] px-3 py-1.5 text-sm transition hover:border-[var(--acc)]">{s}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" kicker="04 — Projects" title="Selected work.">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => <motion.div key={p.title} {...fade}><ProjectCard p={p} /></motion.div>)}
          </div>
        </Section>

        <Section id="contact" kicker="05 — Contact" title="Let's work together.">
          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
            <motion.div {...fade} className="space-y-4 text-[var(--mut)]">
              <p>Open to internships and fresher roles. Drop a message and I'll reply soon.</p>
              <a className="block text-[var(--fg)] hover:text-[var(--acc)]" href={`mailto:${person.email}`}>{person.email}</a>
              <a className="block hover:text-[var(--acc)]" href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="block hover:text-[var(--acc)]" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </motion.div>
            <motion.form {...fade} onSubmit={submit} className="glass grid gap-4 rounded-2xl p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={field} name="name" placeholder="Name" aria-label="Name" required />
                <input className={field} type="email" name="email" placeholder="Email" aria-label="Email" required />
              </div>
              <input className={field} name="subject" placeholder="Subject" aria-label="Subject" required />
              <textarea className={field} name="message" rows="5" placeholder="Message" aria-label="Message" required />
              <button className="btn btn-primary justify-self-start" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
              <p role="status" className="text-sm text-[var(--mut)]">{status}</p>
            </motion.form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--bd)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[var(--mut)]">
          <p>© {new Date().getFullYear()} {person.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${person.email}`}>Email</a>
          </div>
          <a href="#home" className="btn btn-ghost !py-2">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
