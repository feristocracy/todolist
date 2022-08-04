	// FIREBASE//
	// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
	import { getFirestore, collection, getDoc, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCmd8d3V3_Gl_LzHPnzwfVLeCT_9mpFZac",
      authDomain: "todolist-49c11.firebaseapp.com",
      projectId: "todolist-49c11",
      storageBucket: "todolist-49c11.appspot.com",
      messagingSenderId: "591795273548",
      appId: "1:591795273548:web:8fcc70181f3e9a7fe999e9"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    //db.settings({timestampsInSnapshots: true});

    const taskGuardadas = collection(db, "taskGuardadas");
    const docRef = doc(db, "taskGuardadas", "Slot");
    const docSnap =  await getDoc(docRef);

    export const saveTasksDB = task =>  {
                                        setDoc(doc(taskGuardadas, "Slot"), {task});
                                        console.log("guardado");
                                        }

    export const getTaskDB = () =>{
                                  if (docSnap.exists()) {
                                        console.log(docSnap.data().task);
                                        return docSnap.data().task;
                                      } else {
                                        // doc.data() will be undefined in this case
                                        console.log("No such document!");
                                      }
                                      console.log("listo");
                                  }
                                  
                                    