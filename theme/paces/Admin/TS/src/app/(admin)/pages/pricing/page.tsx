import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { Metadata } from 'next'
import Link from 'next/link'
import { pricingPlanData } from './components/data'

export const metadata: Metadata = { title: 'Pricing' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pricing" subtitle="Pages" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-base lg:grid-cols-4">
        {pricingPlanData.map((plan, idx) => (
          <div className={cn('card h-full rounded-md', plan.isPopular && '!bg-primary')} key={idx}>
            <div className="card-body p-7.5 text-center">
              <h3 className={cn('mb-1.25 text-xl font-bold', plan.isPopular && 'text-white')}>{plan.name}</h3>
              <p className={cn('text-default-400', plan.isPopular && 'text-white/50')}>{plan.subtitle}</p>
              <div className="my-7.5">
                <h1 className={cn('text-[40px] font-bold', plan.isPopular && 'text-white')}>{plan.price}</h1>
                <small className={cn('text-default-400 text-sm', plan.isPopular && 'text-white/50')}>Billed {plan.duration}</small>
                <br />
                <small className={cn('text-default-400', plan.isPopular && 'text-white/50')}>{plan.planInfo}</small>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li className={cn('flex items-center gap-3', plan.isPopular && 'text-white')} key={i}>
                    <Icon icon={feature.included ? 'check' : 'x'} className={cn('text-success text-sm', feature.included ? 'text-success' : 'text-danger')} />
                    {feature.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-15 pt-3.75 pb-7.5">
              <Link href={plan.href} className={cn('btn w-full rounded-full py-3 font-semibold hover:text-white', plan.buttonClassName)}>
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Page
