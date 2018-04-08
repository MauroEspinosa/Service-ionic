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

app.get("/users", function(req,res){
  Persona.find({},function(err,doc){
    res.send(doc);
  });
});

app.post("/user", function(req,res){
  var persona=new Persona({nombre:req.body.nombre,
                           edad: req.body.edad,
                           numero: req.body.numero,
                           lugar: req.body.lugar});
  persona.save(function(err){
    res.send(persona._id);
  });
});

app.get("/user/:id",function(req,res){
  Persona.findOne({_id: req.params.id},function(err,doc){
    console.log(doc);
    res.send(doc);
  });
});

app.put("/user/:id",function(req,res){
  Persona.findOne({_id:req.params.id},function(err,doc){
    doc.nombre=req.body.nombre,
    doc.edad=req.body.edad,
    doc.numero=req.body.numero,
    doc.lugar=req.body.lugar
    doc.save(function(err){
      res.send(doc);
    });
  });
});

app.delete("/user/:id",function(req,res){
  Persona.findOneAndRemove({_id:req.params.id},function(err){
    Persona.find({},function(err,doc){
      res.send(doc);
    });
  });
});

app.get("/eliminar",function(req,res){
  Persona.remove({},function(err){
    res.redirect("/");
  });
});

app.listen(8080, function(){
  console.log("coneccion lista");
});
