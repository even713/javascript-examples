const run = (generator) => {
  let data = null, yielded = false;
  let iterator = generator((...args)=>{
    data = args;
    check();
  });
  let temp = iterator.next();
  console.log(temp);
  yielded = !!(temp);
  console.log("yieled", yielded);
  check();

  function check(){
    while(data && yielded) {
      let err = data[0], item = data[1];

      data = null;
      yielded = false;
      if(err)
        return iterator.throw(err);
        yielded = !!(iterator.next(item));
    }
  }
}

let fs = require("fs");

run(function* (resume) {
  let contents = yield fs.readFile("big.file", "utf8", resume);
  let uppercase = contents.toUpperCase();

  yield fs.writeFile("uppercase.file", uppercase, resume);
  console.log("done");
})
