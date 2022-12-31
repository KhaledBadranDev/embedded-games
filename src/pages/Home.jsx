import React from "react";
import {db} from "../firebase/firebase"
import {collection, getDocs} from "firebase/firestore"

const test = async () =>{
    const adminsColRef = collection(db, "admins")
    const adminsDocs = await getDocs(adminsColRef)
    console.log("adminsDocs", adminsDocs)
    adminsDocs.docs.forEach(doc => {
        console.log("data:", doc.data())
        console.log("id:", doc.id)

    })
}

const Home = () => {
    test()


    return (
        <div className="container text-center text-white mt-5">
            <h1>Home</h1>
        </div>
    );
};

export default Home;