(function(){
  if(document.getElementById('qa-modal-overlay')) return;

  // Supabase Configuration
  const SUPABASE_URL = "https://lobhwknisejjvubweall.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYmh3a25pc2VqanZ1YndlYWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1Nzk4NjIsImV4cCI6MjA4NDE1NTg2Mn0.2OTSmBD62Fgcecuxps6YoaW9-lPPu1MFA7cWl1g9MUk";

  const groups = [
    {
      name: "AQM",
      items: [
        {id:1,label:"Greeting",reverse:!1},
        {id:2,label:"Cx's Name",reverse:!1},
        {id:3,label:"Business Name",reverse:!1},
        {id:4,label:"Callback",reverse:!1},
        {id:5,label:"Closing",reverse:!1},
        {id:6,label:"Poor Listening",reverse:!0},
        {id:7,label:"Appropriate Tone",reverse:!1},
        {id:8,label:"Poor Call Control",reverse:!0},
        {id:9,label:"Empathy",reverse:!1},
        {id:10,label:"Confirm Solution",reverse:!1}
      ]
    },
    {
      name: "Case Management",
      items: [
        {id:1,label:"Resolution",reverse:!1},
        {id:2,label:"Escalation",reverse:!1},
        {id:3,label:"Failed Follow-up",reverse:!0},
        {id:4,label:"Out of Context Article",reverse:!0},
        {id:5,label:"Reach-out (8h)",reverse:!1},
        {id:6,label:"Expectations",reverse:!1},
        {id:7,label:"Wrong Contact Method",reverse:!0},
        {id:8,label:"Written Comm",reverse:!1},
        {id:9,label:"Internal Comm",reverse:!1},
        {id:10,label:"1case1issue",reverse:!1},
        {id:11,label:"Case Notes",reverse:!1},
        {id:12,label:"Account Info",reverse:!1},
        {id:13,label:"Expert Needed",options:['Yes', 'No', 'N/A']},
        {id:14,label:"Incorrect Case Staging",options:['No - staged correctly', 'Yes - pending cx instead of pending care', 'Yes - pending care instead of pending cx', 'Yes - res proposed (instead of pending cx)', 'Yes - res proposed (instead of pending Care)', "Yes - merged case when shouldn't have"]},
        {id:15,label:"Mistreat/Avoid",options:['No', 'Yes - Rude to Cx', 'Yes - False phone interactions', 'Yes - hung up on cx', 'Yes - excessive holds (caused cx to hang up)', 'Yes - Denied Transfer', 'Yes - Survey Avoidance', 'Yes - Case Avoidance (assigned case, then sent back to same queue with no notes or adjustment to subject line)', 'Yes - Case Avoidance (Case set to Resolution Proposed, without solving the issue)', 'Yes-Changes made without asking for POS code', 'Yes -Changes made without asking for SSN (payroll only)', 'Yes - Verification Process not followed (fraud) ']},
        {id:16,label:"Temp Start",options:['Churn', 'Upset', 'Neutral', 'Happy']},
        {id:17,label:"Temp End",options:['Churn', 'Upset', 'Neutral', 'Happy']},
        {id:18,label:"Temp Worsen",reverse:!0},
        {id:19,label:"Complexity",options:['Training Opportunities (basic)', 'HW/SW troubleshooting (basic)', 'Non-intuitive/not understanding how something works', 'Something is broken/RF', 'Really complicated issue', 'Follow up on another case', 'Simple Task for Care or Team outside of Care', 'Complex Process', 'Feature Request']},
        {id:20,label:"Related Cases",options:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']},
        {id:21,label:"Case Owners",options:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']},
        {id:22,label:"Root Cause",options:['In Progress - Waiting on Other team', 'Improperly Escalated', 'Work Avoidance', 'Unclear Policy/Process', 'Simple Knowledge Gap', 'Complex Knowledge Gap', 'N/A']}
      ]
    }
  ];

  const state = {};
  groups.forEach(g => {
    g.items.forEach(item => {
      const key = `${g.name}-${item.id}`;
      let defaultSel = item.options ? 0 : "yes";
      
      if (item.label === "Expert Needed") defaultSel = 2;
      if (item.label === "Temp Start" || item.label === "Temp End") defaultSel = 2;
      if (item.label === "Complexity") defaultSel = 6;
      if (item.label === "Root Cause") defaultSel = 6;

      state[key] = { 
        sel: defaultSel, 
        text: "", 
        checked: false,
        groupName: g.name,
        itemId: item.id,
        itemType: item.options ? 'select' : 'toggle'
      };
    });
  });

  const createElement = (tag, css) => {
    const el = document.createElement(tag);
    if(css) el.style.cssText = css;
    return el;
  };

  const addListener = (el, event, handler) => {
    el.addEventListener(event, handler);
  };

  const sOverlay = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.2);display:flex;align-items:flex-start;justify-content:center;z-index:99999;font-family:system-ui,sans-serif;padding-top:20px;overflow-y:auto;pointer-events:none";
  const sModal = "background:white;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);width:90%;max-width:550px;height:80vh;max-height:800px;overflow:hidden;display:flex;flex-direction:column;cursor:grab;user-select:none;margin-bottom:20px;pointer-events:auto";
  const sHeader = "padding:15px 20px;border-bottom:1px solid #e0e0e0;font-size:18px;font-weight:600;color:#333;cursor:grab;display:flex;justify-content:space-between;align-items:center";
  const sContent = "padding:20px;flex:1;color:#666;font-size:14px;line-height:1.6;overflow-y:auto";
  const sGroupHeader = "margin:20px 0 10px;font-size:16px;font-weight:bold;color:#1d4ed8;border-bottom:2px solid #1d4ed8;padding-bottom:4px";
  const sItemContainer = "margin-bottom:8px;border:1px solid #e0e0e0;border-radius:4px;overflow:hidden";
  const sItemHeader = "width:100%;padding:10px 16px;background:#f5f5f5;border:none;text-align:left;cursor:pointer;font-weight:500;color:#333;display:flex;justify-content:space-between;align-items:center";
  const sItemBody = "display:none;padding:12px 16px;border-top:1px solid #e0e0e0;background:#fafafa";
  const sBtnGroup = "margin-bottom:8px;display:flex;gap:6px";
  const sBtnInactive = "flex:1;padding:8px;border:1px solid #ccc;background:white;color:#333;border-radius:4px;cursor:pointer;font-weight:500;font-size:12px";
  const sBtnActive = "flex:1;padding:8px;border:1px solid #2563eb;background:#2563eb;color:white;border-radius:4px;cursor:pointer;font-weight:500;font-size:12px";
  const sSelect = "width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;margin-bottom:8px;font-size:13px";
  const sTextarea = "width:100%;border:1px solid #ccc;border-radius:4px;padding:8px;font-family:inherit;resize:none;height:50px;font-size:13px";
  const sFooter = "padding:16px;border-top:1px solid #e0e0e0;display:flex;gap:12px;justify-content:flex-end";
  const sBtnCancel = "padding:8px 16px;border:1px solid #ccc;background:white;border-radius:4px;cursor:pointer;font-size:14px;color:#333";
  const sBtnGenerate = "padding:8px 16px;border:none;background:#2563eb;color:white;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500";

  const overlay = createElement("div", sOverlay);
  overlay.id = "qa-modal-overlay";
  const modal = createElement("div", sModal);
  
  let isDragging = false, startX = 0, startY = 0, initialX = 0, initialY = 0;
  const header = createElement("div", sHeader);
  header.innerHTML = `<span>QA Form Tool</span><span style="font-size:12px;color:#999">v2.4</span>`;
  
  addListener(header, "mousedown", (e) => {
    if(e.target === header || e.target.parentNode === header) {
        isDragging = true;
        startX = e.clientX - initialX;
        startY = e.clientY - initialY;
        header.style.cursor = "grabbing";
    }
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

  const contentContainer = createElement("div", sContent);
  groups.forEach(group => {
    const groupTitle = createElement("div", sGroupHeader);
    groupTitle.textContent = group.name;
    contentContainer.appendChild(groupTitle);

    group.items.forEach(item => {
      const key = `${group.name}-${item.id}`;
      const itemContainer = createElement("div", sItemContainer);
      const itemHeader = createElement("div", sItemHeader);
      const leftGroup = createElement("div");
      leftGroup.style.cssText = "display:flex;align-items:center;gap:10px";

      const checkbox = createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.cursor = "pointer";
      addListener(checkbox, "click", (e) => { e.stopPropagation(); state[key].checked = e.target.checked; });

      const label = createElement("span");
      label.textContent = `${item.id}. ${item.label}`;
      leftGroup.appendChild(checkbox);
      leftGroup.appendChild(label);

      const arrow = createElement("span");
      arrow.style.fontSize = "10px";
      arrow.textContent = "▼";
      itemHeader.appendChild(leftGroup);
      itemHeader.appendChild(arrow);

      let expanded = false;
      const itemBody = createElement("div", sItemBody);

      const updateHeaderBg = () => {
        if (state[key].text.trim().length > 0) {
            itemHeader.style.background = "#e0e7ff";
        } else {
            itemHeader.style.background = expanded ? "#e8e8e8" : "#f5f5f5";
        }
      };

      if (item.options) {
        const select = createElement("select", sSelect);
        item.options.forEach((opt, idx) => {
          const o = createElement("option");
          o.value = idx;
          o.textContent = opt;
          if (idx === state[key].sel) o.selected = true;
          select.appendChild(o);
        });
        addListener(select, "change", (e) => state[key].sel = parseInt(e.target.value));
        itemBody.appendChild(select);
      } else {
        const btnYes = createElement("button", sBtnActive);
        btnYes.textContent = item.reverse ? "No" : "Yes";
        const btnNo = createElement("button", sBtnInactive);
        btnNo.textContent = item.reverse ? "Yes" : "No";
        const btnGroup = createElement("div", sBtnGroup);
        btnGroup.appendChild(btnYes);
        btnGroup.appendChild(btnNo);

        const updateBtnStyle = (val) => {
          state[key].sel = val;
          btnYes.style.cssText = val === "yes" ? sBtnActive : sBtnInactive;
          btnNo.style.cssText = val === "no" ? sBtnActive : sBtnInactive;
        };
        addListener(btnYes, "click", () => updateBtnStyle("yes"));
        addListener(btnNo, "click", () => updateBtnStyle("no"));
        itemBody.appendChild(btnGroup);
      }

      const textarea = createElement("textarea", sTextarea);
      textarea.placeholder = "Comments...";
      addListener(textarea, "input", (e) => { 
          state[key].text = e.target.value;
          updateHeaderBg();
      });
      itemBody.appendChild(textarea);

      addListener(itemHeader, "click", () => {
        expanded = !expanded;
        itemBody.style.display = expanded ? "block" : "none";
        updateHeaderBg();
        arrow.textContent = expanded ? "▲" : "▼";
      });

      itemContainer.appendChild(itemHeader);
      itemContainer.appendChild(itemBody);
      contentContainer.appendChild(itemContainer);
    });
  });

  const footer = createElement("div", sFooter);
  const btnCancel = createElement("button", sBtnCancel);
  btnCancel.textContent = "Cancel";
  addListener(btnCancel, "click", () => overlay.remove());

  const btnGenerate = createElement("button", sBtnGenerate);
  btnGenerate.textContent = "Generate";
  
  const findGroupContainer = (name) => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h2 = h2s.find(el => el.textContent.trim().includes(name));
    return h2 ? h2.closest('.padding-xlarge') : null;
  };

  addListener(btnGenerate, "click", async () => {
    // 1. Fetch defaults from Supabase
    let supabaseDefaults = {};
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/qa_defaults?select=*`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        const data = await response.json();
        data.forEach(row => {
            const key = `${row.group_name}-${row.item_id}-${row.response_value}`;
            supabaseDefaults[key] = row.feedback_text;
        });
    } catch (e) {
        console.error("Supabase fetch failed:", e);
    }

    const allKeys = Object.keys(state);
    const checkedKeys = allKeys.filter(k => state[k].checked);
    const targetKeys = checkedKeys.length > 0 ? checkedKeys : allKeys;

    let index = 0;
    const processNext = async () => {
      if(index >= targetKeys.length) {
        alert("✓ Done!");
        overlay.remove();
        return;
      }
      const key = targetKeys[index];
      const s = state[key];
      let container = findGroupContainer(s.groupName);
      
      if(container) {
        const question = container.querySelector(`[data-idx="${s.itemId}"]`);
        
        if(question) {
          const control = question.querySelector('[data-testid="SegmentedControl"]');
          if(control) {
            const buttons = Array.from(control.querySelectorAll('button'));
            if(s.itemType === 'select') {
                if(buttons[s.sel]) buttons[s.sel].click();
            } else {
                if(s.sel === "yes" && buttons[0]) buttons[0].click();
                else if(s.sel === "no" && buttons[1]) buttons[1].click();
            }
          }
          
          await new Promise(r => setTimeout(r, 2500));
          
          container = findGroupContainer(s.groupName); 
          const freshQuestion = container ? container.querySelector(`[data-idx="${s.itemId}"]`) : null;
          
          if(freshQuestion) {
             // Logic: Manual text takes priority. If empty, look up Supabase default.
             const lookupKey = `${s.groupName}-${s.itemId}-${s.sel}`;
             const finalText = s.text.trim() || supabaseDefaults[lookupKey] || "";

             if(finalText) {
                const txtArea = freshQuestion.querySelector('textarea');
                if(txtArea) {
                    const proto = Object.getPrototypeOf(txtArea);
                    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
                    if(setter) setter.call(txtArea, finalText); else txtArea.value = finalText;
                    txtArea.dispatchEvent(new Event("input", { bubbles: true }));
                    txtArea.dispatchEvent(new Event("change", { bubbles: true }));
                }
             }
          }
        }
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
