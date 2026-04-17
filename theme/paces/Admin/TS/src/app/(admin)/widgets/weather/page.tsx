import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import SummaryCard from './components/SummaryCard'
import TopCitiesWeather from './components/TopCitiesWeather'
import WeatherByCountry from './components/WeatherByCountry'
import WeatherForecast from './components/WeatherForecast'
import WeatherOverviewCard from './components/WeatherOverviewCard'

export const metadata: Metadata = { title: 'Weather Widgets' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Weather" subtitle="Widgets" />

      <div className="container-fluid">
        <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-2.5 mb-base">
          <WeatherForecast />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-base mb-base">
          <SummaryCard />
        </div>

        <div className="grid xl:grid-cols-3 grid-cols-1 gap-base">
          <TopCitiesWeather />
          <WeatherByCountry />
          <WeatherOverviewCard />
        </div>
      </div>
    </>
  )
}

export default Page
