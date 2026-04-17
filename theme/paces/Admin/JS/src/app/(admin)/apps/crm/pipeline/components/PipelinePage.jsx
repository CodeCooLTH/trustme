'use client'

import Icon from '@/components/wrappers/Icon'
import Board from './Board'
import { pipelineSectionsData, pipelineTaskData } from './data'
import { PipelineProvider } from './usePipelineContext'
const PipelinePage = () => {
  return (
    <PipelineProvider sectionsData={pipelineSectionsData} tasksData={pipelineTaskData}>
      <div className="card">
        <div className="card-header">
          <div className="flex flex-wrap items-center gap-base">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input type="text" className="form-input" placeholder="Search deals..." />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="input-icon-group">
                <Icon icon="arrows-shuffle" className="input-icon" />
                <select className="form-select">
                  <option>Stage</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div className="input-icon-group">
                <Icon icon="calendar" className="input-icon" />
                <select className="form-select">
                  <option>Closing Date</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <button className="btn bg-secondary text-white hover:bg-secondary-hover">
              <Icon icon="plus" />
              Add New Deal
            </button>
          </div>
        </div>
        <Board />
      </div>
    </PipelineProvider>
  )
}
export default PipelinePage
