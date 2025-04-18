# IOTwebUI-AI

**Introduction:**<br>
[Versione italiana](https://github.com/msillano/IoTwebUI/blob/main/IOTwebUI-AI/LEGGIMI.md)

This document introduces the **IOTwebUI-AI** project, a general-purpose chatbot integrated with the Tuya ecosystem.
This versatile environment has been developed to allow more adventurous users to explore and experiment with the potential of artificial intelligence (AI) in combination with IoT devices from the **IoTwebUI** extension. The main objective is to provide a flexible tool for conducting tests and analyses, interacting with existing IoT devices, and experimenting with AI's potential in this context.

```mermaid
%%{init: {'theme': 'neutral'}}%%
graph LR
    subgraph User Interface
        style UI fill:#ccf,stroke:#333,stroke-width:2px
        style UI_JS fill:#f9f,stroke:#333,stroke-width:2px
        style UI_Menu fill:#ccf,stroke:#333,stroke-width:2px
        UI[HTML/CSS] --> UI_JS(UI JS Functions);
        UI_Menu(ai_verticalMenu.js) -- Configures --> UI_JS;
        UI_JS -- Calls --> Proxy(ai_proxy);
    end

    subgraph Backend
        style Proxy fill:#9cf,stroke:#333,stroke-width:2px
        style AIServer fill:#fcc,stroke:#333,stroke-width:2px
        style HistoryDB fill:#f9c,stroke:#333,stroke-width:2px
        style ContextFiles fill:#cff,stroke:#333,stroke-width:2px
        Proxy -- Calls --> AIServer;
        AIServer -- Uses AI Models from --> AIModels(AI Models);
        AIServer -- Manages --> HistoryDB(History Storage);
        AIServer -- Manages --> ContextFiles(Context Documents Storage);
        AIServer -- Calls TOOL via REST --> IoT(IoT / Tuya);
    end

    subgraph AI Models
        style AIModels fill:#cf9,stroke:#333,stroke-width:2px
        style OpenAI fill:#ace,stroke:#333,stroke-width:2px
        AIModels -- Provides API --> OpenAI;
        OpenAI -- Contains --> Deepseek;
        OpenAI -- Contains --> GPTModels[Other OpenAI Models];
     end

    subgraph IoT / Tuya
        style IoT fill:#9fc,stroke:#333,stroke-width:2px
        style IoTWebUI fill:#afe,stroke:#333,stroke-width:2px
        IoT -- Interacts with --> IoTWebUI;
        IoTWebUI -- Controls --> TuyaDevices[Tuya Devices];
        IoTWebUI -- Executes --> TuyaAutomations[Tuya Automations / IOTwebUI Rules];
    end
```

### Primary Objective: Experimentation of AI and Integration with Tuya

The primary objective of **IOTwebUI-AI** is experimentation with different artificial intelligence configurations (models), with direct management of context, conversation history, and tools (TOOLs) to analyze and interact with Tuya devices. This includes:

* **Assisted Documentation:** Leveraging AI to generate documentation, summaries, or analyses based on device information.
* **Assisted Automation:** Leveraging AI to generate algorithms and automations to manage complex situations that are not immediately solvable, taking into account the constraints of Tuya 'scenes'.
* **Assisted Maintenance:** Another area where AI's contribution can bring benefits in terms of optimizations and savings.
* **Exploration of Future Applications:** Testing different interactions and automation,  combining the capabilities of **AI** with the control and management of **Tuya** + **IoTwebUI** devices.

In more detail, **IOTwebUI-AI** has been designed to test:

* **Optimization of Prompts and Interactions:** Experimenting with different instructions (prompts) to obtain the desired responses and actions from the AI in relation to IoT devices.
* **IoT Context Management:** Evaluating the effectiveness of integrating specific information about devices and their status into conversations with the AI.
* **Use of IoT Tools:** Developing and testing specific tools to interact with the Tuya ecosystem via AI (e.g., intelligent voice commands, automations based on AI analysis...).

### High-Level Architecture:

The **IOTwebUI-AI** chatbot is based on a modular architecture designed to maximize flexibility and simplify interaction with AI and Tuya devices:

1.  **AI Models (Cloud or Local):** The system can utilize many artificial intelligence models, mainly cloud-based, through the OpenAI API, to evaluate the different natural language processing capabilities and identify the best model for each task. The architecture is designed to potentially integrate local models as well.

2.  **OpenAI API (Unified Access Point):** Access to the various compatible AI models is through the standard OpenAI API interface, providing a consistent method for interacting with different artificial intelligences.

3.  **`ai_server` (Dedicated Local Server):** A local server, called "`ai_server`" and implemented with Express, acts as an intermediary between the user interface and the OpenAI API. This component manages:
    * Communications with the OpenAI API, including request formatting and response handling.
    * Accessory functionalities such as conversation history storage and the management of context information to be used.
    * Support for multiple user sessions.
    * The implementation of specific TOOLs for interaction with the Tuya ecosystem via REST communications with **IOTwebUI**.

4.  **`ai_proxy` (Interface Library):** This JavaScript library provides a simplified interface for interacting with the "`ai_server`". It offers asynchronous functions that abstract the complex calls to the server, facilitating the development of the user interface. The main functions include the management of configuration, history, context, and calls to the OpenAI API (text and streaming).

5.  **JavaScript Functions for the User Interface:** A set of JavaScript functions (`IOTwebUIAI.js`) dedicated to the HTML interface handles:
    * Translating user actions into calls to the "`ai_proxy`" functions.
    * Managing the visual aspect of the interface and the presentation of information.
    * Performing format conversions such as Markdown and Mermaid for effective visualization.
    * Using the "`ai_verticalMenu.js`" module for managing the interface menus.

6.  **User Interface (HTML + CSS):** The user interface (`IOTwebUIAI.html`) is built with HTML and CSS for a flexible structure and style. Few JavaScript functions manage basic dynamic interactions, such as the collapsible menu.
    To facilitate customizations, the menu definition is in a separate file: "`ai_verticalMenu.js`".

### Flexibility and Power for Experimentation with Tuya and AI:

The IOTwebUI-AI chatbot offers considerable flexibility for experimentation in the field of IoT and AI, allowing direct user control of all major factors:

* **Dynamic Configuration:** The configuration of the AI model and access settings can be dynamically modified globally.
* **Independent Session and Model Management:** Each user session operates independently, allowing for simultaneous testing of different configurations.
* **Context and History per Session:** Context information related to Tuya devices and conversation history are managed for each session.
* **Automatic Cleaning:** Session data (history, context) is automatically deleted after 24 hours.
* **Advanced Integration with Tuya:** One of the key features is the integration of specific **TOOLs** for interacting with the Tuya ecosystem. This allows:
    * Access the status and information of real and virtual _Tuya devices_ and _IoTwebUI x-devices_.
    * Send commands to devices (_"tap-to-run" Tuya_ and _IOTwebUI "RULES"_).
    * Directly update the status values of _IoTwebUI x-devices_.
    * Develop intelligent automation scenarios based on AI analysis of device data.
    * Experiment with new human-machine interaction modes for managing smart homes and other IoT devices.

### Potential Future Developments

The experience gained and the specifications defined through experimentation with **IOTwebUI-AI** may in the future be used for the development of specialized AI + applications, focused on specific interactions with Tuya devices or on particular analyses of IoT data.

### _Conclusion:_

_The IOTwebUI-AI project represents a versatile and powerful experimentation environment for exploring the synergies between artificial intelligence and the Tuya ecosystem. Its flexible architecture and the integration of specific TOOLs offer technicians the ability to analyze IoT devices, experiment with new interactions, and lay the foundations for future intelligent applications._
