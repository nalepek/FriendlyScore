function isString(obj){
    return (Object.prototype.toString.call(obj) === '[object String]');
}

module.exports = {
    isString
}