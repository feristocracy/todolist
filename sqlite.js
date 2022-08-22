//------------------SQLITE---------------------//

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./testdb.db", sqlite3.OPEN_READWRITE, (err) => {
                                        if (err) return console.error(err.message);
                                        console.log("conexión exitosa");
                                        });

db.all("SELECT * FROM todolist", [], (err, rows) => {
                        if (err) return console.error(err.message);
                        rows.forEach((row) =>   {
                                                console.log(row);
                                                });
                        });


db.close((err) =>   {
                    if (err) return console.error(err.message);
                    })