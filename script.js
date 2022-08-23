/*-----------------CONSTANTES--------------------*/
const form = document.getElementById("form");
const tasklist = document.getElementById("tasklist");
const template = document.getElementById("template").content; //cada que se captura un template hay que agregar el .content
const fragment = document.createDocumentFragment();
const input = document.querySelector("input");
/*----------------------------------------------------*/
let tasks = { }; //Inicializamos la colección de objetos
//BOTONES//
const loadFile = document.getElementById("loadFile");
const loadFile2 = document.getElementById("loadFile2");
loadFile2.addEventListener("click", function() { loadFile.click();})
const exportFile = document.getElementById("exportFile");
const exportFile2 = document.getElementById("exportFile2");
//--------//

//---EXPORT---//
const download = function(data) { // descarga el archivo en formato csv
								const blob = new Blob([data], { type: 'text/csv'});
								const url = window.URL.createObjectURL(blob);
								const a = document.createElement('a');
								a.setAttribute("hidden", "");
								a.setAttribute("href", url);
								a.setAttribute("download", "tasks.csv");
								document.body.appendChild(a);
								a.click();
								document.body.removeChild(a);
								};
//------------//


//--------------------TASKS---------------------//
document.addEventListener("DOMContentLoaded", () => {
													/* if (localStorage.getItem("tasks"))	{
																						tasks = JSON.parse(localStorage.getItem("tasks"));
																						} */ // si hay un objeto de tareas guardadas en el local storage					
													drawTasks();
													});

tasklist.addEventListener("click", e => {
										botAccion(e);
										})

form.addEventListener("submit", e =>{ // Escucha el evento de presionar botón de ADD
                                    e.preventDefault(); // Sirve para evitar el comportamiento por default de algún elemento en html
                                    setTask(e);
                                    })

const setTask = e =>    { //agregamos el valor a un objeto de task
                        if(input.value.trim() === "")   {
                                                        console.log("Task is empty");
                                                        return;
                                                        }

						const task =	{
										id: Date.now(),
										text: input.value,
										dateStart: Date(Date.now()).toString().substr(4, 20),
										//dateFinish, 
										status: false
										}

                        tasks[task.id] = task; // guardamos (empujamos) la tarea a la colección de objetos a un indice creado aleatoriamente
                        console.log(tasks);
                        form.reset();
                        input.focus();

                        drawTasks();
                        }

const drawTasks = () => {
                        //localStorage.setItem("tasks", JSON.stringify(tasks)); //guardamos la lista de tareas en el localstorage
						
						
						if(Object.values(tasks).length === 0)	{ // si no hay nada en la lista
																tasklist.innerHTML = `<div class="alert alert-light text-center">No tasks... 🏝</div>`;
																return
																}
                        tasklist.innerHTML = ""; // primero borramos el objeto
                        Object.values(tasks).forEach(task =>{
                                                            const clone = template.cloneNode(true);  // CLONAR EL TEMPLATE ANTES QUE NADA
                                                            clone.querySelector("p").textContent = task.text;
                                                            clone.querySelector("small").textContent = "Created on " + task.dateStart;

															if(task.status)	{ // si el estado de la tarea es true
																			clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
																			clone.querySelector(".text-success").classList.replace("fa-circle-check", "fa-rotate-left");
																			clone.querySelector(".text-success").classList.replace("text-success", "text-primary");
																			clone.querySelector("small").textContent = "Completed on " + task.dateFinish;
																			clone.querySelector(".alert p").classList.add("text-decoration-line-through");
																			}
															clone.getElementById("date").dataset.id = task.id;
															clone.querySelectorAll(".fas")[0].dataset.id = task.id; //hace referencia al botón verde
															clone.querySelectorAll(".fas")[1].dataset.id = task.id; //hace referencia al botón rojo
                                                            fragment.appendChild(clone);
                                                            })
                        tasklist.appendChild(fragment); //fragment recomendado en los forEach
                        
                        }

const botAccion = e =>	{
						if (e.target.classList.contains("fa-circle-check"))	{ // si le damos click al circulo de palomita
																			tasks[e.target.dataset.id].status = true;
																			tasks[e.target.dataset.id].dateFinish = Date(Date.now()).toString().substr(4, 20);
																			drawTasks();
																			return
																			}
						if (e.target.classList.contains("fa-rotate-left"))	{ // si le damos click al circulo de retorno
																			tasks[e.target.dataset.id].status = false;
																			drawTasks();
																			return
																			}
						if (e.target.classList.contains("fa-circle-minus"))	{ // si le damos click al circulo de menos
																			delete tasks[e.target.dataset.id];
																			drawTasks();
																			return
																			}

						e.stopPropagation();
						}


//CARGAR ARCHIVO//
const storageContent = content =>	{
									tasks = JSON.parse(content);
									console.log(tasks);
									drawTasks();
									}

const readFile = e => 	{
						const file = e.target.files[0];
						if (!file) {return;}
						const reader = new FileReader();
						reader.onload = e =>{
											const content = e.target.result;
											storageContent(content);
											};
											reader.readAsText(file);
											
						}

document.getElementById("loadFile").addEventListener("change", readFile, false);
//---------------------//

exportFile2.addEventListener("click", function() { download(JSON.stringify(tasks));})



//-------CONVERT-JSON-TO-CSV-------//
/* const jsonTasks = localStorage.getItem("tasks");
console.log(tasks);

const data = tasks.map(row =>({
							id: jsonTasks.id,
							text: jsonTasks.text,
							dateStart: jsonTasks.dateStart,
							status: jsonTasks.dateStart
							}));

const jsonToCsv = function(jsonTasks) 	{
										const csvRows = [];
	// headers
										const headers = Object.keys(jsonTasks);
										csvRows.push(headers.join(','));
	//rows
										for (const row of jsonTasks) {
																const values = headers.map(header =>{
																									const escaped = (''+row[header]).replace(/"/g, '\\"')
																									return `"${escaped}"`;
																									});
																csvRows.push(values.join(','));
																}
											return csvRows.join('\n');
										}
const csvData = jsonToCsv(jsonTasks);
console.log(csvData); */
//----------END-JSON-TO-CSV--------//