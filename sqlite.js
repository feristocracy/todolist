//------------------SQLITE---------------------//

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./testdb.db", sqlite3.OPEN_READWRITE, (err) => {
                                        if (err) return console.error(err.message);
                                        console.log("conexión exitosa");
                                        });

/* db.run  (

        ) */


/* db.close((err) =>   {
                    if (err) return console.error(err.message);
                    }) */