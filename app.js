/* A require a NodeJS egyik legfontosabb beépített függvénye, ezzel tudunk behivatkozni más modulokat a kódunkba.
Ha a require után fix útvonalat adunk meg, akkor keresni kezdi a gépünkön az adott fájlt. Ha nem, akkor előbb a node_modules-ban
kezdi keresni a megadott nevű modult, aztán a globálisan telepített függőségek között, végül a beépített modulok között. Ha az
importálni kívánt modul tartalmaz futtatható kódot is, az ilyenkor automatikusan lefut, ezáltal használható például arra is, hogy
bootstrap scripteket indítsunk a szerver indítása során. */
const express = require('express');
// #2: a külső modulok importjait érdemes a fájlok elejére csoportosítani
const mongoose = require('mongoose');

// #3: erre a három modulra lesz szükségünk a bejelentkezés megvalósításához
const passport = require('passport');
const localStrategy = require('passport-local').Strategy; // létező third-party megoldás helyett saját logikát akarunk írni a bejelentkezésre
const expressSession = require('express-session');

// Ezzel a paranccsal hozunk létre egy ExpressJS szerverappot, melyet paraméterezünk, ellátunk middleware-ekkel, majd elindítjuk
const app = express();

// engedélyezi az összes külső eredetű kérést
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// #2 még mielőtt bármit csinálnánk a szerverünkkel, első lépésben rácsatlakozunk az adatbázisra
mongoose.connect('mongodb+srv://kispalzoltan99:NjLhAvcQxHER2JB3@prf-claster.bquvbin.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true, //ezek a paraméterek azért kellenek, hogy kompatibilisek legyünk akár régebbi Mongo verziókkal is
});

// #2 callback funkciók, amelyek az app.js indítását követően egyértelműen jelzik, hogy sikeres vagy sikertelen volt-e a db kapcsolódás
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

// #2 importálom és regisztrálom a sémámat a mongodb 'user' kollekciójához
const User = require('./db/userSchema');
const Post = require('./db/postSchema');

// #2 a boostrapperről tudom, hogy egy függvényt exportál, itt rögtön a hivatkozás helyén meg is hívom azt
require('./db/bootstrapper')();

/* #2 A cookie-parser és a body-parser teszik lehetővé, hogy a kliens által küldött HTTP kérésből kiolvasásra
 kerüljenek a feltöltött adatok - az előző órai módszerrel ugyanis csak az url-be ágyazott paramétereket tudtuk
 kiolvasni, a sütiket és a request body-t, amiben általában jönnek majd az adatok, nem. */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// #3. definiáljuk a saját login stratégiánkat
passport.use('local', new localStrategy(function (username, password, done) {
  // 'local' stratégiának nevezzük el
  User.findOne({ username: username }, function (err, user) {
      // Felhasználó keresése az adatbázisban a felhasználónév alapján
      if (err) return done('Hiba lekeres soran', null);
      // Hiba kezelése az adatbázis lekérdezésekor
      if (!user) return done('Nincs ilyen felhasználónév', null);
      // Ellenőrzés, hogy létezik-e a felhasználó
      user.comparePasswords(password, function (error, isMatch) {
          // Felhasználó által megadott jelszó ellenőrzése
          if (error) return done(error, false);
          // Hiba kezelése, ha nem sikerült összehasonlítani a jelszavakat
          if (!isMatch) return done('Hibas jelszo', false);
          // Sikeres belépés esetén felhasználó visszaadása
          return done(null, user);
      })
  })
}));


passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  // Felhasználó bejelentkezését követően a felhasználó azonosítójának eltárolása sessionben
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  // Felhasználó kiléptetése után a felhasználó azonosítójának eltávolítása
  return done(null, user);
});

// #3 Felfűzzük a passportot a middleware láncra
app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true }));
app.use(passport.initialize());
app.use(passport.session());


// Az app.use() metódusban található függvény egy middleware, amely fut, amikor az alkalmazáshoz érkezik egy HTTP kérés.
// A middleware-ek mindig az app.use-ok sorrendjének megfelelően futnak le, így végezhetünk majd a beérkező HTTP kérésen előfeldolgozást vagy autentikációt
app.use((req, res, next) => {
    // a req objektumon keresztül a kapott HTTP kérés paramétereit érhetjük el, a res-en keresztül a visszaküldendő választ konfigurálhatjuk
    // ezt a két paramétert elnevezhetjük másképp is, de a middleware-ek paraméterlistája mindig ugyanez: kérés, válasz, next függvény
    console.log('A middleware futott!')
    /* A next() függvény itt azt jelzi az ExpressJS-nek, hogy ez a middleware még nem válaszolt a kliensnek, 
    továbbadja a végrehajtást a middleware lánc következő elemének */
    next()
  })

/* Bevonjuk és felcsatoljuk a usersRouter.js által exportált Router objektumot, az abban definiált route-ok a /api/users prefix után lesznek
elérhetőek, tehát pl. /api/users/:id a teljes út, amin a fájlban definiált /:id elérhető lesz */
app.use('/api/users', require('./usersRouter'))
app.use('/api', require('./postRouter'))

/* Az express.static() metódusban meg kell adnunk azt a mappát, amelyből a statikus fájlokat kiszolgáljuk. */ 
app.use('', express.static('public'))

/* Az app.listen metódus elindítja a szervert a 3000 porton, és kiírja az üzenetet a konzolra egy callback függvénnyel. 
Paraméterként várja a portszámot és a callback függvényt, amely akkor hívódik meg, amikor a szervert elindítjuk.
Érdemes ezt a parancsot megtenni mindig az utolsónak, és mindenképp a middleware-ek bevonása után */
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})