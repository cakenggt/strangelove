import sjcl from 'sjcl';

/* Uploads vault and returns a Promise<JSON> */
export function uploadVault(vault, password, jwt){
  return function(dispatch){
    var encrypted = sjcl.encrypt(
      password,
      JSON.stringify(vault)
    );
    return fetch('/api/v1/store', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+jwt
      },
      method: 'POST',
      body: JSON.stringify({
        store: encrypted
      })
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      if (response.errors.length){
        dispatch({
          type: 'ADD_ERRORS',
          data: response.errors
        });
      }
    });
  };
}

export function login(email, password){
  return function(dispatch){
    fetch('/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic '+btoa(email+':'+password)
      },
      method: 'POST'
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      let vault = response.store;
      if (response.errors.length){
        dispatch({
          type: 'ADD_ERRORS',
          data: response.errors
        });
      }
      else{
        if (!vault){
          vault = {};
        }
        else{
          vault = JSON.parse(sjcl.decrypt(password, response.store));
        }
        dispatch({
          type: 'LOGIN_SUCCESSFUL',
          data: {
            jwt: response.jwt,
            password: password,
            vault: vault
          }
        });
      }
    });
  };
}

export function register(email, password, confirmPassword){
  return function(dispatch){
    fetch('/api/v1/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      if (response.errors.length){
        dispatch({
          type: 'ADD_ERRORS',
          data: response.errors
        });
      }
    });
  };
}
