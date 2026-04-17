'use client'
import user2 from '@/assets/images/users/user-2.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import Image from 'next/image'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import SimpleBarCore from 'simplebar-core'
import { messageData } from './data'

const ChatCard = () => {
  const [chatMessages, setChatMessages] = useState(messageData)
  const [input, setInput] = useState('')

  const scrollRef = useRef<SimpleBarCore | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollEl = scrollRef.current.getScrollElement()
      scrollEl?.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chatMessages])

  const handleSend: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const ampm = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 || 12
    const min = m < 10 ? `0${m}` : m
    const timeStr = `${hour}:${min} ${ampm}`

    setChatMessages((prev) => [
      ...prev,
      {
        message: text,
        time: timeStr,
        fromUser: true,
        image: user2,
      },
    ])

    setInput('')

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          message: text,
          time: timeStr,
          fromUser: false,
          image: user5,
        },
      ])
    }, 1000)
  }

  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Chat</h4>
        </div>

        <SimpleBar ref={scrollRef} className="card-body h-95 py-0" data-simplebar>
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`my-5 flex items-start gap-2.5 ${msg.fromUser ? 'justify-end text-right' : ''}`}>
              {!msg.fromUser && <Image src={msg.image} alt="User" className="size-9 rounded-full" />}

              <div>
                <div className={`font-medium rounded px-5 py-2.5 ${msg.fromUser ? 'bg-info/15' : 'bg-warning/15'}`}>{msg.message}</div>
                <div className={`text-default-400 mt-1.25 flex items-center gap-1 text-xs ${msg.fromUser ? 'justify-end' : ''}`}>
                  <Icon icon="clock" />
                  {msg.time}
                </div>
              </div>

              {msg.fromUser && <Image src={msg.image} alt="User" className="size-9 rounded-full" />}
            </div>
          ))}
        </SimpleBar>

        <div className="border-default-300 border-t border-dashed px-5 py-3.75">
          <form onSubmit={handleSend} className="flex gap-2.5">
            <div className="input-icon-group grow">
              <Icon icon="message" className="input-icon text-default-400" />
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="form-input border-light bg-light/20" placeholder="Enter message..." />
            </div>

            <button type="submit" className="btn btn-icon bg-primary size-9.5 text-white">
              <Icon icon="send-2" className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatCard
