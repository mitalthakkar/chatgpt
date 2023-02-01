export const setStateToCookie = (data, exdays = null) => {
  let expires = '';
  if (data.auth.remember_me === true) {
    exdays = 15;
  }
  if (exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = 'expires=' + d.toUTCString();
  }
  data = {
    auth: {
      isLogin: data.auth.isLogin,
    },
  };
  document.cookie = `state=${JSON.stringify(data)};${exdays ? expires + ';' : ''}path=/`;
};

export const getStateFromCookie = () => {
  var name = 'state=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return {};
};
