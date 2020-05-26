for (let index = 0; index < 2; index++) {
  try {
    throw new Error(index);
  } catch (error) {
    console.log(error);
  }
}