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

const validator=async (username, password)=>{
	try{
		conn          = await oracledb.getConnection(dbconfig);
		const records = await conn.execute("SELECT C.customerid, C.firstname, C.lastname, C.email FROM customers C INNER JOIN customer_credentials CC ON C.customerid = CC.customerid WHERE USERNAME='"+username+"' AND PASSWORD='"+password+"'");
		const sheet   = await records.rows;
		await conn.close();
		return(sheet);
	}catch(exception){
		console.log("=>cardFetcher: exception occured", exception)
	}
}
const cardFetcher=async (customerid)=>{
	try{
		conn = await oracledb.getConnection(dbconfig);
		records = await conn.execute("SELECT itemid, manufacturer ||' '|| title AS title , 'false' AS cart, price, available FROM cards WHERE itemid NOT IN (SELECT itemid FROM cart WHERE customerid='"+customerid+"')");
		await conn.close();
		console.log("Records: ",records.rows);
		data=records.rows;
		console.log("CartItems: ", data);

		return data;
	}catch(exception){
		console.log("=>cardFether: exception occured", exception)
	}
}
const addToCart=async(itemid, customerid)=>{
	try{
		conn = await oracledb.getConnection(dbconfig);
		response = await conn.execute("INSERT INTO cart values ('"+itemid+"', '"+customerid+"', 1)");
		await conn.execute('commit');
		await conn.close();
		console.log(response.rowsAffected);
		return response.rowsAffected;
	}catch(exception){
		console.log("Piyush Exception: ", exception)
	}
}

const removeFromCart=async(itemid, customerid)=>{
	try{
		conn = await oracledb.getConnection(dbconfig);
		response = await conn.execute("DELETE FROM cart WHERE customerid='"+customerid+"' AND itemid='"+itemid+"'");
		await conn.execute('commit');
		await conn.close();
		console.log(response.rowsAffected);
		return response.rowsAffected;
	}catch(exception){
		console.log("Piyush Exception: ", exception);
	}
}

const getCartItems=async(customerid)=>{
	try{
		conn = await oracledb.getConnection(dbconfig);
		cartItems = await conn.execute("SELECT CD.* FROM cart CT INNER JOIN cards CD ON CT.itemid=CD.itemid WHERE CT.customerid='"+customerid+"'")
		await conn.close();
		console.log("CartItems: ", cartItems.rows)
		return cartItems.rows;
	}catch(exception){
		console.log("Piyush Exception: ", exception);
	}
}
server.post('/login', (req,res)=>{
	const authString={
			status:INVALID_USER,
			name: "",
			email: "",
			customerid: ""
	}	
	validator(req.body.uname, req.body.password)
	.then((records) => {
		console.log("Out of fun/ Record - ", records);
		if(records.length === 1){
			user = records[0];
			console.log("Record fetched - 1");
			authString.status     = VALID_USER;
			authString.name       = user.FIRSTNAME+" "+user.LASTNAME;
			authString.email      = user.EMAIL;
			authString.customerid = user.CUSTOMERID;
			res.send(authString);
		}
		else{
			console.log("There should be only one record matching ", req.body.uname, ", but found ",records.length," records")
			authString.status == 'ERROR_OCCURED';
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
	console.log("1. In getCards");
	cardFetcher(req.body.customerid)
	.then(records=>{
		res.send(records);
	})
})

server.post('/addToCart', (req, res)=>{
	console.log("In addToCart")
	addToCart(req.body.itemid, req.body.customerid)
	.then(rowsAffected =>{
		console.log("RowsAffected: ", rowsAffected);
		if(rowsAffected === 1){
			res.send({status:'SUCCESS', rowsAffected: rowsAffected})
		}
		else{
			res.send({status:'FAILURE', rowsAffected: rowsAffected})
		}
	})
})

server.post('/removeFromCart', (req, res)=>{
	console.log("In removeFromCart",req.body.itemid, "/ ",req.body.customerid)
	removeFromCart(req.body.itemid, req.body.customerid)
	.then(rowsAffected =>{
		console.log("RowsAffected: ", rowsAffected);
		if(rowsAffected === 1 || rowsAffected === 0){
			res.send({status:'SUCCESS', rowsAffected: rowsAffected})
		}
		else{
			res.send({status:'FAILURE', rowsAffected: rowsAffected})
		}
	})
})

server.post('/getCartItems', (req, res)=>{
	console.log("In getCartItems, ", req.body.customerid)
	getCartItems(req.body.customerid)
	.then(cartItems =>{
		res.send(cartItems);
	})

})

server.listen(4000, ()=>{
		console.log("Hello Listening to 4000");
})