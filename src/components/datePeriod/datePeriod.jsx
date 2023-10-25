import React from 'react';
import {
  SwapRightOutlined,
  CalendarOutlined,
  WarningFilled,
} from '@ant-design/icons';
import styles from './datePeriodStyles';
import PropTypes from 'prop-types';

const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

function calculateDelayedDays(endDate) {
  const difference = new Date().getTime() - endDate.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return totalDays;
}

const DelayedProject = ({ endDate }) => {
  const totalDays = calculateDelayedDays(endDate);

  return (
    <div style={styles.delayedDiv}>
      <WarningFilled style={styles.warningIcon} />
      <p style={styles.warningText}>{totalDays} dias de atraso</p>
    </div>
  );
};

DelayedProject.propTypes = {
  endDate: PropTypes.object.isRequired,
};

const DatePeriod = ({ startDate, endDate }) => {
  const startDateParsed = startDate.toLocaleDateString('pt-BR', options);
  const endDateParsed = endDate.toLocaleDateString('pt-BR', options);

  const scheduleDelay = () => {
    return calculateDelayedDays(endDate) > 0;
  };

  return (
    <div style={styles.root}>
      <div style={styles.datesDiv}>
        <span onClick={() => console.log('start')}>{startDateParsed}</span>
        <SwapRightOutlined style={styles.dateIcons} />
        <span onClick={() => console.log('end')}>{endDateParsed}</span>
        <CalendarOutlined style={styles.dateIcons} />
      </div>
      {scheduleDelay() && <DelayedProject endDate={endDate} />}
    </div>
  );
};

DatePeriod.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
};

export default DatePeriod;
