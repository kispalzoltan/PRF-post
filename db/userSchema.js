const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// #2 User sémadefiníció, minden dokumentumnak, amit a MongoDB-ben tárolni akarunk, kell egy séma definíció
const userSchema = new mongoose.Schema({
    // a séma legfontosabb elemei az eltárolt dokumentumok adattagjai
  username: {
    type: String,
    /* támogatott típusok: String, Number, Date, Buffer, Boolean, Mixed, ObjectId,
        Array, Decimal128, Map, Schema - az utolsóval valósítható meg az egymásba ágyazás, tehát hogy az egyik dokumentum
        egy másikat tartalmazzon */
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1, //adhatunk alapértelmezett értéket is
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

// #3 A user sémájához egy pre-hookot adunk hozzá, amely a mentés előtt fut le
userSchema.pre('save', function(next) {
  const user = this;
  // Ellenőrizzük, hogy a jelszó módosult-e
  if(user.isModified('password')) {
      // Generálunk egy sót a jelszó hash-eléséhez
      bcrypt.genSalt(10, function(err, salt) {
          if(err) {
              console.log('hiba a salt generalasa soran');
              // Ha hiba történik a só generálásakor, akkor visszatérünk a hibával
              return next(error);
          }
          // Hash-eljük a jelszót a sóval
          bcrypt.hash(user.password, salt, function(error, hash) {
              if(error) {
                  console.log('hiba a hasheles soran');
                  // Ha hiba történik a hash-elés során, akkor visszatérünk a hibával
                  return next(error);
              }
              // Beállítjuk a jelszó értékét a hash-re
              user.password = hash;
              // Folytatjuk a mentést
              return next();
          })
      })
  } else {
      // Ha a jelszó nem módosult, akkor folytatjuk a mentést
      return next();
  }
});

// #3 Egy metódust adunk hozzá a user sémájához, amely összehasonlítja a jelszót a hash-el
userSchema.methods.comparePasswords = function(password, nx) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      // Az összehasonlítás eredményét visszaadjuk a callback függvénynek
      nx(err, isMatch);
  });
};

// User modell
const User = mongoose.model('user', userSchema);

module.exports = User;