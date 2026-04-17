import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import AddBankModal from './AddBankModal'
import { bankAccountData } from './data'
const BankAccount = () => {
  return (
    <>
      <div className="mb-7.5">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-default-400 font-semibold uppercase">Bank Accounts</h5>
          <a href="#addBankModal" className="btn btn-sm bg-primary ms-1 text-white" aria-haspopup="dialog" aria-expanded="false" aria-controls="addBankModal" data-hs-overlay="#addBankModal">
            <Icon icon="plus" />
            Add Bank
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-base lg:grid-cols-3">
          {bankAccountData.map((bank, index) => (
            <div className="col-span-1" key={index}>
              <div className="card border-default-300 border border-dashed shadow-none">
                <div className="card-body flex justify-between">
                  <div className="flex gap-base">
                    <div>
                      <div className={cn('flex size-11 items-center justify-center rounded-full', bank.iconClassName)}>
                        <Icon icon={bank.icon} className="size-6" />
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-1.25 font-semibold">{bank.name}</h5>
                      <p className="text-default-400 mb-5">Balance: {bank.balance} USD</p>
                      <ul>
                        <li>
                          <strong className="text-default-400">Account Holder:</strong> {bank.holder}
                        </li>
                        <li>
                          <strong className="text-default-400">Account No:</strong> {bank.accountNo}
                        </li>
                        <li>
                          <strong className="text-default-400">Account Type:</strong> {bank.type}
                        </li>
                        <li>
                          <strong className="text-default-400">Branch:</strong> {bank.branch}
                        </li>
                      </ul>
                      <div className="mt-5">
                        <button className="btn btn-sm border-default-300 hover:border-default-400 hover:bg-default-50 border">Edit</button>&nbsp;
                        <button className="btn btn-sm border-default-300 hover:border-default-400 hover:bg-default-50 border">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className={cn('badge mb-3', bank.status === 'active' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning')}>{toPascalCase(bank.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddBankModal />
    </>
  )
}
export default BankAccount
