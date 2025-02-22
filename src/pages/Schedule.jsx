import React, { useState } from "react";
import AnalogClock from "analog-clock-react";
import ScheduleWidget from "../components/ScheduleWidget";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import ScheduleDetail from "../components/ScheduleDetail";
import { useSchedule } from "../hooks/schedule";
import Relax from "../components/Relax";

const Schedule = () => {
  const schedules = useSchedule();

  const user = useAuth();

  // Schedule Detail
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailPage(true);
  };

  const date = new Date();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const options = {
    width: "140px",
    baseColor: "#282D35",
    centerColor: "#2F69FC",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#CF8D3F",
      minute: "#DEF0FF",
      hour: "#DEF0FF",
    },
  };
  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-custom-light-blue h-screen overflow-hidden">
          <div className="bg-custom-light-blue py-4">
            {/* Title Section */}
            <div className="px-4 my-5">
              <h1 className="text-custom-size-30 font-bold">Uni-Notify</h1>
            </div>
            <div className="pl-52 px-4">
              <AnalogClock {...options} />
            </div>
            {!showDetailPage && (
              <div className="px-4 my-4">
                <h1 className="text-2xl font-semibold text-custom-class-title">
                  {isWeekend ? "No Classes for Today" : "Today Classes"}
                </h1>
              </div>
            )}
            {/* Title Section */}

            {/* Today Class section */}
            {!isWeekend && !showDetailPage ? (
              <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
                <div className="flex space-x-6 justify-center mb-4">
                  <button className="bg-custom-dark text-white py-2 px-4 rounded-full w-28 h-12 font-semibold">
                    Today
                  </button>
                  <button className="bg-white text-custom-dark py-2 px-4 rounded-full w-28 h-12 font-semibold">
                    All
                  </button>
                </div>
                <div className="overflow-y-scroll max-h-[500px] pt-2 pb-[4rem]">
                  {date.getDay() === 1 &&
                    schedules &&
                    schedules[0].Schedule.Monday.map((s) => (
                      <div onClick={() => handleScheduleClick(s)}>
                        <ScheduleWidget key={s._id} schedule={s} />
                      </div>
                    ))}
                  {date.getDay() === 2 &&
                    schedules &&
                    schedules[0].Schedule.Tuesday.map((s) => (
                      <div onClick={() => handleScheduleClick(s)}>
                        <ScheduleWidget key={s._id} schedule={s} />
                      </div>
                    ))}
                  {date.getDay() === 3 &&
                    schedules &&
                    schedules[0].Schedule.Wednesday.map((s) => (
                      <div onClick={() => handleScheduleClick(s)}>
                        <ScheduleWidget key={s._id} schedule={s} />
                      </div>
                    ))}
                  {date.getDay() === 4 &&
                    schedules &&
                    schedules[0].Schedule.Thursday.map((s) => (
                      <div onClick={() => handleScheduleClick(s)}>
                        <ScheduleWidget key={s._id} schedule={s} />
                      </div>
                    ))}
                  {date.getDay() === 5 &&
                    schedules &&
                    schedules[0].Schedule.Friday.map((s) => (
                      <div onClick={() => handleScheduleClick(s)}>
                        <ScheduleWidget key={s._id} schedule={s} />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <Relax />
            )}
            {/* Today Class section */}
          </div>

          {/* Show Widget Detail Component */}
          {showDetailPage && selectedSchedule && (
            <ScheduleDetail
              selectedSchedule={selectedSchedule}
              onCloseDetailPage={() => setShowDetailPage(false)}
            />
          )}
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};

const getCurrentTime12HourFormat = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  // Add leading zeros to minutes if needed
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return [`${hours}:${minutes}`, amPm];
};

export default Schedule;
