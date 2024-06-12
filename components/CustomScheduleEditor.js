import { useState } from 'react';

const CustomScheduleEditor = ({ onUpdateSchedule, days, times }) => {
    const [customSchedule, setCustomSchedule] = useState(() => {
        const schedule = {};
        days.forEach(day => {
            schedule[day] = {};
            times.forEach(time => {
                schedule[day][time] = { name: "", color: "" };
            });
        });
        return schedule;
    });

    const handleDragStart = (e, className, classColor) => {
        e.dataTransfer.setData("className", className);
        e.dataTransfer.setData("classColor", classColor);
    };

    const handleCustomScheduleChange = (day, time, className, classColor) => {
        const updatedSchedule = { ...customSchedule };
        updatedSchedule[day][time] = { name: className, color: classColor };
        setCustomSchedule(updatedSchedule);
    };

    const applyCustomSchedule = () => {
        onUpdateSchedule(customSchedule);
    };

    const clearCustomSchedule = () => {
        const clearedSchedule = {};
        days.forEach(day => {
            clearedSchedule[day] = {};
            times.forEach(time => {
                clearedSchedule[day][time] = { name: "", color: "" };
            });
        });
        setCustomSchedule(clearedSchedule);
    };

    return (
        <div>
            <h2>Custom Schedule Editor</h2>
            <p>Drag and drop to create your custom schedule:</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Day/Time</th>
                        {times.map(time => <th key={time}>{time}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {days.map(day => (
                        <tr key={day}>
                            <td>{day}</td>
                            {times.map(time => (
                                <td
                                    key={`${day}-${time}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const className = e.dataTransfer.getData("className");
                                        const classColor = e.dataTransfer.getData("classColor");
                                        handleCustomScheduleChange(day, time, className, classColor);
                                    }}
                                    style={{
                                        backgroundColor: customSchedule[day][time].color,
                                        cursor: "pointer"
                                    }}
                                >
                                    {customSchedule[day][time].name}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="btn btn-primary" onClick={applyCustomSchedule}>Apply</button>
                <button className="btn btn-secondary ml-2" onClick={clearCustomSchedule}>Clear</button>
            </div>
        </div>
    );
};

export default CustomScheduleEditor;
