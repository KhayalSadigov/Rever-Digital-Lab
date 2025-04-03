function ArrayLabel(arr) {
  let arrName = arr.map((e) => {
    return e.month;
  });
  let arrValue = arr.map((e) => {
    return e.view;
  });

  return {name  : arrName , value : arrValue}
}

export default ArrayLabel;
