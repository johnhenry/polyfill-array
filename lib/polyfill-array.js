/*!
 * Polyfill for Arrays
 * Copyright(c) 2013 John Henry
 * MIT Licensed
 *
 */


(function(global,bindToPrototype){
////////////
//Setup
////////////
    var OBJ = global.Array;//The constructor object
    var prototype = global.Array.prototype;//The prototype of instances of the constructor object

    //Methodize -- Attaches functions to objects as methods
    //Note:
        //Here, "ConstructorObject.FunctionName(objectInstance,parameters...)" and "objectInstance.functionName(parameters...)" are generally equivalent.
        //This allows for the use of both Object-Oriented and Functional paradigms
        //Being aware of this should make the source code a bit less confusing
    var methodize = function(target,method,method_name,overwrite){
        if(!target[method_name] || overwrite && bindToPrototype !== false)
        target[method_name] = function(){
            return method.apply(this,[this].concat(Array.prototype.slice.call(arguments,0)));
        }
        return target;
    }

////////////
//Prototype Functions
////////////

    //pushOff -- Add value to end of array. Maintains length by dropping first value.
    //Arguments
        //value:* -- value to be added to the end of array
    var pushOff = OBJ.PushOff = function(arr,value){
                arr.push(value);
                arr.shift();
                return arr;
    }
    methodize(prototype,pushOff,"pushOff");

    //unshiftOff -- Add value to beginning of array. Maintains length by dropping last value.
    //Arguments
        //value:* -- value to be added to beginnig of array
    var unshiftOff = OBJ.UnshiftOff = function(arr,value){
                arr.unshift(value);
                arr.pop();
                return arr;
    }
    methodize(prototype,unshiftOff,"unshiftOff");


})(typeof global === 'undefined'? window : global,true)