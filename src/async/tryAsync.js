let timeo = function(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(timeout);
      resolve(timeout);  
    }, timeout);
  })
}

let runner = async function() {
  let i = await timeo(2000);
  i += 1000;
  i = await timeo(i);
}

runner();