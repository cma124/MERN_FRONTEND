import React, { useEffect, useState } from "react";
import ScheduleWidget from "../components/ScheduleWidget";
import axios from "axios";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

const Schedule = () => {
  const user = useAuth();
  const [schedule, setSchedule] = useState(undefined);
  const fetchSchedule = async () => {
    const response = await axios.get("/api/routes/getSchedules");
    if (response.status == 200) setSchedule(response.data);
  };
  useEffect(() => {
    fetchSchedule();
  }, []);

  const [hourMin, amPm] = getCurrentTime12HourFormat();
  const date = new Date();

  return (
    <>
      {user ? (
        <div className="bg-custom-light-blue h-screen overflow-hidden">
          <div className="bg-custom-light-blue py-4">
            {/* Title Section */}
            <div className="px-4 my-5">
              <h1 className="text-custom-size-30 font-bold">Uni-Notify</h1>
            </div>
            <div className="px-4 my-6">
              <h1 className="text-custom-time text-custom-size-60 font-semibold text-right">
                {hourMin}{" "}
                <span className="uppercase text-custom-color text-custom-size-30">
                  {amPm}
                </span>
              </h1>
            </div>
            <div className="px-4 my-4">
              <h1 className="text-2xl font-semibold text-custom-class-title">
                Upcoming Classes
              </h1>
            </div>
            {/* Title Section */}

            {/* Upcoming Class section */}
            <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
              <div class="flex space-x-6 justify-center mb-4">
                <button class="bg-custom-dark text-white py-2 px-4 rounded-full w-28 h-12 font-semibold">
                  All
                </button>
                <button class="bg-white text-black py-2 px-4 rounded-full w-28 h-12 font-semibold">
                  New
                </button>
              </div>
              <div className="overflow-y-scroll max-h-[500px] pt-2 pb-5">
                {(date.getDay() === 0 || date.getDay() === 6) && (
                  <p className="text-lg text-white">Enjoy your weekend</p>
                )}
                {date.getDay() === 1 &&
                  schedule &&
                  schedule[0].Schedule.Monday.map((s) => (
                    <ScheduleWidget key={s.SubjectID} schedule={s} />
                  ))}
                {date.getDay() === 2 &&
                  schedule &&
                  schedule[0].Schedule.Tuesday.map((s) => (
                    <ScheduleWidget key={s.SubjectID} schedule={s} />
                  ))}
                {date.getDay() === 3 &&
                  schedule &&
                  schedule[0].Schedule.Wednesday.map((s) => (
                    <ScheduleWidget key={s.SubjectID} schedule={s} />
                  ))}
                {date.getDay() === 4 &&
                  schedule &&
                  schedule[0].Schedule.Thursday.map((s) => (
                    <ScheduleWidget key={s.SubjectID} schedule={s} />
                  ))}
                {date.getDay() === 5 &&
                  schedule &&
                  schedule[0].Schedule.Friday.map((s) => (
                    <ScheduleWidget key={s.SubjectID} schedule={s} />
                  ))}
              </div>
            </div>
            {/* Upcoming Class section */}
          </div>
        </div>
      ) : (
        <Link to={"/login"}>Login</Link>
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
