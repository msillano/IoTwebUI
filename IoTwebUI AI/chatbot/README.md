## IoTwebUI Chatbot - Usage
[Versione italiana](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/LEGGIMI.md)

### **How Stateless AIs Work**

Most Artificial Intelligence (AI) systems are **stateless**, meaning they do not retain information between conversations. For example, an AI doesn't even know today's date unless we explicitly provide it during the conversation!

### **How Does IoTwebUI Chatbot Manage Information?**
The chatbot organizes three types of information, all in text format, provided to the AI for each conversation:

1. **System Context**
    - These are documents or instructions the user can control or that the AI reads directly from the web using a dedicated TOOL.
    - The user can add or remove local files.
    - The first context document automatically includes the current date and time, so the AI always has this information available.
    - To speed things up, `server02.js` also uses a cache mechanism for context files: a file is read from the PC only if it is not in the cache.
    - Examples of files used as context can be found in the `system` folder.

2. **History**
    - Contains all past conversations, numbered progressively (e.g., [Q4], [R4]).
    - To prevent the history from becoming too long, you can ask the AI to summarize previous conversations, and with the **"Cut History"** button, the user can keep only the last conversation (the summary), deleting the rest.

3. **Prompt (User Query)**
    - This is the request the user makes to the AI and has a significant impact on the response.
    - There is extensive literature on how to write effective prompts, known as **Prompt Engineering**. For an introduction, you can read [this article](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/chatbot/system/info:%20Prompt%20Engineering.md).
    - Example prompt: "_Please read this document: https://www.ibm.com/it-it/think/topics/prompt-engineering, summarize it in an article on 'Prompt Engineering' of about 100 lines, at the end cite the source + 'modified by deepseek'_"

### **Other AI Models with Limited Memory**
Some AI models dedicate a small portion of memory to each conversation (e.g., 8K or 32K). This space is limited because it must be multiplied by the number of connected users (even hundreds of thousands!).
- You notice this "cache" when the AI refers to previous information that is no longer in the current context or history.
- If the AI's memory limits are exceeded, the context or prompt is simply truncated.

![image](https://github.com/user-attachments/assets/2d1204c5-8008-46f7-9f45-118dd1e91eb0)

### **Parameters Influencing Response Style**
Some parameters can be modified from the menu to customize the AI's responses:
- **Temperature**: Controls the creativity of the responses (higher values = more creative, lower values = more precise).
- **Seek**: Controls the repeatability of responses: seek ON = deterministic.

Other advanced parameters can be configured in the `server02.js` file.
- For more details, see [this information](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/ai_proxy.md#async-function-updateconfigsessionid-configuration).

These parameters will be useful for optimizing AI performance.

---

## **IoTwebUI Chatbot Configuration**

### **Information Required for Each AI Model**
To use an AI model, you need to know:
1. **Exact Model Name** (value)
2. **Access URL** (baseURL)
3. **API_KEY** (access key, which can be free or pay-as-you-go).
    - For more details, see [this page](https://github.com/msillano/IoTwebUI/blob/main/IoTwebUI%20AI/README.md#ai-provider).

### **Steps to Configure the API Key**
1. **Assign a Name to the Key** (e.g., `API_KEY_GROQ`) and save it in your computer's environment variables:
    - Search for "Edit environment variables" in the operating system.
    - Add the key in the "Environment Variables" section and restart the PC to apply.

2. **Updating the Model Menu**
    - The `ai_verticalMenu.js` file already includes 9 usable AI models as examples.
    - Delete or comment out (`/* comment */`) the models you don't need.
    - Update the details of the model(s) you intend to use (e.g., URL, name, etc.).
    - The instructions in the file are clear, but if you have any doubts, you can ask the AI directly or update later if errors are reported by the AI during the conversation.

---

## **IoTwebUI Chatbot Installation**

### **Prerequisites**
- Have **IoTwebUI version 3.0** installed and working ([see instructions](https://github.com/msillano/IoTwebUI/blob/main/APP/README.md#installation-and-use)), including **IoTrest**.
- Note: The chatbot can also work without _IoTwebUI_, but it will lose integration with Tuya (its main feature). However, it remains a flexible chatbot with web access.

### **Step 1: Download and Prepare Files**
1. Download the `chatbot01.zip` file and place it in the `\IoTwebUI\` folder.
2. Extract the contents: the folder `\IoTwebUI\IoTwebUI AI\chatbot` will be created.
    - You can use other folders, but it is recommended to keep everything organized under `IoTwebUI`.

### **Step 2: Configure BAT Files**
1. **Update the BAT files** to match your directories:
    - `RUN chatbot.bat`: Starts the frontend and the server. After updating, you can move it wherever you prefer.
    - `install_AIserver.bat`: Installs the necessary dependencies for Node.js.

### **Step 3: Install Dependencies**
1. Once updated, you need to use `install_AIserver.bat`: this creates the `/node_modules` directory.

_Now **IoTwebUI chatbot** is ready to be used:_ run `RUN chatbot.bat`!

(reworked with deepseek)
