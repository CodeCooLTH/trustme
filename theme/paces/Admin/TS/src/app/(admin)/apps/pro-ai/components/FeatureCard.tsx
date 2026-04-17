import Icon from '@/components/wrappers/Icon'
import Link from 'next/link'
import { FeatureType } from './data'

const FeatureCard = ({ feature }: { feature: FeatureType }) => {
  const { icon, title, href } = feature
  return (
    <Link href={href}>
      <div className="card bg-light/15 border-default-300 h-full border border-dashed">
        <div className="card-body">
          <div className="bg-light mb-3 flex size-11 items-center justify-center rounded-full">
            <Icon icon={icon} className="text-xl" />
          </div>
          <p className="text-default-400">{title}</p>
        </div>
      </div>
    </Link>
  )
}

export default FeatureCard
