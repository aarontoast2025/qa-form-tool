(function(){
  if(document.getElementById('qa-modal-overlay')) return;

  const items = [
    {id:1,label:"Greeting",reverseButtons:!1},
    {id:2,label:"Cx's Name",reverseButtons:!1},
    {id:3,label:"Business Name",reverseButtons:!1},
    {id:4,label:"Callback",reverseButtons:!1},
    {id:5,label:"Closing",reverseButtons:!1},
    {id:6,label:"Poor Listening",reverseButtons:!0},
    {id:7,label:"Appropriate Tone",reverseButtons:!1},
    {id:8,label:"Poor Call Control",reverseButtons:!0},
    {id:9,label:"Empathy",reverseButtons:!1},
    {id:10,label:"Confirm Solution",reverseButtons:!1}
  ];

  const state = {};
  items.forEach((item => {
    state[item.id] = { sel: "yes", text: "", checked: false };
  }));

  const createElement = (tag, css) => {
    const el = document.createElement(tag);
    if(css) el.style.cssText = css;
    return el;
  };

  const addListener = (el, event, handler) => {
    el.addEventListener(event, handler);
  };

  // Styles
  const styleOverlay = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.2);display:flex;align-items:flex-start;justify-content:center;z-index:99999;font-family:system-ui,sans-serif;padding-top:20px;overflow-y:auto;pointer-events:none";
  const styleModal = "background:white;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);width:90%;max-width:500px;height:600px;overflow:hidden;display:flex;flex-direction:column;cursor:grab;user-select:none;margin-bottom:20px;pointer-events:auto";
  const styleHeader = "padding:20px;border-bottom:1px solid #e0e0e0;font-size:18px;font-weight:600;color:#333;cursor:grab";
  const styleContent = "padding:20px;flex:1;color:#666;font-size:14px;line-height:1.6;overflow-y:auto";
  const styleItemContainer = "margin-bottom:16px;border:1px solid #e0e0e0;border-radius:4px;overflow:hidden";
  const styleItemHeader = "width:100%;padding:12px 16px;background:#f5f5f5;border:none;text-align:left;cursor:pointer;font-weight:500;color:#333;display:flex;justify-content:space-between;align-items:center";
  const styleItemBody = "display:none;padding:16px;border-top:1px solid #e0e0e0;background:#fafafa";
  const styleBtnGroup = "margin-bottom:12px;display:flex;gap:8px";
  const styleBtnInactive = "flex:1;padding:10px;border:2px solid #ccc;background:white;color:#333;border-radius:4px;cursor:pointer;font-weight:500;transition:all 0.2s";
  const styleBtnActive = "flex:1;padding:10px;border:2px solid #2563eb;background:#2563eb;color:white;border-radius:4px;cursor:pointer;font-weight:500;transition:all 0.2s";
  const styleTextarea = "width:100%;border:1px solid #ccc;border-radius:4px;padding:8px;font-family:inherit;resize:none;height:50px";
  const styleFooter = "padding:16px;border-top:1px solid #e0e0e0;display:flex;gap:12px;justify-content:flex-end";
  const styleBtnCancel = "padding:10px 20px;border:1px solid #ccc;background:white;border-radius:4px;cursor:pointer;font-size:14px;color:#333;transition:background 0.2s";
  const styleBtnGenerate = "padding:10px 20px;border:none;background:#2563eb;color:white;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500;transition:background 0.2s";

  const overlay = createElement("div", styleOverlay);
  overlay.id = "qa-modal-overlay";

  const modal = createElement("div", styleModal);
  
  // Drag logic
  let isDragging = false, startX = 0, startY = 0, initialX = 0, initialY = 0;
  
  const header = createElement("div", styleHeader);
  header.textContent = "QA Form";
  
  addListener(header, "mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - initialX;
    startY = e.clientY - initialY;
    header.style.cursor = "grabbing";
  });
  
  addListener(document, "mousemove", (e) => {
    if(isDragging) {
      initialX = e.clientX - startX;
      initialY = e.clientY - startY;
      modal.style.transform = `translate(${initialX}px, ${initialY}px)`;
    }
  });
  
  addListener(document, "mouseup", () => {
    isDragging = false;
    header.style.cursor = "grab";
  });

  const contentContainer = createElement("div", styleContent);
  
  items.forEach((item) => {
    const itemContainer = createElement("div", styleItemContainer);
    
    // Header (now a div, not a button, to contain checkbox)
    const itemHeader = createElement("div", styleItemHeader);
    
    // Left group: Checkbox + Label
    const leftGroup = createElement("div");
    leftGroup.style.display = "flex";
    leftGroup.style.alignItems = "center";
    leftGroup.style.gap = "10px";

    const checkbox = createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.cursor = "pointer";
    // Stop propagation so clicking checkbox doesn't expand/collapse
    addListener(checkbox, "click", (e) => {
        e.stopPropagation();
        state[item.id].checked = e.target.checked;
    });

    const label = createElement("span");
    label.textContent = `${item.id}. ${item.label}`;

    leftGroup.appendChild(checkbox);
    leftGroup.appendChild(label);

    const arrow = createElement("span");
    arrow.style.fontSize = "12px";
    arrow.textContent = "▼";

    itemHeader.appendChild(leftGroup);
    itemHeader.appendChild(arrow);

    let expanded = false;
    const itemBody = createElement("div", styleItemBody);
    
    // Yes/No Buttons
    const btnYes = createElement("button", styleBtnActive); // Default yes? Code said: t[e.id]={sel:"yes"...}
    btnYes.textContent = item.reverseButtons ? "No" : "Yes";
    // Initial style based on default 'yes'
    btnYes.style.cssText = state[item.id].sel === "yes" ? styleBtnActive : styleBtnInactive;

    const btnNo = createElement("button", styleBtnInactive);
    btnNo.textContent = item.reverseButtons ? "Yes" : "No";
    btnNo.style.cssText = state[item.id].sel === "no" ? styleBtnActive : styleBtnInactive;

    const btnGroup = createElement("div", styleBtnGroup);
    btnGroup.appendChild(btnYes);
    btnGroup.appendChild(btnNo);

    const textarea = createElement("textarea", styleTextarea);
    textarea.id = `qa-${item.id}`;
    textarea.placeholder = "Enter text";

    const updateSelection = (val) => {
      state[item.id].sel = val;
      btnYes.style.cssText = val === "yes" ? styleBtnActive : styleBtnInactive;
      btnNo.style.cssText = val === "no" ? styleBtnActive : styleBtnInactive;
    };

    addListener(btnYes, "click", () => updateSelection("yes"));
    addListener(btnNo, "click", () => updateSelection("no"));
    
    addListener(textarea, "input", (e) => {
      state[item.id].text = e.target.value;
    });

    // Toggle expand/collapse
    addListener(itemHeader, "click", () => {
      expanded = !expanded;
      itemBody.style.display = expanded ? "block" : "none";
      itemHeader.style.background = expanded ? "#e8e8e8" : "#f5f5f5";
      arrow.textContent = expanded ? "▲" : "▼";
    });

    itemBody.appendChild(btnGroup);
    itemBody.appendChild(textarea);
    itemContainer.appendChild(itemHeader);
    itemContainer.appendChild(itemBody);
    contentContainer.appendChild(itemContainer);
  });

  const footer = createElement("div", styleFooter);
  
  const btnCancel = createElement("button", styleBtnCancel);
  btnCancel.textContent = "Cancel";
  addListener(btnCancel, "mouseenter", () => btnCancel.style.background = "#f5f5f5");
  addListener(btnCancel, "mouseleave", () => btnCancel.style.background = "white");
  addListener(btnCancel, "click", () => overlay.remove());

  const btnGenerate = createElement("button", styleBtnGenerate);
  btnGenerate.textContent = "Generate";
  addListener(btnGenerate, "mouseenter", () => btnGenerate.style.background = "#1d4ed8");
  addListener(btnGenerate, "mouseleave", () => btnGenerate.style.background = "#2563eb");
  
  addListener(btnGenerate, "click", async () => {
    // Filter items based on checked state
    const checkedItems = items.filter(item => state[item.id].checked);
    // If no items are checked, process ALL items. Otherwise process only checked.
    const targets = checkedItems.length > 0 ? checkedItems : items;

    let index = 0;
    const processNext = async () => {
      if(index >= targets.length) {
        alert("✓ Done!");
        overlay.remove();
        return;
      }
      
      const item = targets[index];
      const sel = state[item.id].sel;
      const text = state[item.id].text;
      
      // Select Radio Button
      // Assuming external page structure: [data-idx="ID"] [data-testid="SegmentedControl"]
      const control = document.querySelector(`[data-idx="${item.id}"] [data-testid="SegmentedControl"]`);
      if(control) {
        const radios = control.querySelectorAll('button[role="radio"]');
        if(sel === "yes" && radios[0]) radios[0].click();
        else if(sel === "no" && radios[1]) radios[1].click();
      }
      
      await new Promise(r => setTimeout(r, 2500)); // Wait for UI update
      
      // Enter Text
      const txtArea = document.querySelector(`[data-idx="${item.id}"] textarea`);
      if(txtArea && text) {
        // React/Frameworks often override value setter, so we use prototype
        const prototype = Object.getPrototypeOf(txtArea);
        const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
        if (valueSetter) {
             valueSetter.call(txtArea, text);
        } else {
            txtArea.value = text;
        }
        
        txtArea.dispatchEvent(new Event("input", { bubbles: true }));
        txtArea.dispatchEvent(new Event("change", { bubbles: true }));
      }
      
      await new Promise(r => setTimeout(r, 500));
      index++;
      processNext();
    };
    
    processNext();
  });

  footer.appendChild(btnCancel);
  footer.appendChild(btnGenerate);

  modal.appendChild(header);
  modal.appendChild(contentContainer);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

})();