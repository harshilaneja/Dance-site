const express =require("express");
const path =require("path");
const app =express();

var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port =80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  var contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname, 'views'))

app.get('/',(req, res)=>{
    const param={ }
    res.status(200).render('home.pug',param);
})
app.get('/contact',(req, res)=>{
    const param={ }
    res.status(200).render('contact.pug',param);
})

app.post('/contact',(req, res)=>{
    var myData = new contact (req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
       
    }).catch(()=>{
        res.status(400).send("item was not savrd to the database")   

});
    res.status(400).send("item was not saves in database")
})
app.listen(port,()=>{
    console.log(`application startes on port ${port}`);
});