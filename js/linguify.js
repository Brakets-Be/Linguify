/*

Linguify a web javascript library for client side string localization

Copyright (C) 2019 Brakets SRL

Author : Amr El Aswar

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/> 

*/

function Linguify(){
    var loadedCallbacks = [];
    var loadedAllText = false;
    var lang_location_path = "";
    var default_lang = "en";
    var loadedData = {};
    
    /**
        Initialize the library and load the strings.
        setup example : { "json_lang_location": "/data/languages", "default_lang": "en" }
    */
    this.init = function(setup){
        
        lang_location_path = setup.json_lang_location;
        if (setup.default_lang){
            default_lang = setup.default_lang;
        }
        
        loadLanguage();
    }
    
    function loadLanguage(lang){
        var defaultLanguage = getLanguage();
        if (lang){
            defaultLanguage = lang;
        }
        
        linguifyAjax( lang_location_path+"/strings_"+defaultLanguage+".json", function( data ) {
            loadedData = data;
            var elementsToChangeWithAttr = document.querySelectorAll('[linguify-id]');
            var index = 0;
            for (index = 0; index< elementsToChangeWithAttr.length; index++){
                var element = elementsToChangeWithAttr[index];
                var key = element.getAttribute("linguify-id");
                var value = data[key];
                
                if (element.hasAttribute("linguify-value")){
                    element.value = value;
                }
                else if (element.hasAttribute("linguify-placeholder")){
                    element.placeholder = value;
                }
                else {
                    element.innerHTML = value;
                }
                
                
                
                if (index == elementsToChangeWithAttr.length - 1){
                    loadedAllText = true;
                    var i = 0;
                    for (i = 0; i< loadedCallbacks.length; i++){
                        loadedCallbacks[i]();
                    }
                }
                
            }
            
            
        });
    }
    
    /*
        Get the string value for the given id.
        @param linguifyId = Id of a string from the strings_xx.json file.
        @param list of strings to format in the returned string. Will replace all '%s' values with the ones in this argument by order. 
        @return = Returns the value of the string from the currently set language
    */
    this.getStringById = function(linguifyId){
        return loadedData[linguifyId];
    }
    
    /*
        Add a callback function to be exectuted once all the strings are localized. This is useful because loading strings can sometimes take a few seconds. Make sure to add any callbacks before intializing the the Linguify object in order to catch the first string loading.
    */
    this.addFinishCallback = function(callback){
        loadedCallbacks.push(callback);
    }
    
    /*
        Check if all the strings have been loaded.
        @return boolean value
    */
    this.isFinishedLoading = function(){
        return loadedAllText;
    }
    
    function getLanguage(){
        var lang = readCookie('linguify_lang');
        if (lang == null){
            lang = default_lang;
        }
        
        return lang;
    }
    
    /*
        Set the current language and localize the strings if available in your strings_xx.json files.
        @param lang = a language code used in your strings directory for example setLanguage('en') will load strings from strings_en.json
    */
    this.setLanguage = function(lang){
        createCookie('linguify_lang', lang);
        loadLanguage(lang);
    }
    
    
}


function linguifyAjax(url, success){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            success(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}