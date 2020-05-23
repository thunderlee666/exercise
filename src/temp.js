function* cycle1_3() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
  yield 5;
}
for (const iterator of cycle1_3()) {
  console.log(iterator);
}
