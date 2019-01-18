const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(cors());

const userCredentials = require('./userCredentials.js');
const cardList=require('./cardList');
const VALID_USER= "VALID_USER";
const INVALID_USER= "INVALID_USER";

server.post('/login', (req,res)=>{	
	
	const authString={
			status:INVALID_USER,
			name: "",
			age: "",
			gender: ""
	}
	userCredentials.map((user) =>{
		if(req.body.uname === user.uname && req.body.password===user.password)
		{
			console.log("Match Found")
			authString.status = VALID_USER;
			authString.name = user.name;
			authString.age = user.age;
			authString.gender = user.gender;
			return(0);	
		}	
	})
	res.send(authString);	
})

server.post('/getCards', (req,res)=>{
	console.log("in getCards s")
	res.send(cardList);
})

server.listen(4000, ()=>{
		console.log("Hello Listening to 4000");
})