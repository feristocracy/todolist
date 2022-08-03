/*-----------------CONSTANTES--------------------*/
const form = document.getElementById("form");
const tasklist = document.getElementById("tasklist");
const template = document.getElementById("template").content; //cada que se captura un template hay que agregar el .content
const fragment = document.createDocumentFragment();
const input = document.querySelector("input");
/*----------------------------------------------------*/

let tasks = { }; //Inicializamos la colección de objetos

document.addEventListener("DOMContentLoaded", () => {
                          if (localStorage.getItem("tasks")){tasks = JSON.parse(localStorage.getItem("tasks"));} // si hay un objeto de tareas guardadas en el local storage
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

                        const task =  {
																			id: Date.now(),
																			text: input.value,
																			status: false
																			}

                        tasks[task.id] = task; // guardamos (empujamos) la tarea a la colección de objetos a un indice creado aleatoriamente
                                        
                        console.log(tasks);
                        form.reset();
                        input.focus();

                        drawTasks();
                        }

const drawTasks = () => {
                        localStorage.setItem("tasks", JSON.stringify(tasks)); //guardamos la lista de tareas en el localstorage
												if(Object.values(tasks).length === 0){ // si no hay nada en la lista
																														tasklist.innerHTML = `<div class="alert alert-light text-center">No tasks... 🏝</div>`;
																														return
																														}
                        tasklist.innerHTML = ""; // primero borramos el objeto
                        Object.values(tasks).forEach(task =>{
                                                            const clone = template.cloneNode(true);  // CLONAR EL TEMPLATE ANTES QUE NADA
                                                            clone.querySelector("p").textContent = task.text;

																														if(task.status)	{ // si el estado de la tarea es true
																																						clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
																																						clone.querySelector(".text-success").classList.replace("fa-circle-check", "fa-rotate-left");
																																						clone.querySelector(".text-success").classList.replace("text-success", "text-primary");
																																						clone.querySelector(".alert p").classList.add("text-decoration-line-through");
																																						}

																														clone.querySelectorAll(".fas")[0].dataset.id = task.id; //hace referencia al botón verde
																														clone.querySelectorAll(".fas")[1].dataset.id = task.id; //hace referencia al botón verde
                                                            fragment.appendChild(clone);
                                                            })
                        tasklist.appendChild(fragment); //fragment recomendado en los forEach
                        
                        }

const botAccion = e =>{
											if (e.target.classList.contains("fa-circle-check"))	{ // si le damos click al circulo de palomita
																																					tasks[e.target.dataset.id].status = true;
																																					drawTasks();
																																					return
																																					}
											if (e.target.classList.contains("fa-rotate-left"))	{ // si le damos click al circulo de palomita
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