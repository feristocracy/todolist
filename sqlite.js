//------------------SQLITE---------------------//

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./testdb.db", sqlite3.OPEN_READWRITE, (err) => {
                                        if (err) return console.error(err.message);
                                        console.log("conexión exitosa");
                                        });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();                                     
app.use(bodyParser.json());
app.post("/", (req,res) =>	{
										try {
											console.log(req.body.movie);
											return res.json({
												status: 200,
												success: true,
											});
										} catch (error) {
											return res.json({
												status: 400,
												success: false,
											})
											
										}
										})
app.listen(3000);													
                                        

const sqlUpdate = "";
const sqlSelect = "SELECT * FROM todolist";

const storageSql = (datos) =>{
                                    let addData = `UPDATE todolist SET json = "${datos}" WHERE id = 1`;
                                    db.all(addData, [], (err, rows) => {
                                                            if (err) return console.error(err.message);
                                                            console.log("almacenado");
                                                            });
                                    }
const readSql = () =>   {
                                    let dataNeeded = "SELECT * FROM todolist WHERE id = 1";
                                    db.all(dataNeeded, [], (err, rows) => {
                                                            if (err) return console.error(err.message);
                                                            console.log("leído " + rows[0].json);
                                                            return rows[0].json;
                                                            });
                                    }

storageSql("juanitoNo1");
readSql();

db.close((err) =>   {
                    if (err) return console.error(err.message);
                    console.log("conection closed...");
                    })