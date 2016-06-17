//Generated on 6/17/2016 6:11:34 PM by the SCION SCXML compiler
module.exports = (function (_x,_sessionid,_ioprocessors,In){
   var _name = 'disconnect';    
    
    
    
    
    
    
    
    
    
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
    
    
    function $cond_line_5_column_126(_event){
        return _event.data && _event.data.user && _event.data.password;
    };
    $cond_line_5_column_126.tagname='undefined';
    $cond_line_5_column_126.line=5;
    $cond_line_5_column_126.column=126;
    
    
    function $cond_line_6_column_116(_event){
        return !_event.data || !_event.data.user || !_event.data.password;
    };
    $cond_line_6_column_116.tagname='undefined';
    $cond_line_6_column_116.line=6;
    $cond_line_6_column_116.column=116;
    
    
    function $script_line_10_column_11(_event){
        run(r.xmpp.connect, _event.data)
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
    
    
    function $script_line_29_column_17(_event){
        on(r.xmpp.disconnected, "disconnect")
    };
    $script_line_29_column_17.tagname='script';
    $script_line_29_column_17.line=29;
    $script_line_29_column_17.column=17;
    
    
    function $script_line_34_column_12(_event){
        run(r.profile.request, _event.data.user, true)
    };
    $script_line_34_column_12.tagname='script';
    $script_line_34_column_12.line=34;
    $script_line_34_column_12.column=12;
    
    
    function $cond_line_36_column_79(_event){
        return !_event.data.handle;
    };
    $cond_line_36_column_79.tagname='undefined';
    $cond_line_36_column_79.line=36;
    $cond_line_36_column_79.column=79;
    
    
    function $cond_line_37_column_78(_event){
        return _event.data.handle;
    };
    $cond_line_37_column_78.tagname='undefined';
    $cond_line_37_column_78.line=37;
    $cond_line_37_column_78.column=78;
    
    
    function $script_line_41_column_12(_event){
        run(r.profile.update, _event.data)
    };
    $script_line_41_column_12.tagname='script';
    $script_line_41_column_12.line=41;
    $script_line_41_column_12.column=12;
    
    
    function $script_line_48_column_12(_event){
        setScene('signUp')
    };
    $script_line_48_column_12.tagname='script';
    $script_line_48_column_12.line=48;
    $script_line_48_column_12.column=12;
    
    
    function $script_line_54_column_12(_event){
        setScene("logged")
    };
    $script_line_54_column_12.tagname='script';
    $script_line_54_column_12.line=54;
    $script_line_54_column_12.column=12;
    
    
    function $script_line_59_column_12(_event){
        run(r.storage.save, _event.data)
    };
    $script_line_59_column_12.tagname='script';
    $script_line_59_column_12.line=59;
    $script_line_59_column_12.column=12;
    
    
    return {
        "initial": "Load_Model",
        "name": "disconnect",
        "{http://www.w3.org/2000/xmlns/}": "http://www.w3.org/2005/07/scxml",
        "$type": "scxml",
        "states": [
            {
                "id": "Load_Model",
                "onEntry": $script_line_3_column_11,
                "transitions": [
                    {
                        "cond": $cond_line_5_column_126,
                        "event": "success",
                        "target": "Connect"
                    },
                    {
                        "cond": $cond_line_6_column_116,
                        "event": "success",
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
                        "target": "Connected"
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
                "id": "Connected",
                "initial": "Update_Model",
                "onEntry": $script_line_29_column_17,
                "transitions": [
                    {
                        "event": "disconnect",
                        "target": "PromoScene"
                    }
                ],
                "states": [
                    {
                        "id": "Load_Profile",
                        "onEntry": $script_line_34_column_12,
                        "transitions": [
                            {
                                "cond": $cond_line_36_column_79,
                                "event": "success",
                                "target": "SignUpScene"
                            },
                            {
                                "cond": $cond_line_37_column_78,
                                "event": "success",
                                "target": "LoggedScene"
                            }
                        ]
                    },
                    {
                        "id": "Register_Profile",
                        "onEntry": $script_line_41_column_12,
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
                        "id": "SignUpScene",
                        "onEntry": $script_line_48_column_12,
                        "transitions": [
                            {
                                "event": "success",
                                "target": "Register_Profile"
                            }
                        ]
                    },
                    {
                        "id": "LoggedScene",
                        "onEntry": $script_line_54_column_12
                    },
                    {
                        "id": "Update_Model",
                        "onEntry": $script_line_59_column_12,
                        "transitions": [
                            {
                                "event": "success",
                                "target": "Load_Profile"
                            }
                        ]
                    }
                ]
            }
        ],
        "$deserializeDatamodel": $deserializeDatamodel,
        "$serializeDatamodel": $serializeDatamodel
    };});
