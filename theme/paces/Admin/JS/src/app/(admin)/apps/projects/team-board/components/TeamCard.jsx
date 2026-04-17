import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
const TeamCard = ({ team, index }) => {
  return (
    <div className="card h-full">
      <div className="card-header">
        <h4 className="card-title">
          {team.name}
          <span className={cn('badge badge-label ms-2.5 text-white', team.status === 'busy' ? 'bg-danger' : team.status === 'ongoing' ? 'bg-warning' : team.status === 'stable' ? 'bg-secondary' : team.status === 'new' ? 'bg-primary' : 'bg-success')}>
            {toPascalCase(team.status)}
          </span>
        </h4>

        <div className="relative ms-auto">
          <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
            <button type="button" className="hs-dropdown-toggle text-default-400 text-lg" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <Icon icon="dots-vertical" />
            </button>

            <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
              <Link className="dropdown-item" href="">
                <Icon icon="share" />
                View
              </Link>

              <Link className="dropdown-item" href="">
                <Icon icon="edit" />
                Edit
              </Link>

              <Link className="dropdown-item text-danger" href="">
                <Icon icon="trash" />
                Remove
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body flex justify-between flex-col h-full">
        <div className="grid md:grid-cols-2 gap-base mb-5">
          <div>
            <p className="text-default-400 mb-2.5">Total {team.members.length} members</p>

            <div className="flex items-center -space-x-2">
              {team.members.slice(0, 5).map((member, idx) => (
                <div key={idx}>
                  <Image src={member.image} alt="" className="size-8 rounded-full transition-all hover:-translate-y-0.5" />
                </div>
              ))}
              {team.members.length > 5 && <span className="flex items-center justify-center size-8 text-white bg-primary rounded-full font-bold transition-all hover:-translate-y-0.5">{team.members.length - 5}+</span>}
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="flex items-center justify-center bg-light size-8 rounded-full">
              <Icon icon="medal" className="text-default-900 text-base"></Icon>
            </span>
            <div>
              <h6 className="text-default-400 mb-1.25 text-xs uppercase">Ranking</h6>
              <p className="font-medium">#{team.rank}</p>
            </div>
          </div>
        </div>

        {index === 0 ? (
          <div className="pb-base">
            <p className="text-default-400 mb-4">{team.description}</p>
          </div>
        ) : (
          <p className="text-default-400 mb-5">{team.description}</p>
        )}

        <div className="mb-5">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-default-400 text-sm font-semibold">{team.progress.label}</p>
            <p className="font-semibold">{team.progress.value}%</p>
          </div>
          <div className="bg-default-100 flex h-1.25 w-full overflow-hidden rounded-full" role="progressbar" aria-valuenow={team.progress.value} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="bg-primary flex flex-col justify-center overflow-hidden rounded-full rounded-e-none text-center text-xs whitespace-nowrap text-white transition duration-500"
              style={{
                width: `${team.progress.value}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-xs flex items-center gap-1">
            <Icon icon="clock" className="me-1.25 align-middle text-xs" />
            Updated {team.updatedTime}
          </span>
          <Link href="" className="btn btn-sm bg-primary rounded-full text-white">
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
export default TeamCard
