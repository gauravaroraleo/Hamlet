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
user_name = localStorage.getItem("Username");
room_name = localStorage.getItem("room_name");

function Send() {
    msg = document.getElementById("send").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("send").value = "";
}


function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                x = "<h4> " + name + " <img class='tickimg' src='tick.png'></h4>";
y="<h4 class='messageh4'>"+message+"</h4>";
                z="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
                a="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";
                b=x+y+z+a;
                document.getElementById("output").innerHTML+=b;



                //End code
            }
        });
    });
}
getData();
function update_like(message_id){
                      button_id=message_id;
                      likes=document.getElementById(button_id).value;
updatedlikes=Number(likes)+1;
                      firebase.database().ref(room_name).child(message_id).update({like:updatedlikes});

                      
                      }

function Logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
