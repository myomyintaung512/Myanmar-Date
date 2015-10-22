//Version: 201505202200
//File: mc.js
//Description: Core functions for Myanmar Calendrical Calculations
//-------------------------------------------------------------------------
//Author: Yan Naing Aye 
//WebSite: http://cool-emerald.blogspot.sg/2013/06/algorithm-program-and-calculation-of.html
//License: Myanmar Calendrical Calculations by Yan Naing Aye is licensed
//         under a Creative Commons Attribution 3.0 Unported License.
//         http://creativecommons.org/licenses/by/3.0/
//  You are free:
//    to Share — to copy, distribute and transmit the work
//    to Remix — to adapt the work
//    to make commercial use of the work
//  Under the following conditions:
//    Attribution — You must attribute Myanmar Calendrical Calculations
//		to Yan Naing Aye (with link).

//Start of kernel #############################################################

//Exceptions for well known years
var fm1=[[1120,1],[1126,-1],[1150,1],[1172,-1],[1207,1],[1234,1],[1261,-1],
	[1377,1]];
var wt1=[ [1201,1],[1202,0],[1263,1],[1264,0],[1344,1],[1345,0]];
//-------------------------------------------------------------------------
//Exceptions for the earlier years (more than 300 years old),
//we can choose different referred sources
var fmTNT=[[205,1],[246,1],[813,-1],[854,-1],[1039,-1]];
var fmCE=[[205,1],[246,1],[572,-1],[651,1],[653,2],[656,1],[672,1],[729,1],
	  [767,-1],[813,-1],[849,-1],[851,-1],[854,-1],[1039,-1]];
//-------------------------------------------------------------------------
//Check watat (intercalary month) 
//input: (my -myanmar year, rf - referred source)
//output:  ( watat : intercalary month, [1=watat, 0=regular]
//fm : full moon day of 2nd Waso in jdn )
function chk_watat(my,rf) { rf=rf||0;
	var SY=1577917828/4320000; //solar year (365.2587565)
	var LM=1577917828/53433336; //lunar month (29.53058795)
	var MO=1954168.050623; //beginning of 0 ME
	// [<1100 ME - 1st era early], [<1217 ME - 1st era late],
	//[<1312 ME - 2nd era],[>=1312 ME - 3rd era]
	var ei=my<1100?0:my<1217?1:my<1312?2:3;
	var NMA=[-1,-1,4,8];
	var NM=NMA[ei]; //number of months to find excess days depending on era
	var WOA=[-1.1,-0.85,-1,-0.5];
	var WO=WOA[ei]; //offset to adjust full moon day depending on era
	
	var TA=(SY/12-LM)*(12-NM); //threshold to adjust
	var ed=(SY*(my+3739))%LM; // excess day
	if(ed<TA) ed+=LM;//adjust excess days
	var fm=Math.round(SY*my+MO-ed+4.5*LM+WO);//full moon day of second Waso 
	
	var TW=0,watat=0;//find watat 
	if (ei>=2) {//if 2nd era or later
		TW=LM-(SY/12-LM)*NM;
		if(ed>=TW) watat=1;//find watat based on excess days
	} 
	else {//if 1st era,find watat by 19 years metonic cycle
//Myanmar year is divided by 19 and there is intercalary month
//if the remainder is 2,5,7,10,13,15,18
//Eqn for checking watat for 19 years cycle is inspired by an eqn @
//https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
		watat=(my*7+2)%19; if (watat<0) watat+=19;
		watat=Math.floor(watat/12);
	}  
	//adjust for exceptions for well known years
	var i=bSearch(my,fm1); if(i>=0) fm+=fm1[i][1];
	i=bSearch(my,wt1); if (i>=0) watat=wt1[i][1];
	if (ei==0){ //for the first era earlier years, use referred sources
	//to adjust for exceptions 
		if (rf==1) {// Tin Naing Toe & Dr. Than Tun
			i=bSearch(my,fmTNT); if(i>=0) fm+=fmTNT[i][1];
		} 
		else {// Cool Emerald- Based on various evidence
		//such as inscriptions, books, etc...
			i=bSearch(my,fmCE); if(i>=0) fm+=fmCE[i][1];
		}			
	} 
	return {fm:fm,watat:watat};
}
//-------------------------------------------------------------------------
//Check Myanmar Year 
//input: (my -myanmar year, rf - referred source)
//output:  (myt :year type [0=regular, 1=little watat, 2=big watat],
//watat : [1=watat, 0=regular],
//bw : big watat [1=true, 0=false]
//tg1 : the 1st day of Tagu
//fm : full moon day of [2nd] Waso)
function chk_my(my,rf) { rf=rf||0; 
	var yd=0,y1,bw=0,nd=0,werr=0,fm=0;
	var y2=chk_watat(my,rf);
	var watat=y2.watat;  var myt=watat;
	do{ yd++; y1=chk_watat(my-yd,rf);}while(y1.watat==0 && yd<3);
	if(watat) { nd=(y2.fm-y1.fm)%354; bw=Math.floor(nd/31); myt=bw+1;
		fm=y2.fm; if(nd!=30 && nd!=31) werr=1; }
	else fm=y1.fm+354*yd;
	var tg1=y1.fm+354*yd-102;	
	return {myt:myt,watat:watat,bw:bw,tg1:tg1,werr:werr,nd:nd,fm:fm};
}
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

//Julian date to Myanmar date
//input: (jd -julian date, rf - referred source)
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
function j2m(jd,rf) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var jdn,my,yo,dd,myl,mmt,t,s,c,mm,md,mml,ms,d,wd;
	rf=rf||0; jdn=Math.round(jd);//convert jd to jdn
	my=Math.floor((jdn-0.5-MO)/SY);//Myanmar year
	yo=chk_my(my,rf);//check year
	dd=jdn-yo.tg1+1;//day count
	myl=354+yo.watat*30+yo.bw;//year length
	mmt=Math.floor((dd-1)/myl);//month type: Hnaung =1 or Oo = 0
	dd-=mmt*myl;//adjust day count
	t=Math.floor(myl/(dd+266));
	s=29.5+t*yo.bw/5; c=117+t*yo.bw*14/5;//get rate and offset
	dd+=t*266-(1-t)*(myl-266);//modify day count
	mm=Math.floor((dd+c)/s);//month
	md=dd-Math.floor(s*mm-c-0.1);//day
	mm=(mm%16); mm-=12*Math.floor(mm/13); //correct month number
	mml=30-mm%2;//month length
	if(mm==3) mml+=yo.bw;//adjust if Nayon in big watat
	ms=Math.floor((md+1)/16)+Math.floor(md/16)+Math.floor(md/mml);
	d=md-15*Math.floor(md/16);//waxing or waning day
	wd=(jdn+2)%7;//week day
	return {my:my,myt:yo.myt,watat:yo.watat,bw:yo.bw,myl:myl,
	mm:mm,mmt:mmt,mml:mml,md:md,ms:ms,d:d,wd:wd};
}
//-------------------------------------------------------------------------
//Myanmar date to Julian date
//input:  (my : year,
//mm: month,
//mmt: month type, 1=hnaung, 0= Oo,
//ms :moon status, 0: waxing, 1: full moon, 2: waning, 3: new moon,
//d: day =1 to 15, rf - referred source)
//output: (jd -julian date)
function m2j(my,mm,mmt,ms,d,rf) {
	rf=rf||0; yo=chk_my(my);//check year
	mml=30-mm%2;//month length
	if (mm==3) mml+=yo.bw;//adjust if Nayon in big watat
	m1=ms%2; m2=Math.floor(ms/2); md=m1*(15+m2*(mml-15))+(1-m1)*(d+15*m2);
	mm+=4 *Math.floor((16-mm)/16)+12*Math.floor((15-mm)/12);
	t=Math.floor(mm/13); s=29.5+t*yo.bw/5; c=117+t*yo.bw*14/5;
	dd=md +Math.floor(s*mm-c-0.1);
	myl=354+yo.watat*30+yo.bw;//year length
	dd+=(1-t)*(myl-266)-266* t;
	dd+=mmt*myl;//adjust day count
	return dd+yo.tg1-1;
}
//-------------------------------------------------------------------------
//Julian date to Western date
//Credit4 Gregorian date:http://pmyers.pcug.org.au/General/JulianDates.htm
//Credit4 Julian Calendar:http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
//input: (jd:julian date, ct:calendar type [0: english, 1: Gregorian, 2: Julian]
//SG: Beginning of Gregorian calendar JDN)
//output: Gregorian date (y=year, m=month, d=day, h=hour, n=minute, s=second)
function j2w(jd,ct,SG) {
	ct=ct||0; SG=SG||2361222;//Gregorian start in English calendar (1752/Sep/14)
	var j,jf,y,m,d,h,n,s;
	if (ct==2 || (ct==0 && (jd<SG))) {
		var b,c,f,e;
		j=Math.floor(jd+0.5); jf=jd+0.5-j;
		b=j+1524; c=Math.floor((b-122.1)/365.25); f=Math.floor(365.25*c);
		e=Math.floor((b-f)/30.6001); m=(e>13)?(e-13):(e-1);
		d=b-f-Math.floor(30.6001*e); y=m<3?(c-4715):(c-4716);
	}
	else{
		j=Math.floor(jd+0.5); jf=jd+0.5-j; j-=1721119;
		y=Math.floor((4*j-1)/146097); j=4*j-1-146097*y; d=Math.floor(j/4);
		j=Math.floor((4*d+3)/1461); d=4*d+3-1461*j;
		d=Math.floor((d+4)/4); m=Math.floor((5*d-3)/153); d=5*d-3-153*m;
		d=Math.floor((d+5)/5); y=100*y+j;
		if(m<10) {m+=3;}
		else {m-=9; y=y+1;}		
	}
	jf*=24; h=Math.floor(jf); jf=(jf-h)*60; n=Math.floor(jf); s=(jf-n)*60;
	return {y:y,m:m,d:d,h:h,n:n,s:s};
}
//-------------------------------------------------------------------------
//Western date to Julian day number
//Credit4 Gregorian 2 JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
//input: (y: year, m: month, d: day,
//ct: calendar type [0: english, 1: Gregorian, 2: Julian],
//SG: Beginning of Gregorian calendar JDN {jdn,nd})
//output: Julian day number
function w2j(y,m,d,ct,SG) {
	ct=ct||0; SG=SG||2361222;//Gregorian start in English calendar (1752/Sep/14)
	var a=Math.floor((14-m)/12); y=y+4800-a; m=m+(12*a)-3;
	var jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4);
	if (ct==1) jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
	else if (ct==2) jd=jd-32083;
	else {
		jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
		if(jd<SG) {
			jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4)-32083;
			if(jd>SG) jd=SG;
		}
	}
	return jd;
}
//-------------------------------------------------------------------------
//Time to Fraction of day starting from 12 noon
//input: (h=hour, n=minute, s=second) output: (d: fraction of day)
function t2d(h,n,s) { return ((h-12)/24+n/1440+s/86400);}
//-------------------------------------------------------------------------
//Checking Astrological days
//input: (mm=month, mml= length of month,md= day of month [0-30], wd= weekday)
//output: (sabbath, sabbatheve,yatyaza,pyathada,thamanyo,amyeittasote,
//	warameittugyi,warameittunge,yatpote,thamaphyu,nagapor,yatyotema,
//	mahayatkyan,shanyat,nagahle [0: west, 1: north, 2: east, 3: south])
function astro(mm,mml,md,wd) {
	var d,sabbath,sabbatheve,yatyaza,pyathada,thamanyo,amyeittasote;
	var warameittugyi,warameittunge,yatpote,thamaphyu,nagapor,yatyotema;
	var mahayatkyan,shanyat,nagahle,m1,wd1,wd2,wda,sya;
	if (mm<=0) mm=4;//first waso is considered waso
	d=md-15*Math.floor(md/16);//waxing or waning day [0-15]
	sabbath=0; if((md==8)||(md==15)||(md==23)||(md==mml)) sabbath=1;
	sabbatheve=0;if((md==7)||(md==14)||(md==22)||(md==(mml-1))) sabbatheve=1;
	yatyaza=0; m1=mm%4; wd1=Math.floor(m1/2)+4;
	wd2=((1-Math.floor(m1/2))+m1%2)*(1+2*(m1%2)); 
	if((wd==wd1)||(wd==wd2)) yatyaza=1;
	pyathada=0; wda=[1,3,3,0,2,1,2]; if(m1==wda[wd]) pyathada=1;
	if((m1==0)&&(wd==4)) pyathada=2;//afternoon pyathada
	thamanyo=0; m1=mm-1-Math.floor(mm/9); wd1=(m1*2-Math.floor(m1/8))%7;
	wd2=(wd+7-wd1)%7; if(wd2<=1) thamanyo=1;
	amyeittasote=0; wda=[5,8,3,7,2,4,1]; if(d==wda[wd]) amyeittasote=1;
	warameittugyi=0; wda=[7,1,4,8,9,6,3]; if(d==wda[wd]) warameittugyi=1;
	warameittunge=0; wn=(wd+6)%7; if((12-d)==wn) warameittunge=1;
	yatpote=0; wda=[8,1,4,6,9,8,7]; if(d==wda[wd]) yatpote=1; 
	thamaphyu=0; wda=[1,2,6,6,5,6,7];  if(d==wda[wd]) thamaphyu=1;
	wda=[0,1,0,0,0,3,3]; if(d==wda[wd]) thamaphyu=1;
	if((d==4) && (wd==5)) thamaphyu=1;
	nagapor=0; wda=[26,21,2,10,18,2,21];  if(md==wda[wd]) nagapor=1;
	wda=[17,19,1,0,9,0,0]; if(md==wda[wd]) nagapor=1;
	if(((md==2)&&(wd==1))||(((md==12)||(md==4)||(md==18))&&(wd==2)))nagapor=1;
	yatyotema=0; m1=(mm%2)?mm:((mm+9)%12); m1=(m1+4)%12+1; if(d==m1)yatyotema=1;
	mahayatkyan=0; m1=(Math.floor((mm%12)/2)+4)%6+1; if(d==m1) mahayatkyan=1;
	shanyat=0; sya=[8,8,2,2,9,3,3,5,1,4,7,4]; if(d==sya[mm-1]) shanyat=1;
	nagahle=Math.floor((mm%12)/3);
	
	return {sabbath:sabbath,sabbatheve:sabbatheve,yatyaza:yatyaza,
	pyathada:pyathada,thamanyo:thamanyo,amyeittasote:amyeittasote,
	warameittugyi:warameittugyi,warameittunge:warameittunge,
	yatpote:yatpote,thamaphyu:thamaphyu,nagapor:nagapor,
	yatyotema:yatyotema,mahayatkyan:mahayatkyan,shanyat:shanyat,
	nagahle:nagahle};
}
//----------------------------------------------------------------------------
//find the length of a month
//input: (y=year, m=month [Jan=1, ... , Dec=12],
//t: calender type [0-English, 1-Gregorian, 2-Julian])
//output: (l = length of the month)
function emLen(y,m,t) {
	var leap=0; var mLen=30+(m+Math.floor(m/8))%2;//length of the current month
    if(m==2) { //if  february
		if(t==1 || (t==0 && y>1752)) {
			if((y%4==0 && y%100!=0) || y%400==0) leap=1;
		}
		else if(y%4==0) leap=1;
		mLen+=leap-2; 
	} 
	if (y==1752 && m==9 && t==0) mLen=19;
	return mLen;
}
//End of kernel ###############################################################

//Start of checking holidays ##################################################

//input: (jdn, my: myanmar year, mmt: myanmar month type [oo: 0, hnaung: 1])
//output: (h=flag [true: 1, false: 0], hs=string)
function thingyan(jdn,my,mmt) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var BGNTG=1100;//start of Thingyan
	var h=0; var hs=""; var atat, akn, atn; var SE3=1312; //start of third era
	ja=SY*(my+mmt)+MO;
	if (my >= SE3) jk=ja-2.169918982;
	else jk=ja-2.1675;
	akn=Math.round(jk); atn=Math.round(ja);
	if(jdn==(atn+1)) {h=1; hs="Myanmar New Year Day";}
	if ((my+mmt)>=BGNTG) {
		if(jdn==atn) {h=1; hs="Thingyan Atat";}
		else if((jdn>akn)&&(jdn<atn)) {h=1; hs="Thingyan Akyat";}
		else if(jdn==akn) {h=1; hs="Thingyan Akya";}
		else if(jdn==(akn-1)) {h=1; hs="Thingyan Akyo";}
		else if(((my+mmt)>=1362)&&((jdn==(akn-2))||
			((jdn>=(atn+2))&&(jdn<=(akn+7))))) {h=1; hs="Holiday";}
	}
	return {h:h,hs:hs};
}
//----------------------------------------------------------------------------
//input: (gy=year, gm=month [Jan=1, ... , Dec=12], gd: day [0-31])
//output: (h=flag [true: 1, false: 0], hs=string)
function ehol(gy,gm,gd) {
	var h=0; var hs="";
	if((gm==1) && (gd==1)) {h=1; hs="New Year Day";}
	else if((gy>=1948) && (gm==1) && (gd==4)) {h=1; hs="Independence Day";}
	else if((gy>=1947) && (gm==2) && (gd==12)) {h=1; hs="Union Day";}
	else if((gy>=1958) && (gm==3) && (gd==2)) {h=1; hs="Peasants Day";}
	else if((gy>=1945) && (gm==3) && (gd==27)) {h=1; hs="Resistance Day";}
	else if((gy>=1923) && (gm==5) && (gd==1)) {h=1; hs="Labour Day";}
	else if((gy>=1947) && (gm==7) && (gd==19)) {h=1; hs="Martyrs Day";} 
	else if((gm==12) && (gd==25)) {h=1; hs="Christmas Day";}
	return {h:h,hs:hs};
}
//----------------------------------------------------------------------------
//input: (my=year, mm=month [Tagu=1, ... , Tabaung=12], md: day [0-30],
// ms: moon status)
//output: (h=flag [true: 1, false: 0], hs=string)
function mhol(my,mm,md,ms) {
	var h=0; var hs="";
	if((mm==2) && (ms==1)) {h=1; hs="Buddha Day";}//Vesak day
	else if((mm==4)&& (ms==1)) {h=1; hs="Start of Buddhist Lent";}//Warso day
	else if((mm==7) && (ms==1)) {h=1; hs="End of Buddhist Lent";}
	else if((mm==8) && (ms==1)) {h=1; hs="Tazaungdaing";}
	else if((my>=1282) && (mm==8) && (md==25)) {h=1; hs="National Day";}
	else if((mm==10) && (md==1)) {h=1; hs="Karen New Year Day";}
	else if((mm==12) && (ms==1)) {h=1; hs="Tabaung Pwe";}
	return {h:h,hs:hs};
}
//----------------------------------------------------------------------------
//input: (gy=year, gm=month [Jan=1, ... , Dec=12], gd: day [0-31])
//output: (h=flag [true: 1, false: 0], hs=string)
function ecd(gy,gm,gd) {
	var h=0; var hs="";
	if((gy>=1915) && (gm==2) && (gd==13)) {h=1; hs="G. Aung San BD";}
	else if((gy>=1969) && (gm==2) && (gd==14)) {h=1; hs="Valentines Day";}
	else if((gy>=1970) && (gm==4) && (gd==22)) {h=1; hs="Earth Day";}
	else if((gy>=1392) && (gm==4) && (gd==1)) {h=1; hs="April Fools Day";}
	else if((gy>=1948) && (gm==5) && (gd==8)) {h=1; hs="Red Cross Day";}
	else if((gy>=1994) && (gm==10) && (gd==5)) {h=1; hs="World Teachers Day";}
	else if((gy>=1947) && (gm==10) && (gd==24)) {h=1; hs="United Nations Day";}
	else if((gm==10) && (gd==31)) {h=1; hs="Halloween";}
	return {h:h,hs:hs};
}
//----------------------------------------------------------------------------
//input: (my=year, mm=month [Tagu=1, ... , Tabaung=12], md: day [0-30],
// ms: moon status, ln: language code)
//output: (h=number of days, hs=array of string)
function mcd(my,mm,md,ms) {
	var h=0; var hs=["","",""];
	if((my>=1309) && (mm==11) && (md==16))
		{h=1; hs[0]="Mon National Day";}//the ancient founding of Hanthawady
	else if((mm==9) && (md==1)) {h=1; hs[0]="Shan New Year Day";
		if(my>=1306) {h=2; hs[1]="Authors Day";}
	}//Nadaw waxing moon 1
	else if((mm==3) && (ms==1)) {h=1; hs[0]="Mahathamaya Day";}//Nayon full moon
	else if((mm==6)&&(ms==1)){h=1; hs[0]="Garudhamma Day";}//Tawthalin full moon
	else if((my>=1356) && (mm==10) && (ms==1))
		{h=1; hs[0]="Mothers Day";}//Pyatho full moon
	else if((my>=1370) && (mm==12) && (ms==1))
		{h=1; hs[0]="Fathers Day";}//Tabaung full moon
	else if((mm==5) && (ms==1)) {h=1; hs[0]="Metta Day"; 
		//if(my>=1324)  {h=2; hs[1]="Mon Revolution Day";}//Mon Revolution day
	}//Waguang full moon
	else if((mm==5) && (md==10)) {h=1; hs[0]="Taungpyone Pwe";}//Taung Pyone Pwe
	else if((mm==5) && (md==23)) {h=1; hs[0]="Yadanagu Pwe";}//Yadanagu Pwe
//else if((my>=1119) && (mm==2) && (md==23)) {h=1; hs[0]="Mon Fallen Day";}
//else if((mm==12) && (md==12)) {h=1; hs[0]="Mon Women Day";}
	return {h:h,hs:hs};
}
//----------------------------------------------------------------------------
//other holidays
//input: (jd: Julian day number)
//output: (h=flag [true: 1, false: 0], hs=string)
var ghDiwali=[2456599,2456953,2457337];
var ghEid=[2456513,2456867,2457221];
function ohol(jd) {
	var h=0; var hs="";
	if(bSearch1(jd,ghDiwali)>=0) {h=1; hs="Diwali";}
	if(bSearch1(jd,ghEid)>=0) {h=1; hs="Eid";}
	return {h:h,hs:hs};
}
//End of checking holidays ####################################################

//Search first dimension in a 2D array
//input: (k=key,A=array)
//output: (i= index)
function bSearch(k,A) {
	var i=0; var l=0; var u=A.length-1;
	while(u>=l) {
		i=Math.floor((l+u)/2);
		if (A[i][0]>k)  u=i-1;
		else if (A[i][0]<k) l=i+1;
		else return i;
	} return -1;
}
//-----------------------------------------------------------------------------
//Search a 1D array
//input: (k=key,A=array)
//output: (i= index)
function bSearch1(k,A) {
	var i=0; var l=0; var u=A.length-1;
	while(u>=l) {
		i=Math.floor((l+u)/2);
		if (A[i]>k)  u=i-1;
		else if (A[i]<k) l=i+1;
		else return i;
	} return -1;
}