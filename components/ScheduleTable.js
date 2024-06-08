import React from 'react';

const ScheduleTable = ({ schedule, onCellClick }) => {
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const renderCells = (day) => {
        let mergedCells = 0; // จำนวนเซลล์ที่รวมกัน

        return times.map((time, index) => {
            const cell = schedule[day][time];
            const nextCell = schedule[day][times[index + 1]]; // เซลล์ถัดไปในเวลาเดียวกัน

            if (cell.name && (!nextCell || cell.name !== nextCell.name || cell.color !== nextCell.color)) {
                const colSpan = mergedCells > 0 ? mergedCells + 1 : 1; // คำนวณค่า colSpan จากจำนวนเซลล์ที่รวมกัน

                mergedCells = 0; // รีเซ็ตจำนวนเซลล์ที่รวมกัน

                return (
                    <td
                        key={`${day}-${time}`}
                        id={`${day}-${time}`}
                        className="schedule-cell"
                        style={{ backgroundColor: cell.color }}
                        data-day={day}
                        data-time={time}
                        colSpan={colSpan}
                        onClick={() => onCellClick(day, time)}
                    >
                        {cell.name}
                    </td>
                );
            } else if (cell.name) {
                mergedCells++;
                return null; // เซ็ลล์นี้ถูกรวมเข้าไปในเซ็ลล์ก่อนหน้านี้ จึงไม่ต้องแสดงผล
            } else {
                mergedCells = 0; // รีเซ็ตจำนวนเซลล์ที่รวมกัน
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
