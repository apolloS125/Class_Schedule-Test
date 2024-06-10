import { useState } from 'react';
import ClassForm from '../components/ClassForm';
import ScheduleTable from '../components/ScheduleTable';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const handleDeleteClass = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newSchedule = { ...schedule };
                const { day, startTime } = classInfo;
                const className = schedule[day][startTime].name;

                // Remove class from all times it appears on the same day
                times.forEach(t => {
                    if (newSchedule[day][t].name === className) {
                        newSchedule[day][t] = { name: "", color: "" };
                    }
                });

                setSchedule(newSchedule);
                setClassInfo(null);
                Swal.fire(
                    'Deleted!',
                    'Your class has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleCellClick = (day, time) => {
        const selectedClass = schedule[day][time];
        if (selectedClass.name) {
            let endIndex = times.indexOf(time);
            for (let i = endIndex + 1; i < times.length; i++) {
                if (schedule[day][times[i]].name === selectedClass.name) {
                    endIndex = i;
                } else {
                    break;
                }
            }

            setClassInfo({
                name: selectedClass.name,
                day,
                startTime: time,
                endTime: times[endIndex + 1] || "18:00",
                color: selectedClass.color
            });
        }
    };

    const handleDownload = () => {
        const table = document.getElementById('scheduleTable');
        html2canvas(table).then(canvas => {
            const link = document.createElement('a');
            link.download = 'schedule.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <div className="container">
            <h1 className="my-4">Class Schedule</h1>
            <ClassForm onSubmit={handleFormSubmit} classInfo={classInfo} />
            {classInfo && (
                <button className="btn btn-danger mb-3" onClick={handleDeleteClass}>
                    Delete Class
                </button>
            )}
            <button className="btn btn-success mb-3" onClick={handleDownload}>
                Download Schedule as PNG
            </button>
            <ScheduleTable schedule={schedule} onCellClick={handleCellClick} />
        </div>
    );
};

export default Home;
