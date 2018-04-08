angular.module("peticiones",['ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when("/",{
    controller: "lista",
    templateUrl: "lista.html"
  })
  .when("/user/:id",{
    controller: "editar",
    templateUrl: "editar.html"
  })
})

.factory("Datos",function($http){
  var data=[];
  $http.get("http://localhost:8080/users").then(function(res){
    for(i=0;i<res.data.length;i++){
      data.push(res.data[i]);
    }
  });
  return data;
})

.controller("formulario",function($scope,$http,Datos){
  $scope.nuevo=function(){
    $http.post("http://localhost:8080/user", $scope.formData).then(function(res){
      Datos.push({nombre:$scope.formData.nombre, _id:res.data});
      $scope.formData.nombre="";$scope.formData.edad="";$scope.formData.numero="";$scope.formData.lugar="";
    });
  }
})

.controller("lista",function($scope, $http, Datos){
  $scope.datos=Datos;
})

.controller("editar", function($scope, $http, $routeParams, $location, Datos){
  var user=$routeParams.id;

  $http.get("http://localhost:8080/user/"+user).then(function(res){
    $scope.formData=res.data;
  });

  $scope.actualizar=function(){
    $http({
      method: "PUT",
      url: "/user/"+user,
      data: $scope.formData
    }).then(function(res){
      for(i=0;i<Datos.length;i++){
        if(Datos[i]._id==user){
          Datos[i]=res.data;
          break;
        }
      }
      $location.path("/");
    });
  }

  $scope.eliminar=function(){
    $http({
      method: "DELETE",
      url: "/user/"+user
    }).then(function(res){
      var position=0;
      for(i=0;i<Datos.length;i++){
        if(Datos[i]._id==user){
          Datos.splice(position,1);
          break;
        }
        position++;
      }
      $location.path("/");
    });
  }
})
