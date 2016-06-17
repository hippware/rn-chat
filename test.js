var scxml = require('scxml');
var model = require('./test.scxml');
console.log(model);

  //you can inspect the generated code if you like using JavaScript's Function.prototype.toString

  //instantiate the interpreter
  var statechart1 = new scxml.scion.Statechart(model);

  global.r = {
    storage: {
      load: ()=>{}
    }
  };

  global.run = function (a,b){
    console.log("MESSAGE:", a,b);

    //statechart1.gen("success", {c:2,b:3});
     setTimeout(()=>statechart1.gen("success", {c:2,b:3}), 5000);
  };

  global.setScene = function(scene){
    console.log("SET SCENE",scene);
  };
  //you can instantiate a second interpreter using the same model
  var statechart2 = new scxml.scion.Statechart(model);

  //start the interpreter
  var initialConfiguration = statechart1.start();


  //send events
  //statechart1.gen({name : 'fetching', data : {a:'bar',b:'c'}});



