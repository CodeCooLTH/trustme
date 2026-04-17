import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import Link from 'next/link'
import { userData } from './data'
const TeamMember = () => {
  return (
    <>
      {userData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-body">
            <div className="flex items-center mb-7.5">
              <div className="me-5 relative">
                <Image src={item.user.image} alt="avatar" className="rounded-full" width={72} height={72} />
                <span className={`absolute bottom-0 end-0 badge ${item.className} rounded-full p-1.25 text-white`} title="Rating 4.8">
                  <Icon icon="star" />
                </span>
              </div>
              <div>
                <h5 className="mb-1.25 flex items-center">
                  <Link href="" className="hover:text-primary">
                    {item.user.name}
                  </Link>
                  <Image src={item.image} alt="UK" className="ms-2.5 rounded-full size-4" />
                </h5>
                <p className="text-default-400 mb-1.25">{item.user.role}</p>
                <span className="badge bg-light badge-label">{item.position}</span>
              </div>

              <div className="relative ms-auto">
                <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                  <button type="button" className="hs-dropdown-toggle btn size-9.25 text-default-400 hover:bg-default-100" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <Icon icon="dots-vertical" className="text-base" />
                  </button>
                  <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                    <a className="dropdown-item" href="#">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a className="dropdown-item" href="#">
                      <Icon icon="edit" />
                      Edit
                    </a>
                    <a className="dropdown-item" href="#">
                      <Icon icon="ban" />
                      Block
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <Icon icon="trash" />
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ul className="text-default-400 mb-7.5">
              <li className="mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div>
                    <span className="size-6 flex justify-center items-center bg-light text-default-800 rounded-full">
                      <Icon icon="mail" />
                    </span>
                  </div>
                  <h5 className="text-sm font-medium">
                    <Link href="" className="hover:text-primary">
                      {item.email}
                    </Link>
                  </h5>
                </div>
              </li>
              <li className="mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div>
                    <span className="size-6 flex justify-center items-center bg-light text-default-800 rounded-full">
                      <Icon icon="phone" />
                    </span>
                  </div>
                  <h5 className="text-sm font-medium">
                    <Link href="" className="hover:text-primary">
                      {item.phone}
                    </Link>
                  </h5>
                </div>
              </li>
              <li className="mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div>
                    <span className="size-6 flex justify-center items-center bg-light text-default-800 rounded-full">
                      <Icon icon="map-pin" />
                    </span>
                  </div>
                  <h5 className="text-sm font-medium">{item.location}</h5>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2.5">
                  <div>
                    <span className="size-6 flex justify-center items-center bg-light text-default-800 rounded-full">
                      <Icon icon="link" />
                    </span>
                  </div>
                  <h5 className="text-sm font-medium">
                    <Link href="" className="text-primary hover:text-primary-">
                      {item.website}
                    </Link>
                  </h5>
                </div>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-xs flex items-center">
                <Icon icon="refresh" className="me-1.25" />
                {item.updatedText}
              </span>
              <Link href="" className="btn bg-primary/10 text-primary btn-sm rounded-full hover:bg-primary hover:text-white">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default TeamMember
