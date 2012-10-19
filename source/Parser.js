function Parser()
{
    this.lexicalParser = new LexicalParser();
    this.syntacticalParser = new SyntacticalParser();
    var terminalSymbols = ["NullLiteral", "BooleanLiteral", "NumericLiteral", "StringLiteral", "RegularExpressionLiteral", "RegularExpressionLiteral", "Identifier", "{", "}", "(", ")", "[", "]", ".", ";", ",", "<", ">", "<=", ">=", "==", "!=", "===", "!==", "+", "-", "*", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "=", "+=", "-=", "*=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", "/", "/=", "break", "do", "instanceof", "typeof", "case", "else", "new", "var", "catch", "finally", "return", "void", "continue", "for", "switch", "while", "debugger", "function", "this", "with", "default", "if", "throw", "delete", "in", "try", "get", "set"];
    var terminalSymbolIndex = {};
    terminalSymbols.forEach(
        function(e)
        {
            Object.defineProperty(terminalSymbolIndex, e, {});
        });

    this.parse = 
        function(source, onInputElement)
        {
            var token;
            var haveLineTerminator = false;
            this.lexicalParser.source = source;
            var useDiv = false;
            while(token = this.lexicalParser.getNextToken(useDiv))
            {
                if(onInputElement)
                    onInputElement(token);
                try
                {
                    if((token.Comment && token.Comment.match(/[\n\r\u2028\u2029]/)) || token.LineTerminator)
                    {
                        haveLineTerminator = true;
                        continue;
                    }
                    with(this)
                        if(Object.getOwnPropertyNames(token).some(
                            function(e)
                            {
                                if(terminalSymbolIndex.hasOwnProperty (e))
                                {
                                    useDiv = syntacticalParser.insertSymbol(new Symbol(e, token), haveLineTerminator);
                                    haveLineTerminator = false;
                                    return true;
                                }
                                else
                                    return false;
                            }))
                            continue;
                    if((token["Keyword"] || token["Punctuator"] || token["DivPunctuator"]) && terminalSymbolIndex.hasOwnProperty (token.toString()))
                    {
                        useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(), token), haveLineTerminator);
                        haveLineTerminator = false;
                    }
                }catch(e)
                {
                    throw new SyntaxError("Unexpected token " + token);
                }
            }
            return this.syntacticalParser.grammarTree;
        };
}
