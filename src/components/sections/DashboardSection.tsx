import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { ProductPreview } from '../product/ProductPreview'

export function DashboardSection() {
  return <section className="border-b border-ink-200 py-24" id="workflow"><Container><div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><div className="eyebrow">One clear view</div><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">Know what’s happening. <span className="text-brand-600">At a glance.</span></h2><p className="mt-5 leading-7 text-ink-600">From the first order to the final handoff, Finch connects the details that keep your business moving.</p><a href="#access" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900">Explore the workspace <ArrowUpRight size={15} /></a></div><div className="relative"><div className="absolute -inset-4 rounded-3xl bg-brand-50" /><div className="relative"><ProductPreview /></div></div></div></Container></section>
}
