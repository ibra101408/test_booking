const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3005',
}));
const port = 3005;


let { total } = 0;



// Add a new endpoint to get available category
app.get('/available-category', async (req, res) => {
    const sql = 'SELECT * FROM category';

    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const category = rows.map(row => ({
            category_id: row.category_id,
            name: row.name
        }));
        //console.log("/available-category - ", category);

        res.json(category);
    });
});

// Add a new endpoint to get available service within a section
app.get('/available-service', async (req, res) => {
    const { category_id } = req.query;

    if (!category_id) {
        return res.status(400).send('Section parameter required');
    }

    const serviceSql = 'SELECT * FROM service WHERE category_id = ?';
    db.query(serviceSql, [category_id], (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }

        const service = rows.map((row) => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes
        }));
        //console.log("/available-service - ", service);

        res.json(service);
        });
        //res.json(service);
   // });
});
/*
app.get('/workers-for-service', async (req, res) => {
    const { service_id } = req.query;

    if (!service_id) {
        return res.status(400).send('Service ID parameter required');
    }

    const workerQuery = `
        SELECT worker.worker_id, worker.name
        FROM worker
        INNER JOIN worker_services ON worker.worker_id = worker_services.worker_id
        WHERE worker_services.service_id = ?
    `;

    db.query(workerQuery, [service_id], (err, workerRows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: 'Failed' });
        }

        const workers = workerRows.map((row) => ({
            worker_id: row.worker_id,
            name: row.name,
        }));
        console.log('/workers-for-service - ', workers)
        res.json({ workers });
    });
});*/
app.get('/workers-for-service', async (req, res) => {
    const { service_ids } = req.query;
    const serArray = [];
    //serArray.push(service_ids);

    if (!service_ids) {
        return res.status(400).send('Service IDs parameter required');
    }

    const serviceIdsArray = service_ids.split(',').map(id => parseInt(id));
    for (let id of serviceIdsArray) {
        serArray.push(id);
    }
        console.log("serArray: ", serArray);
    // Now you can use the serviceIdsArray to fetch workers based on the selected services
//HAVING COUNT(DISTINCT worker_services.service_id) = (?)
    const workerQuery = `
        SELECT worker.worker_id, worker.name
        FROM worker
        INNER JOIN worker_services ON worker.worker_id = worker_services.worker_id
        WHERE worker_services.service_id IN (${serArray.join(',')})
        GROUP BY worker.worker_id, worker.name
    `;

    db.query(workerQuery, [serviceIdsArray.length], (err, workerRows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: 'Failed' });
        }

        const workers = workerRows.map((row) => ({
            worker_id: row.worker_id,
            name: row.name,
        }));
        console.log('/workers-for-service - ', workers)
        res.json({ workers });
    });
});


app.get('/all-service', async (req, res) => {
    const sql = 'SELECT * FROM service';

    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const service = rows.map(row => ({
            service_id: row.service_id,
            name: row.name,
            duration_minutes: row.duration_minutes,
            price: row.price
        }));
        res.json(service);
    });
});


// Use parameterized query to avoid SQL injection
app.get('/available-dates', async (req, res) => {
    const sql = 'SELECT DISTINCT DATE_FORMAT(date, "%Y-%m-%d") AS date FROM dates';

    db.query (sql, (err, rows, result) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const dates = rows.map(row => {
            return {
                date: row.date,
            };
        });
      //  console.log("/available-dates - ", dates);
        res.json(dates);
    })
});

app.get('/available-hours', async (req, res) => {
    const date = req.query.date;
    const serviceId = req.body.selectedServices; // Add this line to get the selected service ID

    if (!date) {
        return res.status(400).send('Date parameter required');
    }else {
        const sql =
            'SELECT ts.time FROM time_slots as ts ' +
            'JOIN dates as d ON ts.date_id = d.date_id ' +
            'WHERE d.date = ?';

        db.query(sql, [date], (err, rows, result) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({error: "Failed"})
            }

            const time = rows.map(row => {
                return {
                    time: row.time,
                };
            });
           // console.log("/available-hours - ", time);
            //console.log("total hours for work is ", total);
            res.json(time);
        });
    }
});

app.post('/postDuration', (req, res) => {
    const { totalDuration } = req.body; // Retrieve totalDuration from the request body
    total = totalDuration;
   // console.log('totalDuration: ', total); //counting well
    res.json({ message: 'Data received successfully' });
});
/*
app.post('/api/booking',
    async (req, res) => {
    const {name, phone_number, address} = req.body;
    const {selectedDate, selectedTime} = req.body;
    console.log('selectedHairCUD2: ', req.body.selectedServices);


    let client_id = null;
    let date_id = null;
    let slot_id = null;

    try {
        // Perform operations with the received data
        const user_name = 'INSERT INTO clients (name, phone_number, address) VALUES (?, ?, ?)';

        db.query(user_name, [name, phone_number, address], (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({error: "Failed"})
                return;
            }
            client_id = result.insertId;

            const chosen_date = 'SELECT date_id FROM dates WHERE DATE(date) = ?';
            db.query(chosen_date, [selectedDate], (err, result) => {
                if(err){
                    console.log(err.message);
                    res.status(500).json({error: "Failed"})
                    return;
                }
                date_id = result[0].date_id;
                console.log('chosen_date: ', date_id);

                const chosen_slot = 'SELECT slot_id FROM time_slots WHERE TIME(time) = ?';
                db.query(chosen_slot, [selectedTime], (err, result) => {
                    if(err){
                        console.log(err.message);
                        res.status(500).json({error: "Failed"})
                        return;
                    }
                    slot_id = result[0].slot_id;
                    console.log('chosen_TIME: ', slot_id);

                //console.log("client_id: ", client_id, "date_id: ", date_id, "slot_id: ", slot_id);
                const insertBookingSql = 'INSERT INTO appointments (client_id, slot_id) VALUES (?, ?)';
                    db.query(insertBookingSql, [client_id, slot_id], (err, result) => {
                        if(err){
                            console.log(err.message);
                            res.status(500).json({error: "Failed"})
                            return;
                        }
                        res.json({ message: 'Booking successful', id: result.insertId });
                    });
                });
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Failed" });
    }
});
*/
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



//notes
//    status ENUM('available', 'booked') DEFAULT 'available'