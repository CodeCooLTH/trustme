'use client'
import debit from '@/assets/images/debit-card.png'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import { useState } from 'react'

const TotalBalance = () => {
  const [showBalance, setShowBalance] = useState(true)
  return (
    <>
      <div className="card">
        <div className="card-header border-0">
          <h4 className="card-title">Total Balance</h4>
          <div className="hs-dropdown [--placement:bottom-right] ms-auto">
            <a href="#!" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
              <Icon icon="dots-vertical" className="text-base" />
            </a>
            <ul className="hs-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="wallet" /> Add Funds
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="cash-banknote-move-back" />
                  Withdraw Funds
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="transaction-dollar" />
                  Transaction History
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  <Icon icon="lock" /> Freeze Account
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body pt-0">
          <h2 className="font-bold mb-2 text-2xl relative" id="user-balance-data">
            <span id="user-balance-number">{showBalance ? '$76,852.36' : '$*********'}</span>&nbsp;
            <button type="button" onClick={() => setShowBalance(!showBalance)} className="cursor-pointer" aria-label="Toggle balance visibility">
              {showBalance ? <Icon icon="eye-off" className="text-default-400 text-xl" /> : <Icon icon="eye" className="text-warning text-xl" />}
            </button>
          </h2>
          <div className="p-2.5 bg-light/50 rounded mt-5 gap-2.5 flex items-center">
            <Image src={debit} alt="" className="rounded h-9 me-1.25" width={56} height={36} />
            <div>
              <p className="text-sm font-semibold">
                <CountUp end={59258.25} start={0} duration={1} decimals={2} decimal="." prefix="$" />
              </p>
              <p className="text-default-400 text-xs">**** **** **** 3698</p>
            </div>
            <a href="#!" className="btn underline font-medium ms-auto underline-offset-4">
              Details
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-7.5">
            <div>
              <a href="#!" className="btn bg-secondary hover:bg-secondary-hover text-white bg-linear-to-b from-white/30 to-white/0 w-full">
                <Icon icon="coin" />
                Transfer
              </a>
            </div>
            <div>
              <a href="#!" className="btn bg-info hover:bg-info-hover text-white bg-linear-to-b from-white/30 to-white/0 w-full">
                <Icon icon="coin" />
                Request
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TotalBalance
