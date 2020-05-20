var express = require('express');
var app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser')
var sanitizer = require('sanitize')();
const path = require('path');
const fs = require('fs');
var compression = require('compression')
var https = require('https');
const { check, validationResult } = require('express-validator');
app.use(compression())

var key = fs.readFileSync('private.key');
var cert = fs.readFileSync('certificate.crt');

var options = {
    key: key,
    cert: cert
  };
app.use(express.json())
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.use(express.static('static'))
app.use(express.static('dist'))
var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const host = process.env.DB_HOST || '10.10.10.10';
const user = process.env.DB_USER || 'Accolade ';
const password = process.env.DB_PASS || 'Accolade ';
const database = process.env.DB_DATABASE || 'Accolade ';

let connectedToDB = false;
let texts;
let products;

// create connection
const con = mysql.createPool({ host, user, password, database,  port:3306});


// get texts from DB
const getTextsFromDb = () => {
    con.query("select * from texts", function (err, result) {
        if (err) { server.close();throw err};
        texts = Object.values(JSON.parse(JSON.stringify(result)));
    });
}


// get products from DB
const getProductsFromDb = () => {
con.query("select * from products", function (err, result) {
    if (err) { server.close();throw err};
   products = Object.values(JSON.parse(JSON.stringify(result)));

   products.forEach(p => {
      
       if(p.sizes) p.sizes = p.sizes.trim().split(',');
       if(p.prices) p.prices = p.prices.trim().split(',');
       if(p.alergens){p.alergens = p.alergens.trim().split(',')}else{p.alergens = []};
       if(p.sizes_eng) p.sizes_eng = p.sizes_eng.trim().split(',');
       if(p.alergens_eng){p.alergens_eng = p.alergens_eng.trim().split(',')}else{p.alergens_eng = []};
       p.name = p.productName;
       p.name_eng = p.productName_eng;
       p.id = p.productID;
       console.log(p);
   })
  });

}


app.get('/loadBaseData', function (req, res) {
    getProductsFromDb();
    getTextsFromDb();
    res.send({
        products: products,
        texts: texts,
    })
    
})
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/shop', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/home', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/about', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/orders', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
    
})
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
   
});
app.post('/getOrders',[
    check('username').trim().escape(),
    check('password').trim().escape(),
],function(req, res) {
    if(req.body.username == "Accolade " && req.body.password == "Accolade ") {
        let sql = 'SELECT * from orders JOIN order_products ON orders.id = order_products.order_ID JOIN products ON order_products.product_ID = products.productID;'
        con.query(sql, function (err, result) {
            let orders = [];
            let newOrder = {
                products: [],
            }
            console.log(Object.values(JSON.parse(JSON.stringify(result))));
            Object.values(JSON.parse(JSON.stringify(result))).map((o,index) => {
                if(!newOrder.id ) {

                    newOrder = {
                        id: o.order_ID,
                        name: o.name,
                        lastname: o.lastname,
                        email: o.email,
                        phone: o.phone,
                        status: o.status,
                        date: o.date,
                        note: o.note,
                        price: o.price,
                        products: [],
                   
                        
                    }
                    newOrder.products[newOrder.products.length] = {
                        size: o.size,
                        quantity: o.quantity,
                        image: o.image,
                        name: o.productName,
                    };
                    orders.push(Object.assign({}, newOrder));
                    
                } else if(newOrder.id !== o.order_ID) {
                    newOrder = null;
      
                    newOrder = {
                        id: o.order_ID,
                        name: o.name,
                        lastname: o.lastname,
                        email: o.email,
                        phone: o.phone,
                        status: o.status,
                        date: o.date,
                        note: o.note,
                        price: o.price,
                        products: [],
                 
                    }
                    newOrder.products[newOrder.products.length] = {
                        size: o.size,
                        quantity: o.quantity,
                        image: o.image,
                        name: o.productName,
                        
                    };
                    orders.push(Object.assign({}, newOrder));
                } else {
                    orders.length && orders[orders.length -1].products.push({
                        size: o.size,
                        quantity: o.quantity,
                        image: o.image,
                        name: o.productName,
                    })
                }
                   

                   
                });
                res.send(orders);
            });
    }
});

           

app.post('/changeStatus',[
    check('password').isLength({ min: 3 }).trim().escape(),
    check('username').isLength({ min: 3 }).trim().escape(),
    check('status').trim().escape(),
    check('id').trim().escape(),
], (req,res) => {
    if(req.body.username == 'Accolade ' && req.body.password =='Accolade ') {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
          return res.status(422).json({ errors: errors.array() });
        }
        const id = req.body.id;
        const status = req.body.status;
        let sql = `UPDATE sweetindia.orders SET status = '${status}' WHERE (id = ${id});`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("changed status for order " + id);
              
        })
    }
    
});

app.post('/placeOrder', [
    check('user.name').isLength({ min: 3 }).trim().escape(),
    // check('user.lastname').isLength({ min: 3 }),
    check('user.email').isEmail().trim().escape(),
    check('user.phone').isNumeric().trim().escape(),
    check('note').trim().escape()
  ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }
   let orderProducts = req.body.products;
   let lastname = req.body.user.name.split(" ")[1];
   let user;
   if(lastname) {
    user =  {
        name: req.body.user.name.split(" ")[0],
        lastname: req.body.user.name.split(" ")[1],
        email: req.body.user.email.toLowerCase(),
        phone: req.body.user.phone,
        note: req.body.user.note,
       }
   } else {
    user =  {
        name: req.body.user.name,
        lastname: "",
        email: req.body.user.email.toLowerCase(),
        phone: req.body.user.phone,
        note: req.body.user.note,
       }
   }
   
   
let finalPrice = 0;

    orderProducts.map(p => {
        const fullProduct = products && products.find(prod => prod.id == p.id);
        const price = fullProduct && fullProduct.prices[fullProduct.sizes.findIndex(s => {return s == p.size})];
        finalPrice += price * p.quantity;
    });
    var sql = `INSERT INTO orders (id, name, lastname, email, phone, status, note, price) VALUES (null,"${user.name}", "${user.lastname ? user.lastname : ""}","${user.email}","${user.phone}","new","${user.note}","${finalPrice}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("inserted order for" + user.name + " ");

            orderProducts.map(p => {

                let sql = `INSERT INTO order_products (order_ID, product_ID, size, quantity) VALUES ((SELECT id FROM orders ORDER BY id DESC LIMIT 1), ${p.id}, "${p.size}", "${p.quantity}")`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("inserted products for order");
          
            })
        });
    });
    
    
});


var server = https.createServer(options, app);
server.listen(8080, () => {
    console.log("server starting on port : " + 8080)
  });
