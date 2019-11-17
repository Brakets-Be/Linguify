function Linguify(){
    var loadedCallbacks = [];
    var loadedAllText = false;
    var lang_location_path = "";
    var default_lang = "en";
    
    /**
    setup example { "json_lang_location": "/data/languages", "default_lang": "en" }
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
        
        
        $.get( lang_location_path+"/strings_"+defaultLanguage+".json", function( data ) {
            
            //load text element attributes
            var elementsToChangeWithAttr = $("[linguify-id]");
            elementsToChangeWithAttr.each(function(index, element){
                var key = $(element).attr("linguify-id");
                $(element).html(data[key]);
                
                if (index == elementsToChangeWithAttr.length - 1){
                    loadedAllText = true;
                    var i = 0;
                    for (i = 0; i< elementsToChangeWithAttr.length; i++){
                        loadedCallbacks[i]();
                    }
                }
            });
            
            
            
            
            
        });
    }
    
    this.addFinishCallback = function(callback){
        loadedCallbacks.push(callback);
    }
    
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
    
    this.setLanguage = function(lang){
        createCookie('linguify_lang', lang);
        loadLanguage(lang);
    }
    
    
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