// const crypto = require("crypto");

// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 512,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//     // cipher: 'aes-256-cbc',
//     // passphrase: 'top secret'
//   }
// });

// const data = "my secret data a";

// console.log(publicKey);
// console.log(privateKey);

// const encryptedData = crypto.publicEncrypt(
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//   },
//   Buffer.from(data)
// );

// console.log("encypted data: ", encryptedData.toString("base64"));

// const decryptedData = crypto.privateDecrypt(
//   {
//     key: privateKey,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//   },
//   encryptedData
// );

// console.log("decrypted data: ", decryptedData.toString());

function uploadFile(inputElement) {
  var file = inputElement;
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('Encoded Base 64 File String:', reader.result);
    
    /******************* for Binary ***********************/
    var data=(reader.result).split(',')[1];
     var binaryBlob = atob(data);
     console.log('Encoded Binary File String:', binaryBlob);
  }
  reader.readAsDataURL(file);
}

uploadFile("D:\WORK\DCT-Image-Steganography\stego_image.png");