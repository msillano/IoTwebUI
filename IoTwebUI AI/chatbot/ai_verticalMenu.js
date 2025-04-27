// ================ MENU STRUCTURE DEFINITIONS

const simpleMenuData = 
       [{
        // menu radio scelta modello AI, label dinamica		   
        label: "AI Model " ,
        key: "model",
        children: [
// ============================ MODEL menu LIST:		
// Any children is an AI model:	interface, logic, config definitions:	
		        {
                label: "deepseek-chat", // MODEL seepseek-chat
                name: "modelGroup",     // don't change
                value: "deepseek-chat",
                type: "radio",          // don't change
                checked: true,         
                callback: (value) => {
// required					
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
// this model can use TOOLS:  so enable TOOLS					
					if (aiConfig.IoTwebUIok)                     // if REST ok
                        setMenuStatus("toolUse",  'on', true);   // tools available
				    else
                        setMenuStatus("toolUse",  'off', false); // else tools disabled
// this model can use the temperature param: enabled					
					setMenuStatus("tempRadio", null, true);
// all Config data for This model:					
                    if (aiConfig.model != value) {
						// per ogni modello, scelte conseguenziali:						
                        updateConfig({
                            provider: 'deepseek',
                            baseURL: 'https://api.deepseek.com',
                            apiKey: 'API_KEY_DEEPSEEK',  // key is in environment
                            model: value,
                            enableTuyaTools: true,
							quirkMaxCompletion: false,  // use max_tokens, not max_completion_tokens
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",        // don't change
                label: "*deepseek-reasoner", // asterisk: no TOOL
                name: "modelGroup",   // don't change
                value: "deepseek-reasoner",  // MODEL seepseek-reasoner
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
 					simpleMenuData[0].label = "AI: "+ value;
// no TOOLS: set OFF and disabled					
                    setMenuStatus("toolUse", 'off', false);
// this model can use temperature param: enabled					
 					setMenuStatus("tempRadio",null, true);
// all Config data for This model:					
                    if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'deepseek',
                            baseURL:  'https://api.deepseek.com',
                            apiKey:   'API_KEY_DEEPSEEK',
                            model:    value,
                            enableTuyaTools: false,
							quirkMaxCompletion: false,
                        });
                    }
                },
                disabled: false
            }, {
                type:  "radio",
                label: "deepseek-llama",
                name:  "modelGroup",
                value: "DeepSeek-R1-Distill-Llama-70B",
                checked: false,
                callback: (value) => {
// required
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
// this model can use TOOLS:  so enable TOOLS					
 					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
// this model can use temperature param: enabled					
 					setMenuStatus("tempRadio",null, true);
                    if (aiConfig.model != value) {
                        updateConfig({
                            provider:  'groq-deepseek',
                            baseURL:   'https://api.groq.com/openai/v1',
                            apiKey:    'API_KEY_GROQ',
                            model:      value,
                            enableTuyaTools: true,
							quirkMaxCompletion: false,
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "GPT3.5-turbo",
                name: "modelGroup",
                value: "gpt-3.5-turbo",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
 					simpleMenuData[0].label = "AI: "+ value;
 					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
					setMenuStatus("tempRadio",null, true);
                   if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'openai',
                            baseURL: 'https://api.openai.com/v1',
                            apiKey: "API_KEY_OPENAI",
                            model: value,
                            enableTuyaTools: true,
							quirkMaxCompletion: true,  // this requires max_completion_tokens
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "o4-mini",
                name: "modelGroup",
                value: "o4-mini",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
 					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
					updateRadioSelection("tempGroup", "1")   // set temperature to 1 
					setMenuStatus("tempRadio",null, false);  // temperature disabled
                   if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'openai',
                            baseURL: 'https://api.openai.com/v1',
                            apiKey: "API_KEY_OPENAI",
                            model: value,
							temperature: 1,           // this requires FIXED temperature (1)!
                            enableTuyaTools: true,
							quirkMaxCompletion: true,
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "*Gemma2",   // asterisk  => no tools
                name: "modelGroup",
                value: "gemma2-9b-it",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
// tools disable					
                     setMenuStatus("toolUse", 'off', false);
					setMenuStatus("tempRadio",null, true);
                    if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'groq-google',
                            baseURL: 'https://api.groq.com/openai/v1',
                            apiKey: 'API_KEY_GROQ',
                            model: value,
                            enableTuyaTools: false,    // no tools for this
							quirkMaxCompletion: false,
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "Llama-3.3",
                name: "modelGroup",
                value: "Llama-3.3-70B-Versatile",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
 					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
 					setMenuStatus("tempRadio",null, true);
                   if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'groq-meta',
                            baseURL: 'https://api.groq.com/openai/v1',
                            apiKey: 'API_KEY_GROQ',
                            model: value,
                            enableTuyaTools: true,
							quirkMaxCompletion: false,
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "mistral-saba",
                name: "modelGroup",
                value: "mistral-saba-24b",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
  					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
 					setMenuStatus("tempRadio",null, true);
                  if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'groq-meta',
                            baseURL: 'https://api.groq.com/openai/v1',
                            apiKey: 'API_KEY_GROQ',
                            model: value,
                            enableTuyaTools: true,
							quirkMaxCompletion: false,
                        });
                    }
                },
                disabled: false
            }, {
                type: "radio",
                label: "qwen",
                name: "modelGroup",
                value: "qwen-qwq-32b",
                checked: false,
                callback: (value) => {
                    updateRadioSelection(name, value);
					simpleMenuData[0].label = "AI: "+ value;
 					if (aiConfig.IoTwebUIok)
                        setMenuStatus("toolUse",  'on', true);
				    else
                        setMenuStatus("toolUse",  'off', false);
 					setMenuStatus("tempRadio", null, true);
                  if (aiConfig.model != value) {
                        updateConfig({
                            provider: 'groq-alibaba',
                            baseURL: 'https://api.groq.com/openai/v1',
                            apiKey: 'API_KEY_GROQ',
                            model: value,
                            enableTuyaTools: true,
                        });
                    }
                },
                disabled: false
            },

        ], // children model ends
        disabled: false
    }, 
// ========================= MODELS menu ENDS	
	
	{
        label: "Tuya Tools",
        key: "toolUse",
        state: "OFF",
        indicator: {
            on: "✅",
            off: "❌"
        },
	    callback: (item) => {
            item.state = (item.state === "ON" )? "OFF" : "ON"; // toggle
            updateConfig({
                enableTuyaTools: (item.state == "ON")
            });
            updateSimpleMenu();
        },
      disabled: false,
	},
	
       {
        label: "Temperature",
        key: "tempRadio",
        children: [{
                type: "radio",
                label: "Temperature 0",
                name: "tempGroup",
                value: "0",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 0.2",
                name: "tempGroup",
                value: "0.2",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 0.4",
                name: "tempGroup",
                value: "0.4",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 0,6",
                name: "tempGroup",
                value: "0.6",
                checked: true,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 0.8",
                name: "tempGroup",
                value: "0.8",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 1",
                name: "tempGroup",
                value: "1",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 1.2",
                name: "tempGroup",
                value: "1.2",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 1.4",
                name: "tempGroup",
                value: "1.4",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            }, {
                type: "radio",
                label: "Temperature 1.6",
                name: "tempGroup",
                value: "1.6",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        temperature: Number(value)
                    });
                    console.log("Opzione Temperature:", value);
                },
                disabled: false
            },
        ],
        disabled: false
    },
    {
        label: "Max token",
        key: "tokenRadio",
        children: [{
                type: "radio",
                label: "Token 128",
                name: "tknGroup",
                value: "128",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens:  Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 256",
                name: "tknGroup",
                value: "256",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens: Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 512",
                name: "tknGroup",
                value: "512",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens:  Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 1024",
                name: "tknGroup",
                value: "1024",
                checked: true,
                callback: (value) => {
                    updateConfig({
                        max_tokens:  Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 2048",
                name: "tknGroup",
                value: "2048",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens: Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 4096",
                name: "tknGroup",
                value: "4096",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens: Number(value)
                    });
                },
                disabled: false
            }, {
                type: "radio",
                label: "Token 8192",
                name: "tknGroup",
                value: "8192",
                checked: false,
                callback: (value) => {
                    updateConfig({
                        max_tokens:  Number(value)
                    });
                },
                disabled: false
            },
        ],
        disabled: false
    },
    {
        label: "Deterministico (seed)",
        key: "serverSeed",
        state: "OFF",
        indicator: {
            on: "✅",
            off: "❌"
        },
	    callback: (item) => {
            item.state = (item.state === "ON" )? "OFF" : "ON"; // toggle
            updateConfig({
                seed: (item.state == "ON")
            });
            updateSimpleMenu();
        },
    },
    {
        label: "Debug (server trace)",
        key: "serverDbg",
        state: "OFF",
        indicator: {
            on: "🐛",
            off: "⚪"
        },
		 callback: (item) => {
                            item.state = item.state === "ON" ? "OFF" : "ON";
							 updateConfig(
							 { enableDebugMode: (item.state == "ON")});
                            updateSimpleMenu();
                        },
         disabled: false
    },
	   {
        label: "Context clear",
        key: "serverDbg",
        callback: (item) => {
		            proxyClearContext(sessionId)
				   .then((result) => addMessageReply("Server", result.reply));	
                          },
         disabled: false
    },
	/*
	// debug only
   {
        label: "Test WebUI",
        key: "serverDbg",
        callback: (item) => {
		           testIoTwebUI();
                          },
         disabled: false
    },
*/
];
// ============================ UTILITIES
// Aggiornamento automatico all'avvio
function init_SimpleMenu() {
    updateSimpleMenu();
	// aggiorna menu con i dati in confg (default)
    simpleMenuData[0].label = "AI: "+ aiConfig.model;
    let result =  setMenuChoicee('model', aiConfig.model);
	    if (aiConfig.IoTwebUIok)
           result |= setMenuChoicee('toolUse',  aiConfig.enableTuyaTools?"ON":"OFF");
	    else 
	       setMenuStatus("toolUse", 'off', false);
        result |= setMenuChoicee('serverDbg',  aiConfig.enableDebugMode?"ON":"OFF");
	    result |= setMenuChoicee('tempRadio',  aiConfig.temperature.toString());
	    result |= setMenuChoicee('tokenRadio', aiConfig.max_tokens);
        result |= setMenuChoicee('seed'  ,     aiConfig.seed?"ON":"OFF");
// se necessario, update		
     if (result)
        updateSimpleMenu(); // key, name
}
