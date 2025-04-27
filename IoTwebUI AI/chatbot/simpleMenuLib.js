
const simpleMenuContainer = document.getElementById('simpleDynamicMenu');

function generateSimpleMenu(data, parentElement) {
    const ul = document.createElement('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        if (item.disabled) {
            li.classList.add('disabled');
        }

        const a = document.createElement('a');
        a.href = "#";
        const labelSpan = document.createElement('span');
        labelSpan.textContent = item.label;
        a.appendChild(labelSpan);

        const stateIndicatorSpan = document.createElement('span');
        stateIndicatorSpan.classList.add('state-indicator');
        updateSimpleIndicator(item, stateIndicatorSpan);
        a.appendChild(stateIndicatorSpan);

        li.appendChild(a);
        li.dataset.configKey = item.key;

        if (item.children && item.children.length > 0) {
            li.classList.add('has-submenu');
            const submenuUl = document.createElement('ul');
            submenuUl.classList.add('submenu');
            if (item.open) {
                submenuUl.style.display = 'block';
            }
            item.children.forEach(childItem => {
                const childLi = generateMenuItem(childItem, submenuUl);
                submenuUl.appendChild(childLi);
            });
            li.appendChild(submenuUl);

            a.addEventListener('click', function (event) {
                event.preventDefault();
                if (!item.disabled) {
                    item.open = !item.open;
                    updateSimpleMenu();
                }
            });
        } else if (item.type === 'radio') {
            const radioItemDiv = document.createElement('div');
            radioItemDiv.classList.add('radio-item');
            if (item.disabled) {
                radioItemDiv.classList.add('disabled');
            }
            const label = document.createElement('label');
            label.textContent = item.label;
            label.htmlFor = `radio-${item.name}-${item.value}`;
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = item.name;
            radio.value = item.value;
            radio.id = `radio-${item.name}-${item.value}`;
            radio.checked = !!item.checked;
            radio.disabled = item.disabled;
            radio.addEventListener('change', function (event) {
                event.stopPropagation();
                if (!item.disabled) {
                    if (item.callback) {
                        item.callback(this.value);
                    }
                }
            });
            radioItemDiv.appendChild(label);
            radioItemDiv.appendChild(radio);
            li.appendChild(radioItemDiv);
            a.style.display = 'none';
        } else if (item.callback) {
            a.addEventListener('click', function (event) {
                event.preventDefault();
                if (!item.disabled) {
                    item.callback(item);
                }
            });
        }
        ul.appendChild(li);
    });
    parentElement.appendChild(ul);
    return ul;
}

function updateSimpleIndicator(item, indicatorElement) {
    if (item.indicator && item.indicator[item.state ? item.state.toLowerCase() : '']) {
        indicatorElement.textContent = item.indicator[item.state.toLowerCase()];
    } else if (item.state) {
        indicatorElement.textContent = item.state.toUpperCase();
    } else {
        indicatorElement.textContent = "";
    }
}

function updateSimpleMenu() {
    simpleMenuContainer.innerHTML = '';
    const ul = document.createElement('ul');
    simpleMenuData.forEach(item => {
        const li = generateMenuItem(item, ul);
        ul.appendChild(li);
    });
    simpleMenuContainer.appendChild(ul);
}

function generateMenuItem(item, parentUl) {
    const li = document.createElement('li');
    if (item.disabled) {
        li.classList.add('disabled');
    }

    const a = document.createElement('a');
    a.href = "#";
    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.label;
    a.appendChild(labelSpan);

    const stateIndicatorSpan = document.createElement('span');
    stateIndicatorSpan.classList.add('state-indicator');
    updateSimpleIndicator(item, stateIndicatorSpan);
    a.appendChild(stateIndicatorSpan);

    li.appendChild(a);
    li.dataset.configKey = item.key;

    if (item.children && item.children.length > 0) {
        li.classList.add('has-submenu');
        const submenuUl = document.createElement('ul');
        submenuUl.classList.add('submenu');
        if (item.open) {
            submenuUl.style.display = 'block';
        }
        item.children.forEach(childItem => {
            const childLi = generateMenuItem(childItem, submenuUl);
            submenuUl.appendChild(childLi);
        });
        li.appendChild(submenuUl);

        a.addEventListener('click', function (event) {
            event.preventDefault();
            if (!item.disabled) { // Controlla se è disabilitato
                item.open = !item.open;
                updateSimpleMenu();
            }
        });
    } else if (item.type === 'radio') {
        const radioItemDiv = document.createElement('div');
        radioItemDiv.classList.add('radio-item');
        if (item.disabled) {
            radioItemDiv.classList.add('disabled')
        }
        const label = document.createElement('label');
        label.textContent = item.label;
        label.htmlFor = `radio-${item.name}-${item.value}`;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = item.name;
        radio.value = item.value;
        radio.id = `radio-${item.name}-${item.value}`;
        radio.checked = !!item.checked;
        radio.disabled = item.disabled; // Imposta l'attributo disabled dell'input
        radio.addEventListener('change', function (event) {
            event.stopPropagation();
            if (!item.disabled) { // Controlla se è disabilitato
                if (item.callback) {
                    item.callback(this.value);
                }
                updateRadioSelection(item.name, this.value); // Chiama la funzione per aggiornare la selezione
            }
        });
        radioItemDiv.appendChild(label);
        radioItemDiv.appendChild(radio);
        li.appendChild(radioItemDiv);
        a.style.display = 'none';
    } else if (item.callback) {
        a.addEventListener('click', function (event) {
            event.preventDefault();
            if (!item.disabled) { // Controlla se è disabilitato
                item.callback(item);
            }
        });
    }
    return li;
}
// usato per istanziare il menu su uno stato preesistente non uguale al default
function setMenuChoicee(name, value) {
    function processChild(item, value) {  // ss standard, oppure se ha radio child
        if (item.children) {
            let found = false;
           // Primo loop radio: imposta value e found se è stato trovato
            for (let child of item.children) {
                if (child.type === 'radio' && child.value === value) {
                    child.checked = true;
                    found = true;
                    break;
                }
            }
            // Secondo loop radio: deseleziona gli altri, solo se il primo loop ha avuto successo
            if (found) {
                for (let child of item.children) {
                    if (child.type === 'radio' && child.value != value) {
                        child.checked = false;
                    }
                }
            }
            return found; // trovato nei figli (solo in caso children, true se radio && OK) ?
        } else if (item.state !== undefined) { // no children => case standard menu, level 1, value is in state
            item.state = value;
            return true;
        }
        return false;
    }
    // ricerca diretta a livello 1 o figli radio
    const item = simpleMenuData.find(x => x.key === name); // Corretto: usare =>
    if (item) { // trovato: se esiste è unico!
        return processChild(item, value); // finito
    }
    // NON esiste come lev 1 o figli radio: ricerca come lev 2 o nei nipoti radio
    for (let parentItem of simpleMenuData) { // Usa for...of
        if (parentItem.children) {
            const childItem = parentItem.children.find(x => x.key === name); // Corretto: usare =>
            if (childItem) return processChild(childItem, value); // se esiste è unico
            }
        }
    return false;  // not found 'name' lev1 nor lev 2
 }
 
 // da chiamere nei radio
function updateRadioSelection(name, value) {
    simpleMenuData.forEach(item => {
        if (item.children) {
            item.children.forEach(child => {
                if (child.type === 'radio' && child.name === name) {
                    child.checked = (child.value === value);
                }
            });
        }
    });
    updateSimpleMenu();
}

// per disabilitare a comando items (radio => name: parent, state = null)
function setMenuStatus(name, state = null,  enabled = true) {
	let found = false;
	simpleMenuData.forEach(item => {
		if (item.key === name) {
			if ((state !== null) && (item?.state))
		    	item.state = state;
			item.disabled = !enabled;
			found = true;
		} else if (item.children) {
			item.children.forEach(child => {
				if (child.key === name) {
		    	if (state)
			           child.state = state;
					child.disabled = !enabled;
					found = true;
				} else if (child.children) {
					child.children.forEach(grandchild => {
						if (grandchild.key === name) {
					        if (state)
	                             grandchild.state = state;
							grandchild.disabled = !enabled;
							found = true;
						}
					})
				}
			});
		}
	});
return found;	
}
