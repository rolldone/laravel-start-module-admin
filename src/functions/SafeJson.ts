const safeJSON = function (props: any, endpoint: any, defaultValue?: any, index?: number): any {
  let _endpotingString = endpoint as string;
  endpoint = _endpotingString.split(".");
  if (endpoint.length == 0) {
    return defaultValue;
  }
  if (index == null) {
    index = 0;
  }
  if (props == null) {
    return defaultValue;
  }
  if (props[endpoint[index]] == null) {
    return defaultValue;
  }
  props = props[endpoint[index]];
  index += 1;
  if (index == endpoint.length) {
    return props;
  }
  return safeJSON(props, endpoint.join("."), defaultValue, index);
}

export default safeJSON;