// pages/index.js
import { useState } from 'react';
import ClassForm from '../components/ClassForm';
import ScheduleTable from '../components/ScheduleTable';

const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const convertTimeToIndex = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const initializeSchedule = () => {
    const schedule = {};
    days.forEach(day => {
        schedule[day] = {};
        times.forEach(time => {
            schedule[day][time] = { name: "", color: "" };
        });
    });
    return schedule;
};

const Home = () => {
    const [schedule, setSchedule] = useState(initializeSchedule);
    const [classInfo, setClassInfo] = useState(null);

    const handleFormSubmit = ({ className, classDay, startTime, endTime, classColor }) => {
        const newSchedule = { ...schedule };

        const startIndex = convertTimeToIndex(startTime);
        const endIndex = convertTimeToIndex(endTime);

        if (startIndex < endIndex) {
            times.forEach(time => {
                const timeIndex = convertTimeToIndex(time);
                if (timeIndex >= startIndex && timeIndex < endIndex) {
                    newSchedule[classDay][time] = { name: className, color: classColor };
                }
            });
            setSchedule(newSchedule);
            setClassInfo(null);
        } else {
            alert("Invalid time range");
        }
    };

    const handleCellClick = (day, time) => {
        const selectedClass = schedule[day][time];
        if (selectedClass.name) {
            setClassInfo({
                name: selectedClass.name,
                day,
                startTime: time,
                endTime: times[times.indexOf(time) + 1], // Assuming 1-hour slots
                color: selectedClass.color
            });
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Class Schedule</h1>
            <ClassForm onSubmit={handleFormSubmit} classInfo={classInfo} />
            <ScheduleTable schedule={schedule} onCellClick={handleCellClick} />
        </div>
    );
};

export default Home;