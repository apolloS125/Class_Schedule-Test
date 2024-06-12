import { useEffect, useState } from 'react';

const ClassForm = ({ onSubmit, classInfo }) => {
    const [className, setClassName] = useState('');
    const [classDay, setClassDay] = useState('Monday');
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('09:00');
    const [classColor, setClassColor] = useState('#ffffff');

    useEffect(() => {
        if (classInfo) {
            setClassName(classInfo.name);
            setClassDay(classInfo.day);
            setStartTime(classInfo.startTime);
            setEndTime(classInfo.endTime);
            setClassColor(classInfo.color);
        }
    }, [classInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ className, classDay, startTime, endTime, classColor });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="className">Class Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="classDay">Day</label>
                <select
                    className="form-control"
                    id="classDay"
                    value={classDay}
                    onChange={(e) => setClassDay(e.target.value)}
                >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="classColor">Class Color</label>
                <input
                    type="color"
                    className="form-control"
                    id="classColor"
                    value={classColor}
                    onChange={(e) => setClassColor(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Save Class</button>
        </form>
    );
};

export default ClassForm;