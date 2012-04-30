var rules = 
{
    "IdentifierName":[["Identifier"], ["break"], ["do"], ["instanceof"], ["typeof"], ["case"], ["else"], ["new"], ["var"], ["catch"], ["finally"], ["return"], ["void"], ["continue"], ["for"], ["switch"], ["while"], ["debugger"], ["function"], ["this"], ["with"], ["default"], ["if"], ["throw"], ["delete"], ["in"], ["try"]], 
    "Literal":[["NullLiteral"], ["BooleanLiteral"], ["NumericLiteral"], ["StringLiteral"], ["RegularExpressionLiteral"]], 
    "PrimaryExpression":[["this"], ["Identifier"], ["Literal"], ["ArrayLiteral"], ["ObjectLiteral"], ["(", "Expression", ")"]], 
    "ArrayLiteral":[["[", "]"], ["[", "Elision", "]"], ["[", "ElementList", "]"], ["[", "ElementList", ",", "]"], ["[", "ElementList", ",", "Elision", "]"]], 
    "ElementList":[["AssignmentExpression"], ["Elision", "AssignmentExpression"], ["ElementList", ",", "AssignmentExpression"], ["ElementList", ",", "Elision", "AssignmentExpression"]], 
    "Elision":[[","], ["Elision", ","]], 
    "ObjectLiteral":[["{", "}"], ["{", "PropertyNameAndValueList", "}"], ["{", "PropertyNameAndValueList", ",", "}"]], 
    "PropertyNameAndValueList":[["PropertyAssignment"], ["PropertyNameAndValueList", ",", "PropertyAssignment"]], 
    "PropertyAssignment":[["PropertyName", ":", "AssignmentExpression"], ["get", "PropertyName", "(", ")", "{", "FunctionBody", "}"], ["set", "PropertyName", "(", "PropertySetParameterList", ")", "{", "FunctionBody", "}"]], 
    "PropertyName":[["IdentifierName"], ["StringLiteral"], ["NumericLiteral"]], 
    "PropertySetParameterList":[["Identifier"]], 
    "MemberExpression":[["PrimaryExpression"], ["FunctionExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]], 
    "NewExpression":[["MemberExpression"], ["new", "NewExpression"]], 
    "CallExpression":[["MemberExpression", "Arguments"], ["CallExpression", "Arguments"], ["CallExpression", "[", "Expression", "]"], ["CallExpression", ".", "IdentifierName"]], 
    "Arguments":[["(", ")"], ["(", "ArgumentList", ")"]], 
    "ArgumentList":[["AssignmentExpression"], ["ArgumentList", ",", "AssignmentExpression"]], 
    "LeftHandSideExpression":[["NewExpression"], ["CallExpression"]], 
    "PostfixExpression":[["LeftHandSideExpression"], ["LeftHandSideExpression", "[noLineTerminator]", "++"], ["LeftHandSideExpression", "[noLineTerminator]", "--"]], 
    "UnaryExpression":[["PostfixExpression"], ["delete", "UnaryExpression"], ["void", "UnaryExpression"], ["typeof", "UnaryExpression"], ["++", "UnaryExpression"], ["--", "UnaryExpression"], ["+", "UnaryExpression"], ["-", "UnaryExpression"], ["~", "UnaryExpression"], ["!", "UnaryExpression"]], 
    "MultiplicativeExpression":[["MultiplicativeExpression", "[div]", "/", "UnaryExpression"], ["UnaryExpression"], ["MultiplicativeExpression", "*", "UnaryExpression"], ["MultiplicativeExpression", "%", "UnaryExpression"]], 
    "AdditiveExpression":[["MultiplicativeExpression"], ["AdditiveExpression", "+", "MultiplicativeExpression"], ["AdditiveExpression", "-", "MultiplicativeExpression"]], 
    "ShiftExpression":[["AdditiveExpression"], ["ShiftExpression", "<<", "AdditiveExpression"], ["ShiftExpression", ">>", "AdditiveExpression"], ["ShiftExpression", ">>>", "AdditiveExpression"]], 
    "RelationalExpression":[["ShiftExpression"], ["RelationalExpression", "<", "ShiftExpression"], ["RelationalExpression", ">", "ShiftExpression"], ["RelationalExpression", "<=", "ShiftExpression"], ["RelationalExpression", ">=", "ShiftExpression"], ["RelationalExpression", "instanceof", "ShiftExpression"], ["RelationalExpression", "in", "ShiftExpression"]], 
    "RelationalExpressionNoIn":[["ShiftExpression"], ["RelationalExpressionNoIn", "<", "ShiftExpression"], ["RelationalExpressionNoIn", ">", "ShiftExpression"], ["RelationalExpressionNoIn", "<=", "ShiftExpression"], ["RelationalExpressionNoIn", ">=", "ShiftExpression"], ["RelationalExpressionNoIn", "instanceof", "ShiftExpression"]], 
    "EqualityExpression":[["RelationalExpression"], ["EqualityExpression", "==", "RelationalExpression"], ["EqualityExpression", "!=", "RelationalExpression"], ["EqualityExpression", "===", "RelationalExpression"], ["EqualityExpression", "!==", "RelationalExpression"]], 
    "EqualityExpressionNoIn":[["RelationalExpressionNoIn"], ["EqualityExpressionNoIn", "==", "RelationalExpressionNoIn"], ["EqualityExpressionNoIn", "!=", "RelationalExpressionNoIn"], ["EqualityExpressionNoIn", "===", "RelationalExpressionNoIn"], ["EqualityExpressionNoIn", "!==", "RelationalExpressionNoIn"]], 
    "BitwiseANDExpression":[["EqualityExpression"], ["BitwiseANDExpression", "&", "EqualityExpression"]], 
    "BitwiseANDExpressionNoIn":[["EqualityExpressionNoIn"], ["BitwiseANDExpressionNoIn", "&", "EqualityExpressionNoIn"]], 
    "BitwiseXORExpression":[["BitwiseANDExpression"], ["BitwiseXORExpression", "^", "BitwiseANDExpression"]], 
    "BitwiseXORExpressionNoIn":[["BitwiseANDExpressionNoIn"], ["BitwiseXORExpressionNoIn", "^", "BitwiseANDExpressionNoIn"]], 
    "BitwiseORExpression":[["BitwiseXORExpression"], ["BitwiseORExpression", "|", "BitwiseXORExpression"]], 
    "BitwiseORExpressionNoIn":[["BitwiseXORExpressionNoIn"], ["BitwiseORExpressionNoIn", "|", "BitwiseXORExpressionNoIn"]], 
    "LogicalANDExpression":[["BitwiseORExpression"], ["LogicalANDExpression", "&&", "BitwiseORExpression"]], 
    "LogicalANDExpressionNoIn":[["BitwiseORExpressionNoIn"], ["LogicalANDExpressionNoIn", "&&", "BitwiseORExpressionNoIn"]], 
    "LogicalORExpression":[["LogicalANDExpression"], ["LogicalORExpression", "||", "LogicalANDExpression"]], 
    "LogicalORExpressionNoIn":[["LogicalANDExpressionNoIn"], ["LogicalORExpressionNoIn", "||", "LogicalANDExpressionNoIn"]], 
    "ConditionalExpression":[["LogicalORExpression"], ["LogicalORExpression", "?", "AssignmentExpression", ":", "AssignmentExpression"]], 
    "ConditionalExpressionNoIn":[["LogicalORExpressionNoIn"], ["LogicalORExpressionNoIn", "?", "AssignmentExpressionNoIn", ":", "AssignmentExpressionNoIn"]], 
    "AssignmentExpression":[["ConditionalExpression"], ["LeftHandSideExpression", "[div]", "AssignmentOperator", "AssignmentExpression"]], 
    "AssignmentExpressionNoIn":[["LeftHandSideExpression", "[div]", "AssignmentOperator", "AssignmentExpressionNoIn"], ["ConditionalExpressionNoIn"]], 
    "AssignmentOperator":[["="], ["*="], ["/="], ["%="], ["+="], ["-="], ["<<="], [">>="], [">>>="], ["&="], ["^="], ["|="]], 
    "Expression":[["AssignmentExpression"], ["Expression", ",", "AssignmentExpression"]], 
    "ExpressionNoIn":[["AssignmentExpressionNoIn"], ["ExpressionNoIn", ",", "AssignmentExpressionNoIn"]], 
    "Statement":[["Block"], ["VariableStatement"], ["EmptyStatement"], ["ExpressionStatement"], ["IfStatement"], ["IterationStatement"], ["ContinueStatement"], ["BreakStatement"], ["ReturnStatement"], ["WithStatement"], ["LabelledStatement"], ["SwitchStatement"], ["ThrowStatement"], ["TryStatement"], ["DebuggerStatement"]], 
    "Block":[["{", "}"], ["{", "StatementList", "}"]], 
    "StatementList":[["FunctionDeclaration"], ["Statement"], ["StatementList", "Statement"], ["StatementList", "FunctionDeclaration"]], 
    "VariableStatement":[["var", "VariableDeclarationList", ";"]], 
    "VariableDeclarationList":[["VariableDeclaration"], ["VariableDeclarationList", ",", "VariableDeclaration"]], 
    "VariableDeclarationListNoIn":[["VariableDeclarationNoIn"], ["VariableDeclarationListNoIn", ",", "VariableDeclarationNoIn"]], 
    "VariableDeclaration":[["Identifier"], ["Identifier", "Initialiser"]], 
    "VariableDeclarationNoIn":[["Identifier"], ["Identifier", "InitialiserNoIn"]], 
    "Initialiser":[["=", "AssignmentExpression"]], 
    "InitialiserNoIn":[["=", "AssignmentExpressionNoIn"]], 
    "EmptyStatement":[[";"]], 
    "ExpressionStatement":[["Expression", "[lookaheadno{{,function}]", ";"]], 
    "IfStatement":[["if", "(", "Expression", ")", "Statement", "else", "Statement"], ["if", "(", "Expression", ")", "Statement"]], 
    "IterationStatement":[["do", "Statement", "while", "(", "Expression", ")", ";"], ["while", "(", "Expression", ")", "Statement"], ["for", "(", "ExpressionNoIn", ";", "Expression", ";", "Expression", ")", "Statement"], ["for", "(", ";", "Expression", ";", "Expression", ")", "Statement"], ["for", "(", "ExpressionNoIn", ";", ";", "Expression", ")", "Statement"], ["for", "(", ";", ";", "Expression", ")", "Statement"], ["for", "(", "ExpressionNoIn", ";", "Expression", ";", ")", "Statement"], ["for", "(", ";", "Expression", ";", ")", "Statement"], ["for", "(", "ExpressionNoIn", ";", ";", ")", "Statement"], ["for", "(", ";", ";", ")", "Statement"], ["for", "(", "var", "VariableDeclarationListNoIn", ";", "Expression", ";", "Expression", ")", "Statement"], ["for", "(", "var", "VariableDeclarationListNoIn", ";", ";", "Expression", ")", "Statement"], ["for", "(", "var", "VariableDeclarationListNoIn", ";", "Expression", ";", ")", "Statement"], ["for", "(", "var", "VariableDeclarationListNoIn", ";", ";", ")", "Statement"], ["for", "(", "LeftHandSideExpression", "in", "Expression", ")", "Statement"], ["for", "(", "var", "VariableDeclarationNoIn", "in", "Expression", ")", "Statement"]], 
    "ContinueStatement":[["continue", ";"], ["continue", "[noLineTerminator]", "Identifier", ";"]], 
    "BreakStatement":[["break", ";"], ["break", "[noLineTerminator]", "Identifier", ";"]], 
    "ReturnStatement":[["return", ";"], ["return", "[noLineTerminator]", "Expression", ";"]], 
    "WithStatement":[["with", "(", "Expression", ")", "Statement"]], 
    "SwitchStatement":[["switch", "(", "Expression", ")", "CaseBlock"]], 
    "CaseBlock":[["{", "}"], ["{", "CaseClauses", "}"], ["{", "CaseClauses", "DefaultClause", "}"], ["{", "DefaultClause", "}"], ["{", "CaseClauses", "DefaultClause", "CaseClauses", "}"], ["{", "DefaultClause", "CaseClauses", "}"]], 
    "CaseClauses":[["CaseClause"], ["CaseClauses", "CaseClause"]], 
    "CaseClause":[["case", "Expression", ":", "StatementList"], ["case", "Expression", ":"]], 
    "DefaultClause":[["default", ":", "StatementList"], ["default", ":"]], 
    "LabelledStatement":[["Identifier", ":", "Statement"]], 
    "ThrowStatement":[["throw", "[noLineTerminator]", "Expression", ";"]], 
    "TryStatement":[["try", "Block", "Catch"], ["try", "Block", "Finally"], ["try", "Block", "Catch", "Finally"]], 
    "Catch":[["catch", "(", "Identifier", ")", "Block"]], 
    "Finally":[["finally", "Block"]], 
    "DebuggerStatement":[["debugger", ";"]], 
    "FunctionDeclaration":[["function", "Identifier", "(", "FormalParameterList", ")", "{", "FunctionBody", "}"], ["function", "Identifier", "(", ")", "{", "FunctionBody", "}"]], 
    "FunctionExpression":[["function", "Identifier", "(", "FormalParameterList", ")", "{", "FunctionBody", "}"], ["function", "(", "FormalParameterList", ")", "{", "FunctionBody", "}"], ["function", "Identifier", "(", ")", "{", "FunctionBody", "}"], ["function", "(", ")", "{", "FunctionBody", "}"]], 
    "FormalParameterList":[["Identifier"], ["FormalParameterList", ",", "Identifier"]], 
    "FunctionBody":[["SourceElements"], [""]], 
    "Program":[["SourceElements"], [""]], 
    "SourceElements":[["SourceElement"], ["SourceElements", "SourceElement"]], "SourceElement":[["Statement"], ["FunctionDeclaration"]]
    
};
function Symbol(symbolName, token)
{
    this.name = symbolName;
    this.token = token;
    this.childNodes = [];
    this. toString  = 
        function(indent)
        {
            if(!indent)
                indent = "";
            if(this.childNodes.length == 1)
                return this.childNodes[0]. toString (indent);
            var str = indent + this.name + (this.token != undefined && this.name != this.token ? ":" + this.token:"") + "\n";
            for(var i = 0;i < this.childNodes.length;i++)
                str += this.childNodes[i]. toString (indent + "    ");
            return str;
        };
}
function SyntacticalParser()
{
    var currentRule;
    var root = 
    {Program:"$"
        
    };
    var hash = 
    {
        
    };
    function visitNode(node)
    {
        hash[JSON.stringify(node)] = node;
        node.$closure = true;
        var queue = Object.getOwnPropertyNames(node);
        while(queue.length)
        {
            var symbolName = queue.shift();
            if(!rules[symbolName])
                continue;
            rules[symbolName].forEach(
                function(rule)
                {
                    if(node[symbolName].$lookahead && node[symbolName].$lookahead.some(
                        function(e)
                        {
                            return e == rule[0];
                        }))
                        return;
                    if(!node[rule[0]])
                        queue.push(rule[0]);
                    var rulenode = node;
                    var lastnode = null;
                    rule.forEach(
                        function(symbol)
                        {
                            if(symbol.match(/\[([^\]]+)\]/))
                            {
                                if(RegExp.$1 == "lookaheadno{{,function}")
                                {
                                    rulenode["$lookahead"] = ["{", "function"];
                                }
                                else
                                    rulenode["$" + RegExp.$1] = true;
                                return;
                            }
                            if(!rulenode[symbol])
                                rulenode[symbol] = 
                                {
                                    
                                };
                            lastnode = rulenode;
                            rulenode = rulenode[symbol];
                        });
                    if(node[symbolName].$lookahead)
                        node[rule[0]].$lookahead = node[symbolName].$lookahead;
                    if(node[symbolName].$div)
                        rulenode.$div = true;
                    rulenode.$reduce = symbolName;
                    rulenode.$count = rule.filter(
                        function(e)
                        {
                            return!e.match(/\[([^\]]+)\]/);
                        }).length;
                });
        }
        for(var p in node)
        {
            if(typeof node[p] != "object" || p.charAt(0) == "$" || node[p].$closure)
                continue;
            if(hash[JSON.stringify(node[p])])
                node[p] = hash[JSON.stringify(node[p])];
            else
            {
                visitNode(node[p]);
            }
        }
    }
    visitNode(root);
    var symbolStack = [];
    var statusStack = [root];
    var current = root;
    this.insertSymbol = 
        function insertSymbol(symbol, haveLineTerminator)
        {
            while(!current[symbol.name] && current["$reduce"])
            {
                var count = current["$count"];
                var newsymbol = new Symbol(current["$reduce"]);
                while(count--)
                    newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
                current = statusStack[statusStack.length - 1];
                this.insertSymbol(newsymbol);
            }
            if(current.$noLineTerminator && haveLineTerminator)
            {
                this.insertSymbol(new Symbol(";", ";"));
                return this.insertSymbol(symbol);
            }
            if(!current[symbol.name] && current[";"] && current[";"]["$reduce"] && (haveLineTerminator || symbol.name == "}"))
            {
                this.insertSymbol(new Symbol(";", ";"));
                return this.insertSymbol(symbol);
            }
            current = current[symbol.name];
            symbolStack.push(symbol), statusStack.push(current);
            if(!current)
                throw new Error();
            return current.$div;
        };
    this.reset = 
        function()
        {
            current = root;
            symbolStack = [];
            statusStack = [root];
        };
    Object.defineProperty(this, "grammarTree", 
    {"get":
        function()
        {
            try
            {
                while(current["$reduce"])
                {
                    var count = current["$count"];
                    var newsymbol = new Symbol(current["$reduce"]);
                    while(count--)
                        newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
                    current = statusStack[statusStack.length - 1];
                    this.insertSymbol(newsymbol);
                }
                if(symbolStack.length > 0 && current[";"])
                {
                    this.insertSymbol(new Symbol(";", ";"));
                    return this.grammarTree;
                }
                if(symbolStack.length != 1 || symbolStack[0].name != "Program")
                    throw new Error();
            }catch(e)
            {
                throw new SyntaxError("Unexpected end of input");
            }
            return symbolStack[0];
        }
        
    });
}
