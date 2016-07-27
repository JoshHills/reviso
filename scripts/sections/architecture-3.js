/* File encapsulates the bespoke demonstration functions for this page. */

divContent = {
    
    english : "HTML, which is covered in more depth as a later topic, demonstrates, conveying and displaying information is vital. One fundamental aspect of internationalization is to ensure that all textual systems are supported- this is called 'Unicode', and it is what the web is built to use. This accounts for things like vertical-writing and unique symbols. Some clients also support the automatic conversion of languages, but this does not account for a disparity in cultural symbolism. Don't stress, however, that your first projects must all have to be synchronous in every part of the world! Simply display a contextual awareness to others needs where and whenever appropriate!",
    spanish : "HTML, que está cubierto en mayor profundidad como un tema más adelante, demuestra, transmitir y mostrar la información es vital. Un aspecto fundamental de la internacionalización es asegurar que todos los sistemas textuales se supported- esto se llama 'unicode', y es lo que la web se construye para su uso. Esto da cuenta de cosas como vertical escritura y símbolos únicos. Algunos clientes también soportan la conversión automática de idiomas, pero esto no representan una disparidad en el simbolismo cultural. No se estrese, sin embargo, que sus primeros proyectos deben todos tienen que ser síncrono en cada parte del mundo! Simplemente mostrar una conciencia contextual a los demás necesita, donde y cuando sea apropiado!",
    japanese : "後でトピックとして、より深さでカバーされているHTMLは、搬送や情報を表示することが重要である、実証しています。国際化の1つの基本的な側面は、すべてのテキストシステムは、これは「ユニコード」と呼ばれる サポート されていることを確認することであり、それはウェブを使用するように構築されているものです。これは、縦書きとユニークなシンボルのようなものを占めます。一部のクライアント言語でもの自動変換をサポートしていますが、これは文化的な象徴の格差を考慮していません。ストレスはありません、しかし、あなたの最初のプロジェクトはすべて、世界のすべての部分で同期している必要がありますことを！単に他の人に状況認識がどこで、いつでも、適切な必要が表示さ！",
    russian : "HTML, которая покрыта более подробно в более позднем тему, демонстрирует, транспортировки и отображения информации является жизненно важным. Один из основных аспектов интернационализации для того, чтобы все текстовые системы supported- это называется 'Unicode', и это то, чтовеб- построен, чтобы использовать. Это объясняет вещи, как вертикальной написания и уникальных символов. Некоторые клиенты также поддерживают автоматическое преобразование языков, но это не объясняет несоответствием в культурной символики. Не, однако, подчеркнуть, что ваши первые проекты должны все должны быть синхронны в каждой части мира! Просто вызовите контекстное понимание с другими нуждается, где и когда уместно!"
    
}

// Change the language of a div to display internationalisation.
function changeLanguage() {
    
    // Grab all language keys.
    var languages = Object.keys(divContent);
    
    // Randomise a new language.
    var newLang;
    do {
        
        newLang = languages[Math.floor(Math.random() * languages.length)];
        
    } while($('#change-language').hasClass(newLang));
    
    console.log(newLang);
    
    $('#change-language').removeClass();
    
    $('#change-language').addClass(newLang);
    
    $('#internationalize').text(divContent[newLang]);
    
}