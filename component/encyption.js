var CryptoJS = require('react-native-crypto-js');


exports.cipher = (data, key) => {
    console.log(data)
    if(!key) return null
    try{
        cipher = CryptoJS.AES.encrypt(data, key).toString();
        //console.log(cipher)
        return cipher;
    }catch(e){
        console.log(e)
        return null
    }
}

exports.decipher = (data, key) => {
    if(!key) return 'Need Key'
    var raw = CryptoJS.AES.decrypt(data, key);
    try{
        plaintext = raw.toString(CryptoJS.enc.Utf8)
        return plaintext ? plaintext : "Failed Decipher"
    }catch(e){
        return "Failed Decipher"
    }
}

