import React from 'react'
import { SwapRightOutlined, CalendarOutlined, WarningFilled } from '@ant-design/icons'
import styles from './datePeriodStyles'

function calculateDelayedDays(endDate) {
    const difference = new Date().getTime() - endDate.getTime()
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24))

    return TotalDays
}

const DelayedProject = (props) => {
    const { endDate } = props

    const TotalDays = calculateDelayedDays(endDate)
    
    return ( 
        <div style={styles.delayedDiv}>
            <WarningFilled style={styles.warningIcon}/>
            <p style={styles.warningText}>{TotalDays} dias de atraso</p>
        </div>
    );
}

const DatePeriod = (props) => {
    const { startDate, endDate } = props;

    const startDateParsed = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    const endDateParsed = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`

    const scheduleDelay = () => {
        return calculateDelayedDays(endDate) > 0;
    }
    
    return(
        <div style={styles.root}>
            <div style={styles.datesDiv}>
                <span>{startDateParsed}</span>
                <SwapRightOutlined style={styles.dateIcons}/>
                <span>{endDateParsed}</span>
                <CalendarOutlined style={styles.dateIcons}/>
            </div>
            {scheduleDelay() && <DelayedProject endDate={endDate}/>}
        </div>
    )
}

export default DatePeriod