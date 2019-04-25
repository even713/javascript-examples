var ary = [1,2,3,4,5,6];
console.dir(ary)

var myset = new Set([1,2,3,4,5,6]);
console.dir(myset);

for(let s of myset) {
  console.log(s);
}

let aryIterator = ary[Symbol.iterator]();
console.log(aryIterator.next());
