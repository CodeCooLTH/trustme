import Link from 'next/link'
import Icon from './wrappers/Icon'

export type Crumb = { label: string; href?: string }

type PageBreadcrumbProps = {
  title: string
  trail?: Crumb[]
  subtitle?: string
  homeHref?: string
  homeLabel?: string
}

const PageBreadcrumb = ({
  title,
  trail,
  subtitle,
  homeHref = '/',
  homeLabel = 'หน้าหลัก',
}: PageBreadcrumbProps) => {
  const crumbs: Crumb[] = trail ?? (subtitle ? [{ label: subtitle }] : [])

  return (
    <div className="page-title-head">
      <h4 className="page-main-title">{title}</h4>
      <div className="hidden items-center gap-1.25 text-sm font-semibold md:flex">
        <Link href={homeHref} className="text-sm font-medium">
          {homeLabel}
        </Link>
        <Icon icon="chevron-right" className="shrink-0 text-sm rtl:rotate-180" />
        {crumbs.map((c) => (
          <span key={`${c.label}-${c.href ?? ''}`} className="inline-flex items-center gap-1.25">
            {c.href ? (
              <Link href={c.href} className="text-sm font-medium">
                {c.label}
              </Link>
            ) : (
              <span className="text-sm font-medium">{c.label}</span>
            )}
            <Icon icon="chevron-right" className="shrink-0 text-sm rtl:rotate-180" />
          </span>
        ))}
        <span className="text-default-400 text-sm font-medium" aria-current="page">
          {title}
        </span>
      </div>
    </div>
  )
}

export default PageBreadcrumb
