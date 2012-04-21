function Parser() {
    function LexicalParser() {
        function XRegExp(xregexps,rootname,flag){
            var expnames = [rootname];
            function buildRegExp(source) {
                var regexp = new RegExp;
                regexp.compile(source.replace(/<([^>]+)>/g,function(all,expname) {
                    if(!xregexps[expname])return "";
                    expnames.push(expname);
                    if(xregexps[expname] instanceof RegExp) return "(" + xregexps[expname].source +")";
                    return "(" + buildRegExp(xregexps[expname]).source +")";
                }),flag)
                return regexp;
            }
            var regexp = buildRegExp(xregexps[rootname]);
            this.exec = function(string) {
                var matches = regexp.exec(string);
                if(matches==null) return null;
                var result = new String(matches[0]);
                for(var i = 0; i < expnames.length; i++)
                    if(matches[i])
                        result[expnames[i]] = matches[i];
                return result;
            }
            Object.defineProperty(this,"lastIndex",{
                "get":function(){
                    return regexp.lastIndex;
                }, 
                "set":function(v){
                    regexp.lastIndex = v;
                }
            });
        }
        var lex = {
            InputElementDiv:"<WhiteSpace>|<LineTerminator>|<Comment>|<ReservedWord>|<Identifier>|<Punctuator>|<NumericLiteral>|<StringLiteral>|<DivPunctuator>",
            InputElementRegExp:"<WhiteSpace>|<LineTerminator>|<Comment>|<ReservedWord>|<Identifier>|<Punctuator>|<NumericLiteral>|<RegularExpressionLiteral>|<StringLiteral>",
            ReservedWord:"<Keyword>|<FutureReservedWord>|<NullLiteral>|<BooleanLiteral>",
            WhiteSpace:/[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000]/,
            LineTerminator:/[\n\r\u2028\u2029]/,
            Comment:"<SingleLineComment>|<MultiLineComment>",
            SingleLineComment:/\/\/[^\n\r\u2028\u2029]*/,
            MultiLineComment:/\/\*(?:[^*]|\*[^\/])*\*\//,
            Keyword:/break(?![_$a-zA-Z0-9])|else(?![_$a-zA-Z0-9])|new(?![_$a-zA-Z0-9])|var(?![_$a-zA-Z0-9])|case(?![_$a-zA-Z0-9])|finally(?![_$a-zA-Z0-9])|return(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|catch(?![_$a-zA-Z0-9])|for(?![_$a-zA-Z0-9])|switch(?![_$a-zA-Z0-9])|while(?![_$a-zA-Z0-9])|continue(?![_$a-zA-Z0-9])|function(?![_$a-zA-Z0-9])|this(?![_$a-zA-Z0-9])|with(?![_$a-zA-Z0-9])|default(?![_$a-zA-Z0-9])|if(?![_$a-zA-Z0-9])|throw(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|try(?![_$a-zA-Z0-9])|do(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
            FutureReservedWord:/abstract(?![_$a-zA-Z0-9])|enum(?![_$a-zA-Z0-9])|int(?![_$a-zA-Z0-9])|short(?![_$a-zA-Z0-9])|boolean(?![_$a-zA-Z0-9])|export(?![_$a-zA-Z0-9])|interface(?![_$a-zA-Z0-9])|static(?![_$a-zA-Z0-9])|byte(?![_$a-zA-Z0-9])|extends(?![_$a-zA-Z0-9])|long(?![_$a-zA-Z0-9])|super(?![_$a-zA-Z0-9])|char(?![_$a-zA-Z0-9])|final(?![_$a-zA-Z0-9])|native(?![_$a-zA-Z0-9])|synchronized(?![_$a-zA-Z0-9])|class(?![_$a-zA-Z0-9])|float(?![_$a-zA-Z0-9])|package(?![_$a-zA-Z0-9])|throws(?![_$a-zA-Z0-9])|const(?![_$a-zA-Z0-9])|goto|(?![_$a-zA-Z0-9])private(?![_$a-zA-Z0-9])|transient(?![_$a-zA-Z0-9])|debugger(?![_$a-zA-Z0-9])|implements(?![_$a-zA-Z0-9])|(?![_$a-zA-Z0-9])protected(?![_$a-zA-Z0-9])|volatile(?![_$a-zA-Z0-9])|double(?![_$a-zA-Z0-9])|import(?![_$a-zA-Z0-9])|public(?![_$a-zA-Z0-9])/,
            NullLiteral:/null/,
            BooleanLiteral:/true|false/,
            Identifier:/[_$a-zA-Z][_$a-zA-Z0-9]*/,
            Punctuator:/>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.|\]|\[|\)|\(|{/,
            DivPunctuator:/\/=|\//,
            NumericLiteral:/(?:0[xX][0-9a-fA-F]*|0|[1-9]+[0-9]*(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]{0,1}[0-9]+)?/,
            StringLiteral:/"(?:[^"\n\\\r\u2028\u2029]|\\['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\['"\\bfnrtv\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
            RegularExpressionLiteral:/\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
        }
        var inputElementDiv = new XRegExp(lex,"InputElementDiv","g");
        var inputElementRegExp = new XRegExp(lex,"InputElementRegExp","g");
        
        var source;
        
        Object.defineProperty(this,"source",{
            "get":function(){
                return source;
            }, 
            "set":function(v){
                source = v;
                inputElementDiv.lastIndex = 0;
                inputElementRegExp.lastIndex = 0;
            }
        });
        
        this.getNextToken = function(useDiv){
            if(useDiv)
            {
                inputElementDiv.lastIndex = inputElementRegExp.lastIndex;
                try {
                    return inputElementDiv.exec(source);
                }
                finally {
                    inputElementRegExp.lastIndex = inputElementDiv.lastIndex;
                }
            }
            return inputElementRegExp.exec(source);
        }
    }

    function SyntacticalParser() {

        var ruletext = "IdentifierName :\nIdentifier\nbreak\ndo\ninstanceof\ntypeof\ncase\nelse\nnew\nvar\ncatch\nfinally\nreturn\nvoid\ncontinue\nfor\nswitch\nwhile\ndebugger\nfunction\nthis\nwith\ndefault\nif\nthrow\ndelete\nin\ntry\nLiteral :\nNullLiteral\nBooleanLiteral\nNumericLiteral\nStringLiteral\nRegularExpressionLiteral\nPrimaryExpression :\nthis\nIdentifier\nLiteral\nArrayLiteral\nObjectLiteral\n( Expression )\nArrayLiteral :\n[ ]\n[ Elision ]\n[ ElementList ]\n[ ElementList , ]\n[ ElementList , Elision ]\nElementList :\nAssignmentExpression\nElision AssignmentExpression\nElementList , AssignmentExpression\nElementList , Elision AssignmentExpression\nElision :\n,\nElision ,\nObjectLiteral :\n{ }\n{ PropertyNameAndValueList }\n{ PropertyNameAndValueList , }\nPropertyNameAndValueList :\nPropertyAssignment\nPropertyNameAndValueList , PropertyAssignment\nPropertyAssignment :\nPropertyName : AssignmentExpression\nget PropertyName ( ) { FunctionBody }\nset PropertyName ( PropertySetParameterList ) { FunctionBody }\nPropertyName :\nIdentifierName\nStringLiteral\nNumericLiteral\nPropertySetParameterList :\nIdentifier\nMemberExpression :\nPrimaryExpression\nFunctionExpression\nMemberExpression [ Expression ]\nMemberExpression . IdentifierName\nnew MemberExpression Arguments\nNewExpression :\nMemberExpression\nnew NewExpression\nCallExpression :\nMemberExpression Arguments\nCallExpression Arguments\nCallExpression [ Expression ]\nCallExpression . IdentifierName\nArguments :\n( )\n( ArgumentList )\nArgumentList :\nAssignmentExpression\nArgumentList , AssignmentExpression\nLeftHandSideExpression :\nNewExpression\nCallExpression\nPostfixExpression :\nLeftHandSideExpression\nLeftHandSideExpression [noLineTerminator] ++\nLeftHandSideExpression [noLineTerminator] --\nUnaryExpression :\nPostfixExpression\ndelete UnaryExpression\nvoid UnaryExpression\ntypeof UnaryExpression\n++ UnaryExpression\n-- UnaryExpression\n+ UnaryExpression\n- UnaryExpression\n~ UnaryExpression\n! UnaryExpression\nMultiplicativeExpression :\nUnaryExpression\nMultiplicativeExpression * UnaryExpression\nMultiplicativeExpression [div] / UnaryExpression\nMultiplicativeExpression % UnaryExpression\nAdditiveExpression :\nMultiplicativeExpression\nAdditiveExpression + MultiplicativeExpression\nAdditiveExpression - MultiplicativeExpression\nShiftExpression :\nAdditiveExpression\nShiftExpression << AdditiveExpression\nShiftExpression >> AdditiveExpression\nShiftExpression >>> AdditiveExpression\nRelationalExpression :\nShiftExpression\nRelationalExpression < ShiftExpression\nRelationalExpression > ShiftExpression\nRelationalExpression <= ShiftExpression\nRelationalExpression >= ShiftExpression\nRelationalExpression instanceof ShiftExpression\nRelationalExpression in ShiftExpression\nRelationalExpressionNoIn :\nShiftExpression\nRelationalExpressionNoIn < ShiftExpression\nRelationalExpressionNoIn > ShiftExpression\nRelationalExpressionNoIn <= ShiftExpression\nRelationalExpressionNoIn >= ShiftExpression\nRelationalExpressionNoIn instanceof ShiftExpression\nEqualityExpression :\nRelationalExpression\nEqualityExpression == RelationalExpression\nEqualityExpression != RelationalExpression\nEqualityExpression === RelationalExpression\nEqualityExpression !== RelationalExpression\nEqualityExpressionNoIn :\nRelationalExpressionNoIn\nEqualityExpressionNoIn == RelationalExpressionNoIn\nEqualityExpressionNoIn != RelationalExpressionNoIn\nEqualityExpressionNoIn === RelationalExpressionNoIn\nEqualityExpressionNoIn !== RelationalExpressionNoIn\nBitwiseANDExpression :\nEqualityExpression\nBitwiseANDExpression & EqualityExpression\nBitwiseANDExpressionNoIn :\nEqualityExpressionNoIn\nBitwiseANDExpressionNoIn & EqualityExpressionNoIn\nBitwiseXORExpression :\nBitwiseANDExpression\nBitwiseXORExpression ^ BitwiseANDExpression\nBitwiseXORExpressionNoIn :\nBitwiseANDExpressionNoIn\nBitwiseXORExpressionNoIn ^ BitwiseANDExpressionNoIn\nBitwiseORExpression :\nBitwiseXORExpression\nBitwiseORExpression | BitwiseXORExpression\nBitwiseORExpressionNoIn :\nBitwiseXORExpressionNoIn\nBitwiseORExpressionNoIn | BitwiseXORExpressionNoIn\nLogicalANDExpression :\nBitwiseORExpression\nLogicalANDExpression && BitwiseORExpression\nLogicalANDExpressionNoIn :\nBitwiseORExpressionNoIn\nLogicalANDExpressionNoIn && BitwiseORExpressionNoIn\nLogicalORExpression :\nLogicalANDExpression\nLogicalORExpression || LogicalANDExpression\nLogicalORExpressionNoIn :\nLogicalANDExpressionNoIn\nLogicalORExpressionNoIn || LogicalANDExpressionNoIn\nConditionalExpression :\nLogicalORExpression\nLogicalORExpression ? AssignmentExpression : AssignmentExpression\nConditionalExpressionNoIn :\nLogicalORExpressionNoIn\nLogicalORExpressionNoIn ? AssignmentExpressionNoIn : AssignmentExpressionNoIn\nAssignmentExpression :\nConditionalExpression\nLeftHandSideExpression [div] AssignmentOperator AssignmentExpression\nAssignmentExpressionNoIn :\nConditionalExpressionNoIn\nLeftHandSideExpression [div] AssignmentOperator AssignmentExpressionNoIn\nAssignmentOperator :\n=\n*=\n/=\n%=\n+=\n-=\n<<=\n>>=\n>>>=\n&=\n^=\n|=\nExpression :\nAssignmentExpression\nExpression , AssignmentExpression\nExpressionNoIn :\nAssignmentExpressionNoIn\nExpressionNoIn , AssignmentExpressionNoIn\nStatement :\nBlock\nVariableStatement\nEmptyStatement\nExpressionStatement\nIfStatement\nIterationStatement\nContinueStatement\nBreakStatement\nReturnStatement\nWithStatement\nLabelledStatement\nSwitchStatement\nThrowStatement\nTryStatement\nDebuggerStatement\nBlock :\n{ }\n{ StatementList }\nStatementList :\nStatement\nStatementList Statement\nVariableStatement :\nvar VariableDeclarationList ;\nVariableDeclarationList :\nVariableDeclaration\nVariableDeclarationList , VariableDeclaration\nVariableDeclarationListNoIn :\nVariableDeclarationNoIn\nVariableDeclarationListNoIn , VariableDeclarationNoIn\nVariableDeclaration :\nIdentifier\nIdentifier Initialiser\nVariableDeclarationNoIn :\nIdentifier\nIdentifier InitialiserNoIn\nInitialiser :\n= AssignmentExpression\nInitialiserNoIn :\n= AssignmentExpressionNoIn\nEmptyStatement :\n;\nExpressionStatement :\nExpression [lookahead∉{{,function}] ;\nIfStatement :\nif ( Expression ) Statement else Statement\nif ( Expression ) Statement\nIterationStatement :\ndo Statement while ( Expression ) ;\nwhile ( Expression ) Statement\nfor ( ExpressionNoIn ; Expression ; Expression ) Statement\nfor ( ; Expression ; Expression ) Statement\nfor ( ExpressionNoIn ; ; Expression ) Statement\nfor ( ; ; Expression ) Statement\nfor ( ExpressionNoIn ; Expression ; ) Statement\nfor ( ; Expression ; ) Statement\nfor ( ExpressionNoIn ; ; ) Statement\nfor ( ; ; ) Statement\nfor ( var VariableDeclarationListNoIn ; Expression ; Expression ) Statement\nfor ( var VariableDeclarationListNoIn ; ; Expression ) Statement\nfor ( var VariableDeclarationListNoIn ; Expression ; ) Statement\nfor ( var VariableDeclarationListNoIn ; ; ) Statement\nfor ( LeftHandSideExpression in Expression ) Statement\nfor ( var VariableDeclarationNoIn in Expression ) Statement\nContinueStatement :\ncontinue ;\ncontinue [noLineTerminator] Identifier ;\nBreakStatement :\nbreak ;\nbreak [noLineTerminator] Identifier ;\nReturnStatement :\nreturn ;\nreturn [noLineTerminator] Expression ;\nWithStatement :\nwith ( Expression ) Statement\nSwitchStatement :\nswitch ( Expression ) CaseBlock\nCaseBlock :\n{ }\n{ CaseClauses }\n{ CaseClauses DefaultClause }\n{ DefaultClause }\n{ CaseClauses DefaultClause CaseClauses }\n{ DefaultClause CaseClauses }\nCaseClauses :\nCaseClause\nCaseClauses CaseClause\nCaseClause :\ncase Expression : StatementList\ncase Expression :\nDefaultClause :\ndefault :\ndefault : StatementList\nLabelledStatement :\nIdentifier : Statement\nThrowStatement :\nthrow [noLineTerminator] Expression ;\nTryStatement :\ntry Block Catch\ntry Block Finally\ntry Block Catch Finally\nCatch :\ncatch ( Identifier ) Block\nFinally :\nfinally Block\nDebuggerStatement :\ndebugger ;\nFunctionDeclaration :\nfunction Identifier ( FormalParameterList ) { FunctionBody }\nfunction Identifier ( ) { FunctionBody }\nFunctionExpression :\nfunction Identifier ( FormalParameterList ) { FunctionBody }\nfunction ( FormalParameterList ) { FunctionBody }\nfunction Identifier ( ) { FunctionBody }\nfunction ( ) { FunctionBody }\nFormalParameterList :\nIdentifier\nFormalParameterList , Identifier\nFunctionBody :\nSourceElements\n\nProgram :\nSourceElements\n\nSourceElements :\nSourceElement\nSourceElements SourceElement\nSourceElement :\nStatement\nFunctionDeclaration";

        ruletext= ruletext.split("\n");

        var rules = {};
        var currentRule ;

        ruletext.forEach(function(line){
            if(line.match(/^([^ ]+) \:$/)) {
                currentRule = rules[RegExp.$1] = [];
            }
            else {
                currentRule.push(line.trim().split(" "));
            }
        });

        //build the status machine

        var root = {Program:"$"};

        var hash = {};

        function visitNode(node) {
            hash[JSON.stringify(node)] = node;
            
            node.$closure = true;
            
            var queue = Object.getOwnPropertyNames(node);


                
            while(queue.length) {
                var symbolName = queue.shift();
                if(!rules[symbolName]) // should be a terminal symbol
                    continue;
                rules[symbolName].forEach(function(rule){
                    if(node[symbolName].$lookahead && node[symbolName].$lookahead.some(function(e){return e==rule[0];}) ) 
                        return;
                        

                
                    if(!node[rule[0]])
                        queue.push(rule[0]);
                    var rulenode = node;
                    var lastnode = null;

                    rule.forEach(function(symbol){
                        if(symbol.match(/\[([^\]]+)\]/)) {
                            if(RegExp.$1 == "lookahead∉{{,function}") {
                                rulenode["$lookahead"] = ["{","function"];
                            }
                            else
                                rulenode["$"+RegExp.$1] = true;
                            return;
                        }

                        if(!rulenode[symbol])
                            rulenode[symbol] = {}; 
                            

                        lastnode = rulenode;
                        rulenode = rulenode[symbol];
                        
                        
                        

                    });
                    if(node[symbolName].$lookahead)
                        node[rule[0]].$lookahead = node[symbolName].$lookahead;
                    if(node[symbolName].$div)
                        rulenode.$div = true;
                    rulenode.$reduce = symbolName;
                    rulenode.$count = rule.filter(function(e){ return !e.match(/\[([^\]]+)\]/); }).length;

                });
            }

            for(var p in node) {

                if( typeof node[p] != "object" || p.charAt(0) == "$" || node[p].$closure ) 
                    continue;

                if( hash[JSON.stringify(node[p])])
                    node[p] = hash[JSON.stringify(node[p])];
                else {
                    visitNode(node[p]);
                }
            }
        }

        visitNode(root);    
        
        
        var symbolStack = [];
        var statusStack = [root];
        var current = root;
        
        this.insertSymbol = function insertSymbol(symbol,haveLineTerminator) {
            while(!current[symbol.name] && current["$reduce"])
            {
                var count = current["$count"];
                var newsymbol = new Symbol(current["$reduce"]);
                while(count--) newsymbol.childNodes.push(symbolStack.pop()),statusStack.pop();
                current = statusStack[statusStack.length-1];
                //newsymbol.childNodes.reverse();
                this.insertSymbol(newsymbol);
            }
            if( current[symbol.name] && current[symbol.name].$noLineTerminator && haveLineTerminator )
            {            
                this.insertSymbol(new Symbol(";", ";"))
                return this.insertSymbol(symbol);
            }
            if( !current[symbol.name] && current[";"] && current[";"]["$reduce"] && (haveLineTerminator || symbol.name == "}"))
            {
                this.insertSymbol(new Symbol(";", ";"))
                return this.insertSymbol(symbol);
            }      
            current = current[symbol.name];  
            symbolStack.push(symbol),statusStack.push(current);
            if(!current)
                return false;
            return current.$div;
        };
        this.reset = function(){
            current = root;
            symbolStack = [];
            statusStack = [root];
        }
        Object.defineProperty(this,"grammarTree",{
            "get":function(){
                while(current["$reduce"])
                {
                    var count = current["$count"];
                    var newsymbol = new Symbol(current["$reduce"]);
                    while(count--) newsymbol.childNodes.push(symbolStack.pop()),statusStack.pop();
                    current = statusStack[statusStack.length-1];
                    this.insertSymbol(newsymbol);
                }
                if(symbolStack.length > 0)
                    this.insertSymbol(new Symbol(";", ";"));
            
                return symbolStack[0];
            }, 

        });
    }
    
    this.lexicalParser = new LexicalParser();   
    this.syntacticalParser = new SyntacticalParser();
    
    var terminalSymbols = ["NullLiteral","BooleanLiteral","NumericLiteral","StringLiteral","RegularExpressionLiteral","RegularExpressionLiteral","Identifier",
        "{","}","(",")","[","]",".",";",",","<",">","<=",">=","==","!=","===","!==","+","-","*","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","=","+=","-=","*=","%=","<<=",">>=",">>>=","&=","|=","^=","/","/=",
        "break","do","instanceof","typeof","case","else","new","var","catch","finally","return","void","continue","for","switch","while","debugger","function","this","with","default","if","throw","delete","in","try"];
    var terminalSymbolIndex = {};    
    terminalSymbols.forEach(function(e){
        Object.defineProperty(terminalSymbolIndex,e,{});
    });  
    function Symbol(symbolName,token) 
    {
        this.name = symbolName;
        this.token = token;
        this.childNodes = [];
        this.toString = function(indent) {
            if(!indent)indent = "";
            if(this.childNodes.length == 1)
                return this.childNodes[0].toString(indent);
            var str = indent + this.name + (this.token!=undefined && this.name!=this.token?":"+this.token:"")+"\n";
            for(var i = 0 ; i<this.childNodes.length; i++)
                str += this.childNodes[i].toString(indent+"    ");
            return str;
        }
    }
    this.parse = function(source) {
        var token;
        var haveLineTerminator = true;
        
        this.lexicalParser.source = source;
        var useDiv = false;
        
        while( token = this.lexicalParser.getNextToken(useDiv) ) {
            console.log(token.toString());
            if( (token.Comment && token.Comment.match(/[\n\r\u2028\u2029]/)) || token.LineTerminator)
            {
                haveLineTerminator = true ;
                continue;
            }
            

            with(this)
                if(Object.getOwnPropertyNames(token).some(function(e){ 
                    if( terminalSymbolIndex.hasOwnProperty(e) ) {
                        useDiv = syntacticalParser.insertSymbol(new Symbol(e,token),haveLineTerminator);
                        return true;
                    }
                    else return false;
                }))
                    continue;
            if( (token["Keyword"]||token["Punctuator"]) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
                useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(),token),haveLineTerminator);
            }
        }
        return this.syntacticalParser.grammarTree;
    }

}