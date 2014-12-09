fs =   require 'fs'
path = require 'path'

windowsDrive = /^[A-Za-z]:\\/

exports.isArrayOfStrings = (errors, fld, obj) ->
  if Array.isArray(obj)
    for hFile in obj
      unless typeof hFile is 'string'
        errors.push("#{fld} must be an array of strings.")
        return false
  else
    errors.push("#{fld} must be an array.")
    return false

  true

exports.isArrayOfObjects = (errors, fld, obj) ->
  if Array.isArray(obj)
    for hFile in obj
      if typeof hFile is "object" and not Array.isArray(hFile)
        # do nothing
      else
        errors.push("#{fld} must be an array of objects.")
        return false
  else
    errors.push("#{fld} must be an array.")
    return false

  true

exports.isString = (errors, fld, obj) ->
  if typeof obj is "string"
    true
  else
    errors.push "#{fld} must be a string."
    false

exports.isObject = (errors, fld, obj) ->
  if obj isnt null and typeof obj is "object" and not Array.isArray(obj)
    true
  else
    errors.push "#{fld} must be an object."
    false

exports.isArray = (errors, fld, obj) ->
  if Array.isArray(obj)
    true
  else
    errors.push "#{fld} must be an array."
    false

exports.isNumber = (errors, fld, obj) ->
  if typeof obj is "number"
    true
  else
    errors.push "#{fld} must be a number."
    false

exports.isRegex = (errors, fld, obj) ->
  if obj instanceof RegExp
    true
  else
    errors.push "#{fld} must be a RegExp."
    false

exports.isBoolean = (errors, fld, obj) ->
  if typeof obj is "boolean"
    true
  else
    errors.push "#{fld} must be a boolean."
    false

exports.ifExistsIsRegex = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isRegex errors, fld, obj
  else
    false

exports.ifExistsIsArrayOfStrings = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isArrayOfStrings errors, fld, obj
  else
    false

exports.ifExistsIsArrayOfObjects = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isArrayOfObjects errors, fld, obj
  else
    false

exports.ifExistsIsNumber = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isNumber errors, fld, obj
  else
    false

exports.ifExistsIsString = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isString errors, fld, obj
  else
    false

exports.ifExistsIsArray = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isArray errors, fld, obj
  else
    false

exports.ifExistsIsObject = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isObject errors, fld, obj
  else
    false

exports.ifExistsIsBoolean = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    exports.isBoolean errors, fld, obj
  else
    false

exports.stringMustExist = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    if typeof obj isnt "string"
      errors.push "#{fld} must be a string."
      false
    else
     true
  else
    errors.push "#{fld} must be present."
    false

exports.booleanMustExist = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    if typeof obj isnt "boolean"
      errors.push "#{fld} must be a boolean."
      false
    else
      true
  else
    errors.push "#{fld} must be present."
    false

exports.isArrayOfStringsMustExist = (errors, fld, obj) ->
  if obj isnt null and obj isnt undefined
    if Array.isArray(obj)
      for s in obj
        unless typeof s is "string"
          errors.push "#{fld} must be an array of strings."
          return false
    else
      errors.push "#{fld} configuration must be an array."
      return false
  else
    errors.push "#{fld} must be present."
    return false

  true

exports.multiPathMustExist = (errors, fld, pathh, relTo) ->
  if typeof pathh is "string"
    pathh = exports.determinePath pathh, relTo
    pathExists = exports.doesPathExist errors, fld, pathh
    if pathExists then pathh else false
  else
    errors.push "#{fld} must be a string."
    false

exports.multiPathNeedNotExist = (errors, fld, pathh, relTo) ->
  if typeof pathh is "string"
    exports.determinePath pathh, relTo
  else
    errors.push "#{fld} must be a string."
    false

exports.ifExistsArrayOfMultiPaths = (errors, fld, arrayOfPaths, relTo) ->
  if arrayOfPaths isnt null and arrayOfPaths isnt undefined
    if Array.isArray(arrayOfPaths)
      newPaths = []
      for pathh in arrayOfPaths
        if typeof pathh is "string"
          newPaths.push exports.determinePath pathh, relTo
        else
          errors.push "#{fld} must be an array of strings."
          return false
      arrayOfPaths.length = 0
      arrayOfPaths.push newPaths...
    else
      errors.push "#{fld} must be an array."
      return false

  true

exports.ifExistsFileIncludeWithRegexAndString = (errors, fld, obj, relTo) ->
  exports.ifExistsFileExcludeWithRegexAndStringWithField(errors, fld, obj, relTo, 'include')

exports.ifExistsFileExcludeWithRegexAndString = (errors, fld, obj, relTo) ->
  exports.ifExistsFileExcludeWithRegexAndStringWithField(errors, fld, obj, relTo, 'exclude')

exports.ifExistsFileExcludeWithRegexAndString = (errors, fld, obj, relTo, includeOrExclude) ->
  if obj[includeOrExclude] isnt null and obj[includeOrExclude] isnt undefined
    exports.ifExistsFileIncludeExcludeWithRegexAndStringWithField(errors, fld, obj, relTo, includeOrExclude)

exports.ifExistsFileIncludeExcludeWithRegexAndStringWithField = (errors, fld, obj, relTo, includeOrExclude) ->
    if Array.isArray(obj[includeOrExclude])
      regexes = []
      newIncludeExclude = []
      for incExc in obj[includeOrExclude]
        if typeof incExc is "string"
          newIncludeExclude.push exports.determinePath incExc, relTo
        else if incExc instanceof RegExp
          regexes.push incExc.source
        else
          errors.push "#{fld} must be an array of strings and/or regexes."
          return false

      if regexes.length > 0
        obj[includeOrExclude + "Regex"] = new RegExp regexes.join("|"), "i"

      obj[includeOrExclude] = newIncludeExclude
    else
      errors.push "#{fld} must be an array"
      return false

  true

exports.doesPathExist = (errors, fld, pathh) ->
  unless fs.existsSync pathh
    errors.push "#{fld} [[ #{pathh} ]] cannot be found"
    return false

  if fs.statSync(pathh).isFile()
    errors.push "#{fld} [[ #{pathh} ]] cannot be found, expecting a directory and is a file"
    return false

  true

exports.determinePath = (pathh, relTo) ->
  return pathh if windowsDrive.test pathh
  return pathh if pathh.indexOf("/") is 0
  path.join relTo, pathh