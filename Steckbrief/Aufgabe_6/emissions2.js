var continentAfrica = "Afrika";
var continentSouthamerica = "Südamerika";
var continentEurope = "Europa";
var continentNorthamerica = "Nordamerika";
var continentAsia = "Asien";
var continentAustralia = "Australien";
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
//  World gesammt 
var world2018 = africa2018 + southamerica2018 + europe2018 + northamerica2018 + asia2018 + australia2018;
window.addEventListener('load', function () {
    document.querySelector('.europe').addEventListener('click', function () { emissions(continentEurope, europe2018, europe2008); });
    document.querySelector('.northamerica').addEventListener('click', function () { emissions(continentNorthamerica, northamerica2018, northamerica2008); });
    document.querySelector('.southamerica').addEventListener('click', function () { emissions(continentSouthamerica, southamerica2018, southamerica2008); });
    document.querySelector('.africa').addEventListener('click', function () { emissions(continentAfrica, africa2018, africa2008); });
    document.querySelector('.asia').addEventListener('click', function () { emissions(continentAsia, asia2018, asia2008); });
    document.querySelector('.australia').addEventListener('click', function () { emissions(continentAustralia, australia2018, australia2008); });
    function emissions(continent, continent2018, continent2008) {
        document.querySelector("#Region").innerHTML = continent;
        document.querySelector("#RegionUnten").innerHTML = continent;
        document.querySelector("#Continent2018").innerHTML = continent2018.toString();
        document.querySelector("#RelativZuWelt").innerHTML = Math.round(continent2018 / world2018 * 100 * 100) / 100 + "%";
        document.querySelector("#Wachstumsrate").innerHTML = Math.round((continent2018 - continent2008) / continent2008 * 100 * 100) / 100 + "%";
        document.querySelector("#WachstumsrateAbs").innerHTML = (Math.round((continent2018 - continent2008) * 100) / 100).toString();
        document.querySelector(".chart").setAttribute("style", "height:" + (continent2018 / world2018) * 100 + "%");
    }
});
//# sourceMappingURL=emissions2.js.map