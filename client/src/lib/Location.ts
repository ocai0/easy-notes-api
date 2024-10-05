export const getQueryParams = () => {
  let _result: any = {}
  var params = new URLSearchParams(window.location.search);
  for (let p of params) _result[p[0]] = p[1]
  return _result;
};