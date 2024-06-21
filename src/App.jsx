import { useEffect, useState } from "react";
import Watch from "./components/Watch";

const App = () => {

  const [watches, setWatches] = useState([]);
  const [show, setShow] = useState(false);
  const [dialog, setDialog] = useState("Show Create Watch Box");
  const [watchName, setWatchName] = useState('');

  useEffect(() => {
    const storage = window.localStorage;
    const watchData = storage.getItem('watches');
    if (watchData) {
      setWatches(JSON.parse(watchData));
    }
  }, [])

  const handleAdd = (e) => {
    e.preventDefault();
    if (watchName === "") {alert('Name cannot be empty');return;}

    const storage = window.localStorage;
    const newWatch = {
      name: watchName,
      id: watches.length + 1,
      timer: 0,
    }
    storage.setItem('watches', JSON.stringify([...watches, newWatch]));
    setWatches([...watches, newWatch]);
    setShow(false);
    setDialog("Show Create Watch Box");
  }

  return (
    <div className="d-flex flex-column justify-content-center p-4 gap-4">
      <div className="row">
            <button onClick={() => {
              if (show) {setShow(false); setDialog("Show Create Watch Box"); return; };
              setShow(true);
              setDialog("Hide Create Watch Box");
            }} className="btn btn-primary">{dialog}</button>
        </div>
        {show && <div className="row">
          <form action="">
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input onChange={(e) => setWatchName(e.target.value)} value={watchName} type="text" className="form-control" id="name" />
                  <button onClick={handleAdd} className="btn btn-primary mt-4">Create</button>
              </div>
          </form>
        </div>}
        <div className="row justify-content-center gap-5">
           {watches.map((watch, index) => (<Watch watch={watch} key={index}/>))}
        </div>
    </div>
  );
}

export default App;