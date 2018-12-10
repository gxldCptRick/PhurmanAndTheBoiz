export function WatchedContext(hostedCtx) {
  this.commands= [];
  var Context2dPrototype = CanvasRenderingContext2D.prototype;
  for (var p in Context2dPrototype ) {
    this[p] = function(methodName){
        return function() {
            this.commands.push(methodName, arguments);
            Context2dPrototype[methodName].apply(hostedCtx, arguments);
        };      
    }(p);
  }  
  this.replay=function() {
    for (var i=0; i<this.commands.length; i+=2) {
      var com = this.commands[i];
      var args = this.commands[i+1];
      Context2dPrototype[com].apply(hostedCtx, args);
    }
  }
}

