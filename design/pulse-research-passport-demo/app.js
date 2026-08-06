(() => {
  const state = {
    page: "home",
    lang: localStorage.getItem("pulse-demo-lang") || "en",
    experiment: "024",
    generator: "report",
    beats: 4860,
    following: 386,
    networkFilter: "followers",
    messageThread: "mira",
    messageRequestAccepted: false,
    peerBeatAcknowledged: false,
    toastTimer: null
  };

  const pageMeta = {
    home: {
      en: ["RESEARCH PASSPORT", "Home", "Your research, connected to evidence."],
      zh: ["研究护照", "首页", "让每项研究都与证据相连。"]
    },
    passport: {
      en: ["OWNED DIGITAL TWIN", "Passport", "A living, evidence-linked record of what you can do."],
      zh: ["个人研究数字孪生", "研究护照", "持续更新、与证据关联的能力记录。"]
    },
    experiments: {
      en: ["VERIFIED WORK", "Experiments", "Plan, execute and preserve every result."],
      zh: ["已验证研究工作", "实验", "规划、执行并保存每项实验结果。"]
    },
    generate: {
      en: ["EVIDENCE-GROUNDED AI", "Generate", "Create reports, drafts and application materials you can verify."],
      zh: ["基于证据的 AI", "智能生成", "生成可核验的报告、草稿与申请材料。"]
    },
    community: {
      en: ["ARTIFACT-BASED NETWORK", "Community", "Share useful work. Give credit. Learn together."],
      zh: ["以研究成果为基础的网络", "研究社区", "分享有价值的研究，认可贡献，共同进步。"]
    },
    opportunities: {
      en: ["EVIDENCE-BASED MATCHING", "Opportunities", "Turn verified work into your next step."],
      zh: ["基于证据的匹配", "机会", "让已验证的研究成果带你走向下一步。"]
    }
  };

  const experiments = {
    "024": {
      code: "STAB-024",
      statusClass: "green",
      en: { title: "Stability run 024", status: "In progress" },
      zh: { title: "稳定性实验 024", status: "进行中" }
    },
    "023": {
      code: "INT-023",
      statusClass: "green",
      en: { title: "Interface screen 023", status: "Completed" },
      zh: { title: "界面筛选实验 023", status: "已完成" }
    },
    "022": {
      code: "DEP-022",
      statusClass: "red",
      en: { title: "Deposition run 022", status: "Failed · learning saved" },
      zh: { title: "沉积实验 022", status: "失败 · 已保存经验" }
    }
  };

  const generatorMeta = {
    report: { en: ["Experiment report", "40 pts"], zh: ["实验报告", "40 积分"] },
    paper: { en: ["Paper draft", "120 pts"], zh: ["论文草稿", "120 积分"] },
    patent: { en: ["Patent draft", "160 pts"], zh: ["专利草稿", "160 积分"] },
    application: { en: ["Application packet", "60 pts"], zh: ["申请材料包", "60 积分"] }
  };

  const opportunityData = {
    postdoc: {
      score: "94%",
      en: {
        type: "TOP MATCH",
        title: "Postdoctoral Research Fellow",
        org: "Stanford University · Solid-State Batteries",
        reasons: ["37 linked materials synthesis artifacts", "Verified XPS and in situ XRD credentials", "9 first-author papers", "Strong solid-state interface experience"]
      },
      zh: {
        type: "最佳匹配",
        title: "博士后研究员",
        org: "斯坦福大学 · 固态电池",
        reasons: ["关联 37 项材料合成成果", "XPS 与原位 XRD 资质已验证", "9 篇第一作者论文", "扎实的固态界面研究经验"]
      }
    },
    bounty: {
      score: "91%",
      en: {
        type: "RESEARCH BOUNTY",
        title: "Reproducibility Challenge: Humidity Drift",
        org: "Solid Battery Research Institute · $5,000 bounty",
        reasons: ["Relevant failed-run evidence", "Verified humidity testing protocol", "Strong reproducibility contribution history", "42 source-linked instrument records"]
      },
      zh: {
        type: "研究悬赏",
        title: "可复现性挑战：湿度漂移",
        org: "固态电池研究院 · 5,000 美元悬赏",
        reasons: ["拥有相关失败实验记录", "湿度测试方案已验证", "可复现性贡献记录突出", "42 条已关联来源的仪器记录"]
      }
    },
    scientist: {
      score: "87%",
      en: {
        type: "STRONG MATCH",
        title: "Research Scientist · Energy Materials",
        org: "QuantumScape · San Jose, CA",
        reasons: ["52 linked characterization artifacts", "Strong electrochemistry evidence", "Relevant solid-state publications", "Scale-up evidence is still limited"]
      },
      zh: {
        type: "高度匹配",
        title: "研究科学家 · 能源材料",
        org: "QuantumScape · 美国圣何塞",
        reasons: ["关联 52 项材料表征成果", "电化学证据充分", "拥有相关固态材料论文", "规模化证据仍较少"]
      }
    },
    internship: {
      score: "86%",
      en: {
        type: "PAID INTERNSHIP",
        title: "Advanced Materials R&D Internship",
        org: "NovaCell Energy · Shenzhen · 12 weeks",
        reasons: ["Verified 412 XPS instrument hours", "Supervisor-endorsed safety record", "Relevant battery-interface portfolio", "Hands-on laboratory work is independently verified"]
      },
      zh: {
        type: "带薪实习",
        title: "先进材料研发实习",
        org: "NovaCell Energy · 深圳 · 12 周",
        reasons: ["已验证 412 小时 XPS 仪器经验", "实验安全记录获得导师认可", "拥有相关电池界面研究成果", "实验操作经历已获独立验证"]
      }
    },
    competition: {
      score: "89%",
      en: {
        type: "INDUSTRY INVITE",
        title: "Next-Generation Interface Materials Challenge",
        org: "Aurora Materials Group · $30,000 award + pilot access",
        reasons: ["Invited from your verified interface-materials portfolio", "3 reusable protocols match the brief", "Strong independent replication record", "Proposal can be grounded in 27 source-linked artifacts"]
      },
      zh: {
        type: "企业定向邀请",
        title: "下一代界面材料挑战赛",
        org: "曙光材料集团 · 30,000 美元奖金 + 中试验证机会",
        reasons: ["基于已验证的界面材料成果获邀", "3 项可复用实验方案符合任务要求", "独立复现记录突出", "可使用 27 项来源关联成果支撑提案"]
      }
    },
    researchcup: {
      score: "84%",
      en: {
        type: "INDUSTRY RESEARCH CUP",
        title: "Circular Battery Interface Research Cup",
        org: "Northstar Mobility · ¥100,000 total awards",
        reasons: ["63 structured failed runs add rare evidence", "Relevant circular-materials reading history", "Strong team protocol contribution record", "Add one lifecycle-analysis collaborator"]
      },
      zh: {
        type: "行业研究竞赛",
        title: "循环电池界面研究杯",
        org: "北辰出行 · 总奖金 10 万元",
        reasons: ["63 次结构化失败实验形成稀缺证据", "相关循环材料文献积累充分", "团队实验方案贡献记录突出", "建议增加一名生命周期分析合作者"]
      }
    }
  };

  const messageThreads = {
    mira: {
      initials: "MC",
      avatarClass: "blue",
      request: false,
      name: { en: "Dr. Mira Chen", zh: "陈米拉博士" },
      role: { en: "Perovskite Commons · Verified researcher", zh: "钙钛矿社区 · 已验证研究者" },
      messages: [
        {
          from: "them",
          en: "Thanks for sharing Stability Run 024. The control condition is especially clear.",
          zh: "感谢你分享稳定性实验 024，其中的对照条件设置得很清楚。",
          time: "09:37"
        },
        {
          from: "them",
          en: "I added two evidence-linked notes to your report. The second may help explain the day-10 drift.",
          zh: "我在你的报告中添加了两条关联证据的意见。第二条可能有助于解释第 10 天的漂移。",
          time: "09:42",
          artifact: {
            en: ["Stability Run 024", "Shared report · 2 review notes"],
            zh: ["稳定性实验 024", "已共享报告 · 2 条审核意见"]
          }
        }
      ]
    },
    liu: {
      initials: "PL",
      avatarClass: "green",
      request: false,
      name: { en: "Prof. Liu", zh: "刘教授" },
      role: { en: "Northbridge University · Verified instructor", zh: "北桥大学 · 已验证导师" },
      messages: [
        {
          from: "them",
          en: "Your report is in my review queue. I will return evidence-linked comments by Friday.",
          zh: "你的报告已进入我的审核队列。我会在周五前返回关联证据的意见。",
          time: "Tue"
        }
      ]
    },
    alex: {
      initials: "AR",
      avatarClass: "coral",
      request: false,
      name: { en: "Alex Rivera", zh: "Alex Rivera" },
      role: { en: "Solid-State Batteries · Mutual follower", zh: "固态电池社区 · 已互相关注" },
      messages: [
        {
          from: "them",
          en: "We are hosting a reproducibility roundtable next week. Would you share the humidity-drift checklist?",
          zh: "我们下周会举办一场可复现性圆桌讨论。你愿意分享湿度漂移检查清单吗？",
          time: "Mon"
        }
      ]
    },
    aurora: {
      initials: "AM",
      avatarClass: "industry",
      request: true,
      name: { en: "Aurora Materials", zh: "曙光材料" },
      role: { en: "Industry organization · Message request", zh: "企业机构 · 消息请求" },
      messages: [
        {
          from: "them",
          en: "Your verified interface-materials portfolio matches our challenge brief. Would you consider submitting a proposal?",
          zh: "你已验证的界面材料研究成果与我们的挑战赛方向高度匹配。你是否愿意提交一份提案？",
          time: "11:06",
          artifact: {
            en: ["Interface Materials Challenge", "$30,000 award · Proposal due Aug 18"],
            zh: ["界面材料挑战赛", "30,000 美元奖金 · 8 月 18 日截止"]
          }
        }
      ]
    }
  };

  const copy = {
    en: {
      saved: "Saved to your Passport.",
      controlsSaved: "Your data and sharing controls are saved.",
      generating: "Generating from verified evidence…",
      generated: "Draft generated. Human review is still required.",
      savedOpportunity: "Opportunity saved.",
      removedOpportunity: "Opportunity removed from saved items.",
      following: "Following",
      follow: "Follow",
      followed: "You are now following this researcher.",
      unfollowed: "Researcher unfollowed.",
      protocolAdded: "Protocol added to your experiment workspace.",
      commentPosted: "Comment posted to the discussion.",
      shared: "Sharing controls opened. Nothing was posted automatically.",
      search: "Search is a prototype. Try Passport, experiment, report, community or opportunity.",
      newExperiment: "New experiment setup opened.",
      packetReady: "Application packet setup opened in Generate.",
      beatSent: "Beat sent. This verified contribution now has one more signal of peer value.",
      beatRemoved: "Beat removed.",
      peerBeatAdded: "Mira's Beat was added to your influence record.",
      peerBeatSeen: "This verified peer Beat is already in your influence record.",
      reviewPending: "Prof. Liu has the report. Review status: awaiting feedback.",
      storage: "Storage manager opened. You have 35.2 GB remaining.",
      streak: "Your 47-day streak is active. Complete one meaningful research action today to continue it.",
      beatsLedger: "The evidence ledger for this Beats source is ready to inspect.",
      messageSent: "Message sent.",
      messageSettings: "Message controls opened. Direct messages, requests and blocked accounts can be managed here.",
      requestAccepted: "Message request accepted. Your Passport remains private.",
      requestDeclined: "Message request declined. No Passport evidence was shared."
    },
    zh: {
      saved: "证据已保存至研究护照。",
      controlsSaved: "数据与分享设置已保存。",
      generating: "正在基于已验证证据生成…",
      generated: "草稿已生成，仍需人工审核。",
      savedOpportunity: "机会已收藏。",
      removedOpportunity: "已取消收藏该机会。",
      following: "已关注",
      follow: "关注",
      followed: "已关注该研究者。",
      unfollowed: "已取消关注该研究者。",
      protocolAdded: "实验方案已添加到实验工作台。",
      commentPosted: "评论已发布。",
      shared: "已打开分享控制，系统不会自动发布任何内容。",
      search: "搜索功能为原型演示。可尝试输入：护照、实验、报告、社区或机会。",
      newExperiment: "已打开新建实验设置。",
      packetReady: "已在智能生成页面打开申请材料包设置。",
      beatSent: "Beat 已送出。这项已验证贡献新增了一条同行价值信号。",
      beatRemoved: "Beat 已取消。",
      peerBeatAdded: "陈米拉送出的 Beat 已计入你的影响力记录。",
      peerBeatSeen: "这条已验证同行 Beat 已经计入你的影响力记录。",
      reviewPending: "刘教授已收到报告，当前状态：等待反馈。",
      storage: "已打开存储管理器。当前剩余 35.2 GB。",
      streak: "你已连续使用 47 天。今天完成一项有效研究操作即可延续记录。",
      beatsLedger: "该 Beats 来源的证据明细已准备好，可进一步查看。",
      messageSent: "消息已发送。",
      messageSettings: "已打开消息设置，可管理私信、消息请求与已屏蔽账户。",
      requestAccepted: "已接受消息请求。你的研究护照仍保持私密。",
      requestDeclined: "已拒绝消息请求，未分享任何研究护照证据。"
    }
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
    }
  }

  function updatePageMeta() {
    const meta = pageMeta[state.page][state.lang];
    $("#pageEyebrow").textContent = meta[0];
    $("#pageTitle").textContent = meta[1];
    $("#pageSubtitle").textContent = meta[2];
    document.title = `${meta[1]} · Pulse Research Passport`;
  }

  function updateBeatTotals() {
    const formatted = state.beats.toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US");
    $$('[data-beat-total]').forEach(element => { element.textContent = formatted; });
  }

  function updateFollowingTotals() {
    const formatted = state.following.toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US");
    $$('[data-following-total]').forEach(element => { element.textContent = formatted; });
  }

  function setNetworkFilter(filter) {
    if (!['followers', 'following', 'suggested'].includes(filter)) return;
    state.networkFilter = filter;
    $$('[data-network-filter]').forEach(button => {
      const active = button.dataset.networkFilter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    $$('[data-network-group]').forEach(group => {
      group.hidden = group.dataset.networkGroup !== filter;
    });
  }

  function renderMessageThread(id) {
    const thread = messageThreads[id] || messageThreads.mira;
    state.messageThread = messageThreads[id] ? id : "mira";
    const avatar = $("#chatAvatar");
    avatar.className = `conversation-avatar ${thread.avatarClass}`;
    avatar.textContent = thread.initials;
    $("#chatName").textContent = thread.name[state.lang];
    $("#chatRole").textContent = thread.role[state.lang];

    $$('[data-message-thread]').forEach(button => {
      button.classList.toggle("active", button.dataset.messageThread === state.messageThread);
    });

    const history = $("#messageHistory");
    history.innerHTML = "";
    thread.messages.forEach(message => {
      const row = document.createElement("div");
      row.className = `message-row${message.from === "me" ? " mine" : ""}`;

      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      bubble.textContent = message.custom || message[state.lang];
      row.appendChild(bubble);

      if (message.artifact) {
        const artifact = document.createElement("div");
        artifact.className = "message-artifact";
        const icon = document.createElement("i");
        icon.dataset.lucide = "file-check-2";
        const details = document.createElement("span");
        const title = document.createElement("strong");
        const subtitle = document.createElement("small");
        title.textContent = message.artifact[state.lang][0];
        subtitle.textContent = message.artifact[state.lang][1];
        details.append(title, subtitle);
        artifact.append(icon, details);
        row.appendChild(artifact);
      }

      const time = document.createElement("span");
      time.className = "message-time";
      time.textContent = message.time === "now" ? (state.lang === "en" ? "Now" : "刚刚") : message.time;
      row.appendChild(time);
      history.appendChild(row);
    });

    const requestPending = thread.request && !state.messageRequestAccepted;
    $("#messageRequestActions").hidden = !requestPending;
    $("#messageInput").disabled = requestPending;
    $("#sendMessageButton").disabled = requestPending;
    refreshIcons();
    requestAnimationFrame(() => { history.scrollTop = history.scrollHeight; });
  }

  function sendCurrentMessage() {
    const input = $("#messageInput");
    const message = input.value.trim();
    if (!message) return input.focus();
    messageThreads[state.messageThread].messages.push({ from: "me", custom: message, time: "now" });
    input.value = "";
    renderMessageThread(state.messageThread);
    input.focus();
    showToast(copy[state.lang].messageSent);
  }

  function setPage(page, options = {}) {
    if (!pageMeta[page]) return;
    state.page = page;
    $$(".view").forEach(view => view.classList.toggle("active", view.dataset.view === page));
    $$('[data-page]').forEach(button => {
      const active = button.dataset.page === page;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    updatePageMeta();
    if (!options.fromHash) history.replaceState(null, "", `#${page}`);
    if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: "smooth" });
    refreshIcons();
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    $$('[data-en][data-zh]').forEach(element => {
      element.textContent = element.dataset[state.lang];
    });
    $$('[data-placeholder-en][data-placeholder-zh]').forEach(element => {
      element.placeholder = element.dataset[`placeholder${state.lang === "en" ? "En" : "Zh"}`];
    });
    $$('[data-aria-en][data-aria-zh]').forEach(element => {
      element.setAttribute("aria-label", element.dataset[`aria${state.lang === "en" ? "En" : "Zh"}`]);
    });
    $$('[data-alt-en][data-alt-zh]').forEach(element => {
      element.setAttribute("alt", element.dataset[`alt${state.lang === "en" ? "En" : "Zh"}`]);
    });
    $$(".language-toggle").forEach(button => {
      const span = $("span", button);
      if (span) span.textContent = state.lang === "en" ? "中文" : "EN";
      else button.textContent = state.lang === "en" ? "中" : "EN";
      button.setAttribute("aria-label", state.lang === "en" ? "Switch to Chinese" : "切换至英文");
    });
    updatePageMeta();
    renderExperiment();
    renderOpportunityDialog($("#opportunityDialog").dataset.opportunity || "postdoc");
    updateGeneratorButton();
    updateBeatTotals();
    updateFollowingTotals();
    setNetworkFilter(state.networkFilter);
    renderMessageThread(state.messageThread);
    localStorage.setItem("pulse-demo-lang", state.lang);
    refreshIcons();
  }

  function toggleLanguage() {
    state.lang = state.lang === "en" ? "zh" : "en";
    applyLanguage();
  }

  function showToast(message) {
    const toast = $("#toast");
    $("#toastMessage").textContent = message;
    toast.hidden = false;
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function openDialog(dialog) {
    if (!dialog) return;
    $("#modalBackdrop").hidden = false;
    document.body.classList.add("modal-open");
    dialog.showModal();
    refreshIcons();
  }

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
    $("#modalBackdrop").hidden = true;
    document.body.classList.remove("modal-open");
  }

  function wireDialogs() {
    $$('[data-open-capture]').forEach(button => button.addEventListener("click", () => openDialog($("#captureDialog"))));
    $$('[data-open-privacy]').forEach(button => button.addEventListener("click", () => openDialog($("#privacyDialog"))));
    $$('[data-open-points]').forEach(button => button.addEventListener("click", () => openDialog($("#pointsDialog"))));
    $$('[data-open-beats]').forEach(button => button.addEventListener("click", () => openDialog($("#beatsDialog"))));
    $$('[data-open-network]').forEach(button => button.addEventListener("click", () => {
      setNetworkFilter(button.dataset.networkTab || state.networkFilter);
      openDialog($("#networkDialog"));
    }));
    $$('[data-open-messages]').forEach(button => button.addEventListener("click", () => {
      renderMessageThread(state.messageThread);
      openDialog($("#messagesDialog"));
    }));
    $("#privacyButton").addEventListener("click", () => openDialog($("#privacyDialog")));

    $$("dialog").forEach(dialog => {
      dialog.addEventListener("close", () => {
        $("#modalBackdrop").hidden = true;
        document.body.classList.remove("modal-open");
      });
      dialog.addEventListener("click", event => {
        const rect = dialog.getBoundingClientRect();
        const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
        if (outside) closeDialog(dialog);
      });
    });

    $("#modalBackdrop").addEventListener("click", () => {
      const open = $("dialog[open]");
      closeDialog(open);
    });

    $$(".capture-type").forEach(button => button.addEventListener("click", () => {
      $$(".capture-type").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
    }));

    $("#saveCaptureButton").addEventListener("click", () => setTimeout(() => showToast(copy[state.lang].saved), 80));
    $("#savePrivacyButton").addEventListener("click", () => setTimeout(() => showToast(copy[state.lang].controlsSaved), 80));
  }

  function renderExperiment() {
    const experiment = experiments[state.experiment];
    if (!experiment) return;
    const translated = experiment[state.lang];
    $("#experimentCode").textContent = experiment.code;
    $("#experimentTitle").textContent = translated.title;
    $("#experimentStatus").textContent = translated.status;
    const pill = $("#experimentStatus").closest(".status-pill");
    pill.classList.remove("green", "red", "cyan");
    pill.classList.add(experiment.statusClass);
  }

  function wireExperiments() {
    $$(".experiment-list-item").forEach(button => button.addEventListener("click", () => {
      state.experiment = button.dataset.experiment;
      $$(".experiment-list-item").forEach(item => item.classList.toggle("active", item === button));
      renderExperiment();
      showToast(state.lang === "en" ? `Opened ${experiments[state.experiment].en.title}.` : `已打开${experiments[state.experiment].zh.title}。`);
    }));
    $("#newExperimentButton").addEventListener("click", () => {
      openDialog($("#captureDialog"));
      showToast(copy[state.lang].newExperiment);
    });
  }

  function updateGeneratorButton() {
    const meta = generatorMeta[state.generator][state.lang];
    const button = $("#generateButton");
    const labels = $$("span", button);
    labels[0].textContent = state.lang === "en" ? `Generate ${meta[0].toLowerCase()}` : `生成${meta[0]}`;
    labels[1].textContent = meta[1];
  }

  function wireGenerate() {
    $$(".generator-type").forEach(button => button.addEventListener("click", () => {
      state.generator = button.dataset.generator;
      $$(".generator-type").forEach(item => item.classList.toggle("active", item === button));
      updateGeneratorButton();
      $("#emptyOutput").hidden = false;
      $("#generatedOutput").hidden = true;
    }));

    $$(".evidence-option input").forEach(input => input.addEventListener("change", () => {
      input.closest(".evidence-option").classList.toggle("selected", input.checked);
    }));

    $("#generateButton").addEventListener("click", () => {
      const button = $("#generateButton");
      const oldHtml = button.innerHTML;
      button.disabled = true;
      button.innerHTML = `<i data-lucide="loader-circle"></i><span>${copy[state.lang].generating}</span>`;
      refreshIcons();
      button.querySelector("svg")?.classList.add("spin");
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = oldHtml;
        $("#emptyOutput").hidden = true;
        $("#generatedOutput").hidden = false;
        applyLanguage();
        showToast(copy[state.lang].generated);
        if (window.innerWidth < 901) $("#outputPreview").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1150);
    });
  }

  function wireCommunity() {
    $$(".follow-button").forEach(button => {
      button.dataset.offEn = button.dataset.en === "Follow back" ? "Follow back" : "Follow";
      button.dataset.offZh = button.dataset.zh === "回关" ? "回关" : "关注";
      button.addEventListener("click", () => {
        const following = !button.classList.contains("following");
        button.classList.toggle("following", following);
        button.dataset.en = following ? "Following" : button.dataset.offEn;
        button.dataset.zh = following ? "已关注" : button.dataset.offZh;
        button.textContent = button.dataset[state.lang];
        state.following = Math.max(0, state.following + (following ? 1 : -1));
        updateFollowingTotals();
        showToast(following ? copy[state.lang].followed : copy[state.lang].unfollowed);
      });
    });

    $$('.social-button[data-social="beat"]').forEach(button => button.addEventListener("click", () => {
      const active = !button.classList.contains("beat-active");
      const count = $("span", button);
      button.classList.toggle("beat-active", active);
      button.setAttribute("aria-pressed", String(active));
      count.textContent = String(Number(count.textContent) + (active ? 1 : -1));
      button.dataset.ariaEn = active ? "Remove Beat" : "Send a Beat";
      button.dataset.ariaZh = active ? "取消 Beat" : "送出一个 Beat";
      button.setAttribute("aria-label", state.lang === "en" ? button.dataset.ariaEn : button.dataset.ariaZh);
      showToast(active ? copy[state.lang].beatSent : copy[state.lang].beatRemoved);
    }));

    $$('.social-button[data-social="comment"]').forEach(button => button.addEventListener("click", () => {
      const composer = button.closest(".community-post").querySelector(".comment-composer");
      composer.hidden = !composer.hidden;
      if (!composer.hidden) $("input", composer).focus();
    }));

    $$(".comment-composer .primary-button").forEach(button => button.addEventListener("click", () => {
      const composer = button.closest(".comment-composer");
      const input = $("input", composer);
      if (!input.value.trim()) return input.focus();
      input.value = "";
      composer.hidden = true;
      showToast(copy[state.lang].commentPosted);
    }));

    $$(".use-protocol").forEach(button => button.addEventListener("click", () => showToast(copy[state.lang].protocolAdded)));
    $$(".social-share").forEach(button => button.addEventListener("click", () => {
      openDialog($("#privacyDialog"));
      showToast(copy[state.lang].shared);
    }));
    $("#shareArtifactButton").addEventListener("click", () => openDialog($("#captureDialog")));

    $$(".message-person-button").forEach(button => button.addEventListener("click", () => {
      renderMessageThread(button.dataset.messagePerson);
      openDialog($("#messagesDialog"));
    }));

    $$('[data-message-thread]').forEach(button => button.addEventListener("click", () => {
      renderMessageThread(button.dataset.messageThread);
    }));

    $$('[data-network-filter]').forEach(button => button.addEventListener("click", () => {
      setNetworkFilter(button.dataset.networkFilter);
    }));

    $("#sendMessageButton").addEventListener("click", sendCurrentMessage);
    $("#messageInput").addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendCurrentMessage();
      }
    });

    $("#acceptMessageRequest").addEventListener("click", () => {
      state.messageRequestAccepted = true;
      messageThreads.aurora.role.en = "Industry organization · Accepted contact";
      messageThreads.aurora.role.zh = "企业机构 · 已接受联系人";
      const requestCard = $('[data-message-thread="aurora"]');
      const requestTitle = $("strong", requestCard);
      requestTitle.dataset.en = "Aurora Materials";
      requestTitle.dataset.zh = "曙光材料";
      const requestSubtitle = $("small", requestCard);
      requestSubtitle.dataset.en = "Industry challenge team";
      requestSubtitle.dataset.zh = "行业挑战赛团队";
      requestTitle.textContent = requestTitle.dataset[state.lang];
      requestSubtitle.textContent = requestSubtitle.dataset[state.lang];
      renderMessageThread("aurora");
      $("#messageInput").focus();
      showToast(copy[state.lang].requestAccepted);
    });

    $("#declineMessageRequest").addEventListener("click", () => {
      $('[data-message-thread="aurora"]').hidden = true;
      renderMessageThread("mira");
      closeDialog($("#messagesDialog"));
      showToast(copy[state.lang].requestDeclined);
    });

    $("[data-message-settings]").addEventListener("click", () => showToast(copy[state.lang].messageSettings));
  }

  function wireProfileSignals() {
    $$('[data-manage-storage]').forEach(button => button.addEventListener("click", () => showToast(copy[state.lang].storage)));
    $$('[data-streak-details]').forEach(button => button.addEventListener("click", () => showToast(copy[state.lang].streak)));
    $$(".beats-breakdown-list button").forEach(button => button.addEventListener("click", () => showToast(copy[state.lang].beatsLedger)));

    $$('[data-interaction]').forEach(button => button.addEventListener("click", () => {
      const interaction = button.dataset.interaction;
      if (interaction === "instructor") {
        showToast(copy[state.lang].reviewPending);
        return;
      }
      if (interaction === "industry") {
        setPage("opportunities");
        renderOpportunityDialog("competition");
        openDialog($("#opportunityDialog"));
        return;
      }
      if (interaction === "peer") {
        if (state.peerBeatAcknowledged) {
          showToast(copy[state.lang].peerBeatSeen);
          return;
        }
        state.peerBeatAcknowledged = true;
        state.beats += 1;
        button.classList.add("acknowledged");
        updateBeatTotals();
        showToast(copy[state.lang].peerBeatAdded);
      }
    }));
  }

  function renderOpportunityDialog(id) {
    const data = opportunityData[id] || opportunityData.postdoc;
    const translated = data[state.lang];
    const dialog = $("#opportunityDialog");
    dialog.dataset.opportunity = id;
    $("#opportunityDialogType").textContent = translated.type;
    $("#opportunityDialogTitle").textContent = translated.title;
    $("#opportunityDialogOrg").textContent = translated.org;
    $("#dialogMatchScore").textContent = data.score;
    $(".dialog-score .match-ring", dialog).style.setProperty("--value", data.score.replace("%", ""));
    $("#dialogMatchList").innerHTML = translated.reasons.map(reason => `<span><i data-lucide="badge-check"></i>${reason}</span>`).join("");
    refreshIcons();
  }

  function wireOpportunities() {
    $$(".save-button").forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const saved = !button.classList.contains("saved");
      button.classList.toggle("saved", saved);
      showToast(saved ? copy[state.lang].savedOpportunity : copy[state.lang].removedOpportunity);
    }));

    $$('[data-view-opportunity]').forEach(button => button.addEventListener("click", () => {
      renderOpportunityDialog(button.dataset.viewOpportunity);
      openDialog($("#opportunityDialog"));
    }));

    $("#prepareApplicationButton").addEventListener("click", () => {
      const dialog = $("#opportunityDialog");
      closeDialog(dialog);
      setPage("generate");
      state.generator = "application";
      $$(".generator-type").forEach(item => item.classList.toggle("active", item.dataset.generator === "application"));
      updateGeneratorButton();
      showToast(copy[state.lang].packetReady);
    });
  }

  function wireGenericControls() {
    $$('[data-page]').forEach(button => button.addEventListener("click", () => setPage(button.dataset.page)));
    $$('[data-go-page]').forEach(button => button.addEventListener("click", () => setPage(button.dataset.goPage)));
    $$(".language-toggle").forEach(button => button.addEventListener("click", toggleLanguage));

    $$(".filter-chips, .experiment-list-tabs, .feed-filters").forEach(group => {
      $$(".chip", group).forEach(button => button.addEventListener("click", () => {
        $$(".chip", group).forEach(item => item.classList.toggle("active", item === button));
      }));
    });

    const search = $("#globalSearch");
    search.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const query = search.value.toLowerCase();
      if (/passport|护照|credential|资质/.test(query)) setPage("passport");
      else if (/experiment|实验|lab/.test(query)) setPage("experiments");
      else if (/report|generate|生成|报告|paper|patent/.test(query)) setPage("generate");
      else if (/community|社区|protocol|方案/.test(query)) setPage("community");
      else if (/opportun|job|intern|challenge|competition|机会|岗位|实习|竞赛|挑战|bounty/.test(query)) setPage("opportunities");
      else showToast(copy[state.lang].search);
      search.blur();
    });

    document.addEventListener("keydown", event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (window.innerWidth > 900) search.focus();
      }
      if (event.key === "Escape") {
        const dialog = $("dialog[open]");
        if (dialog) closeDialog(dialog);
      }
    });

    window.addEventListener("hashchange", () => {
      const page = location.hash.replace("#", "");
      if (pageMeta[page]) setPage(page, { fromHash: true });
    });
  }

  function init() {
    const initialPage = location.hash.replace("#", "");
    if (pageMeta[initialPage]) state.page = initialPage;
    wireGenericControls();
    wireDialogs();
    wireExperiments();
    wireGenerate();
    wireCommunity();
    wireProfileSignals();
    wireOpportunities();
    applyLanguage();
    setPage(state.page, { fromHash: true, preserveScroll: true });
    refreshIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
