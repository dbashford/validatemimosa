var fs, ifExistsFileIEWithRegexAndStringCheck, ifExistsFileIEWithRegexAndStringWithField, path, windowsDrive;

fs = require('fs');

path = require('path');

windowsDrive = /^[A-Za-z]:\\/;

exports.isArrayOfStrings = function(errors, fld, obj) {
  var hFile, _i, _len;
  if (Array.isArray(obj)) {
    for (_i = 0, _len = obj.length; _i < _len; _i++) {
      hFile = obj[_i];
      if (typeof hFile !== 'string') {
        errors.push("" + fld + " must be an array of strings.");
        return false;
      }
    }
  } else {
    errors.push("" + fld + " must be an array.");
    return false;
  }
  return true;
};

exports.isArrayOfObjects = function(errors, fld, obj) {
  var hFile, _i, _len;
  if (Array.isArray(obj)) {
    for (_i = 0, _len = obj.length; _i < _len; _i++) {
      hFile = obj[_i];
      if (typeof hFile === "object" && !Array.isArray(hFile)) {

      } else {
        errors.push("" + fld + " must be an array of objects.");
        return false;
      }
    }
  } else {
    errors.push("" + fld + " must be an array.");
    return false;
  }
  return true;
};

exports.isString = function(errors, fld, obj) {
  if (typeof obj === "string") {
    return true;
  } else {
    errors.push("" + fld + " must be a string.");
    return false;
  }
};

exports.isObject = function(errors, fld, obj) {
  if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
    return true;
  } else {
    errors.push("" + fld + " must be an object.");
    return false;
  }
};

exports.isArray = function(errors, fld, obj) {
  if (Array.isArray(obj)) {
    return true;
  } else {
    errors.push("" + fld + " must be an array.");
    return false;
  }
};

exports.isNumber = function(errors, fld, obj) {
  if (typeof obj === "number") {
    return true;
  } else {
    errors.push("" + fld + " must be a number.");
    return false;
  }
};

exports.isRegex = function(errors, fld, obj) {
  if (obj instanceof RegExp) {
    return true;
  } else {
    errors.push("" + fld + " must be a RegExp.");
    return false;
  }
};

exports.isBoolean = function(errors, fld, obj) {
  if (typeof obj === "boolean") {
    return true;
  } else {
    errors.push("" + fld + " must be a boolean.");
    return false;
  }
};

exports.ifExistsIsRegex = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isRegex(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsArrayOfStrings = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isArrayOfStrings(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsArrayOfObjects = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isArrayOfObjects(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsNumber = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isNumber(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsString = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isString(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsArray = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isArray(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsObject = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isObject(errors, fld, obj);
  } else {
    return false;
  }
};

exports.ifExistsIsBoolean = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    return exports.isBoolean(errors, fld, obj);
  } else {
    return false;
  }
};

exports.stringMustExist = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    if (typeof obj !== "string") {
      errors.push("" + fld + " must be a string.");
      return false;
    } else {
      return true;
    }
  } else {
    errors.push("" + fld + " must be present.");
    return false;
  }
};

exports.booleanMustExist = function(errors, fld, obj) {
  if (obj !== null && obj !== void 0) {
    if (typeof obj !== "boolean") {
      errors.push("" + fld + " must be a boolean.");
      return false;
    } else {
      return true;
    }
  } else {
    errors.push("" + fld + " must be present.");
    return false;
  }
};

exports.isArrayOfStringsMustExist = function(errors, fld, obj) {
  var s, _i, _len;
  if (obj !== null && obj !== void 0) {
    if (Array.isArray(obj)) {
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        s = obj[_i];
        if (typeof s !== "string") {
          errors.push("" + fld + " must be an array of strings.");
          return false;
        }
      }
    } else {
      errors.push("" + fld + " configuration must be an array.");
      return false;
    }
  } else {
    errors.push("" + fld + " must be present.");
    return false;
  }
  return true;
};

exports.multiPathMustExist = function(errors, fld, pathh, relTo) {
  var pathExists;
  if (typeof pathh === "string") {
    pathh = exports.determinePath(pathh, relTo);
    pathExists = exports.doesPathExist(errors, fld, pathh);
    if (pathExists) {
      return pathh;
    } else {
      return false;
    }
  } else {
    errors.push("" + fld + " must be a string.");
    return false;
  }
};

exports.multiPathNeedNotExist = function(errors, fld, pathh, relTo) {
  if (typeof pathh === "string") {
    return exports.determinePath(pathh, relTo);
  } else {
    errors.push("" + fld + " must be a string.");
    return false;
  }
};

exports.ifExistsArrayOfMultiPaths = function(errors, fld, arrayOfPaths, relTo) {
  var newPaths, pathh, _i, _len;
  if (arrayOfPaths !== null && arrayOfPaths !== void 0) {
    if (Array.isArray(arrayOfPaths)) {
      newPaths = [];
      for (_i = 0, _len = arrayOfPaths.length; _i < _len; _i++) {
        pathh = arrayOfPaths[_i];
        if (typeof pathh === "string") {
          newPaths.push(exports.determinePath(pathh, relTo));
        } else {
          errors.push("" + fld + " must be an array of strings.");
          return false;
        }
      }
      arrayOfPaths.length = 0;
      arrayOfPaths.push.apply(arrayOfPaths, newPaths);
    } else {
      errors.push("" + fld + " must be an array.");
      return false;
    }
  }
  return true;
};

ifExistsFileIEWithRegexAndStringWithField = function(errors, fld, obj, relTo, includeOrExclude) {
  var incExc, newIncludeExclude, regexes, _i, _len, _ref;
  if (Array.isArray(obj[includeOrExclude])) {
    regexes = [];
    newIncludeExclude = [];
    _ref = obj[includeOrExclude];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      incExc = _ref[_i];
      if (typeof incExc === "string") {
        newIncludeExclude.push(exports.determinePath(incExc, relTo));
      } else if (incExc instanceof RegExp) {
        regexes.push(incExc.source);
      } else {
        errors.push("" + fld + " must be an array of strings and/or regexes.");
        return false;
      }
    }
    if (regexes.length > 0) {
      obj[includeOrExclude + "Regex"] = new RegExp(regexes.join("|"), "i");
    }
    obj[includeOrExclude] = newIncludeExclude;
  } else {
    errors.push("" + fld + " must be an array");
    return false;
  }
  return true;
};

exports.ifExistsFileExcludeWithRegexAndStringWithField = function(errors, fld, obj, name, relTo) {
  if (obj[name] !== null && obj[name] !== void 0) {
    return ifExistsFileIEWithRegexAndStringWithField(errors, fld, obj, relTo, name);
  }
};

ifExistsFileIEWithRegexAndStringCheck = function(errors, fld, obj, relTo, includeOrExclude) {
  if (obj[includeOrExclude] !== null && obj[includeOrExclude] !== void 0) {
    return ifExistsFileIEWithRegexAndStringWithField(errors, fld, obj, relTo, includeOrExclude);
  }
};

exports.ifExistsFileIncludeWithRegexAndString = function(errors, fld, obj, relTo) {
  return ifExistsFileIEWithRegexAndStringCheck(errors, fld, obj, relTo, 'include');
};

exports.ifExistsFileExcludeWithRegexAndString = function(errors, fld, obj, relTo) {
  return ifExistsFileIEWithRegexAndStringCheck(errors, fld, obj, relTo, 'exclude');
};

exports.doesPathExist = function(errors, fld, pathh) {
  if (!fs.existsSync(pathh)) {
    errors.push("" + fld + " [[ " + pathh + " ]] cannot be found");
    return false;
  }
  if (fs.statSync(pathh).isFile()) {
    errors.push("" + fld + " [[ " + pathh + " ]] cannot be found, expecting a directory and is a file");
    return false;
  }
  return true;
};

exports.determinePath = function(pathh, relTo) {
  if (windowsDrive.test(pathh)) {
    return pathh;
  }
  if (pathh.indexOf("/") === 0) {
    return pathh;
  }
  return path.join(relTo, pathh);
};
