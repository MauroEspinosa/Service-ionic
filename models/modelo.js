var mongoose=require("mongoose");
var Schema=mongoose.Schema;

mongoose.connect("mongodb://localhost/service");

var persona=new Schema({nombre: String,
                        edad: Number,
                        numero: Number,
                        lugar: String
                      });

var Persona=mongoose.model("Persona",persona);

module.exports=Persona;
