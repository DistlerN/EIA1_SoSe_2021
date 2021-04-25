
var africa2008 = 1028; //africa 
var africa2018 = 1235.5;
var southamerica2008 = 1132.6; // S- America 
var southamerica2018 = 1261.5;
var europe2008 = 4965.7; //Europe
var europe2018 = 4209.3;
var northamerica2008 = 6600.4; //N- America
var northamerica2018 = 6035.6;
var asia2008 = 12954.7; //Asia
var asia2018 = 16274.1;
var australia2008 = 1993; //Australia
var australia2018 = 2100.5;
// 1 World gesammt 
var world2018 = africa2018 + southamerica2018 + europe2018 + northamerica2018 + asia2018 + australia2018;
//Africa Calculated
console.log(" Die Emissionen von Afrika 2018 ist" + africa2018 + "kg CO2:");
console.log("Afrikas Emissionen im Vergleich zur Welt:" + africa2018 / world2018 * 100 + "%"); 
console.log(((africa2018 / africa2008) - 1) *100); 
console.log("Im vergeleich zu 2008 produziert Afrika nun:" + (africa2018 - africa2008)); 
//Southamerica Calculated
console.log(" Die Emissionen von Südamerika 2018 ist" + southamerica2018 + "kg CO2:");
console.log("Südamerika Emissionen im Vergleich zur Welt:" + southamerica2018/world2018 * 100 + "%"); 
console.log("Südamerikas Emmissionsvergleich zu 2008 in %:" +  (southamerica2018 - southamerica2008) / southamerica2018* 100 + "%");; 
console.log("Im vergeleich zu 2008 produziert Südamerika nun:" + (southamerica2018 - southamerica2008)); 
//Europe calculated 
console.log(" Die Emissionen von Europa 2018 ist" + europe2018+ "kg CO2:");
console.log("Europas Emissionen im Vergleich zur Welt:" + europe2018/europe2008 * 100 + "%"); 
console.log("Europas Emmissionsvergleich zu 2008 in %:" +  (europe2018 - europe2008) / europe2018* 100 + "%");; 
console.log("Im vergeleich zu 2008 produziert Europa nun:" + (europe2018 - europe2008)); 
// Northamerica calculated
console.log(" Die Emissionen von Nordamerika 2018 ist" + northamerica2018 + "kg CO2:");
console.log("Nordamerikas Emissionen im Vergleich zur Welt:" + northamerica2018/world2018 * 100 + "%"); 
console.log("Nordamerikas Emmissionsvergleich zu 2008 in %:" +  (northamerica2018- northamerica2008) / northamerica2018* 100 + "%");; 
console.log("Im vergeleich zu 2008 produziert Nordamerika nun:" + (northamerica2018 - northamerica2008)); 
// Asia Calculated
console.log(" Die Emissionen von Asien 2018 ist" + asia2018 + "kg CO2:");
console.log("Asiens Emissionen im Vergleich zur Welt:" + asia2018/world2018 * 100 + "%"); 
console.log("Asiens Emmissionsvergleich zu 2008 in %:" +  (asia2018 - asia2008) / asia2018* 100 + "%");; 
console.log("Im vergeleich zu 2008 produziert Asien nun:" + (asia2018 - asia2008)); 
//Australia Calculated
console.log(" Die Emissionen von Australien 2018 ist" + australia2018+ "kg CO2:");
console.log("Australiens Emissionen im Vergleich zur Welt:" + australia2018/world2018 * 100 + "%"); 
console.log("Australiens Emmissionsvergleich zu 2008 in %:" +  (australia2018 - australia2008) / australia2018* 100 + "%");; 
console.log("Im vergeleich zu 2008 produziert Australien nun:" + (australia2018 - australia2008)); 