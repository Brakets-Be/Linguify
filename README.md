# Linguify
Linguify a web javascript library for client side string localization

Linguify is a small JS library developed by Brakets SRL Belgium that allows developers to manage website languages on the client side. 
This allows users to change the language without having to refresh the page but also allows for easier language managment for landing
pages without needing multiple html files for language managment or a backend to handle multi-language strings.


## How to use

Add the js library at the end of your html file.
```
<script src="/js/linguify.js"></script>
```

Add your string files for each language to your project. Each file should consist of a json object containing a unique key and value for each
string that will be used in your html. String files should follow this naming format : "strings_en.json" where "en" can be replaced by the two
letter language code for each supported language. The folder name containing the strings is custom and can be passed on as a parameter when initializing
the library.

```
project
       /strings/strings_en.json
       /strings/strings_fr.json
       index.html
```


We add the string we want to use inmultiple langages in our string files for each language but using the same key. That way we can use 
a single key in our html for multiple languages.
**strings_en.json**
```
{
  "hello_world": "Hello World !"
}
```

**strings_fr.json**
```
{
  "hello_world": "Bonjour le monde !"
}


```

Add your string keys to the html elements where you wish to use a string then initialize the library at the end of your html file.
```
<html>
  <body>
    <p linguify-id="hello_world"></p>
    
    <script src="/js/linguify.js"></script>
    <script>
        var linguify = new Linguify();
        linguify.addFinishCallback(function(){
          //do something when the library finishes loading strings into the elements
        });
        linguify.init({ "json_lang_location": "/strings", "default_lang": "en" });
    </script>
  </body>
</html>
```

To set a specific language on a button click or anytime 
```
linguify.setLanguage('en');
```
where 'en' can be replaced by any two letter language code used in your strings folder. Calling this function will load the strings
in the corresponding language without refreshing the page.

The library will also generate a cookie to remember the users language choice next time he visits your website.

**A full example is available in the repository**


## Localizing input values and placeholders 

To localize inpu values or placeholders simpy add the corresponding attribute in order to set the placeholder or value of the input instead
of adding the string to the innerHtml.
```
    <!--set the string value to the value of the input, by adding the linguify-value you tel Linguify to set the value as the value of the input-->
    <input linguify-id="hello_world" linguify-value>

    <!--set the string value to the placeholder, by adding the linguify-placeholder you tel Linguify to set the value as the placeholder-->
    <input linguify-id="hello_world" linguify-placeholder>
```


## License

Linguify a multi-language website managment library
Copyright (C) 2019 Brakets SRL

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Contact

Have any questions ? Want to find out more about us ? [Brakets.be](http://www.brakets.be/)

