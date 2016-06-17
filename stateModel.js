//Generated on 6/17/2016 1:26:15 PM by the SCION SCXML compiler
module.exports = (function (_x,_sessionid,_ioprocessors,In){
   var _name = 'success';    
    
    
    
    
    
    
    
    
    
    function $deserializeDatamodel($serializedDatamodel){
    
        $scion_early_binding_datamodel_has_fired = true;
    }
    
    function $serializeDatamodel(){
       return {
    
       };
    }
    
    function $script_line_3_column_11(_event){
        run(r.storage.load);setScene('launch')
    };
    $script_line_3_column_11.tagname='script';
    $script_line_3_column_11.line=3;
    $script_line_3_column_11.column=11;
    
    
    function $script_line_10_column_11(_event){
        run(r.xmpp.login, _event.data)
    };
    $script_line_10_column_11.tagname='script';
    $script_line_10_column_11.line=10;
    $script_line_10_column_11.column=11;
    
    
    function $script_line_17_column_11(_event){
        setScene('promo')
    };
    $script_line_17_column_11.tagname='script';
    $script_line_17_column_11.line=17;
    $script_line_17_column_11.column=11;
    
    
    function $script_line_23_column_11(_event){
        run(r.xmpp.register, _event.data)
    };
    $script_line_23_column_11.tagname='script';
    $script_line_23_column_11.line=23;
    $script_line_23_column_11.column=11;
    
    
    function $script_line_29_column_11(_event){
        run(r.xmpp.request, _event.data.user)
    };
    $script_line_29_column_11.tagname='script';
    $script_line_29_column_11.line=29;
    $script_line_29_column_11.column=11;
    
    
    function $cond_line_32_column_75(_event){
        return !response.handle;
    };
    $cond_line_32_column_75.tagname='undefined';
    $cond_line_32_column_75.line=32;
    $cond_line_32_column_75.column=75;
    
    
    function $cond_line_33_column_74(_event){
        return response.handle;
    };
    $cond_line_33_column_74.tagname='undefined';
    $cond_line_33_column_74.line=33;
    $cond_line_33_column_74.column=74;
    
    
    function $script_line_37_column_11(_event){
        setScene('signUp')
    };
    $script_line_37_column_11.tagname='script';
    $script_line_37_column_11.line=37;
    $script_line_37_column_11.column=11;
    
    
    function $script_line_43_column_11(_event){
        run(xmpp.update, _event.data)
    };
    $script_line_43_column_11.tagname='script';
    $script_line_43_column_11.line=43;
    $script_line_43_column_11.column=11;
    
    
    function $script_line_50_column_11(_event){
        setScene('logged')
    };
    $script_line_50_column_11.tagname='script';
    $script_line_50_column_11.line=50;
    $script_line_50_column_11.column=11;
    
    
    return {
        "initial": "Load_Data",
        "name": "success",
        "{http://www.w3.org/2000/xmlns/}": "http://www.w3.org/2005/07/scxml",
        "$type": "scxml",
        "states": [
            {
                "id": "Load_Data",
                "onEntry": $script_line_3_column_11,
                "transitions": [
                    {
                        "event": "success",
                        "target": "Connect"
                    },
                    {
                        "event": "failure",
                        "target": "PromoScene"
                    }
                ]
            },
            {
                "id": "Connect",
                "onEntry": $script_line_10_column_11,
                "transitions": [
                    {
                        "event": "failure",
                        "target": "PromoScene"
                    },
                    {
                        "event": "success",
                        "target": "Load_Profile"
                    }
                ]
            },
            {
                "id": "PromoScene",
                "onEntry": $script_line_17_column_11,
                "transitions": [
                    {
                        "event": "success",
                        "target": "Register"
                    }
                ]
            },
            {
                "id": "Register",
                "onEntry": $script_line_23_column_11,
                "transitions": [
                    {
                        "event": "success",
                        "target": "Connect"
                    }
                ]
            },
            {
                "id": "Load_Profile",
                "onEntry": $script_line_29_column_11,
                "transitions": [
                    {
                        "event": "failure",
                        "target": "PromoScene"
                    },
                    {
                        "cond": $cond_line_32_column_75,
                        "event": "success",
                        "target": "SignUpScene"
                    },
                    {
                        "cond": $cond_line_33_column_74,
                        "event": "success",
                        "target": "LoggedScene"
                    }
                ]
            },
            {
                "id": "SignUpScene",
                "onEntry": $script_line_37_column_11,
                "transitions": [
                    {
                        "event": "success",
                        "target": "Register_Profile"
                    }
                ]
            },
            {
                "id": "Register_Profile",
                "onEntry": $script_line_43_column_11,
                "transitions": [
                    {
                        "event": "failure",
                        "target": "SignUpScene"
                    },
                    {
                        "event": "success",
                        "target": "Load_Profile"
                    }
                ]
            },
            {
                "id": "LoggedScene",
                "initial": "new_node71",
                "onEntry": $script_line_50_column_11,
                "states": [
                    {
                        "id": "new_node68"
                    },
                    {
                        "id": "new_node71"
                    }
                ]
            }
        ],
        "$deserializeDatamodel": $deserializeDatamodel,
        "$serializeDatamodel": $serializeDatamodel
    };});
