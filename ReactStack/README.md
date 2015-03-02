ReactStack
==========

React komponens könyvtár, ami alapul fog szolgálni egy további réteg
szolgáltatásainak.

Komponensek
-----------

A rendszer alapból belefordít mindent a dist mappába, belefordul
a bootstrap/material/jquery lib.min.css és lib.min.js néven.

Ezek a css és javascript fájlok adják a komponensek kinézetének az alapját.
Igyekszem úgy felépíteni hogy azért maguk a komponensek ne függjenek ezektől.

Komponens lista:

- Alert
- Panel
- Table
- Chart

Alert
=====

Kis üzenetablakot lehet vele megjeleníteni.
Tartozik hozzá egy alert-store és alert-action.