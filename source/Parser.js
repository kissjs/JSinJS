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
            InputElementDiv:"<WhiteSpace>|<LineTerminator>|<Comment>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>|<DivPunctuator>",
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
            Punctuator:/>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
            DivPunctuator:/\/=|\//,
            NumericLiteral:/(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?/,
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



        var rules = {"IdentifierName":[["Identifier"],["break"],["do"],["instanceof"],["typeof"],["case"],["else"],["new"],["var"],["catch"],["finally"],["return"],["void"],["continue"],["for"],["switch"],["while"],["debugger"],["function"],["this"],["with"],["default"],["if"],["throw"],["delete"],["in"],["try"]],"Literal":[["NullLiteral"],["BooleanLiteral"],["NumericLiteral"],["StringLiteral"],["RegularExpressionLiteral"]],"PrimaryExpression":[["this"],["Identifier"],["Literal"],["ArrayLiteral"],["ObjectLiteral"],["(","Expression",")"]],"ArrayLiteral":[["[","]"],["[","Elision","]"],["[","ElementList","]"],["[","ElementList",",","]"],["[","ElementList",",","Elision","]"]],"ElementList":[["AssignmentExpression"],["Elision","AssignmentExpression"],["ElementList",",","AssignmentExpression"],["ElementList",",","Elision","AssignmentExpression"]],"Elision":[[","],["Elision",","]],"ObjectLiteral":[["{","}"],["{","PropertyNameAndValueList","}"],["{","PropertyNameAndValueList",",","}"]],"PropertyNameAndValueList":[["PropertyAssignment"],["PropertyNameAndValueList",",","PropertyAssignment"]],"PropertyAssignment":[["PropertyName",":","AssignmentExpression"],["get","PropertyName","(",")","{","FunctionBody","}"],["set","PropertyName","(","PropertySetParameterList",")","{","FunctionBody","}"]],"PropertyName":[["IdentifierName"],["StringLiteral"],["NumericLiteral"]],"PropertySetParameterList":[["Identifier"]],"MemberExpression":[["PrimaryExpression"],["FunctionExpression"],["MemberExpression","[","Expression","]"],["MemberExpression",".","IdentifierName"],["new","MemberExpression","Arguments"]],"NewExpression":[["MemberExpression"],["new","NewExpression"]],"CallExpression":[["MemberExpression","Arguments"],["CallExpression","Arguments"],["CallExpression","[","Expression","]"],["CallExpression",".","IdentifierName"]],"Arguments":[["(",")"],["(","ArgumentList",")"]],"ArgumentList":[["AssignmentExpression"],["ArgumentList",",","AssignmentExpression"]],"LeftHandSideExpression":[["NewExpression"],["CallExpression"]],"PostfixExpression":[["LeftHandSideExpression"],["LeftHandSideExpression","[noLineTerminator]","++"],["LeftHandSideExpression","[noLineTerminator]","--"]],"UnaryExpression":[["PostfixExpression"],["delete","UnaryExpression"],["void","UnaryExpression"],["typeof","UnaryExpression"],["++","UnaryExpression"],["--","UnaryExpression"],["+","UnaryExpression"],["-","UnaryExpression"],["~","UnaryExpression"],["!","UnaryExpression"]],"MultiplicativeExpression":[["MultiplicativeExpression","[div]","/","UnaryExpression"],["UnaryExpression"],["MultiplicativeExpression","*","UnaryExpression"],["MultiplicativeExpression","%","UnaryExpression"]],"AdditiveExpression":[["MultiplicativeExpression"],["AdditiveExpression","+","MultiplicativeExpression"],["AdditiveExpression","-","MultiplicativeExpression"]],"ShiftExpression":[["AdditiveExpression"],["ShiftExpression","<<","AdditiveExpression"],["ShiftExpression",">>","AdditiveExpression"],["ShiftExpression",">>>","AdditiveExpression"]],"RelationalExpression":[["ShiftExpression"],["RelationalExpression","<","ShiftExpression"],["RelationalExpression",">","ShiftExpression"],["RelationalExpression","<=","ShiftExpression"],["RelationalExpression",">=","ShiftExpression"],["RelationalExpression","instanceof","ShiftExpression"],["RelationalExpression","in","ShiftExpression"]],"RelationalExpressionNoIn":[["ShiftExpression"],["RelationalExpressionNoIn","<","ShiftExpression"],["RelationalExpressionNoIn",">","ShiftExpression"],["RelationalExpressionNoIn","<=","ShiftExpression"],["RelationalExpressionNoIn",">=","ShiftExpression"],["RelationalExpressionNoIn","instanceof","ShiftExpression"]],"EqualityExpression":[["RelationalExpression"],["EqualityExpression","==","RelationalExpression"],["EqualityExpression","!=","RelationalExpression"],["EqualityExpression","===","RelationalExpression"],["EqualityExpression","!==","RelationalExpression"]],"EqualityExpressionNoIn":[["RelationalExpressionNoIn"],["EqualityExpressionNoIn","==","RelationalExpressionNoIn"],["EqualityExpressionNoIn","!=","RelationalExpressionNoIn"],["EqualityExpressionNoIn","===","RelationalExpressionNoIn"],["EqualityExpressionNoIn","!==","RelationalExpressionNoIn"]],"BitwiseANDExpression":[["EqualityExpression"],["BitwiseANDExpression","&","EqualityExpression"]],"BitwiseANDExpressionNoIn":[["EqualityExpressionNoIn"],["BitwiseANDExpressionNoIn","&","EqualityExpressionNoIn"]],"BitwiseXORExpression":[["BitwiseANDExpression"],["BitwiseXORExpression","^","BitwiseANDExpression"]],"BitwiseXORExpressionNoIn":[["BitwiseANDExpressionNoIn"],["BitwiseXORExpressionNoIn","^","BitwiseANDExpressionNoIn"]],"BitwiseORExpression":[["BitwiseXORExpression"],["BitwiseORExpression","|","BitwiseXORExpression"]],"BitwiseORExpressionNoIn":[["BitwiseXORExpressionNoIn"],["BitwiseORExpressionNoIn","|","BitwiseXORExpressionNoIn"]],"LogicalANDExpression":[["BitwiseORExpression"],["LogicalANDExpression","&&","BitwiseORExpression"]],"LogicalANDExpressionNoIn":[["BitwiseORExpressionNoIn"],["LogicalANDExpressionNoIn","&&","BitwiseORExpressionNoIn"]],"LogicalORExpression":[["LogicalANDExpression"],["LogicalORExpression","||","LogicalANDExpression"]],"LogicalORExpressionNoIn":[["LogicalANDExpressionNoIn"],["LogicalORExpressionNoIn","||","LogicalANDExpressionNoIn"]],"ConditionalExpression":[["LogicalORExpression"],["LogicalORExpression","?","AssignmentExpression",":","AssignmentExpression"]],"ConditionalExpressionNoIn":[["LogicalORExpressionNoIn"],["LogicalORExpressionNoIn","?","AssignmentExpressionNoIn",":","AssignmentExpressionNoIn"]],"AssignmentExpression":[["ConditionalExpression"],["LeftHandSideExpression","[div]","AssignmentOperator","AssignmentExpression"]],"AssignmentExpressionNoIn":[["LeftHandSideExpression","[div]","AssignmentOperator","AssignmentExpressionNoIn"],["ConditionalExpressionNoIn"]],"AssignmentOperator":[["="],["*="],["/="],["%="],["+="],["-="],["<<="],[">>="],[">>>="],["&="],["^="],["|="]],"Expression":[["AssignmentExpression"],["Expression",",","AssignmentExpression"]],"ExpressionNoIn":[["AssignmentExpressionNoIn"],["ExpressionNoIn",",","AssignmentExpressionNoIn"]],"Statement":[["Block"],["VariableStatement"],["EmptyStatement"],["ExpressionStatement"],["IfStatement"],["IterationStatement"],["ContinueStatement"],["BreakStatement"],["ReturnStatement"],["WithStatement"],["LabelledStatement"],["SwitchStatement"],["ThrowStatement"],["TryStatement"],["DebuggerStatement"]],"Block":[["{","}"],["{","StatementList","}"]],"StatementList":[["Statement"],["StatementList","Statement"]],"VariableStatement":[["var","VariableDeclarationList",";"]],"VariableDeclarationList":[["VariableDeclaration"],["VariableDeclarationList",",","VariableDeclaration"]],"VariableDeclarationListNoIn":[["VariableDeclarationNoIn"],["VariableDeclarationListNoIn",",","VariableDeclarationNoIn"]],"VariableDeclaration":[["Identifier"],["Identifier","Initialiser"]],"VariableDeclarationNoIn":[["Identifier"],["Identifier","InitialiserNoIn"]],"Initialiser":[["=","AssignmentExpression"]],"InitialiserNoIn":[["=","AssignmentExpressionNoIn"]],"EmptyStatement":[[";"]],"ExpressionStatement":[["Expression","[lookahead∉{{,function}]",";"]],"IfStatement":[["if","(","Expression",")","Statement","else","Statement"],["if","(","Expression",")","Statement"]],"IterationStatement":[["do","Statement","while","(","Expression",")",";"],["while","(","Expression",")","Statement"],["for","(","ExpressionNoIn",";","Expression",";","Expression",")","Statement"],["for","(",";","Expression",";","Expression",")","Statement"],["for","(","ExpressionNoIn",";",";","Expression",")","Statement"],["for","(",";",";","Expression",")","Statement"],["for","(","ExpressionNoIn",";","Expression",";",")","Statement"],["for","(",";","Expression",";",")","Statement"],["for","(","ExpressionNoIn",";",";",")","Statement"],["for","(",";",";",")","Statement"],["for","(","var","VariableDeclarationListNoIn",";","Expression",";","Expression",")","Statement"],["for","(","var","VariableDeclarationListNoIn",";",";","Expression",")","Statement"],["for","(","var","VariableDeclarationListNoIn",";","Expression",";",")","Statement"],["for","(","var","VariableDeclarationListNoIn",";",";",")","Statement"],["for","(","LeftHandSideExpression","in","Expression",")","Statement"],["for","(","var","VariableDeclarationNoIn","in","Expression",")","Statement"]],"ContinueStatement":[["continue",";"],["continue","[noLineTerminator]","Identifier",";"]],"BreakStatement":[["break",";"],["break","[noLineTerminator]","Identifier",";"]],"ReturnStatement":[["return",";"],["return","[noLineTerminator]","Expression",";"]],"WithStatement":[["with","(","Expression",")","Statement"]],"SwitchStatement":[["switch","(","Expression",")","CaseBlock"]],"CaseBlock":[["{","}"],["{","CaseClauses","}"],["{","CaseClauses","DefaultClause","}"],["{","DefaultClause","}"],["{","CaseClauses","DefaultClause","CaseClauses","}"],["{","DefaultClause","CaseClauses","}"]],"CaseClauses":[["CaseClause"],["CaseClauses","CaseClause"]],"CaseClause":[["case","Expression",":","StatementList"],["case","Expression",":"]],"DefaultClause":[["default",":","StatementList"],["default",":"]],"LabelledStatement":[["Identifier",":","Statement"]],"ThrowStatement":[["throw","[noLineTerminator]","Expression",";"]],"TryStatement":[["try","Block","Catch"],["try","Block","Finally"],["try","Block","Catch","Finally"]],"Catch":[["catch","(","Identifier",")","Block"]],"Finally":[["finally","Block"]],"DebuggerStatement":[["debugger",";"]],"FunctionDeclaration":[["function","Identifier","(","FormalParameterList",")","{","FunctionBody","}"],["function","Identifier","(",")","{","FunctionBody","}"]],"FunctionExpression":[["function","Identifier","(","FormalParameterList",")","{","FunctionBody","}"],["function","(","FormalParameterList",")","{","FunctionBody","}"],["function","Identifier","(",")","{","FunctionBody","}"],["function","(",")","{","FunctionBody","}"]],"FormalParameterList":[["Identifier"],["FormalParameterList",",","Identifier"]],"FunctionBody":[["SourceElements"],[""]],"Program":[["SourceElements"],[""]],"SourceElements":[["SourceElement"],["SourceElements","SourceElement"]],"SourceElement":[["Statement"],["FunctionDeclaration"]]};

        var currentRule ;


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
            if( current.$noLineTerminator && haveLineTerminator )
            {            
                this.insertSymbol(new Symbol(";", ";"));
                return this.insertSymbol(symbol);
            }
            while(!current[symbol.name] && current["$reduce"])
            {
                var count = current["$count"];
                var newsymbol = new Symbol(current["$reduce"]);
                while(count--) newsymbol.childNodes.push(symbolStack.pop()),statusStack.pop();
                current = statusStack[statusStack.length-1];
                //newsymbol.childNodes.reverse();
                this.insertSymbol(newsymbol);
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
                if(symbolStack.length > 0 && current[";"]) {
                    this.insertSymbol(new Symbol(";", ";"));
                    return this.grammarTree;
                }
            
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
        var haveLineTerminator = false;
        
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
                        haveLineTerminator = false ;
                        return true;
                    }
                    else return false;
                }))
                    continue;
            if( (token["Keyword"]||token["Punctuator"]||token["DivPunctuator"]) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
                useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(),token),haveLineTerminator);
                haveLineTerminator = false ;
            }
            
        }
        return this.syntacticalParser.grammarTree;
    }

}