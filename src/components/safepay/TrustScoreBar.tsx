type TrustScoreBarProps = {
  label: string
  pct: number
  colorClass: string
  desc: string
}

const TrustScoreBar = ({ label, pct, colorClass, desc }: TrustScoreBarProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-2">
          <h6 className="font-semibold text-dark">{label}</h6>
          <span className="badge bg-primary/15 text-primary">{pct}%</span>
        </div>
        <div className="bg-default-100 flex h-2 w-full overflow-hidden rounded mb-2">
          <div
            className={`${colorClass} flex flex-col justify-center overflow-hidden transition duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-default-500 text-sm">{desc}</p>
      </div>
    </div>
  )
}

export default TrustScoreBar
