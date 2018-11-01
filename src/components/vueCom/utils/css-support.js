let div = document.createElement('div'),
  vendors = ['Ms', 'O', 'Moz', 'Webkit'];

function supportCss(val) {
  switch (typeof val) {
    case "object":
      return supportCssPropValue(val);
      break;
    case "string":
      return supportCssProp(val);
      break;
  }
  throw new Error(`错误的对象类型${typeof val}:${val}`);
}

function supportCssPropValue(obj) {
  let prop, value;
  for (let key in obj) {
    prop = key;
  }
  value = obj[prop];
  if (prop) {
    if (supportCssProp(prop)) {
      div.style[prop] = value;
      return div.style[prop] === value;
    } else {
      return false;
    }
  } else {
    throw new Error("css属性不能为空！");
  }
}

function supportCssProp(prop) {
  if (prop in div.style) return true;
  prop = prop.replace(/^[a-z]/, function (val) {
    return val.toUpperCase();
  });
  let length = vendors.length;
  while (length--) {
    if (vendors[len] + prop in div.style) {
      return true;
    }
  }
  return false;
}

export default supportCss;
