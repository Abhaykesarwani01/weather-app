import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";
import { weatherCodeToIcon } from "../weatherCodeToIcon"; 

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title">Daily Forecast</label>
      <Accordion allowZeroExpanded>
        {data.time.slice(0, 7).map((date, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  
                  <img
                    src={`/icons/${weatherCodeToIcon[data.weathercode[idx]] || '01d'}.png`}
                    className="icon-small"
                    alt="weather"
                    />
                  
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    Max {Math.round(data.temperature_2m_max[idx])}°C / Min{" "}
                    {Math.round(data.temperature_2m_min[idx])}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Date:</label>
                  <label>{date}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Precipitation:</label>
                  <label>{data.precipitation_sum[idx]} mm</label>
                </div>
                
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

