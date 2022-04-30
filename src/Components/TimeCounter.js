import { useState, useEffect } from 'react'
import moment from 'moment'

const TimeCounter = () => {
  const [timeTrigger, setTimeTrigger] = useState(true);
  let today = new Date();

  useEffect(() => {
    setTimeout(() => setTimeTrigger(!timeTrigger), 1000)
  }, [timeTrigger])

  return (
    <div className="current-time">
      Aktualny czas: <span>{moment().format('L')} | {today.toLocaleTimeString()}</span>
    </div>
  )
}

export default TimeCounter;