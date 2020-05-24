globalThis.z = 1;
this.z = 2;
let logZ1 = () => {
  console.log("logZ1 log this.z = " + this.z);
}
let logZ2 = function() {
  console.log("logZ2 log this.z = " + this.z);
}
let a = {
  z: 3,
  callLogZ() {
    let logZ3 = () => {
      console.log("logZ3 log this.z = " + this.z);
    }
    logZ1();
    logZ2();
    logZ3();
    logZ1.call(this)
    logZ2.call(this)
  }
}
a.callLogZ();