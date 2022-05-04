import './navi.css';
import React from 'react';
import Modal from 'react-modal';
import {useState} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore/lite";

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

export default function Navi() {
    var first, last, age, address, notes;
    const appendData = async () => {
        try {
            const docData = {
                First: first,
                Last: last,
                Age: age,
                Address: address,
                Notes: notes
            };
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "/Data/Profiles/" + "All"), docData);
            console.log('Document #' + docRef.id + " has been set with data")
        } catch (error) {
            console.log(error)
        }
    };

    function handleNewProfile(){
        first = document.getElementById('first').value;
        last = document.getElementById('last').value;
        age = document.getElementById('age').value;
        address = document.getElementById('address').value;
        notes = document.getElementById('notes').value;
        if(first == null || last == null || age == null || address == null){
            console.log('Required fields are blank');
        }else{
            appendData();
        }
    }
    
    const el = document.getElementsByName('Modal');
    Modal.setAppElement(el)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

  return (
    <>
        <div class="dropdown">
            <button className='btn btn-info btn-menu dropdown-toggle' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Menu</button>
            <ul class="dropdown-menu sideNavi" aria-labelledby="dropdownMenuButton1">
                <li className='dropdown-item'><button className='dropdown-item btn btn-info' onClick={openModal}>Add Member</button></li>
                <li className='dropdown-item'><button className='dropdown-item btn btn-info'>About</button></li>
            </ul>
        </div>
        <div className='content'>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Add Profile"
                className="modal-dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Profile</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">First</span>
                                <input type="text" id="first" className="form-control" placeholder='John' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Last</span>
                                <input type="text" id="last" className="form-control" placeholder='Doe' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Age</span>
                                <input type="text" id="age" className="form-control" placeholder='170' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                                <input type="text" id="address" className="form-control" placeholder='1234 E Main St' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                            <div className="mb-3">
                                <label for="notes" class="form-label">Notes</label>
                                <textarea className="form-control" id="notes" rows="5" placeholder='Add a note to this profile...'></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => { handleNewProfile(); closeModal();}}>Save</button>
                        </div>
                    </div>
                </div>
            </Modal>
      </div>
    </>
  );
}
