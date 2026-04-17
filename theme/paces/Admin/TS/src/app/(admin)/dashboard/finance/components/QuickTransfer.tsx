import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'

const QuickTransfer = () => {
  return (
    <>
      <div className="card">
        <div className="card-header justify-content-between">
          <h4 className="card-title flex items-center gap-2">
            Quick Transfer
            <div className="hs-tooltip [--placement:top]">
              <button type="button" className="hs-tooltip-toggle">
                <Icon icon="info-circle" className="text-default-400 mt-2" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-800 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Quickly send money to your
                  <br />
                  saved contacts.
                </span>
              </button>
            </div>
          </h4>
          <div className="hs-dropdown [--placement:bottom-right] ms-auto">
            <a href="#!" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
              <Icon icon="dots-vertical" className="text-base" />
            </a>
            <ul className="hs-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="user-plus" /> Add Recipient
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="history" />
                  Recent Transfers
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="download" /> Export Transfers
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  <Icon icon="trash" /> Remove All
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          <div className="flex gap-2.5 justify-center">
            <div>
              <input type="radio" name="recipient" id="rec1" defaultChecked className="peer absolute w-px h-px overflow-hidden pointer-events-none" style={{ clip: 'rect(0, 0, 0, 0)' }} />
              <label htmlFor="rec1" className="hs-tooltip [--placement:top] inline-block cursor-pointer peer-checked:[&>img]:border-primary">
                <Image src={user4} alt="" className="size-11 rounded-full p-1 bg-light border border-default-200 transition" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Alexa Newsome
                </span>
              </label>
            </div>
            <div>
              <input type="radio" name="recipient" id="rec2" defaultChecked className="peer absolute w-px h-px overflow-hidden pointer-events-none" style={{ clip: 'rect(0, 0, 0, 0)' }} />
              <label htmlFor="rec2" className="hs-tooltip [--placement:top] inline-block cursor-pointer peer-checked:[&>img]:border-primary">
                <Image src={user5} alt="" className="size-11 rounded-full p-1 bg-light border border-default-200 transition" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Shelly Dorey
                </span>
              </label>
            </div>
            <div>
              <input type="radio" name="recipient" id="rec3" defaultChecked className="peer absolute w-px h-px overflow-hidden pointer-events-none" style={{ clip: 'rect(0, 0, 0, 0)' }} />
              <label htmlFor="rec3" className="hs-tooltip [--placement:top] inline-block cursor-pointer peer-checked:[&>img]:border-primary">
                <Image src={user3} alt="" className="size-11 rounded-full p-1 bg-light border border-default-200 transition" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Fredrick Arnett
                </span>
              </label>
            </div>
            <div>
              <input type="radio" name="recipient" id="rec4" defaultChecked className="peer absolute w-px h-px overflow-hidden pointer-events-none" style={{ clip: 'rect(0, 0, 0, 0)' }} />
              <label htmlFor="rec4" className="hs-tooltip [--placement:top] inline-block cursor-pointer peer-checked:[&>img]:border-primary">
                <Image src={user8} alt="" className="size-11 rounded-full p-1 bg-light border border-default-200 transition" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Barbara Frink
                </span>
              </label>
            </div>
            <div>
              <input type="radio" name="recipient" id="rec5" defaultChecked className="peer absolute w-px h-px overflow-hidden pointer-events-none" style={{ clip: 'rect(0, 0, 0, 0)' }} />
              <label htmlFor="rec5" className="hs-tooltip [--placement:top] inline-block cursor-pointer peer-checked:[&>img]:border-primary">
                <Image src={user2} alt="" className="size-11 rounded-full p-1 bg-light border border-default-200 transition" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                  Adam M
                </span>
              </label>
            </div>
          </div>
          <div className="my-5">
            <label htmlFor="sendFrom" className="form-label">
              Send From
            </label>
            <select id="sendFrom" className="form-input form-select">
              <option value="visa">Visa •••• 3698</option>
              <option value="mastercard">Mastercard •••• 1425</option>
              <option value="paypal">PayPal Wallet</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-2">
            <div>
              <label htmlFor="currency" className="form-label">
                Currency
              </label>
              <select id="currency" className="form-input form-select">
                <option value="USD">$ USD — US Dollar</option>
                <option value="EUR">€ EUR — Euro</option>
                <option value="GBP">£ GBP — British Pound</option>
                <option value="INR">₹ INR — Indian Rupee</option>
              </select>
            </div>
            <div>
              <label htmlFor="enterAmount" className="form-label">
                Amount
              </label>
              <input type="number" id="enterAmount" className="form-input" placeholder="0.0" min={1} step="0.01" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-7.5">
            <div>
              <a href="#!" className="btn bg-primary hover:bg-primary-hover text-white w-full">
                Send Money
              </a>
            </div>
            <div>
              <a href="#!" className="btn border-secondary hover:bg-secondary text-secondary hover:text-white w-full">
                Save as Draft
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuickTransfer
