const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
const dbconfig = { user: 'system', password: 'password-1', connectString:'localhost' };

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(cors());

const userCredentials = require('./userCredentials.js');
const cardList=require('./cardList');
const VALID_USER= "VALID_USER";
const INVALID_USER= "INVALID_USER";
let conn='';

const validator = async (username, password) =>{
	try{
		conn = await oracledb.getConnection(dbconfig);
		const records = await conn.execute("SELECT C.firstname, C.lastname, C.email FROM customers C INNER JOIN customer_credentials CC ON C.customerid = CC.customerid WHERE USERNAME='"+username+"' AND PASSWORD='"+password+"'");
		const sheet = await records.rows;
		return(sheet);
		conn.close();
	}catch(exception){
		console.log("=>cardFetcher: exception occured", exception)
	}
}

const cardFetcher = async () => {
	try{
		conn = await oracledb.getConnection(dbconfig);
		records = await conn.execute("SELECT manufacturer || ' '|| title AS title , 'false' AS cart, price FROM cards");
		console.log("2 Records: ",records.rows);
		return records.rows;
	}catch(exception){
		console.log("=>cardFether: exception occured", exception)
	}
}
server.post('/login', (req,res)=>{	
	
	const authString={
			status:INVALID_USER,
			name: "",
	}
	
	validator(req.body.uname, req.body.password)
	.then((records) => {
		console.log("Out of fun/ Record - ", records);
		if(records.length === 1){
			user = records[0];
			console.log("Record fetched - 1");
			authString.status = VALID_USER;
			authString.name = user.FIRSTNAME+" "+user.LASTNAME;
			res.send(authString);
		}
		else{
			console.log("There should be only one record matching ", req.body.uname, ", but found ",records.length," records")
			authString.status == 'ERROR_OCCURED'
			res.send(authString);
		}
	})
})

server.post('/getCards', (req,res)=>{
	let cardList2=[];
	let card = {
		title: "",
		cart: false,
		price: 0
	}
	console.log("1. In getCards")
	cardFetcher()
	.then(records=>{
		console.log("3. Out of cards Fetcher: ",records)
		/*records.map((cards)=>{
			card.title = cards.TITLE;
			card.price = cards.PRICE;
			cardList2.push(card);			
		})
		console.log("CardList2: ", cardList2);*/
		res.send(records);
	})
	
	
})
server.listen(4000, ()=>{
		console.log("Hello Listening to 4000");
})