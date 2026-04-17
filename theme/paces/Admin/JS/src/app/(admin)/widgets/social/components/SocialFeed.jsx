import gallery10 from '@/assets/images/gallery/10.jpg'
import gallery2 from '@/assets/images/gallery/2.jpg'
import gallery3 from '@/assets/images/gallery/3.jpg'
import gallery5 from '@/assets/images/gallery/5.jpg'
import gallery7 from '@/assets/images/gallery/7.jpg'
import user1 from '@/assets/images/users/user-1.jpg'
import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user6 from '@/assets/images/users/user-6.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import Image from 'next/image'
const SocialFeed = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="mb-2.5">What&apos;s on your mind?</h5>

          <form action="#">
            <textarea rows={3} className="form-textarea" placeholder="Share your thoughts..." />
            <div className="flex pt-2.5 justify-between items-center">
              <div className="flex gap-1.25">
                <a href="#" className="btn btn-sm btn-icon size-8 bg-light hover:text-primary">
                  <Icon icon="user" className="text-base" />
                </a>
                <a href="#" className="btn btn-sm btn-icon size-8 bg-light hover:text-primary">
                  <Icon icon="map-pin" className="text-base" />
                </a>
                <a href="#" className="btn btn-sm btn-icon size-8 bg-light hover:text-primary">
                  <Icon icon="camera" className="text-base" />
                </a>
                <a href="#" className="btn btn-sm btn-icon size-8 bg-light hover:text-primary">
                  <Icon icon="mood-smile" className="text-base" />
                </a>
              </div>
              <button type="submit" className="btn bg-dark text-white btn-sm">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body text-center">
          <h1 className="mb-2.5 text-[28px]">🏆</h1>
          <h4 className="mb-1.25 text-lg font-semibold">Congratulations, {META_DATA.username}! 🎉</h4>
          <p className="text-default-400 italic mb-base">
            Congratulations! You&apos;ve reached
            <strong>&nbsp;5,000 subscribers</strong> ! Your community is growing fast!
          </p>

          <div className="flex justify-center mb-base">
            <div className="me-7.5 text-center">
              <h6 className="text-xs">Posts</h6>
              <span className="font-bold">250</span>
            </div>
            <div className="me-7.5 text-center">
              <h6 className="text-xs">Likes</h6>
              <span className="font-bold">15,200</span>
            </div>
            <div className="text-center">
              <h6 className="text-xs">Subscribers</h6>
              <span className="font-bold">5,000</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            <button className="btn btn-sm text-success border border-success hover:bg-success hover:text-white">
              <Icon icon="share" />
              Share Achievement
            </button>
            <a href="#!" className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
              <Icon icon="user" />
              View Profile
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-2.5">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-9 rounded-full" src={user10} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Sophia Martinez
                </a>
              </h5>
              <p className="text-default-400">
                <small>about 5 minutes ago</small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="pin" />
                      Pin to Top
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-4">Story inspired by the beauty of changing seasons — a nature-themed animation coming soon!</p>
          <div className="grid grid-cols-2 gap-1.25">
            <Image src={gallery10} alt="Tall Image" className="w-full h-full rounded object-cover aspect-3/4" />
            <div className="flex flex-col gap-1.25">
              <Image src={gallery2} alt="Top Right" className="w-full rounded object-cover aspect-4/3" />
              <Image src={gallery3} alt="Bottom Right" className="w-full rounded object-cover aspect-4/3" />
            </div>
          </div>
          <div className="mt-2.5">
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="corner-up-left" className="text-sm" />
              Reply
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <div className="relative">
                <span id="like-count-one" />
                <button type="button" data-hs-toggle-password='{"target": "#like-count-one" }'>
                  <div className="hs-password-active:hidden flex items-center gap-1">
                    <Icon icon="heart-filled" className="text-danger" />
                    Liked!
                  </div>
                  <div className="hs-password-active:flex hidden items-center gap-1">
                    <Icon icon="heart" className="text-default-400" />
                    Like
                  </div>
                </button>
              </div>
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="share" className="text-sm" />
              Share
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-2.5">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-8 rounded-full" src={user4} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Liam Anderson
                </a>
              </h5>
              <p className="text-default-400">
                <small>30 minutes ago</small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="pin" />
                      Pin to Top
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-base text-center mt-5 mb-7.5 italic ">
            <Icon icon="quote" className="text-xl" />
            Spent the weekend exploring the local trails! Captured some amazing nature shots and can’t wait to post them soon. 🌿📸
          </div>
          <div className="bg-light/20 -mx-5 p-5 border-y border-dashed border-default-300">
            <div className="flex items-start">
              <Image className="me-2.5 size-8 rounded-full" src={user5} alt="Generic placeholder image" />
              <div className="w-full">
                <h5 className="mb-1.25">
                  <a href="#!" className="hover:text-primary font-semibold">
                    Ethan Reynolds
                  </a>
                  <small className="text-default-400 font-normal float-end">20 minutes ago</small>
                </h5>
                Loved your recent project! Really curious to see how you implemented the animations.
                <br />
                <a href="javascript:void(0);" className="text-default-400 inline-block mt-2">
                  <Icon icon="corner-up-left" />
                  Reply
                </a>
                <div className="flex items-start mt-5">
                  <Image src={user6} className="size-8 rounded-full me-2.5" alt="Generic placeholder image" />
                  <div className="w-full">
                    <h5 className="mb-1.25">
                      <a href="#!" className="hover:text-primary font-semibold">
                        Mia Thompson
                      </a>
                      <small className="text-default-400 font-normal float-end">12 minutes ago</small>
                    </h5>
                    I created something similar in Angular last month — would love to swap tips!
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start mt-5">
              <Image src={user3} className="rounded-full size-8 me-2.5" alt="Generic placeholder image" height={31} />
              <div className="w-full">
                <input type="text" id="simpleinput" className="form-input form-input-sm" placeholder="Add a comment..." />
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="corner-up-left" className="text-sm" />
              Reply
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <div className="relative">
                <span id="like-count-two" />
                <button type="button" data-hs-toggle-password='{"target": "#like-count-two" }'>
                  <div className="hs-password-active:flex hidden items-center gap-1">
                    <Icon icon="heart-filled" className="text-danger" />
                    Liked!
                  </div>
                  <div className="hs-password-active:hidden flex items-center gap-1">
                    <Icon icon="heart" className="text-default-400" />
                    Like(45)
                  </div>
                </button>
              </div>
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="share" className="text-sm" />
              Share
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center mb-base">
            <Image className="me-2.5 size-8 rounded-full" src={user2} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Anika Roy
                </a>
              </h5>
              <p className="text-default-400">
                <small>Posted 2 hours ago</small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="pin" />
                      Pin to Top
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-2.5">
            🌿 Save the Date:
            <strong>Nature Photography Workshop 2025</strong>
          </h5>
          <p className="text-default-400 mb-2.5">Join fellow creatives and outdoor enthusiasts for an inspiring weekend of nature photography tips, live field sessions, and community networking.</p>
          <ul className="list-none mb-base">
            <li className="pb-2.5">
              <strong>Date:</strong>
              Saturday, 14th September 2025
            </li>
            <li className="pb-2.5">
              <strong>Time:</strong>
              10:00 AM – 4:00 PM
            </li>
            <li>
              <strong>Location:</strong>
              Green Valley National Park (Meeting point to be shared)
            </li>
          </ul>

          <div className="flex gap-2.5">
            <button className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-white">
              <Icon icon="bell" className="me-1.25" />
              Interested
            </button>
            <button className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
              <Icon icon="user-plus" className="me-1.25" />
              Join Now
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-2.5">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-8 rounded-full" src={user1} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  {META_DATA.username}
                </a>
              </h5>
              <p className="text-default-400">
                <small>Posted 2 hours ago </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="pin" />
                      Pin to Top
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-4">Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!</p>
          <div className="grid md:grid-cols-2 gap-2.5">
            <div>
              <div className="relative aspect-video rounded overflow-hidden">
                <iframe src="https://player.vimeo.com/video/1084537" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
              </div>
            </div>
            <div>
              <div className="relative aspect-video rounded overflow-hidden">
                <iframe src="https://player.vimeo.com/video/76979871" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="corner-up-left" className="text-sm" />
              Reply
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <div className="relative">
                <span id="like-count-three" />
                <button type="button" data-hs-toggle-password='{"target": "#like-count-three" }'>
                  <div className="hs-password-active:hidden flex items-center gap-1">
                    <Icon icon="heart-filled" className="text-danger" />
                    Liked!
                  </div>
                  <div className="hs-password-active:flex hidden items-center gap-1">
                    <Icon icon="heart" className="text-default-400" />
                    Like
                  </div>
                </button>
              </div>
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="share" className="text-sm" />
              Share
            </a>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-8 rounded-full" src={user6} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  David Kim
                </a>
              </h5>
              <p className="text-default-400">
                <small>Posted 10 hours ago </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete Post
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="pin" />
                      Pin to Top
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-base">🔥 Quick Poll: What’s your go-to front-end framework in 2025?</h5>
          <p className="text-default-400 mb-4">We’re gathering developer preferences for our next project. Cast your vote below! 💻</p>

          <form>
            <div className="flex items-center gap-1.25 mb-1.25">
              <input className="form-radio rounded-full!" type="radio" name="framework_poll" id="optionReact" />
              <label className="form-check-label" htmlFor="optionReact">
                React (Meta)
              </label>
            </div>
            <div className="flex items-center gap-1.25 mb-1.25">
              <input className="form-radio rounded-full!" type="radio" name="framework_poll" id="optionVue" />
              <label className="form-check-label" htmlFor="optionVue">
                Vue.js (Evan You)
              </label>
            </div>
            <div className="flex items-center gap-1.25 mb-1.25">
              <input className="form-radio rounded-full!" type="radio" name="framework_poll" id="optionAngular" />
              <label className="form-check-label" htmlFor="optionAngular">
                Angular (Google)
              </label>
            </div>
            <div className="flex items-center gap-1.25 mb-base">
              <input className="form-radio rounded-full!" type="radio" name="framework_poll" id="optionSvelte" />
              <label className="form-check-label" htmlFor="optionSvelte">
                Svelte (Emerging Favorite)
              </label>
            </div>
            <button type="submit" className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
              Submit Vote
            </button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-2.5">
          <div className="flex items-center">
            <Image className="me-2.5 size-9 rounded-full" src={user6} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Sarah Mitchell
                </a>
              </h5>
              <p className="text-default-400">
                <small>Posted 4 hours ago </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="border border-default-300 rounded-md p-5 bg-light/10">
            <h5 className="font-bold mb-1.25">🌟 Hiring: Front-End Developer</h5>
            <p className="text-default-400 mb-base">Our team is growing! Looking for a talented developer experienced with modern JS frameworks.</p>
            <ul className="list-none mb-base">
              <li>
                <strong>Role:</strong> Front-End Developer
              </li>
              <li>
                <strong>Skills:</strong> React, Vue, ESBuild, Tailwind
              </li>
              <li>
                <strong>Location:</strong> Remote (Worldwide)
              </li>
            </ul>
            <button className="btn bg-primary text-white w-full rounded-full hover:bg-primary-hover">Apply Now</button>
          </div>
        </div>
        <div className="px-5 pb-3.75">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-four" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-four" }'>
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                  Save
                </div>
                <div className="hs-password-active:flex hidden items-center gap-1">
                  <Icon icon="heart-filled" className="text-danger" />
                  Save!
                </div>
              </button>
            </div>
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="share" className="text-sm" />
            Share
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-0">
          <div className="flex items-center">
            <Image className="me-2.5 size-9 rounded-full" src={user3} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Daniel Carter
                </a>
              </h5>
              <p className="text-default-400">
                <small>6 hours ago </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="edit" />
                      Edit
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="trash" />
                      Delete
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body pb-1.25">
          <p className="text-default-400 mb-2.5">Found this helpful tool for UI designers — bookmarking it for future projects!</p>
          <a href="#!" className="block border border-light rounded-2xl text-reset overflow-hidden shadow-sm">
            <div className="flex">
              <Image
                src={gallery7}
                alt=""
                className="img-fluid"
                style={{
                  width: 140,
                  objectFit: 'cover',
                }}
              />
              <div className="card-body">
                <h6 className="font-bold text-xs mb-1.25">UI Component Library Explorer</h6>
                <p className="text-xs text-default-400">Browse, compare and preview hundreds of UI components for modern frameworks.</p>
              </div>
            </div>
          </a>
        </div>
        <div className="card-body pb-3.75">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="corner-up-left" className="text-sm" />
            Reply
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-five" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-five" }'>
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart-filled" className="text-danger" />
                  Liked!
                </div>
                <div className="hs-password-active:flex hidden items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                  Like
                </div>
              </button>
            </div>
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="share" className="text-sm" />
            Share
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-0">
          <div className="flex items-center">
            <Image className="me-2.5 size-9 rounded-full" src={user10} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Evelyn Brooks
                </a>
              </h5>
              <p className="text-default-400">
                <small>Just now </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body pt-2.5">
          <div className="bg-primary/10 text-primary rounded-md p-7.5 text-center">
            <h1 className="text-4xl">🌤️</h1>
            <h3 className="text-2xl mb-2.5 font-bold">23°C</h3>
            <p className="italic">
              Clear skies in <strong>Vancouver</strong>
            </p>
          </div>
          <p className="mt-5 mb-4 text-default-400 text-center">Perfect weather for a walk by the water today 🌊✨</p>
        </div>

        <div className="card-body justify-center flex pb-3.75 pt-0">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-six" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-six" }'>
                <div className="hs-password-active:flex hidden items-center gap-1">
                  <Icon icon="heart-filled" className="text-danger" />
                  Liked!
                </div>
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                  Like
                </div>
              </button>
            </div>
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="corner-up-left" className="text-sm" />
            Comment
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="share" className="text-sm" />
            Share
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-2.5">
          <div className="flex items-center">
            <Image className="me-2.5 size-8 rounded-full" src={user8} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Emma Wilson
                </a>
              </h5>
              <p className="text-default-400">
                <small>3 hours ago </small>
              </p>
            </div>
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base text-default-400" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical" tabIndex={-1}>
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="share" />
                      Share
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="flag" />
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body py-0">
          <h5 className="mb-1.25 mt-5 font-bold">🎧 Song of the Day</h5>
          <p className="text-default-400 mb-2.5">Found this calming track for focus sessions — highly recommend giving it a listen.</p>

          <div className="bg-light/50 rounded-2xl p-5 shadow">
            <div className="flex items-center">
              <Image
                src={gallery5}
                alt=""
                className="rounded me-5"
                style={{
                  height: 60,
                  width: 60,
                  objectFit: 'cover',
                }}
              />
              <div className="flex-1">
                <div className="font-semibold">Dreamscape Horizon</div>
                <small className="text-default-400">By SynthWaves</small>

                <audio
                  controls
                  className="w-full mt-2.5"
                  style={{
                    height: 32,
                  }}
                >
                  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body py-3.75">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="corner-up-left" className="text-sm" />
            Reply
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-seaven" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-seaven" }'>
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart-filled" className="text-danger" />
                  Liked!
                </div>
                <div className="hs-password-active:flex hidden items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                  Like
                </div>
              </button>
            </div>
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="share" className="text-sm" />
            Share
          </a>
        </div>
      </div>
    </>
  )
}
export default SocialFeed
