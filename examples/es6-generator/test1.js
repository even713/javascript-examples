function* demo() {
  var res = yield 10;
  yield assert(res === 32);
  return 42;
}

function assert(a, b){
	return a == b;
}

var d = demo();
var resA = d.next();
console.log(resA)
// => {value: 10, done: false}
var resB = d.next(32);
console.log(resB);
// => {value: 42, done: true}
//if we call d.next() again it throws an error
console.log(d.next());
console.log(d.next());
