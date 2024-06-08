import { useState, useEffect } from 'react';

const ClassForm = ({ onSubmit, classInfo, onDelete }) => {
    const [className, setClassName] = useState('');
    const [classDay, setClassDay] = useState('Monday');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [classColor, setClassColor] = useState('#000000');

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
        resetForm();
    };

    const resetForm = () => {
        setClassName('');
        setClassDay('Monday');
        setStartTime('');
        setEndTime('');
        setClassColor('#000000');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(classInfo.day, classInfo.startTime);
        resetForm();
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
                    required
                >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
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
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mr-2">Add Class</button>
            {classInfo && (
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            )}
        </form>
    );
};

export default ClassForm;
