import React, { useState, useEffect, useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

import { usePlayerContext } from '../../context/playerContext/PlayerContext';

import 'react-tooltip/dist/react-tooltip.css';
import './EffectIndicator.styles.css';
import { accordionClasses } from '@mui/material';

// Helper functions
function roundToDecimal(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

function formatDate(epoch) {
  const date = new Date(epoch);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based index
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function tooltipTextMaker(dataObj, ratesObj, duration, startTime) {
  const expirationDate = formatDate(duration + startTime);
  let text =
    'Expires: at: ' +
    expirationDate +
    ' <br/> - Boosted Gathering Rates - <br/>'; // I assgined a empty string, for VS Code intellisence 😎
  for (const effect in dataObj) {
    let type = '';
    let rate = '';
    if (Object.hasOwnProperty.call(dataObj, effect)) {
      const boost = dataObj[effect];
      if (boost > 1 && boost < 5) {
        if (effect.startsWith('gold')) {
          type = 'Gold';
          rate = 'goldGathRate';
        }
        if (effect.startsWith('pop')) {
          type = 'Population';
          rate = 'popGrowthRate';
        }
        if (effect.startsWith('concrete')) {
          type = 'Concrete';
          rate = 'concreteGathRate';
        }
        if (effect.startsWith('metals')) {
          type = 'Metals';
          rate = 'metalsGathRate';
        }
        if (effect.startsWith('crystals')) {
          type = 'Crystals';
          rate = 'crystalsGathRate';
        }
        text = text.concat(
          type,
          ': ',
          `${ratesObj[rate]}`,
          ` (+${roundToDecimal((boost - 1) * 100, 2)}%)`,
          '<br />'
        );
      }
    }
  }
  return text;
}

const EffectIndicator = ({
  duration,
  image,
  isEffectActive,
  tooltipText,
  effectRef,
}) => {
  const { effectDuration, fakeDate, gatheringRatesRef } = usePlayerContext();
  const [startDateInMilliseconds, setStartDateInMilliseconds] = useState(
    effectRef.current.endDate
  );
  // const [currentDateInMilliseconds, setCurrentDateInMilliseconds] = useState(
  //   Date.now()
  // );
  const [rerender, setRerender] = useState(false);

  const calculateElapsedPercentage = (
    startDateInMilliseconds,
    currentDateInMilliseconds,
    durationInDays
  ) => {
    // const durationInMilliseconds = durationInDays * 24 * 60 * 60 * 1000;
    const durationInMilliseconds = durationInDays; // seconds
    const elapsedTimeInMilliseconds =
      currentDateInMilliseconds - startDateInMilliseconds;
    const elapsedPercentage =
      (elapsedTimeInMilliseconds / durationInMilliseconds) * 100;
    // console.log('Effect Indicator:: isActive : ', isEffectActive);
    // console.log('Effect Indicator:: Efefct Ref : ', effectRef);
    // console.log('Effect Indicator:: CurrentDate : ', currentDateInMilliseconds);
    // console.log(
    //   'Effect Indicator:: (Date) - CurrentDate : ',
    //   formatDate(currentDateInMilliseconds)
    // );
    // console.log(
    //   'Effect Indicator:: (Date) - StartDate : ',
    //   formatDate(startDateInMilliseconds)
    // );
    // console.log('Effect Indicator:: StartDate : ', startDateInMilliseconds);
    // console.log('Effect Indicator:: ElapsedTime : ', elapsedTimeInMilliseconds);
    // console.log(
    //   'Effect Indicator:: ElapsedTime (%) : ',
    //   roundToDecimal(elapsedPercentage, 4)
    // );
    return roundToDecimal(elapsedPercentage, 2);
  };

  const [progress, setProgress] = useState(
    calculateElapsedPercentage(
      effectRef.current.endDate,
      // startDateInMilliseconds,
      Date.now(),
      // currentDateInMilliseconds,
      effectDuration
    )
  );
  const [hasEffectExpired, setEffectExpired] = useState(false);

  const [initComplete, setInitComplete] = useState(false);

  // console.log('Effect Indicator::isEffectActive: ', effectRef);

  // const elapsedPercentage = useMemo(() => {
  //   return calculateElapsedPercentage(
  //     startDateInMilliseconds,
  //     currentDateInMilliseconds,
  //     effectDuration
  //   );
  // }, [startDateInMilliseconds, currentDateInMilliseconds, effectDuration]);
  // const memoizedTooltipText = useMemo(
  //   () => tooltipTextMaker(effectRef.current),
  //   []
  // );
  // console.log('Effect Indicator::Duration: ', duration);
  // console.log('Effect Indicator::isEffectActive: ', isEffectActive);

  useEffect(() => {
    // console.log('🌭🌭🌭🌭🌭🌭🌭🌭🌭🌭🌭🌭');
    // }
    const interval = setInterval(() => {
      setProgress(
        calculateElapsedPercentage(
          startDateInMilliseconds,
          Date.now(),
          effectDuration
        )
      );
      setRerender((prev) => !prev);
      // console.log('🌭🌭🌭 ', fakeDate, ' 🌭🌭🌭');

      // if (fakeDate !== null) {
      //   setCurrentDateInMilliseconds(Date.now() + fakeDate); //+11 hours into the future
      // } else {
      //   setCurrentDateInMilliseconds(Date.now());
      // }

      // setCurrentDateInMilliseconds(Date.now());
    }, 500);

    setInitComplete(true);

    return () => {
      clearInterval(interval);
    };
  }, [progress, rerender]);

  useEffect(() => {
    if (progress < 0) setEffectExpired(true);
  }, [progress]);

  // console.log('asdfigfnioj: ', Math.trunc(progress) / 100);
  const strokeDashoffset = 440 * (roundToDecimal(progress, 2) / 100);
  function colorPicker() {
    return progress < 60 ? 'green' : progress < 90 ? 'orange' : 'red';
  }

  return (
    <>
      {initComplete && (
        <>
          <div
            className="duration-effect"
            data-tooltip-html={tooltipTextMaker(
              effectRef.current,
              gatheringRatesRef.current,
              effectDuration,
              effectRef.current.endDate
            )}
            data-tooltip-id="my-tooltip"
            // data-for="my-tooltip"
            // data-tooltip-content={`Concrete: 35%\nConcrete: 35%\nConcrete: 35%`}
          >
            {!hasEffectExpired && isEffectActive && (
              <>
                <img
                  src={image}
                  alt="Workaholism"
                  className="background-image"
                />
                <svg className="progress-ring" viewBox="0 0 140 140">
                  <circle
                    className="progress-ring__circle"
                    stroke={colorPicker()}
                    strokeWidth="8"
                    fill="transparent"
                    r="66"
                    cx="70"
                    cy="70"
                    strokeDasharray="440"
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                {/* <div className="tooltip">{tooltipText}</div> */}
                <div className="glass-circle">
                  {roundToDecimal(100 - progress, 2)}%
                </div>
              </>
            )}
          </div>
          <Tooltip id="my-tooltip" place="bottom" openOnClick />
        </>
      )}
    </>
  );
};

export default EffectIndicator;
