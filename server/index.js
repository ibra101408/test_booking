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
        res.json(dates);
    })
});

app.get('/available-hours', async (req, res) => {
    const date = req.query.date;

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
            res.json(time);
        });
    }
});

// Add a new endpoint to get available sections
app.get('/available-sections', async (req, res) => {
    const sql = 'SELECT * FROM sections';
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const sections = rows.map(row => ({
            section_id: row.section_id,
            name: row.name
        }));
        res.json(sections);
    });
});

// Add a new endpoint to get available haircuts within a section
app.get('/available-haircuts', async (req, res) => {
    const { section_id } = req.query;
    if (!section_id) {
        return res.status(400).send('Section parameter required');
    }

    const sql = 'SELECT * FROM haircuts WHERE section_id = ?';

    db.query(sql, [section_id], (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }

        const haircuts = rows.map(row => ({
            haircut_id: row.haircut_id,
            name: row.name,
            duration_minutes: row.duration_minutes
        }));
        res.json(haircuts);
    });
});

app.get('/all-haircuts', async (req, res) => {
    const sql = 'SELECT * FROM haircuts';

    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return res.status(500).json({error: "Failed"})
        }
        const haircuts = rows.map(row => ({
            haircut_id: row.haircut_id,
            name: row.name,
            duration_minutes: row.duration_minutes
        }));
        res.json(haircuts);
    });
});

app.post('/api/booking', async (req, res) => {
    const {name, phone_number, address} = req.body;
    const {selectedDate, selectedTime} = req.body;

    console.log('body: ', req.body);
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



//notes
//    status ENUM('available', 'booked') DEFAULT 'available'