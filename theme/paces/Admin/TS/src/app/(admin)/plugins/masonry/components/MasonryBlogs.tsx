'use client'
import dynamic from 'next/dynamic'
import BlogCard from './BlogCard'
import { BlogType, blogsData } from './data'

const Masonry = dynamic(() => import('masonic').then((mod) => mod.Masonry<BlogType>), { ssr: false })

const MasonryBlogs = () => {
  return (
    <div style={{ width: '100%' }}>
      <Masonry items={blogsData} columnGutter={20} columnWidth={350} overscanBy={2} render={({ data }) => <BlogCard blog={data} />} />
    </div>
  )
}

export default MasonryBlogs
