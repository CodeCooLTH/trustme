import gallery12 from '@/assets/images/gallery/12.jpg'
import gallery2 from '@/assets/images/gallery/2.jpg'
import gallery5 from '@/assets/images/gallery/5.jpg'
import gallery7 from '@/assets/images/gallery/7.jpg'
import gallery8 from '@/assets/images/gallery/8.jpg'
import user1 from '@/assets/images/users/user-1.jpg'
import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user6 from '@/assets/images/users/user-6.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
const FeedColumn = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex items-center mb-base">
            <div className="flex-1">
              <h5 className="font-semibold">Create a Post</h5>
              <span className="text-default-400 text-xs">Share updates with your network</span>
            </div>
          </div>

          <div className="relative">
            <textarea rows={3} className="form-textarea" placeholder="Write something meaningful..." />
          </div>

          <div className="flex flex-wrap gap-2.5 justify-between items-center mt-5">
            <div className="flex gap-2.25">
              <button type="button" className="btn btn-sm bg-light hover:text-primary text-sm">
                <Icon icon="user" className="text-base" />
                <span className="md:block hidden">Tag</span>
              </button>
              <button type="button" className="btn btn-sm bg-light hover:text-primary text-sm">
                <Icon icon="map-pin" className="text-base" />
                <span className="md:block hidden">Location</span>
              </button>
              <button type="button" className="btn btn-sm bg-light hover:text-primary text-sm">
                <Icon icon="camera" className="text-base" />
                <span className="md:block hidden">Photo</span>
              </button>
              <button type="button" className="btn btn-sm bg-light hover:text-primary text-sm">
                <Icon icon="mood-smile" className="text-base" />
                <span className="md:block hidden">Feeling</span>
              </button>
            </div>

            <button type="submit" className="btn bg-primary btn-sm px-5 text-white hover:bg-primary-hover">
              Publish
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="bg-primary/10 text-primary py-5 md:px-7.5 px-2.5 relative rounded-t">
          <h4 className="md:text-lg text-base font-bold">Achievement Unlocked</h4>
          <span className="absolute top-1/2 -translate-y-1/2 end-0 bg-warning text-white font-semibold px-2.5 py-1.25 rounded-s"> 🏅 Level Up </span>
        </div>

        <div className="card-body text-center py-7.5">
          <div className="mb-base">
            <h1 className="text-[40px]">💡</h1>
          </div>
          <h4 className="text-lg mb-1.25 font-semibold">Impressive Progress, David Dev!</h4>
          <p className="text-default-400 mb-7.5">
            You’ve just reached <strong>Milestone Tier 3</strong> for your outstanding activity. Keep up the great momentum!
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-7.5">
            <div className="px-5 py-2.5 rounded border border-dashed border-default-300">
              <h6 className="text-default-400 text-2xs">Achievements</h6>
              <div className="font-bold text-sm">28</div>
            </div>
            <div className="px-5 py-2.5 rounded border border-dashed border-default-300">
              <h6 className="text-default-400 text-2xs">Followers</h6>
              <div className="font-bold text-sm">7,840</div>
            </div>
            <div className="px-5 py-2.5 rounded border border-dashed border-default-300">
              <h6 className="text-default-400 text-2xs">Score</h6>
              <div className="font-bold text-sm">1,920</div>
            </div>
          </div>

          <div className="flex justify-center gap-2.5">
            <button className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-white">
              <Icon icon="share" />
              Share
            </button>
            <a href="#!" className="btn bg-success btn-sm text-white hover:bg-success-hover">
              <Icon icon="user" />
              Profile
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2.5">
            <div className="md:col-span-2">
              <Image src={gallery5} className="w-full h-65 object-cover rounded-md" alt="" />
            </div>
            <div>
              <Image src={gallery7} className="w-full h-37.5 object-cover rounded-md" alt="" />
            </div>
            <div>
              <Image src={gallery8} className="w-full h-37.5 object-cover rounded-md" alt="" />
            </div>
          </div>
          <div className="mt-2.5">
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="corner-up-left" className="text-sm" />
              Reply
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <div className="relative">
                <span id="like-count-eight" />
                <button type="button" data-hs-toggle-password='{"target": "#like-count-eight" }'>
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
        <div className="card-body pb-0">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-9 rounded-full" src={user4} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Liam Anderson
                </a>
              </h5>
              <p className="text-default-400">
                <small>about 30 minutes ago</small>
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
                      <Icon icon="pin" />
                      Pin
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

          <div className="border-s-3 border-primary ps-5 mt-5 mb-7.5">
            <p className="text-default-400 italic text-base">
              <Icon icon="quote" className="me-2.5 text-xl opacity-75" />
              Discovering peaceful nature trails today — captured some beautiful shots I can&apos;t wait to share. 🌲✨
            </p>
          </div>
        </div>
        <div className="bg-light/20 p-5 border-t border-default-300">
          <div className="flex items-start">
            <Image className="me-5 size-8 rounded-full" src={user5} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Ethan Reynolds
                </a>
                <small className="text-default-400 font-normal float-end">20 minutes ago</small>
              </h5>
              <p className="mb-1.25 text-default-400">This sounds amazing! Excited to see the photos — the last set you shared was incredible.</p>
              <br />
              <a href="javascript:void(0);" className="text-default-400 inline-block">
                <Icon icon="corner-up-left" />
                Reply
              </a>
              <div className="flex items-start mt-5 ps-7.5 border-s border-default-300">
                <Image src={user6} className="size-8 rounded-full me-5" alt="Generic placeholder image" />
                <div className="w-full">
                  <h5>
                    <a href="#!" className="hover:text-primary font-semibold">
                      Mia Thompson
                    </a>
                    <small className="text-default-400 font-normal float-end">12 minutes ago</small>
                  </h5>
                  <p className="mb-1.25 text-default-400">I hiked there last month! Those trails are perfect for photography — can&apos;t wait to see your shots!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start mt-5">
            <Image src={user3} className="rounded-full size-8 me-2.5" alt="Generic placeholder image" height={31} />
            <div className="w-full">
              <input type="text" id="simpleinput" className="form-input form-input-sm rounded-full!" placeholder="Write a comment..." />
            </div>
          </div>
        </div>
        <div className="p-2.5">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="corner-up-left" className="text-sm" />
            Reply
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-two" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-two" }'>
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
        <div className="relative">
          <Image src={gallery2} className="w-full h-45 object-cover rounded-t" alt="Event Banner" />
          <span className="badge bg-primary text-white absolute top-0 start-0 m-5 px-5 py-2.5 rounded-full"> 📸 Photography Event </span>

          <div className="hs-dropdown absolute top-0 end-0 m-5 inline-flex [--placement:bottom-right]">
            <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <Icon icon="dots-vertical" className="text-base text-white" />
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
                  <Icon icon="pin" />
                  Pin
                </a>
                <a href="#" className="dropdown-item">
                  <Icon icon="flag" />
                  Report
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="flex items-center mb-base">
            <Image src={user2} className="size-9 rounded-full me-2.5" alt="User" />
            <div>
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Anika Roy
                </a>
              </h5>
              <small className="text-default-400 text-2xs">2 hours ago</small>
            </div>
          </div>

          <h4 className="text-lg mb-2.5">Nature Photography Workshop 2025</h4>
          <p className="text-default-400 mb-4">A weekend event designed for photographers and outdoor lovers to learn, collaborate, and capture stunning nature moments together.</p>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-2.5 mb-base">
            <div>
              <div className="bg-light/20 border border-light border-dashed rounded p-5 h-full">
                <small className="text-default-400 uppercase font-bold">Date</small>
                <div className="font-semibold mt-1.25">14 September 2025</div>
              </div>
            </div>
            <div>
              <div className="bg-light/20 border border-light border-dashed rounded p-5 h-full">
                <small className="text-default-400 uppercase font-bold">Time</small>
                <div className="font-semibold mt-1.25">10:00 AM – 4:00 PM</div>
              </div>
            </div>
            <div>
              <div className="bg-light/20 border border-light border-dashed rounded p-5 h-full">
                <small className="text-default-400 uppercase font-bold">Location</small>
                <div className="font-semibold mt-1.25">Green Valley National Park</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2.5 mt-2.5">
            <button className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-white">
              <Icon icon="bell" />
              Remind Me
            </button>
            <button className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
              <Icon icon="user-plus" />
              Register
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
                  David Dev
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
          <div className="relative aspect-video rounded overflow-hidden">
            <iframe src="https://player.vimeo.com/video/1084537" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
          </div>
          <div className="mt-2.5">
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <Icon icon="corner-up-left" className="text-sm" />
              Reply
            </a>
            <a href="" className="btn btn-sm text-default-400 text-sm">
              <div className="relative">
                <span id="like-count-nine" />
                <button type="button" data-hs-toggle-password='{"target": "#like-count-nine" }'>
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
        <div className="card-body pb-0">
          <div className="flex items-center mb-2.5">
            <Image className="me-2.5 size-8 rounded-full" src={user6} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  David Kim
                </a>
              </h5>
              <p className="text-default-400">
                <small>10 hours ago </small>
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

          <div className="mt-5">
            <span className="badge py-2.5 px-5 bg-primary/10 text-primary rounded-full mb-2.5">📊 Community Poll</span>
            <h5 className="mb-1.25 font-bold">Choose your favorite front-end framework in 2025</h5>
            <p className="text-default-400 mb-2.5">Your vote helps us decide what to adopt for our next UI toolkit update.</p>
          </div>
        </div>

        <div className="card-body pt-0">
          <div className="bg-light/20 p-5 ps-7.5 rounded border border-default-300">
            <form>
              <div className="flex gap-2.5 mb-2.5 p-2.5 bg-card rounded shadow">
                <input className="form-radio bg-white! checked:bg-primary! rounded-full! -ms-6" type="radio" name="poll" id="pollReact" />
                <label className="form-check-label font-semibold" htmlFor="pollReact">
                  React (Meta)
                </label>
              </div>
              <div className="flex gap-2.5 mb-2.5 p-2.5 bg-card rounded shadow">
                <input className="form-radio bg-white! checked:bg-primary! rounded-full! -ms-6" type="radio" name="poll" id="pollVue" />
                <label className="form-check-label font-semibold" htmlFor="pollVue">
                  Vue.js (Evan You)
                </label>
              </div>
              <div className="flex gap-2.5 mb-2.5 p-2.5 bg-card rounded shadow">
                <input className="form-radio bg-white! checked:bg-primary! rounded-full! -ms-6" type="radio" name="poll" id="pollAngular" />
                <label className="form-check-label font-semibold" htmlFor="pollAngular">
                  Angular (Google)
                </label>
              </div>
              <div className="flex gap-2.5 mb-base p-2.5 bg-card rounded shadow">
                <input className="form-radio bg-white! checked:bg-primary! rounded-full! -ms-6" type="radio" name="poll" id="pollSvelte" />
                <label className="form-check-label font-semibold" htmlFor="pollSvelte">
                  Svelte (Emerging Favorite)
                </label>
              </div>

              <button type="submit" className="btn bg-primary text-white w-full rounded-full hover:bg-primary-hover">
                Submit Vote
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body pb-0">
          <div className="flex items-center">
            <Image className="me-2.5 size-8 rounded-full" src={user7} alt="Generic placeholder image" />
            <div className="w-full">
              <h5>
                <a href="#!" className="hover:text-primary font-semibold">
                  Ava Thompson
                </a>
              </h5>
              <p className="text-default-400">
                <small>1 hour ago </small>
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

        <div className="card-body pb-0">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image src={gallery8} className="w-full h-65 object-cover" alt="" />
          </div>
        </div>

        <div className="px-5 py-2.5">
          <p className="mb-2.5 text-default-400">Dropping my favorite shot from yesterday&apos;s sunset hike. 🌅 Nature always surprises me.</p>
        </div>
        <div className="p-2.5">
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <Icon icon="corner-up-left" className="text-sm" />
            Reply
          </a>
          <a href="" className="btn btn-sm text-default-400 text-sm">
            <div className="relative">
              <span id="like-count-ten" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-ten" }'>
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
        <div className="relative">
          <Image src={gallery12} className="w-full h-50 object-cover brightness-50 rounded-t" alt="" />
          <div className="absolute top-0 start-0 size-full flex flex-col justify-center items-center text-center text-white px-7.5">
            <Icon icon="quote" className="text-3xl opacity-75 mb-2.5" />
            <h4 className="mb-1.25 text-lg">“Creativity is intelligence having fun.”</h4>
            <p className="text-2xs opacity-75">A reminder to keep exploring, learning, and building.</p>
          </div>

          <div className="hs-dropdown absolute top-0 end-0 m-5 inline-flex [--placement:bottom-right]">
            <button type="button" className="hs-dropdown-toggl" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <Icon icon="dots-vertical" className="text-base text-white" />
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
        <div className="card-body flex items-center">
          <Image src={user4} alt="Noah Carter" className="size-9 rounded-full me-2.5" />
          <div className="flex-1">
            <h5>
              <a href="#!" className="hover:text-primary font-semibold">
                Noah Carter
              </a>
            </h5>
            <small className="text-default-400">Shared an inspiration</small>
          </div>
          <a href="" className="text-default-400 text-lg">
            <div className="relative">
              <span id="like-count-eleven" />
              <button type="button" data-hs-toggle-password='{"target": "#like-count-eleven" }'>
                <div className="hs-password-active:flex hidden items-center gap-1">
                  <Icon icon="heart-filled" className="text-danger" />
                </div>
                <div className="hs-password-active:hidden flex items-center gap-1">
                  <Icon icon="heart" className="text-default-400" />
                </div>
              </button>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
export default FeedColumn
