
/**
 * Juno Myanmar Date Plugin
 * version: 0.1
 * Date: 22 Oct 2015
 * File: juno.date.js
 * Description: Javascript Myanmar Date Plugin, Extended Javascript Native Date Object.
 * ___________________________________________________________________________________
 * Author: Myo Myint Aung (Juno)
 * Email: myomyintaung512@gmail.com
 * License: Juno Myanmar Date Plugin by Myo Myint Aung is licensed
 * 			under a Creative Commons Attribution 3.0 Unported License.
 *			http://creativecommons.org/licenses/by/3.0/
 * 
 *	You are free:
 *    to Share — to copy, distribute and transmit the work
 *    to Remix — to adapt the work
 *    to make commercial use of the work
 *  Under the following conditions:
 *    Attribution — You must attribute Myanmar Calendrical Calculations
 *		to Myo Myint Aung (with link).
*/

/* Loading mc.js by Yan Naing Aye
 *
*/

var retrieveURL = function(filename) {
    var scripts = document.getElementsByTagName('script');
    if (scripts && scripts.length > 0) {
        for (var i in scripts) {
            if (scripts[i].src && scripts[i].src.match(new RegExp(filename+'\\.js$'))) {
                return scripts[i].src.replace(new RegExp('(.*)'+filename+'\\.js$'), '$1');
            }
        }
    }
};

function loadScript(src, f) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = src;
  var done = false;
  script.onload = script.onreadystatechange = function() { 
    // attach to both events for cross browser finish detection:
    if ( !done && (!this.readyState ||
      this.readyState == "loaded" || this.readyState == "complete") ) {
      done = true;
      if (typeof f == 'function') f();
      // cleans up a little memory:
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
}
var _junourl = retrieveURL('juno.date');

loadScript(_junourl+'lib/mc.js', function() { 
 	if(Date.prototype._lang == null )
Date.prototype._lang=[

//Catalog for Myanmar Unicode
	{'January':'ဇန်နဝါရီ','February':'ဖေဖော်ဝါရီ','March':'မတ်',
	'April':'ဧပြီ','May':'မေ','June':'ဇွန်','July':'ဇူလိုင်','August':'ဩဂုတ်',
	'September':'စက်တင်ဘာ','October':'အောက်တိုဘာ','November':'နိုဝင်ဘာ',
	'December':'ဒီဇင်ဘာ','First Waso':'ပဝါဆို','Tagu':'တန်ခူး','Kason':'ကဆုန်',
	'Nayon':'နယုန်','Waso':'ဝါဆို','Wagaung':'ဝါခေါင်','Tawthalin':'တော်သလင်း',
	'Thadingyut':'သီတင်းကျွတ်','Tazaungmon':'တန်ဆောင်မုန်း','Nadaw':'နတ်တော်',
	'Pyatho':'ပြာသို','Tabodwe':'တပို့တွဲ','Tabaung':'တပေါင်း','waxing':'လဆန်း',
	'waning':'လဆုတ်','full moon':'လပြည့်','new moon':'လကွယ်',
	'Myanmar Year':'မြန်မာနှစ်','Ku':'ခု','Late':'နှောင်း','Second':'ဒု',
	'Sunday':'တနင်္ဂနွေ','Monday':'တနင်္လာ','Tuesday':'အင်္ဂါ',
	'Wednesday':'ဗုဒ္ဓဟူး','Thursday':'ကြာသပတေး','Friday':'သောကြာ',
	'Saturday':'စနေ','Nay':'နေ့','Yat':'ရက်','Sabbath Eve':'အဖိတ်',
	'Sabbath':'ဥပုသ်','Yatyaza':'ရက်ရာဇာ','Afternoon Pyathada':'မွန်းလွဲပြဿဒါး',
	'Pyathada':'ပြဿဒါး','New Year Day':'New Year\'s Day',
	'Independence Day':'လွတ်လပ်ရေးနေ့','Union Day':'ပြည်ထောင်စုနေ့',
	'Peasants Day':'တောင်သူ လယ်သမားနေ့','Resistance Day':'တော်လှန်ရေးနေ့',
	'Labour Day':'အလုပ်သမားနေ့','Martyrs Day':'အာဇာနည်နေ့',
	'Christmas Day':'ခရစ္စမတ်နေ့','Buddha Day':'ညောင်ရေသွန်းပွဲ',
	'Start of Buddhist Lent':'ဓမ္မစကြာနေ့','End of Buddhist Lent':'မီးထွန်းပွဲ',
	'Tazaungdaing':'တန်ဆောင်တိုင်','National Day':'အမျိုးသားနေ့',
	'Karen New Year Day':'ကရင်နှစ်သစ်ကူး','Tabaung Pwe':'တပေါင်းပွဲ',
	'Thingyan Akyo':'သင်္ကြန်အကြို','Thingyan Akya':'သင်္ကြန်အကျ',
	'Thingyan Akyat':'သင်္ကြန်အကြတ်','Thingyan Atat':'သင်္ကြန်အတက်',
	'Myanmar New Year Day':'နှစ်ဆန်းတစ်ရက်','Amyeittasote':'အမြိတ္တစုတ်',
	'Warameittugyi':'ဝါရမိတ္တုကြီး','Warameittunge':'ဝါရမိတ္တုငယ်',
	'Thamaphyu':'သမားဖြူ','Thamanyo':'သမားညို','Yatpote':'ရက်ပုပ်',
	'Yatyotema':'ရက်ယုတ်မာ','Mahayatkyan':'မဟာရက်ကြမ်း','Nagapor':'နဂါးပေါ်',
	'Shanyat':'ရှမ်းရက်','0': '၀','1': '၁','2': '၂','3': '၃','4': '၄','5': '၅',
	'6': '၆','7': '၇','8': '၈','9': '၉',',':'၊','.':'။',
	'Mon National Day':'မွန် အမျိုးသားနေ့','G. Aung San BD':'ဗိုလ်ချုပ် မွေးနေ့',
	'Valentines Day':'ဗယ်လင်တိုင်းနေ့','Earth Day':'ကမ္ဘာမြေနေ့',
	'April Fools Day':'ဧပြီအရူးနေ့','Red Cross Day':'ကြက်ခြေနီနေ့',
	'United Nations Day':'ကုလသမ္မဂ္ဂနေ့','Halloween':'သရဲနေ့',
	'Shan New Year Day':'ရှမ်းနှစ်သစ်ကူး','Mothers Day':'အမေနေ့',
	'Fathers Day':'အဖေနေ့','Sasana Year':'သာသနာနှစ်',
	'Eid':'အိဒ်','Diwali':'ဒီဝါလီ','Mahathamaya Day':'မဟာသမယနေ့',
	'Garudhamma Day':'ဂရုဓမ္မနေ့','Metta Day':'မေတ္တာနေ့',
	'Taungpyone Pwe':'တောင်ပြုန်းပွဲ','Yadanagu Pwe':'ရတနာ့ဂူပွဲ',
	'Authors Day':'စာဆိုတော်နေ့','World Teachers Day':'ကမ္ဘာ့ဆရာများနေ့',
	'Holiday':'ရုံးပိတ်ရက်','West':'အနောက်','East':'အရှေ့','North':'မြောက်','South':'တောင်'},
//----------------------------------------------------------------------------
//Catalog for  English Language
	{ 'January':'January', 'February':'February', 'March':'March',
	'April':'April', 'May':'May', 'June':'June','July':'July','August':'August',
	'September':'September','October':'October','November':'November',
	'December':'December','First Waso':'First Waso','Tagu':'Tagu',
	'Kason':'Kason','Nayon':'Nayon','Waso':'Waso',	'Wagaung':'Wagaung',
	'Tawthalin':'Tawthalin','Thadingyut':'Thadingyut','Tazaungmon':'Tazaungmon',
	'Nadaw':'Nadaw','Pyatho':'Pyatho','Tabodwe':'Tabodwe','Tabaung':'Tabaung',
	'waxing':'waxing','waning':'waning','full moon':'full moon',
	'new moon':'new moon','Myanmar Year':'Myanmar Year','Ku':' ','Late':'Late ',
	'Second':'Second ','Sunday':'Sunday','Monday':'Monday','Tuesday':'Tuesday',
	'Wednesday':'Wednesday','Thursday':'Thursday','Friday':'Friday',
	'Saturday':'Saturday','Nay':' ','Yat':' ','Sabbath Eve':'Sb Eve',
	'Sabbath':'Sabbath','Yatyaza':'Yatyaza',
	'Afternoon Pyathada':'Afternoon Pyathada','Pyathada':'Pyathada',
	'New Year Day':'New Year\'s Day','Independence Day':'Independence Day',
	'Union Day':'Union Day','Peasants Day':'Peasants Day',
	'Resistance Day':'Resistance Day','Labour Day':'Labour Day',
	'Martyrs Day':'Martyrs\' Day','Christmas Day':'Christmas Day',
	'Buddha Day':'Buddha Day','Start of Buddhist Lent':'Start of Buddhist Lent',
	'End of Buddhist Lent':'End of Buddhist Lent','Tazaungdaing':'Tazaungdaing',
	'National Day':'National Day','Karen New Year Day':'Karen New Year Day',
	'Tabaung Pwe':'Tabaung Pwe','Thingyan Akyo':'Thingyan Akyo',
	'Thingyan Akya':'Thingyan Akya','Thingyan Akyat':'Thingyan Akyat',
	'Thingyan Atat':'Thingyan Atat',
	'Myanmar New Year Day':'Myanmar New Year Day',
	'Amyeittasote':'Amyeittasote','Warameittugyi':'Warameittugyi',
	'Warameittunge':'Warameittunge','Thamaphyu':'Thamaphyu',
	'Thamanyo':'Thamanyo','Yatpote':'Yatpote','Yatyotema':'Yatyotema',
	'Mahayatkyan':'Mahayatkyan','Nagapor':'Nagapor','Shanyat':'Shanyat',
	'0': '0','1': '1','2': '2','3': '3','4': '4','5': '5','6': '6','7': '7',
	'8': '8','9': '9',',':',','.':'.','Mon National Day':'Mon National Day',
	'G. Aung San BD':'G. Aung San BD','Valentines Day':'Valentines Day',
	'Earth Day':'Earth Day','April Fools Day':'April Fools\' Day',
	'Red Cross Day':'Red Cross Day','United Nations Day':'United Nations Day',
	'Halloween':'Halloween','Shan New Year Day':'Shan New Year Day',
	'Mothers Day':'Mothers\' Day','Fathers Day':'Fathers\' Day',
	'Sasana Year':'Sasana Year','Eid':'Eid','Diwali':'Diwali',
	'Mahathamaya Day':'Great Integration','Garudhamma Day':'Garudhamma Day',
	'Metta Day':'Metta Day','Taungpyone Pwe':'Taungpyone Pwe',
	'Yadanagu Pwe':'Yadanagu Pwe','Authors Day':'Authors\' Day',
	'World Teachers Day':'World Teachers\' Day','Holiday':'Holiday','West':'West','East':'East','North':'North','South':'South'},
//----------------------------------------------------------------------------
//Catalog for Zawgyi-One
	{'January':'ဇန္နဝါရီ','February':'ေဖေဖာ္ဝါရီ','March':'မတ္',
	'April':'ဧၿပီ','May':'ေမ','June':'ဇြန္','July':'ဇူလိုင္','August':'ဩဂုတ္',
	'September':'စက္တင္ဘာ','October':'ေအာက္တိုဘာ','November':'နိုဝင္ဘာ',
	'December':'ဒီဇင္ဘာ','First Waso':'ပဝါဆို','Tagu':'တန္ခူး','Kason':'ကဆုန္',
	'Nayon':'နယုန္','Waso':'ဝါဆို','Wagaung':'ဝါေခါင္','Tawthalin':'ေတာ္သလင္း',
	'Thadingyut':'သီတင္းကြ်တ္','Tazaungmon':'တန္ေဆာင္မုန္း','Nadaw':'နတ္ေတာ္',
	'Pyatho':'ျပာသို','Tabodwe':'တပို႔တြဲ','Tabaung':'တေပါင္း','waxing':'လဆန္း',
	'waning':'လဆုတ္','full moon':'လျပည့္','new moon':'လကြယ္',
	'Myanmar Year':'ျမန္မာႏွစ္','Ku':'ခု','Late':'ေႏွာင္း','Second':'ဒု',
	'Sunday':'တနဂၤေႏြ','Monday':'တနလၤာ','Tuesday':'အဂၤါ','Wednesday':'ဗုဒၶဟူး',
	'Thursday':'ၾကာသပေတး','Friday':'ေသာၾကာ','Saturday':'စေန','Nay':'ေန႔',
	'Yat':'ရက္','Sabbath Eve':'အဖိတ္','Sabbath':'ဥပုသ္','Yatyaza':'ရက္ရာဇာ',
	'Afternoon Pyathada':'မြန္းလြဲျပႆဒါး','Pyathada':'ျပႆဒါး',
	'New Year Day':'New Year\'s Day','Independence Day':'လြတ္လပ္ေရးေန႔',
	'Union Day':'ျပည္ေထာင္စုေန႔','Peasants Day':'ေတာင္သူ လယ္သမားေန႔',
	'Resistance Day':'ေတာ္လွန္ေရးေန႔','Labour Day':'အလုပ္သမားေန႔',
	'Martyrs Day':'အာဇာနည္ေန႔','Christmas Day':'ခရစၥမတ္ေန႔',
	'Buddha Day':'ေညာင္ေရ သြန္းပြဲ','Start of Buddhist Lent':'ဓမၼစၾကာေန႔',
	'End of Buddhist Lent':'မီးထြန္းပြဲ','Tazaungdaing':'တန္ေဆာင္တိုင္',
	'National Day':'အမ်ိဳးသားေန႔','Karen New Year Day':'ကရင္ နွစ္သစ္ကူး',
	'Tabaung Pwe':'တေပါင္းပြဲ','Thingyan Akyo':'သၾကၤန္ အႀကိဳ',
	'Thingyan Akya':'သႀကၤန္္ အက်','Thingyan Akyat':'သႀကၤန္္ အၾကတ္',
	'Thingyan Atat':'သႀကၤန္္ အတက္','Myanmar New Year Day':'နွစ္ဆန္း တစ္ရက္',
	'Amyeittasote':'အၿမိတၱစုတ္','Warameittugyi':'ဝါရမိတၱဳႀကီး',
	'Warameittunge':'ဝါရမိတၱဳငယ္','Thamaphyu':'သမားျဖဴ',
	'Thamanyo':'သမားညိဳ','Yatpote':'ရက္ပုပ္','Yatyotema':'ရက္ယုတ္မာ',
	'Mahayatkyan':'မဟာရက္ၾကမ္း','Nagapor':'နဂါးေပၚ','Shanyat':'ရွမ္းရက္',
	'0': '၀','1': '၁','2': '၂','3': '၃','4': '၄','5': '၅','6': '၆','7': '၇',
	'8': '၈','9': '၉',',':'၊','.':'။','Mon National Day':'မြန္အမ်ိဳးသားေန႔',
	'G. Aung San BD':'ဗိုလ္ခ်ဳပ္ ေမြးေန႔','Valentines Day':'ဗယ္လင္တိုင္း',
	'Earth Day':'ကမၻာေျမေန႔','April Fools Day':'ဧၿပီအ႐ူးေန႔',
	'Red Cross Day':'ၾကက္ေျခနီေန႔','United Nations Day':'ကုလသမၼဂၢေန႔',
	'Halloween':'သရဲေန႔','Shan New Year Day':'ရွမ္းနွစ္သစ္ကူး',
	'Mothers Day':'အေမေန႔','Fathers Day':'အေဖေန႔','Sasana Year':'သာသနာႏွစ္',
	'Eid':'အိဒ္','Diwali':'ဒီဝါလီ','Mahathamaya Day':'မဟာသမယေန႔',
	'Garudhamma Day':'ဂ႐ုဓမၼေန႔','Metta Day':'ေမတၱာေန႔',
	'Taungpyone Pwe':'ေတာင္ျပဳန္းပြဲ','Yadanagu Pwe':'ရတနာ့ဂူပြဲ',
	'Authors Day':'စာဆိုေတာ္ေန႔','World Teachers Day':'ကမၻာ့ဆရာမ်ားေန႔',
	'Holiday':'႐ုံးပိတ္ရက္','West':'အေနာက္','East':'အေရွ႕','North':'ေျမာက္','South':'ေတာင္'}
];
function getDaysInMonth(y,m) {
    return m===2 ? y & 3 || !(y % 25) && y & 15 ? 28 : 29 : 30 + (m +(m >> 3) & 1);
}
function getLastDateofMonth(y,m){
	return new Date(y+'-'+m+'-'+getDaysInMonth(y,m));
}

if (Number.prototype.tomm == null)
Number.prototype.tomm = function() {
    var num_arr= this.toString(10).split("").map(function(t){return parseInt(t)});
    var mm_num='';
    num_arr.forEach(function(n) {

		mm_num+=String.fromCharCode(n+4160);
	});
	return mm_num;
}

if (Number.prototype.changeLang == null)
Number.prototype.changeLang = function(ref) {
	if(!ref){
		ref='eng';
	}
	if(ref=='mm' || ref=='zg' || ref=='uni'  ) 
      return this.tomm();
    return this;
}
if (String.prototype.changeLang == null)
String.prototype.changeLang = function(ref) {
	var _li=1;
	if(!ref){
		ref='eng';
	}
	if(ref=='uni'){
		_li=0;
	}
	if(ref=='zg'){
		_li=2;
	}
	
    return Date.prototype._lang[_li][this];
}
if (Number.prototype.pad == null)
Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 1)) {s = "0" + s;}
      return s;
    }

if(Date.prototype.tojd == null )
Date.prototype.tojd=function() {
var y=this.getFullYear();
var m=this.getMonth()+1;
var d=this.getDate();
 return w2j(y,m,d);
}
//to Myanmar date
//output:  (my : year,
//myt :year type [0=regular, 1=little watat, 2=big watat],
//watat : 1=watat, 0=regular,
//bw : big watat [ 1=true, 0=false ],
//myl: year length,
//mm: month,
//mmt: month type [1=hnaung, 0= Oo],
//mml: month length,
//md: month day [1 to 30],
//d: day [1 to 15],
//ms :moon status [0: waxing, 1: full moon, 2: waning, 3: new moon],
//wd: week day [0=sat, 1=sun, ..., 6=fri] )

if(Date.prototype.tomm == null )
Date.prototype.tomm=function () {
	return j2m(this.tojd());
}
if(Date.prototype.astro == null )
Date.prototype.astro=function () {
	var mmd=this.tomm();
	return astro(mmd.mm,mmd.mml,mmd.md,mmd.wd);
}

//thingyan
if(Date.prototype.getThingyan == null )
Date.prototype.getThingyan=function () {
	var mmd=this.tomm();
	return thingyan(this.tojd(),mmd.my,mmd.mmt);
}
//ehol
if(Date.prototype.ehol == null )
Date.prototype.ehol=function () {
	var gy=this.getFullYear();
	var gm=this.getMonth()+1;
	var gd=this.getDate();
	return ehol(gy,gm,gd);
}
//mcd
if(Date.prototype.mcd == null )
Date.prototype.mcd=function () {
	var mmd=this.tomm();
	return mcd(mm.my,mm.mm,mm.md,mm.ms);
}
//ohol
if(Date.prototype.ohol == null )
Date.prototype.ohol=function () {
	return ohol(this.jd());
}
//var _mm_months={0:'First Waso',1:'Tagu',2:'Kason',3:'Nayon',4:'Waso',5:'Wagaung',6:'Tawthalin',7:'Thadingyut',8:'Tazaungmon',9:'Nadaw',10:'Pyatho',11:'Tabodwe',12:'Tabaung'};
if(Date.prototype.mm_getMonthName == null )
Date.prototype.mm_getMonthName=function (ref) {
	var _li=1;
	if(!ref){
		ref='eng';
	}
	if(ref=='uni'){
		_li=0;
	}
	if(ref=='zg'){
		_li=2;
	}
	var _mm_months={0:'First Waso',1:'Tagu',2:'Kason',3:'Nayon',4:'Waso',5:'Wagaung',6:'Tawthalin',7:'Thadingyut',8:'Tazaungmon',9:'Nadaw',10:'Pyatho',11:'Tabodwe',12:'Tabaung'};
	return this._lang[_li][_mm_months[this.tomm().mm]];
}
//moon status [0: waxing, 1: full moon, 2: waning, 3: new moon],

if(Date.prototype.mm_monthStatus == null )
Date.prototype.mm_monthStatus=function (ref) {
	var _li=1;
	if(!ref){
		ref='eng';
	}
	if(ref=='uni'){
		_li=0;
	}
	if(ref=='zg'){
		_li=2;
	}
	var moon_status= {0: 'waxing', 1: 'full moon', 2: 'waning', 3: 'new moon'};
	return this._lang[_li][moon_status[this.tomm().ms]];
}

if(Date.prototype.isWaxing == null )
Date.prototype.isWaxing=function () {
	return (this.tomm().ms==0);
}

if(Date.prototype.isFullMoon == null )
Date.prototype.isFullMoon=function () {
	return (this.tomm().ms==1);
}

if(Date.prototype.isWaning == null )
Date.prototype.isWaning=function () {
	return (this.tomm().ms==2);
}
//new moon
if(Date.prototype.isNewMoon == null )
Date.prototype.isNewMoon=function () {
	return (this.tomm().ms==3);
}
//[0: waxing, 1: full moon, 2: waning, 3: new moon]
if(Date.prototype.getMoonStatus == null )
Date.prototype.getMoonStatus=function () {
	var _ms={0: 'waxing', 1: 'full moon', 2: 'waning', 3: 'new moon'};
	return _ms[this.tomm().ms];
}
//1182
if(Date.prototype.getSasanaYear == null )
Date.prototype.getSasanaYear=function () {
	return (this.tomm().my+1182);
}

if(Date.prototype.mmFormat == null )
Date.prototype.mmFormat=function (format,ref) {
	var date = this.tomm();
    if (!format)
      format="d/m/Y";
  	if(!ref)
  		ref='eng';
  	var _mmd='';
  	var _wd=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
  	for (var x = 0; x < format.length; x++)
	{
	    var c = format.charAt(x);
	    switch(c){
	    	case 'd': _mmd+=date.md.changeLang(ref); break;
	    	case 'D': _mmd+=_wd[date.wd].changeLang(ref); break;
	    	case 'm': _mmd+=date.mm.changeLang(ref); break;
	    	case 'k': _mmd+=('Ku').changeLang(ref); break;
	    	case 'x': _mmd+=('Yat').changeLang(ref); break;
	    	case 'n': _mmd+=('Nay').changeLang(ref); break;
	    	case 'M': _mmd+=this.mm_getMonthName(ref); break;
	    	case 'z': _mmd+=this.mm_monthStatus(ref); break;
	    	case 'Y': _mmd+=date.my.changeLang(ref); break;
	    	case 'y': _mmd+=date.my.changeLang(ref); break;
	    	case 'y': _mmd+=date.my.changeLang(ref); break;
	    	case 't': _mmd+=this.getSasanaYear().changeLang(ref); break;
	    	case 'T': _mmd+=this.getSasanaYear().changeLang(ref); break;
	    	default: _mmd += c;
	    }
	}
  return _mmd;
}

if(Date.prototype.nagahle == null )
Date.prototype.nagahle=function (ref) {
    var _l=["West", "North", "East", "South"];
  	
  return _l[this.astro().nagahle].changeLang(ref);
}

 });

