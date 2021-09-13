const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = '6A80FD8D38D579D1090F6CDB62CA34CA';
const iv = '79b67e539e7fcadf';
module.exports={
    
    encrypt:(text)=>{
        var cipher = crypto.createCipheriv(algorithm,password,iv)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt:(text)=>{
        var decipher = crypto.createDecipheriv(algorithm,password,iv)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
    
}