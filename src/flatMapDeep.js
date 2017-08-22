const flatMapDeep = (value, mapper) => {
    return isArray(value) ?
      [].concat(...value.map(x => flatMapDeep(x, mapper))) :
      mapper(value);
  };

  export const  isArray = (o) => {
    return Object.prototype.toString.call(o) === "[object Array]";
  };

  export default flatMapDeep;