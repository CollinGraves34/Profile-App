import './table.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, addDoc, doc, getDocs, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB47eZX3Wr_5iy_PsXTxDDYsmDv9fOK2Co",
    authDomain: "profileapp-5e7cc.firebaseapp.com",
    projectId: "profileapp-5e7cc",
    storageBucket: "profileapp-5e7cc.appspot.com",
    messagingSenderId: "978765905216",
    appId: "1:978765905216:web:68743ca11c60512faf4ea5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getFirestore(app);

const getData = async () => {
  const qwry = query(collection(db, "/Data/Profiles/All"));
  onSnapshot(qwry, (querySnapshot) => {
    var table = document.getElementById('table-content');
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
      var first = doc.data().First;
      var last = doc.data().Last;
      var age = doc.data().Age;
      var address = doc.data().Address;
      var notes = doc.data().Notes;
      table.insertAdjacentHTML('beforeend','<tr><td><img alt="pfp" className="pfp" /></td><td>' + first + '</td><td>' + last + '</td><td>' + age + '</td><td>' + address + '</td><td><textarea className="form-control">' + notes + '</textarea></td></tr><tr className="breakLine" />');
    });
  })

};

function getProfiles(){
  getData();
}
var i=0;
window.addEventListener('DOMContentLoaded', () => {  
  if (i < 1) {
    getProfiles();
    i =+ 1
  }else{
    console.log('already loaded')
  }
})

function Table() {
  
  return (
    <div className='content'>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody id='table-content'>
          <tr className="breakLine" />

        </tbody>
      </table>
    </div>
  );
}

export default Table;
