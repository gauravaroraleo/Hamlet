//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCL0HEMDKxXDb-fAeE_2C9oMWhQROH3tUE",
    authDomain: "hamlet-5e892.firebaseapp.com",
    databaseURL: "https://hamlet-5e892-default-rtdb.firebaseio.com/",
    projectId: "hamlet-5e892",
    storageBucket: "hamlet-5e892.appspot.com",
    messagingSenderId: "656208107328",
    appId: "1:656208107328:web:fe3be477f8ad41592f8ca5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("Username");
document.getElementById("user_name").innerHTML = "Welcome " + username + " !";

function Addroom() {
    room_name = document.getElementById("RN").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "Hi me"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "chat.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
console.log("roomname"+Room_names);
            row="<div class='room_name' id="+Room_names+" onclick='taketoroom(this.id)' >#"+Room_names+"</div><hr>";
            document.getElementById("output").innerHTML+=row;

            //End code
        });
    });
}
getData();


function taketoroom(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location="chat.html";  
}

function logout(){
    localStorage.removeItem("Username");
    localStorage.removeItem("room_name");
    window.location="index.html";
    
    
}