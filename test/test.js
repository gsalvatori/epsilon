var epsilon = require('../../lib/epsilon');

var source = "teststring";
var target = "anotherstring";

var result = epsilon.leven(source,target);

console.log(result);