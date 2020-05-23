var a = 'global scope'

function localScope(...arge) {
  let b;
  b = 'local scope'
}

localScope();