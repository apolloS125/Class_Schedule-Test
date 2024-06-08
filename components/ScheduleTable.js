import React from 'react';

const ScheduleTable = ({ schedule, onCellClick }) => {
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const renderCells = (day) => {
        return times.map((time) => {
            const cell = schedule[day][time];

            if (cell.name) {
                return (
                    <td
                        key={`${day}-${time}`}
                        id={`${day}-${time}`}
                        className="schedule-cell"
                        style={{ backgroundColor: cell.color }}
                        data-day={day}
                        data-time={time}
                        onClick={() => onCellClick(day, time)}
                    >
                        {cell.name}
                    </td>
                );
            } else {
                return (
                    <td
                        key={`${day}-${time}`}
                        id={`${day}-${time}`}
                        className="schedule-cell"
                        data-day={day}
                        data-time={time}
                        onClick={() => onCellClick(day, time)}
                    ></td>
                );
            }
        });
    };

    return (
        <table className="table table-bordered schedule-table">
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
                        {renderCells(day)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ScheduleTable;
