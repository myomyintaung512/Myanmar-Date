# Juno-Myanmar-Date
Javascript Myanmar Date Plugin, Extended Javascript Native Date Object.

### Installation
1. Copy src folder to your project.
2. Include src/juno.date.js in your html document.
```
<script src="src/juno.date.js"></script>
```

### Usage
This plugin is extened on Javascript native Date Object.
Examples:
```
var date= new Date('10-23-2015');
/* @ Date.mmFormat(format,ref)
 * ref will be eng=English (Default), uni= Unicode, zg=Zawgyi
*/
date.mmFormat('d/m/Y','uni'); // @ return "၁၀/၇/၁၃၇၇"  
date.mmFormat('d/M/Y','uni'); // @ return "၁၀/သီတင်းကျွတ်/၁၃၇၇" 
date.mmFormat('M z dx, Yk, Dn'); // @ return "Thadingyut waxing 10 , 1377 , Friday "
date.mmFormat('M z dx, Yk, Dn','uni'); // @ return "သီတင်းကျွတ် လဆန်း ၁၀ရက်, ၁၃၇၇ခု, သောကြာနေ့"
date.mmFormat('M z dx, T tk, Dn','uni'); // @ return "သီတင်းကျွတ် လဆန်း ၁၀ရက်, သာသနာနှစ် ၂၅၅၉ခု, သောကြာနေ့"

/* @ Date.nagahle(ref) နဂါးခေါင်းလှည့်
* ref will be eng=English (Default), uni= Unicode, zg=Zawgyi
*/
date.nagahle('uni'); // @return "အရှေ့"

/* @ Date.getThingyan(ref)  သင်္ကြန်
* ref will be eng=English (Default), uni= Unicode, zg=Zawgyi
*/
var d = new Date('04-13-2015');
d.getThingyan('uni'); // @ return "သင်္ကြန်အကြို"
```
