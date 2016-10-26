import sjcl from 'sjcl';

/* Uploads vault and returns a Promise<JSON> */
export function uploadVault(){
  return function(dispatch, getState){
    var state = getState();
    var vault = state.vault;
    var password = state.connect.password;
    var jwt = state.connect.jwt;
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

export function saveVaultItem(itemId, item){
  return function(dispatch){
    dispatch({
      type: 'SAVE_VAULT_ITEM',
      data: {
        item: item,
        itemId: itemId
      }
    });
    dispatch(uploadVault());
  };
}

export function login(email, password, router, totp){
  return function(dispatch){
    fetch('/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(email+':'+password)
      },
      method: 'POST',
      body: JSON.stringify({
        totp: totp
      })
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      if (response.needsTotp && !totp){
        //need to get TOTP
        router.push('/login/totp');
        return;
      }
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
            email: email,
            password: password,
            vault: vault,
            needsTotp: response.needsTotp
          }
        });
        router.push('/');
      }
    });
  };
}

export function register(email, password, confirmPassword, router){
  return function(dispatch){
    if (password != confirmPassword){
      dispatch({
        type: 'ADD_ERRORS',
        data: ['The two passwords to not match']
      });
      return;
    }
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
      else{
        dispatch({
          type: 'ADD_ERRORS',
          data: ['Successfully Registered! Look for a confirmation email']
        });
        router.push('/login');
      }
    });
  };
}

export function changePassword(currentPassword, newPassword, confirmPassword){
  return function(dispatch, getState){
    if (newPassword != confirmPassword){
      dispatch({
        type: 'ADD_ERRORS',
        data: ['The two passwords do not match']
      });
      return;
    }
    var state = getState();
    if (currentPassword != state.connect.password){
      dispatch({
        type: 'ADD_ERRORS',
        data: ['Current password is incorrect']
      });
      return;
    }
    var jwt = state.connect.jwt;
    fetch('/api/v1/changePassword', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+jwt
      },
      method: 'POST',
      body: JSON.stringify({
        password: newPassword
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
      else{
        dispatch({
          type: 'ADD_ERRORS',
          data: ['Successfully changed password!']
        });
        dispatch({
          type: 'CHANGE_PASSWORD',
          data: newPassword
        });
        dispatch(uploadVault());
      }
    });
  };
}
