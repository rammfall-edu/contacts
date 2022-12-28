export function request(url, config = {}) {
    return new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       const method = config.method ? config.method : 'GET';
       const body = config.body ? config.body : null;
       const contentType = config.contentType ? config.contentType : null;

       xhr.open(method, url);
        if(contentType) {
            xhr.setRequestHeader('content-type', contentType);
        }

       xhr.send(body);


       xhr.onload = () => {
           resolve(JSON.parse(xhr.response));
       }

       xhr.onerror = () => {
           const error = new Error('XHR Error');

           reject(error);
       }
    });
}