import small1 from '@/assets/images/stock/small-1.jpg'
import small2 from '@/assets/images/stock/small-2.jpg'
import small3 from '@/assets/images/stock/small-3.jpg'
import user1 from '@/assets/images/users/user-1.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import Link from 'next/link'

const TimeLine = () => {
  return (
    <>
      <form action="#" className="mb-base">
        <textarea rows={3} className="form-textarea" placeholder="Write something..." defaultValue={''} />
        <div className="flex py-3 justify-between">
          <div className="flex gap-1 items-center">
            <Link href="" className="btn size-7.5 btn-icon bg-light hover:text-primary">
              <Icon icon="user" />
            </Link>
            <Link href="" className="btn size-7.5 btn-icon bg-light hover:text-primary">
              <Icon icon="map-pin" />
            </Link>
            <Link href="" className="btn size-7.5 btn-icon bg-light hover:text-primary">
              <Icon icon="camera" />
            </Link>
            <Link href="" className="btn size-7.5 btn-icon bg-light hover:text-primary">
              <Icon icon="mood-smile" />
            </Link>
          </div>
          <button type="submit" className="btn btn-sm bg-dark text-white">
            Post
          </button>
        </div>
      </form>
      <div className="border border-light border-dashed rounded p-3 mb-base">
        <div className="flex items-center gap-3 mb-3">
          <Image className="size-9 rounded-full" src={user3} alt="Jeremy Tomlinson" />
          <div className="w-full">
            <h5 className="text-sm">Jeremy Tomlinson</h5>
            <p className="text-default-400">
              <small>about 2 minutes ago</small>
            </p>
          </div>
        </div>
        <p className="mb-4 text-sm">Story based around the idea of time lapse, animation to post soon!</p>
        <div className="flex flex-wrap items-center gap-3">
          <Image src={small1} alt="post-img" className="rounded h-15" width={96} />
          <Image src={small2} alt="post-img" className="rounded h-15" width={96} />
          <Image src={small3} alt="post-img" className="rounded h-15" width={96} />
        </div>
        <div className="mt-3 flex flex-wrap items-center md:gap-3 gap-1">
          <Link href="" className="btn btn-sm text-sm text-default-400">
            <Icon icon="corner-up-left" />
            Reply
          </Link>
          <div className="btn btn-sm text-sm text-default-400">
            <div className="relative">
              <span id="like-count-one" />
              <button type="button">
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart" className="fill-danger text-danger" />
                  Liked!
                </div>
                <div className="hidden hs-password-active:flex items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                  Like
                </div>
              </button>
            </div>
          </div>
          <Link href="" className="btn btn-sm text-sm text-default-400">
            <Icon icon="share" />
            Share
          </Link>
        </div>
      </div>
      <div className="border border-light border-dashed rounded p-3 mb-base">
        <div className="flex items-center gap-3 mb-3">
          <Image className="size-9 rounded-full" src={user4} alt="avatar-4" />
          <div className="w-full">
            <h5 className="m-0 font-semibold">Sophia Martinez</h5>
            <p className="text-default-400 text-sm">
              <small>about 30 minutes ago</small>
            </p>
          </div>
        </div>
        <div className="text-lg text-center my-5 italic flex">
          <Icon icon="quote" className="size-5" />
          Just finished a weekend project! Built a small weather app using React and OpenWeather API. Feeling excited to share the results with everyone soon. 🚀
        </div>
        <div className="bg-light/15 -mx-3 p-3 border-t border-b border-dashed border-default-300">
          <div className="flex items-start gap-2">
            <Image className="size-9 rounded-full" src={user1} alt="avatar-1" />
            <div className="w-full">
              <h5 className="mt-0 mb-1.5 font-semibold">
                Liam Johnson
                <small className="text-default-400 ms-1">10 minutes ago</small>
              </h5>
              <p className="text-default-600">That sounds awesome! Can&apos;t wait to see how you designed the UI.</p>
              <Link href="" className="text-default-500 text-sm inline-flex mt-3">
                <Icon icon="corner-up-left" />
                Reply
              </Link>
              <div className="flex items-start gap-2 mt-6">
                <Image src={user2} className="size-9 rounded-full" alt="avatar-2" />
                <div className="w-full">
                  <h5 className="mb-1.5 font-semibold">
                    Olivia Carter
                    <small className="text-default-400 text-xs ms-1">15 minutes ago</small>
                  </h5>
                  <p className="text-default-600">I recently built something similar with Vue. Let&apos;s collaborate sometime!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-3">
            <Image src={user3} className="size-9 rounded-full" alt="avatar-3" />
            <div className="w-full">
              <input type="text" className="form-input form-input-sm" placeholder="Add a comment..." />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <Link href="" className="text-sm text-default-400 flex items-center gap-1">
            <Icon icon="corner-up-left" />
            Reply
          </Link>
          <div className="relative">
            <span id="like-count-two" />
            <button
              type="button"
              data-hs-toggle-password='{
                                                          "target": "#like-count-two"
                                                          }'
            >
              <div className="hidden hs-password-active:flex items-center gap-1 text-default-400">
                <Icon icon="heart" className="fill-danger text-danger" />
                Liked!
              </div>
              <div className="flex hs-password-active:hidden items-center gap-1 text-default-400">
                <Icon icon="heart" />
                Likes(45)
              </div>
            </button>
          </div>
          <Link href="" className="text-sm text-default-400 flex items-center gap-1">
            <Icon icon="share" />
            Share
          </Link>
        </div>
      </div>
      <div className="border border-light border-dashed rounded p-3 mb-base">
        <div className="flex items-center gap-3 mb-2">
          <Image className="size-9 rounded-full" src={user2} alt="avatar-2" />
          <div className="w-full">
            <h5>Anika Roy</h5>
            <p className="text-default-400">
              <small className="text-xs">2 hours ago</small>
            </p>
          </div>
        </div>
        <p className="mb-4">Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full rounded-lg overflow-hidden bg-default-200">
            <div className="relative w-full pb-[56.25%]">
              <iframe src="https://player.vimeo.com/video/1084537" className="absolute inset-0 w-full h-full rounded-lg" allowFullScreen></iframe>
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-default-200">
            <div className="relative w-full pb-[56.25%]">
              <iframe src="https://player.vimeo.com/video/76979871" className="absolute inset-0 w-full h-full rounded-lg" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 md:p-6 p-3">
        <strong>Loading...</strong>
        <div className="animate-spin inline-block size-4 border-2 border-current border-t-transparent text-danger rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default TimeLine
