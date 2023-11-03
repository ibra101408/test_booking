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
    const [category, setCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [service = [], setService] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [allServices = [], setAllServices] = useState('');

    const [selectedServices, setSelectedServices] = useState([]);
    let [totalDuration, setTotalDuration] = useState(0); // Initialize total duration
    const handleServiceChange = (event) => {
        const serviceId = parseInt(event.target.value);
        //  console.log("is it word", allServices);
        if (selectedServices.includes(serviceId)) {
            // service is being deselected
            setSelectedServices((prevSelectedServices) =>
                prevSelectedServices.filter((id) => id !== serviceId)
            );
        } else {
            // service is being selected
            setSelectedServices((prevSelectedServices) => [
                ...prevSelectedServices,
                serviceId,
            ]);
        }
    };
    useEffect(() => {
        if (selectedCategory) {
            fetch(`/available-service?category_id=${selectedCategory}`)
                .then(response => response.json())
                .then(data => {
                    //console.log("service: ", data);
                    setService(data);
                })
                .catch(error => console.error('service fetch error:', error));
        }
    }, [selectedCategory]);

    useEffect(() => {

            fetch('/all-service')
                .then(response => response.json())
                .then(data => {
                    //console.log("ALL service: ", data);
                    setAllServices(data);
                })
                .catch(error => console.error('service fetch error:', error));

        }, []);

    useEffect(() => {
        fetch('/available-category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('category fetch error:', error));
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

  /*  useEffect(() => {
        if (selectedDate) {
            fetchTimesForDate(selectedDate).then(r => console.log("r: ", r));
        }
    }, [selectedServices, selectedDate]);

    const fetchTimesForDate = async (date) => {
        fetch(`/available-hours?date=${selectedDate}`)
            .then(response => response.json())
            .then(data => setTimes(data));
    };

    function getTimeSlotDuration(timeSlot) {
        console.log("timwslot", timeSlot)
        const start = new Date(timeSlot.start);
        const end = new Date(timeSlot.end);
        console.log("start", start)

        const duration = (end - start) / (1000 * 60);
        console.log("duration ", duration)
        return duration;
    }
    const filteredTimes = times.filter(time => {
        const slotDuration = getTimeSlotDuration(time); // helper
        return slotDuration >= totalDuration;
    })*/

    const handleSectionChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedDate('');
        setSelectedTime('');
    };

    /*const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };*/


    totalDuration = selectedServices.reduce((total, id) => {
        const service = allServices.find((h) => h.service_id === id);
        return total + (service ? service.duration_minutes : 0);
    }, 0);

    const postData = {
        totalDuration: totalDuration,
    }


// Send a POST request to the backend
    fetch('/postDuration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData), // Include the data in the request body
    })
        .then((response) => {
            if (response.ok) {
                // Handle success
                console.log('Data sent successfully!');
            } else {
                // Handle error
                alert('Failed to send data. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });


/*
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime('');
    };*/
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime('');

        // Query the time slots for the selected date
        if (event.target.value) {
            fetch(`/available-hours?date=${event.target.value}`)
                .then(response => response.json())
                .then(data => {
                    // Calculate total duration for the selected date
                    const totalDuration = calculateTotalDuration(data);
                   // console.log("Total Duration (minutes) for the selected date:", totalDuration);
                })
                .catch(error => console.error('Error fetching available hours:', error));
        }
    };

    function calculateTotalDuration(timeSlots) { //NOT WORKING
        // Assuming timeSlots is an array of time slot objects with a "time" property

        const totalMin = JSON.stringify(timeSlots);
        const cleanedTimeString = totalMin.replace(/"/g, ''); // Remove double quotes

        const timeParts = cleanedTimeString.split(':'); // Split the time string by ':'

// Extract hours, minutes, and seconds as integers
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const seconds = parseInt(timeParts[2], 10);

// Calculate the total minutes
        const totalMinutes = hours * 60 + minutes;

       // console.log("Total Minutes:", totalMinutes);
    }
    // In your event handler
    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        const totalMinutes = calculateTotalDuration(selectedTime); // Undefined
        setSelectedTime(totalMinutes); // Assuming you want to store it as minutes
    };
    /*
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        console.log("selected",selectedTime);
    };*/

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
            category: category,
           // service: selectedServices,
            selectedServices: selectedServices

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
                <label htmlFor="categoryelect">Select Section:</label>
                <select id="categoryelect" value={selectedCategory} onChange={handleSectionChange}>
                    <option value="">Select a Section</option>
                    {Array.isArray(category) && category.map(section => (
                        <option key={section.category_id} value={section.category_id}>
                            {section.name}
                        </option>
                    ))}
                </select>
            </div>
<br/>
            <div>
                <label>Choose service:</label>
                {Array.isArray(service) ? (
                    service.map((service) => (
                       // console.log("HAIR ", service.name),
                        <div key={service.service_id}>
                        <input
                            type="checkbox"
                            value={service.service_id}
                            checked={selectedServices.includes(service.service_id)}
                            onChange={handleServiceChange}
                        />


                        <span>{service.name} - {service.duration_minutes} minutes</span>
                    </div>
                ))
                    ) : (
                    <p>Loading service...</p>
                    )
                }

            </div>
            <div>
                <h2>Chosen service:</h2>
                {selectedServices.length === 0 ? (
                    <p>No service selected</p>
                ) : (
                    <ul>
                        {selectedServices.map(id => {
                            const SelectedService = allServices.find(h => h.service_id === id);
                            if (!SelectedService) {
                                return (
                                    <li key={id}>
                                        service not found
                                    </li>
                                );
                            }
                            return (
                                <li key={SelectedService.service_id}>
                                    {SelectedService.name} - {SelectedService.duration_minutes} minutes
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