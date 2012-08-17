/* ***** BEGIN LICENSE BLOCK *****
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * Contributor(s):
 * Jonathan Camile <jonathan.camile AT gmail DOT com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/mode/sql",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/sql_highlight_rules","ace/range"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/sql_highlight_rules").SqlHighlightRules,h=a("ace/range").Range,i=function(){this.$tokenizer=new f((new g).getRules())};d.inherits(i,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=[],g=/^(\s*)--/;for(var i=c;i<=d;i++)if(!g.test(b.getLine(i))){e=!1;break}if(e){var j=new h(0,0,0,0);for(var i=c;i<=d;i++){var k=b.getLine(i),l=k.match(g);j.start.row=i,j.end.row=i,j.end.column=l[0].length,b.replace(j,l[1])}}else b.indentRows(c,d,"--")}}.call(i.prototype),b.Mode=i}),define("ace/mode/sql_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/lang"),f=a("ace/mode/text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("select|from|where|and|or|group|by|order|limit|offset|having|as|case|when|else|end|type|left|right|join|on|outer|desc|asc".split("|")),b=e.arrayToMap("true|false|null".split("|")),c=e.arrayToMap("count|min|max|avg|sum|rank|now|coalesce".split("|"));this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*"'},{token:"string",regex:"'.*'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:function(d){return d=d.toLowerCase(),a.hasOwnProperty(d)?"keyword":b.hasOwnProperty(d)?"constant.language":c.hasOwnProperty(d)?"support.function":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"lparen.paren",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};d.inherits(g,f),b.SqlHighlightRules=g})
