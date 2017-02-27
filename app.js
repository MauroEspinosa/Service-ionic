var express=require("express");
var app=express();
var path = require ('path');
var bodyParser=require("body-parser");
var Persona=require("./models/modelo");


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views', path.join(process.cwd() +'/views'));
app.use(express.static(path.join(process.cwd() + '/public')));
app.set("view engine", "ejs");


app.get("/", function(req,res){
  res.render("index");
});

app.get("/nuevo", function(req,res){
  var persona=new Persona({nombre:req.query.nombre,
                           edad: req.query.edad,
                           numero: req.query.numero,
                           lugar: req.query.lugar});
  persona.save(function(err){
    if(!err){
      console.log("guardado" +persona);
    }
    res.redirect("/");
  });
});

app.get("/lista", function(req,res){
  Persona.find({},function(err,doc){
    res.send(doc);
  });
});

app.get("/eliminar/:id",function(req,res){
  Persona.findOneAndRemove({_id:req.params.id},function(err){
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 8080, function(){
  console.log("coneccion lista");
});
