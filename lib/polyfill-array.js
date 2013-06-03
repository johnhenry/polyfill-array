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
    //push2 -- Add value to the end of array
    //Arguments
        //value:* -- value to be added to beginnig of array
        //truth:Boolean -- set true to only allow truthy items to be added
        //newy:Boolean -- set to to only allow new items to be added
    var push2 = OBJ.Push2 = function(arr,value,newy,truthy){
        var okay = true;
        if(newy && arr.indexOf(value) !== -1) okay = false;
        if(truthy && !value) okay = false;
        if(okay) arr.push(value);
        return arr.length;
    }
    methodize(prototype,push2,"push2");

    //shift2 -- Add value to the beginning of array
    //Arguments
        //value:* -- value to be added to beginnig of array
        //truth: boolean -- set true to only allow truthy items to be added
        //newy: boolean -- set to to only allow new items to be added
    var unshift2 = OBJ.unshift2 = function(arr,value,newy,truthy){
        var okay = true;
        if(newy && arr.indexOf(value) !== -1) okay = false;
        if(truthy && !value) okay = false;
        if(okay) arr.unshift(value);
        return arr.length;
    }
    methodize(prototype,unshift2,"unshift2");

})(typeof global === 'undefined'? window : global,true)