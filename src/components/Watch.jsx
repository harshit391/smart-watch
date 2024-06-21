import { useEffect, useRef, useState } from "react";

const Watch = ({watch}) => {

    const [timer, setTimer] = useState(watch.timer);
    const [isActive, setIsActive] = useState(false);
    const [currTime, setCurrentTime] = useState("00:00:00");

    const convertTime = () => {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = timer % 60;
        setCurrentTime(`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`);
    }

    useEffect(() => {
        convertTime();
        const storage = window.localStorage;
        const watchData = storage.getItem('watches');
        const thisWatch = JSON.parse(watchData).find((w) => w.id === watch.id);
        thisWatch.timer = timer;
        const newWatches = JSON.parse(watchData).map((w) => w.id === watch.id ? thisWatch : w);
        storage.setItem('watches', JSON.stringify(newWatches));
    },[timer])

    let startRef = useRef(null);
    const handleStart = () => {
        if (isActive) return;
        setIsActive(true);
        startRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        },1000);
    }

    const handleStop = () => {
        setIsActive(false);
        clearInterval(startRef.current);
    }

    const handleReset = () => {
        if (isActive) {
            return;
        }
        setTimer(0);
        setIsActive(false);
    }

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this watch?') === false) return;
        const storage = window.localStorage;
        const watchData = storage.getItem('watches');
        const newWatches = JSON.parse(watchData).filter((w) => w.id !== watch.id);
        storage.setItem('watches', JSON.stringify(newWatches));
        window.location.reload();
    }

    return (
        <div className="gap-3 d-flex flex-column card p-4" style={{border: "2px solid black"}}>
            <h1 className="card-title text-center">{watch.name}</h1>
            <div className="container d-flex flex-column gap-2">
                <h2 className="text-center">{currTime}</h2>
                <div className="d-flex gap-2 justify-content-center">
                    <button onClick={handleStart} className="btn-start btn btn-success">Start</button>
                    <button onClick={handleStop} className="btn-stop btn btn-warning">Pause</button>
                    <button onClick={handleReset} className="btn-reset btn btn-primary">Reset</button>
                    <button onClick={handleDelete} className="btn-reset btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Watch;