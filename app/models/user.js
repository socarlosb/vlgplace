var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// схема для модели пользователя
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        passwordConf : String,

        //+
        username     : String,
        dateOfBirth  : String,
        city         : String,
        sex          : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    odnoklassniki    : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    vkontakte        : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// генерирующий хэш
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// проверка правильности пароля
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// создание модели пользователя
module.exports = mongoose.model('User', userSchema);