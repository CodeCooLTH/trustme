import PageBreadcrumb from '@/components/PageBreadcrumb'
import PasswordMeters from './components/PasswordMeters'
export const metadata = {
  title: 'Password Meter',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Password Meter" subtitle="Plugins" />
      <div className="grid lg:grid-cols-2 gap-base">
        <PasswordMeters />
      </div>
    </>
  )
}
export default Page
