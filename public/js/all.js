let flasher=document.querySelector(".flash");
let name;
let email;
let dob;
let username;
let password;
let UserData={
    Name:'',
    Email:'',
    DOB:'',
    Username:'',
    Password:''
};
let DataVerify={
    Username:'',
    Password:''
}
function takeData(){
    flasher.innerHTML=``;
    name= document.querySelector(".Name").value;
    email= document.querySelector(".mail").value;
    dob= document.querySelector(".dob").value;
    username= document.querySelector(".usrnme").value;
    password= document.querySelector(".pswd").value;
    if(name.length>=3 && email.length>=8 && dob!=' ' && username.length>=4 && password.length>=8){
        UserData.Name=name;
        UserData.Email=email;
        UserData.DOB=dob;
        UserData.Username=username;
        UserData.Password=password;
        console.log(UserData);
        fetch('/API',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body : JSON.stringify(UserData)
        })
        .then(res=>{
            if(res.ok){
                console.log("Saved");
                flasher.innerHTML=`Successful `;
            }
            else{
                console.log("Error");
                flasher.innerHTML=`Seems Like You already have an Account`;
            }
        })
        .catch(err=>{
            console.log("fetch error: ",err);
        })
        reset();
    }
    else if(name.length<3){
        flasher.innerHTML=`Your Name is to short `;
    }
    else if(email.length<8){
        flasher.innerHTML=`Your mail Address is Invalied`;
    }
    else if(dob.length<5){
        flasher.innerHTML=`DOB suspicious`;
    }
    else if(username.length<9){
        flasher.innerHTML=`Too short username`;
    }
    else if(password.length<8){
        flasher.innerHTML='Your password is week .'
    }
    else{
        flasher.innerHTML='Something went wrong !'
    }
};
function reset(){
    document.querySelector('.Name').value='';
    document.querySelector('.mail').value='';
    document.querySelector('.dob').value='';
    document.querySelector(".usrnme").value='';
    document.querySelector('.pswd').value='';
}
function verifyData(){
    document.querySelector(".flash_V").innerHTML='';
    let username_V=document.querySelector(".usrnme_IN").value;
    let password_V=document.querySelector(".pswd_IN").value;
    if(username_V.length<3){
        document.querySelector(".flash_V").innerHTML='Please check your USERNAME';
        username_V='';
    }
    else if(password_V.length<8){
        document.querySelector('.flash_V').innerHTML='Please enter valied password !';
        password_V='';
    }
    else{
        DataVerify.Username=username_V;
        DataVerify.Password=password_V;
        console.log(DataVerify);
        fetch('/verify',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body : JSON.stringify(DataVerify)
        })
        .then(res=>{
            if(res.ok){
                console.log("welcome.....");
                console.log(res)
                window.location.href="/profile";
            }
            else{
                console.log("Invalied");
                document.querySelector(".flash_V").innerHTML='Invalied Credentials';
        }
    })
        .catch(err=>{
            console.log("fetch error: ",err);
        })
    }
}