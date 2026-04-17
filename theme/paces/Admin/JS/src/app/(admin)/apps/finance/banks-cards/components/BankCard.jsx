import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import AddCardModal from './AddCardModal'
import { paymentCardData } from './data'
const BankCard = () => {
  return (
    <>
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-default-400 font-semibold uppercase">Cards</h5>
          <a href="#addCardModal" className="btn btn-sm bg-primary ms-1 text-white" aria-haspopup="dialog" aria-expanded="false" aria-controls="addCardModal" data-hs-overlay="#addCardModal">
            <Icon icon="plus" />
            Add card
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-base lg:grid-cols-4">
          {paymentCardData.map((item, idx) => (
            <div key={idx}>
              <div className="card border-default-300 border border-dashed shadow-none">
                <div className="card-body">
                  <div className="mb-2.5 flex items-center justify-between">
                    <Image src={item.image} alt={item.brand} className="h-9" width={36} height={36} />
                    <span className={cn('badge', item.status === 'active' ? 'bg-success/15 text-success' : item.status === 'inactive' ? 'bg-warning/15 text-warning' : 'bg-danger/15 text-danger')}>{toPascalCase(item.status)}</span>
                  </div>
                  <h4 className="mt-5 text-lg font-semibold mb-2">{item.number}</h4>
                  <p className="text-default-400">Exp: {item.expiryDate}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-dark font-medium">{item.holder}</span>
                    <div className="relative ms-auto">
                      <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                        <button type="button" className="hs-dropdown-toggle btn btn-icon bg-default-100 size-7.5 rounded-full" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          <Icon icon="dots-vertical" className="text-base" />
                        </button>
                        <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                          <div className="block space-y-0.5">
                            <a className="dropdown-item" href="#">
                              Set as default
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit
                            </a>
                            <a className="dropdown-item text-danger" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddCardModal />
    </>
  )
}
export default BankCard
