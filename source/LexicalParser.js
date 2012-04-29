var lex = 
{
    InputElementDiv:"<WhiteSpace>|<LineTerminator>|<Comment>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>|<DivPunctuator>", 
    InputElementRegExp:"<WhiteSpace>|<LineTerminator>|<Comment>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<RegularExpressionLiteral>|<StringLiteral>", 
    ReservedWord:"<Keyword>|<FutureReservedWord>|<NullLiteral>|<BooleanLiteral>", 
    WhiteSpace:/[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/, 
    LineTerminator:/[\n\r\u2028\u2029]/, 
    Comment:"<SingleLineComment>|<MultiLineComment>", 
    SingleLineComment:/\/\/[^\n\r\u2028\u2029]*/, 
    MultiLineComment:/\/\*(?:[^*]|\*[^\/])*\*\//, 
    Keyword:/break(?![_$a-zA-Z0-9])|else(?![_$a-zA-Z0-9])|new(?![_$a-zA-Z0-9])|var(?![_$a-zA-Z0-9])|case(?![_$a-zA-Z0-9])|finally(?![_$a-zA-Z0-9])|return(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|catch(?![_$a-zA-Z0-9])|for(?![_$a-zA-Z0-9])|switch(?![_$a-zA-Z0-9])|while(?![_$a-zA-Z0-9])|continue(?![_$a-zA-Z0-9])|function(?![_$a-zA-Z0-9])|this(?![_$a-zA-Z0-9])|with(?![_$a-zA-Z0-9])|default(?![_$a-zA-Z0-9])|if(?![_$a-zA-Z0-9])|throw(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|try(?![_$a-zA-Z0-9])|do(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/, 
    FutureReservedWord:/abstract(?![_$a-zA-Z0-9])|enum(?![_$a-zA-Z0-9])|int(?![_$a-zA-Z0-9])|short(?![_$a-zA-Z0-9])|boolean(?![_$a-zA-Z0-9])|export(?![_$a-zA-Z0-9])|interface(?![_$a-zA-Z0-9])|static(?![_$a-zA-Z0-9])|byte(?![_$a-zA-Z0-9])|extends(?![_$a-zA-Z0-9])|long(?![_$a-zA-Z0-9])|super(?![_$a-zA-Z0-9])|char(?![_$a-zA-Z0-9])|final(?![_$a-zA-Z0-9])|native(?![_$a-zA-Z0-9])|synchronized(?![_$a-zA-Z0-9])|class(?![_$a-zA-Z0-9])|float(?![_$a-zA-Z0-9])|package(?![_$a-zA-Z0-9])|throws(?![_$a-zA-Z0-9])|const(?![_$a-zA-Z0-9])|goto|(?![_$a-zA-Z0-9])private(?![_$a-zA-Z0-9])|transient(?![_$a-zA-Z0-9])|debugger(?![_$a-zA-Z0-9])|implements(?![_$a-zA-Z0-9])|(?![_$a-zA-Z0-9])protected(?![_$a-zA-Z0-9])|volatile(?![_$a-zA-Z0-9])|double(?![_$a-zA-Z0-9])|import(?![_$a-zA-Z0-9])|public(?![_$a-zA-Z0-9])/, 
    NullLiteral:/null/,
    BooleanLiteral:/true|false/, 
    Identifier:/[_$a-zA-Z][_$a-zA-Z0-9]*/, 
    Punctuator:/>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/, 
    DivPunctuator:/\/=|\//, 
    NumericLiteral:/(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/, 
    StringLiteral:/"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/, RegularExpressionLiteral:/\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
};
function XRegExp(xregexps, rootname, flag)
{
    var expnames = [rootname];
    function buildRegExp(source)
    {
        var regexp = new RegExp;
        regexp.compile(source.replace(/<([^>]+)>/g, 
            function(all, expname)
            {
                if(!xregexps[expname])
                    return "";
                expnames.push(expname);
                if(xregexps[expname]instanceof RegExp)
                    return "(" + xregexps[expname].source + ")";
                return "(" + buildRegExp(xregexps[expname]).source + ")";
            }), flag);
        return regexp;
    }
    var regexp = buildRegExp(xregexps[rootname]);
    this.exec = 
        function(string)
        {
            var matches = regexp.exec(string);
            if(matches == null)
                return null;
            var result = new String(matches[0]);
            for(var i = 0;i < expnames.length;i++)
                if(matches[i])
                    result[expnames[i]] = matches[i];
            return result;
        };
    Object.defineProperty(this, "lastIndex", 
    {
        "get":
        function()
        {
            return regexp.lastIndex;
        }, "set":
        function(v)
        {
            regexp.lastIndex = v;
        }
        
    });
}
function LexicalParser()
{
    var inputElementDiv = new XRegExp(lex, "InputElementDiv", "g");
    var inputElementRegExp = new XRegExp(lex, "InputElementRegExp", "g");
    var source;
    Object.defineProperty(this, "source", 
    {
        "get":
        function()
        {
            return source;
        }, "set":
        function(v)
        {
            source = v;
            inputElementDiv.lastIndex = 0;
            inputElementRegExp.lastIndex = 0;
        }
        
    });
    this.getNextToken = 
        function(useDiv)
        {
            var lastIndex = inputElementDiv.lastIndex;
            var inputElement;
            if(useDiv)
                inputElement = inputElementDiv;
            else
                inputElement = inputElementRegExp;
            var token = inputElement.exec(source);
            if(token && inputElement.lastIndex - lastIndex > token.length)
            {
                throw new SyntaxError("Unexpected token ILLEGAL");
            }
            inputElementDiv.lastIndex = inputElement.lastIndex;
            inputElementRegExp.lastIndex = inputElement.lastIndex;
            return token;
        };
}