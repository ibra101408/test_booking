import React, {useEffect, useState} from 'react';
import './style/App.css';

function App() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone] = useState('');
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [sections, setSections] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [haircuts = [], setHaircuts] = useState('');
    const [selectedHaircut, setSelectedHaircut] = useState('');
    const [allHaircuts = [], setAllHaircuts] = useState('');

    useEffect(() => {
        if (selectedSection) {
            fetch(`/available-haircuts?section_id=${selectedSection}`)
                .then(response => response.json())
                .then(data => {
                    //console.log("haircuts: ", data);
                    setHaircuts(data);
                })
                .catch(error => console.error('Haircuts fetch error:', error));
        }
    }, [selectedSection]);

    useEffect(() => {

            fetch('/all-haircuts')
                .then(response => response.json())
                .then(data => {
                    //console.log("ALL haircuts: ", data);
                    setAllHaircuts(data);
                })
                .catch(error => console.error('Haircuts fetch error:', error));

        }, []);

    useEffect(() => {
        fetch('/available-sections')
            .then(response => response.json())
            .then(data => setSections(data))
            .catch(error => console.error('Sections fetch error:', error));
    }, []);

    useEffect(() => {
        fetch('/available-dates')
            .then(response => response.json())
            .then(data => setDates(data));
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetch(`/available-hours?date=${selectedDate}`)
                .then(response => response.json())
                .then(data => setTimes(data));
        }
    }, [selectedDate]);


    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
        setSelectedDate('');
        setSelectedTime('');
    };

    /*const handleHaircutChange = (event) => {
        setSelectedHaircut(event.target.value);
    };*/
    const [selectedHaircuts, setSelectedHaircuts] = useState([]);
    let [totalDuration, setTotalDuration] = useState(0); // Initialize total duration
    const handleHaircutChange = (event) => {
        const haircutId = parseInt(event.target.value);
      //  console.log("is it word", allHaircuts);
        if (selectedHaircuts.includes(haircutId)) {
            // Haircut is being deselected
            setSelectedHaircuts((prevSelectedHaircuts) =>
                prevSelectedHaircuts.filter((id) => id !== haircutId)
            );
        } else {
            // Haircut is being selected
            setSelectedHaircuts((prevSelectedHaircuts) => [
                ...prevSelectedHaircuts,
                haircutId,
            ]);
        }
    };

    totalDuration = selectedHaircuts.reduce((total, id) => {
        const haircut = allHaircuts.find((h) => h.haircut_id === id);
        return total + (haircut ? haircut.duration_minutes : 0);
    }, 0);


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime('');
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if(name === 'name'){
            setName(value);
        } else if(name === 'address'){
            setAddress(value);
        } else if(name === 'phone_number'){
            setPhone(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            address: address,
            phone_number: phone_number,
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            sections: sections,
           // haircut: selectedHaircuts,
            selectedHaircuts: selectedHaircuts

        };

        fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Handle the response from the backend
                console.log("result is - ", result);
                setName('');
                setAddress('');
                setPhone('');
                setSelectedDate('');
                setSelectedTime('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="App">
            <h1>Booking</h1>

            <div>
                <label htmlFor="sectionSelect">Select Section:</label>
                <select id="sectionSelect" value={selectedSection} onChange={handleSectionChange}>
                    <option value="">Select a Section</option>
                    {Array.isArray(sections) && sections.map(section => (
                        <option key={section.section_id} value={section.section_id}>
                            {section.name}
                        </option>
                    ))}
                </select>
            </div>
<br/>
            <div>
                <label>Choose Haircuts:</label>
                {Array.isArray(haircuts) ? (
                    haircuts.map((haircut) => (
                       // console.log("HAIR ", haircut.name),
                        <div key={haircut.haircut_id}>
                        <input
                            type="checkbox"
                            value={haircut.haircut_id}
                            checked={selectedHaircuts.includes(haircut.haircut_id)}
                            onChange={handleHaircutChange}
                        />


                        <span>{haircut.name} - {haircut.duration_minutes} minutes</span>
                    </div>
                ))
                    ) : (
                    <p>Loading haircuts...</p>
                    )
                }

            </div>
            <div>
                <h2>Chosen Haircuts:</h2>
                {selectedHaircuts.length === 0 ? (
                    <p>No haircuts selected</p>
                ) : (
                    <ul>
                        {selectedHaircuts.map(id => {
                            const selectedHaircut = allHaircuts.find(h => h.haircut_id === id);
                            if (!selectedHaircut) {
                                return (
                                    <li key={id}>
                                        Haircut not found
                                    </li>
                                );
                            }
                            return (
                                <li key={selectedHaircut.haircut_id}>
                                    {selectedHaircut.name} - {selectedHaircut.duration_minutes} minutes
                                </li>
                            );
                        })}
                    </ul>
                )}
                <p>Total Duration: {totalDuration}</p>
            </div>
<br/>

<br/>
            <div>
                <label htmlFor="dateSelect">Select Date:</label>
                <select id="dateSelect" value={selectedDate} onChange={handleDateChange}>
                    <option value="">Select a Date</option>
                    {dates.map(date => (
                        <option key={date.date} value={date.date}>
                            {date.date}
                        </option>
                    ))}
                </select>
            </div>
            {selectedDate && (
                <div>
                    <label htmlFor="timeSelect">Select Hour:</label>
                    <select id="timeSelect" value={selectedTime} onChange={handleTimeChange}>
                        <option value="">Select an Hour</option>
                        {times.map(time => (
                            <option key={time.time} value={time.time}>
                                {time.time}
                            </option>
                        ))}
                    </select>
                </div>
            )}
<br/>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Enter your phone"
                    value={phone_number}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default App;