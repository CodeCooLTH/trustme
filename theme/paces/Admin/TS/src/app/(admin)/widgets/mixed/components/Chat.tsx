'use client'
import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import Image from 'next/image'
import { chatMessageData, chatUser } from './data'

const Chat = () => {
  const currentUser = chatUser[1]

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Chat</h4>
        </div>
        <SimpleBar className="card-body h-89.5 py-0">
          {chatMessageData.map((item, idx) => {
            const isMe = item.user.name === currentUser.name
            return (
              <div className={`my-5 flex items-start gap-2.5 ${isMe ? 'justify-end' : ''}`} key={idx}>
                {!isMe && <Image src={item.user.image} className="size-9 rounded-full" alt="User" />}
                <div>
                  <div className={`${isMe ? 'bg-info/15' : 'bg-warning/15'} font-medium rounded px-5 py-2.5`}>{item.message}</div>
                  <div className={`text-default-400 mt-1.25 flex items-center gap-1 text-xs ${isMe ? 'justify-end' : ''}`}>
                    <Icon icon="clock" /> {item.time}
                  </div>
                </div>
                {isMe && <Image src={item.user.image} alt={item.user.name} className="size-9 rounded-full" />}
              </div>
            )
          })}
        </SimpleBar>
        <div className="border-default-300 border-t border-dashed px-6 py-4.5">
          <div className="flex gap-2">
            <div className="input-icon-group grow">
              <Icon icon="message" className="input-icon text-default-400" />
              <input type="text" className="form-input border-light bg-light/20" placeholder="Enter message..." />
            </div>
            <a data-send href="#!" className="btn btn-icon bg-primary size-9.5 text-white">
              <Icon icon="send-2" className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
