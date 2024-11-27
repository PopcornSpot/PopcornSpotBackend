

const passwordGenerator=(length) => {
let password=""
let characters="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm!@#*%^&()0987654321"
  
for (let i= 0; i <length; i++) {
    password +=characters.charAt(Math.floor(Math.random()*characters.length));  
};
return password;
};



module.exports={passwordGenerator}