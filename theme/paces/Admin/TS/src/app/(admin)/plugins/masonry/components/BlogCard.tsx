import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import Link from 'next/link'
import { BlogType } from './data'

const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <article className="card mb-0">
      <div className="card-body">
        <h6 className="card-title mb-3 text-base">
          <Link href="" className="hover:text-primary">
            {blog.title}
          </Link>
        </h6>
        <p className="text-default-400 mb-base">{blog.description}</p>
        <div>
          {blog.tags.map((tag, idx) => (
            <Link href="" className="badge badge-label border border-default-300 me-1" key={idx}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="card-footer flex justify-between border-0!">
        <div className="flex items-center justify-start gap-2">
          <div className="size-6">
            <Image src={blog.author.image} alt="avatar-6" className="img-fluid rounded-full" />
          </div>
          <div>
            <h5 className="lh-base text-sm text-nowrap">
              <Link href="" className="hover:text-primary">
                {blog.author.name}
              </Link>
            </h5>
          </div>
        </div>
        <Link className="text-primary font-semibold hover:text-primary-hover flex gap-1 items-center" href="">
          Read more
          <Icon icon="arrow-right" />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
