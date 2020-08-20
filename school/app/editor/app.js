function compile() {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;

    document.body.onkeyup = function() {
        code.open();
        code.writeln(
            html.value +
            "<style>" +
            css.value +
            "</style>" +
            "<script>" +
            js.value +
            "</script>"
        );
        code.close();
        localStorage.setItem('HtmlCode', html.value)
        localStorage.setItem('CssCode', css.value)
        localStorage.setItem('JsCode', js.value)
    };
}

compile();

function codeLoad() {
    html.value = localStorage.getItem('HtmlCode')
    css.value = localStorage.getItem('CssCode')
    js.value = localStorage.getItem('JsCode')

}