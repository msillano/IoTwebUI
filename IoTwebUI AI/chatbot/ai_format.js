/**
 * Utility function: format to HTML div  markdown + nermaid
 * @file ai_format.js
 * @description This file is part of IoTwebUI-AI project (https://github.com/msillano/IoTwebUI)
 * @dependencies:  Mermaid.js Marked.js
 * @version 1.0
 * @license MIT
 * @author Marco Sillano
 * @created 01/04/2025
 * @lastModified 05/04/2025
 * (C)2025 marco.sillano@gmail.com
 */


/**
 * Converts a markdown message with Mermaid diagrams into styled HTML, with syntax highlighting headers.
 * - Parses markdown with `marked.parse()`.
 * - Adds headers to code blocks (excluding Mermaid).
 * - Renders Mermaid diagrams asynchronously.
 * - Adds a horizontal rule for non-"User" senders.
 * 
 * @param {string} sender - Message sender (e.g., "User", "AI"). 
 * @param {string} message - Markdown content (may include Mermaid and code blocks).
 * @returns {HTMLDivElement} - Formatted message as a DOM element.
 */
function toHTML(sender, message, delay = null) {
    // Create root container div and parse markdown
//	console.log("toHTML",sender, message, delay);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong><font color=blue>' + sender + ':</font></strong>';
    if (delay) messageElement.innerHTML += " ("+delay+")";
	messageElement.innerHTML +=  marked.parse(message);

    // Process all code blocks to add syntax headers (skip Mermaid blocks)
    messageElement.querySelectorAll('pre code').forEach(codeBlock => {
        const cclass = codeBlock.className;
        // Check if the block is a code block (class starts with "language") but not Mermaid
        if ((cclass != "language-mermaid") && (cclass.startsWith("language"))) {
            const lang = cclass.substring(9) + "\n";  // Extract language name (e.g., "js" from "language-js")
            const pre = codeBlock.parentElement;      // Get parent <pre> element

            // Create a wrapper div with header and cloned code block
            const container = document.createElement('div');
            container.className = 'code-container';
            const header = document.createElement('div');
            header.className = 'code-header';
            const codetitle = document.createElement('span');
            codetitle.className = 'code-title';
            codetitle.textContent = lang;

            // Replace original <pre> with the styled container
            container.appendChild(header);
            header.appendChild(codetitle);
            container.appendChild(pre.cloneNode(true));  // Clone to preserve original structure
            pre.parentNode.replaceChild(container, pre);
        }
    });

    //  console.log("code processed  ", messageElement);  // Debug output
    // Add horizontal rule for non-"User" messages
    if (!sender.startsWith("Use"))
        messageElement.innerHTML += "<hr>";

    // Render Mermaid diagrams in the message (targets .language-mermaid blocks)
	try{
    mermaid.run({
        querySelector: '.language-mermaid',
        nodes: messageElement.querySelectorAll('.language-mermaid')  // Scope to current message
    });
	} catch{
		console.log("ERROR in mermaid: chiedere la correzione(in genere apici) e il riinvio!");
	}	

    return messageElement;
}

