####3. gyakorlat anyaga:

A 3. gyakorlathoz tartozó kommentek és megjegyzések a #3 előtaggal vannak megjelölve. Ehhez az anyagrészhez új fájlok nem készültek, kizárólag a meglevőeket, az app.js-t, a userRoute.js és a userSchema.js-t bővítettük ki a mentett jelszó titkosítására és a PassportJS-el való bejelentkezéssel kapcsolatos elemekkel.

####2. gyakorlat anyaga:

A 2. gyakorlathoz tartozó kommentek és megjegyzések a #2 előtaggal vannak megjelölve.

Az órai példák futtatásához szükséges egy MongoDB adatbázis futtatása lokálisan. Ennek két lehetséges módja van:
- az egyik, hogy Dockeren keresztül létrehozunk egy példányt. A Dockerről pár héten belül bővebben is szó lesz, egyelőre a használata dióhéjban:
    - ingyenesen letölthető innen: https://www.docker.com/products/docker-desktop/
    - telepítést követően a 'docker ps' paranccsal ellenőrizhető, hogy működik-e (ez kilistázza a rendszeren futó konténereket)
        - macen és linuxon alapból csak sudoval érhetőek el a parancsok, de a telepítési guide végén (https://docs.docker.com/engine/install/ubuntu/) van leírás arról, hogy ez hogyan kerülhető meg
    - mongodb futtatásához:
      'docker run --name mongo -p 27017:27017 -v $PWD/mongo:/data/db -d mongo' (ez elindít egy példányt a mongodb docker konténeréből, a konténer 27017-es portját ráköti a localhost 27017-es portjára és a munkakönyvtár mongo nevű mappáját szinkronizálja a konténer /etc/mongo mappájából, ezáltal a mongodb tartalma a konténeren kívül is elérhető, menthető, tárolható, a -d kapcsoló pedig háttérbe küldi a futást, hogy ne vegye el a parancssort)
      - Windows alatt az érintett meghajtón engedélyezni kell a megosztást, erre a Docker Desktop általában kínál lehetőséget felugró ablakban
    - megállítása: 'docker stop mongo', újraindítása: 'docker start mongo', törlése (miután leállt): 'docker rm mongo'
- a másik a hivatalos mongodb letöltése: https://www.mongodb.com/docs/manual/installation/ és lokális futtatása (Windows-on pl. a telepített mappából kell a mongod.exe-t futtatni)
(- lehet felhő alapú ingyenes instance-ra is regisztrálni a mongo hivatalos honlapján https://www.mongodb.com/cloud/atlas/register , a regisztráció, a db és a kezdő user létrehozása után kigenerálja a connection stringet, amit be kell másolni az app.js-be hogy oda kapcsolódjon a szerver)

VS Code-hoz ajánlott a MongoDB for VS Code bővítmény telepítése, melynek segítségével könnyen debugolhatjuk az adatbázist



####1. gyakorlat anyaga
A projekt futtatásához előbb adjátok ki parancssorból az npm install parancsot. Ez be fogja olvasni a package.json fájlban listázott
    függőségeket, és letölti azokat a node_modules mappába. A node_module mappát sosem szabad másolni vagy feltölteni a projekttel együtt, mivel a tartalma akár gigabájtos méreteket is ölthet a függőségek típusa és mennyisége függvényében, és a tartalma bármikor újragenerálható

Ezt követően a node app.js paranccsal futtatható a projekt, a szerver futását pedig a Ctrl+C kombinációval tudjátok leállítani a parancssorból

Ha az npm install után megadjuk valamilyen csomag nevét, azt telepíti és be is írja a package.json fájl függőségei közé. Egy csomag több függőséget is magával vonhat, amelyek szükségesek a működéséhez, ekkor ezek is bekerülnek a package.json-be

A package.json-t létrehozni és új NodeJS parancsot létrehozni az npm init parancs segítségével lehet

A package-lock.json a használt modulok függőségeit és verziószámait menti el, ez garantálja, hogy bármikor töltjük le újra a függőségeket, garantáltan azok a verziót jönnek le, amelyekkel fejlesztettük és használni kezdtük az alkalmazást.

A -g kapcsolóval nem lokálisan, hanem globálisan tudunk telepíteni egy modult, ekkor az a rendszerünkön bárhonnan elérhető lesz (ez hasznos lesz majd például az Angular CLI telepítésekor)

Függőséget törölni az npm uninstall paranccsal lehet, globális függőséget törölni az npm uninstall -g -vel

Az npm automatikusan az adott függőség legfrissebb elérhető változatát tölti le, pontos verziót specifikálni az alábbi módon tudunk:
npm install modulnev@verzio
pl. npm install angularfire@3.5.1
