"use client";

import { person } from "@/resources";
import { Button, Column, Flex, IconButton, Input, Row, Spinner, Text } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are the virtual AI assistant for Bayu Saputra, a professional IT Infrastructure Engineer, Network Operations specialist, and IoT Systems developer in Indonesia. Your job is to answer questions about Bayu's background, certifications, experience, projects, skills, and how to contact him.
Be friendly, professional, helpful, and concise.

Bayu's Key Facts:
- First Name: Bayu
- Last Name: Saputra
- Title: IT Infrastructure Engineer
- Location: Bekasi, West Java, Indonesia (TimeZone: Asia/Jakarta)
- Email: bayusaputra.005.003@gmail.com
- LinkedIn: https://linkedin.com/in/bayusaputra05
- GitHub: https://github.com/bayu5aputra

Current Role:
IT Infrastructure Engineer at Sinar Mas Land (Nov 2025 - Present)
- Operates multi-site networks with hybrid monitoring (ICCC, ITMS, and MikroTik 'The Dude').
- Troubleshoots Layer 1 and Layer 2 fiber optics backbone and VoIP endpoints.
- Manages field IoT reliability (flood sensors, soil movement sensors, rain meters, and ATCS/CCTV).
- Incident SLA handler (P1-P4 tickets) and vendor compliance manager.

Previous Work:
- Sinar Mas Land (Sep 2025 - Nov 2025): IT Infrastructure Internship (Grafana + Docker monitoring, Area Traffic Control Systems).
- Damai Putra Group (Dec 2024 - Jun 2025): IT Support Internship (LAN/WAN, VPN, Firewalls, Windows/Linux server administration).
- BAZNAS (Nov 2024 - Dec 2024): Web Development Internship (Looker Studio dashboard, web email broadcaster).
- Kominfo (Oct 2024 - Nov 2024): Network Technician Internship (LAN cabling, DHCP snooping, Rogue DHCP mitigation).

Education:
- Bani Saleh University: Bachelor of Computer Science, GPA 3.76/4.00 (Sep 2021 - Aug 2025).

Top Certifications:
- MikroTik Certified Network Associate (MTCNA) - Issued Feb 2025
- Cisco CCNA: Switching, Routing, and Wireless Essentials (SRWE) - Issued Sep 2023
- Cisco CCNA: Introduction to Networks (ITN) - Issued Sep 2023
- BNSP (Badan Nasional Sertifikasi Profesi) Network and Infrastructure - Issued Jul 2024
- DevOps Fundamentals (Dicoding) - Issued Sep 2024
- Junior Network Administrator (Vocational School Graduate Academy, DTS) - Issued Feb 2024
- Java Programming & Java Fundamental (Oracle) - Issued 2023

Top Projects:
- Looker Studio donation analytics dashboard at BAZNAS.
- Grafana + Docker dashboard for real-time ATCS device monitoring at Sinar Mas Land.
- Multi-site secure network topology deployment across campus environments.

Technical & Domain Knowledge:
- You have expert knowledge of standard IT and networking concepts related to Bayu's background, including MTCNA, CCNA, MikroTik, Cisco, Docker, Grafana, IoT, VoIP, and LAN/WAN.
- If a user asks general questions about these certifications or technologies (e.g., "Apa itu MTCNA?" or "What is CCNA?"), explain the certification/technology clearly and professionally, and naturally connect it back to Bayu's expertise and how he applies it.

Tone Instructions:
- Answer directly based on these facts. If asked about things completely unrelated to Bayu or his IT/networking domain, suggest emailing Bayu at bayusaputra.005.003@gmail.com.
- Do not make up fake experiences or certificates. Keep responses concise (1-3 paragraphs or bullet points).`;

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi there! I am Bayu's virtual co-pilot. Ask me anything about his work at Sinar Mas Land, network certifications (CCNA, MTCNA), projects, or how to reach him!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Settings states
  const [customModel, setCustomModel] = useState("nvidia/nemotron-3-super-120b-a12b:free");
  const [suggestions, setSuggestions] = useState<string[]>([
    "What certificates does Bayu have?",
    "Tell me about Sinar Mas Land role",
    "How do I contact Bayu?",
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load custom credentials on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedModel =
        localStorage.getItem("openrouter_model") || "nvidia/nemotron-3-super-120b-a12b:free";
      setCustomModel(savedModel);
    }
  }, []);

  // Auto scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll needs to trigger on message or loading state updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const saveSettings = () => {
    localStorage.setItem("openrouter_model", customModel);
    setShowSettings(false);
  };

  const updateSuggestions = (userText: string, aiText: string) => {
    const text = `${userText} ${aiText}`.toLowerCase();

    let newSuggestions = [
      "What certificates does Bayu have?",
      "Tell me about Sinar Mas Land role",
      "How do I contact Bayu?",
    ];

    if (
      text.includes("sertifikasi") ||
      text.includes("certification") ||
      text.includes("sertifikat") ||
      text.includes("certificate") ||
      text.includes("ccna") ||
      text.includes("mtcna") ||
      text.includes("mikrotik") ||
      text.includes("cisco") ||
      text.includes("bnsp")
    ) {
      newSuggestions = [
        "What is MTCNA certification?",
        "Tell me more about Cisco CCNA",
        "Are there other network credentials?",
      ];
    } else if (
      text.includes("role") ||
      text.includes("kerja") ||
      text.includes("pekerjaan") ||
      text.includes("job") ||
      text.includes("sinar mas") ||
      text.includes("sinarmas") ||
      text.includes("baznas") ||
      text.includes("damai putra") ||
      text.includes("kominfo") ||
      text.includes("internship") ||
      text.includes("experience")
    ) {
      newSuggestions = [
        "What projects did Bayu do at Sinar Mas Land?",
        "What tools does he use for IoT?",
        "Tell me about his BAZNAS internship",
      ];
    } else if (
      text.includes("project") ||
      text.includes("proyek") ||
      text.includes("portofolio") ||
      text.includes("portfolio") ||
      text.includes("website") ||
      text.includes("app") ||
      text.includes("aplikasi")
    ) {
      newSuggestions = [
        "Tell me about his cooking recipe app",
        "What is the dealership web profile?",
        "How is the ATCS device monitored?",
      ];
    } else if (
      text.includes("contact") ||
      text.includes("hubungi") ||
      text.includes("email") ||
      text.includes("sosmed") ||
      text.includes("social") ||
      text.includes("linkedin") ||
      text.includes("github") ||
      text.includes("reach")
    ) {
      newSuggestions = [
        "What is Bayu's email address?",
        "Show me his LinkedIn profile",
        "How to hire Bayu?",
      ];
    }

    setSuggestions(newSuggestions);
  };

  const handleSend = async (textToSend?: string) => {
    const activeText = textToSend || input;
    if (!activeText.trim() || isLoading) return;

    if (!textToSend) {
      setInput("");
    }

    const newMessages: Message[] = [...messages, { role: "user", content: activeText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const payloadMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...newMessages];

      // Safe backend Route Handler proxy (no keys exposed!)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: customModel,
          messages: payloadMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          data.message || (typeof data.error === "object" ? data.error.message : data.error);
        throw new Error(errorMsg || "Failed to fetch AI response.");
      }

      const aiMessage = data.choices?.[0]?.message?.content || "No response received.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiMessage }]);
      updateSuggestions(activeText, aiMessage);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message || "An issue occurred connecting to the model. Please check your API credentials or try again later."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <IconButton
          icon="chat"
          size="l"
          variant="secondary"
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: "50%",
            boxShadow: "0 8px 32px var(--brand-alpha-strong)",
            cursor: "pointer",
            border: "1px solid var(--brand-alpha-medium)",
            width: "56px",
            height: "56px",
            background: "rgba(5, 7, 11, 0.8)",
            backdropFilter: "blur(8px)",
          }}
        />
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <Column
          background="surface"
          border="neutral-alpha-weak"
          radius="l"
          style={{
            width: "360px",
            height: "520px",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--neutral-alpha-medium)",
          }}
        >
          {/* Header */}
          <Row
            padding="12"
            vertical="center"
            horizontal="between"
            borderBottom="neutral-alpha-weak"
            background="surface"
            style={{ borderBottom: "1px solid var(--neutral-alpha-medium)", flexShrink: 0 }}
          >
            <Row gap="8" vertical="center">
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brand-solid-strong)",
                  boxShadow: "0 0 8px var(--brand-solid-strong)",
                }}
              />
              <Column>
                <Text variant="body-default-s" weight="strong">
                  Bayu's Co-pilot
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  AI Portfolio Assistant
                </Text>
              </Column>
            </Row>
            <Row gap="4">
              <IconButton
                icon="cog"
                size="s"
                variant="ghost"
                onClick={() => setShowSettings(!showSettings)}
              />
              <IconButton icon="x" size="s" variant="ghost" onClick={() => setIsOpen(false)} />
            </Row>
          </Row>

          {/* Settings Overlay Drawer */}
          {showSettings ? (
            <Column
              padding="16"
              gap="16"
              flex={1}
              className="no-scrollbar"
              style={{ overflowY: "auto", background: "rgba(5, 7, 11, 0.95)" }}
            >
              <Text variant="body-default-s" weight="strong">
                Chatbot Configuration
              </Text>

              <Column gap="8" fillWidth>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Select AI Assistant Model
                </Text>

                <Column gap="12" fillWidth>
                  {/* Nvidia Nemotron Card */}
                  <Row
                    padding="12"
                    radius="m"
                    vertical="center"
                    style={{
                      cursor: "pointer",
                      background: "var(--neutral-alpha-weak)",
                      border:
                        customModel === "nvidia/nemotron-3-super-120b-a12b:free"
                          ? "2px solid var(--brand-solid)"
                          : "2px solid var(--neutral-alpha-medium)",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setCustomModel("nvidia/nemotron-3-super-120b-a12b:free")}
                  >
                    <Column gap="4" flex={1}>
                      <Text variant="label-strong-m" onBackground="neutral-strong">
                        NVIDIA Nemotron 3 Super (Free)
                      </Text>
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{ fontSize: "11px" }}
                      >
                        120B hybrid MoE model, optimized for reasoning & speed
                      </Text>
                    </Column>
                    {customModel === "nvidia/nemotron-3-super-120b-a12b:free" && (
                      <Flex style={{ color: "var(--brand-solid)", fontWeight: "bold" }}>✓</Flex>
                    )}
                  </Row>

                  {/* Gemini Card */}
                  <Row
                    padding="12"
                    radius="m"
                    vertical="center"
                    style={{
                      cursor: "pointer",
                      background: "var(--neutral-alpha-weak)",
                      border:
                        customModel === "google/gemini-2.5-flash"
                          ? "2px solid var(--brand-solid)"
                          : "2px solid var(--neutral-alpha-medium)",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setCustomModel("google/gemini-2.5-flash")}
                  >
                    <Column gap="4" flex={1}>
                      <Text variant="label-strong-m" onBackground="neutral-strong">
                        Gemini 2.5 Flash (Direct API)
                      </Text>
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{ fontSize: "11px" }}
                      >
                        Ultra low-latency, fast direct Google fallback
                      </Text>
                    </Column>
                    {customModel === "google/gemini-2.5-flash" && (
                      <Flex style={{ color: "var(--brand-solid)", fontWeight: "bold" }}>✓</Flex>
                    )}
                  </Row>
                </Column>
              </Column>

              <Row gap="8" style={{ width: "100%", marginTop: "auto" }}>
                <Button
                  size="s"
                  variant="secondary"
                  fillWidth
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </Button>
                <Button size="s" fillWidth onClick={saveSettings}>
                  Save Settings
                </Button>
              </Row>
            </Column>
          ) : (
            <>
              {/* Message History View */}
              <Column
                padding="12"
                gap="12"
                flex={1}
                className="no-scrollbar"
                style={{ overflowY: "auto", minHeight: 0 }}
              >
                {messages.map((msg, index) => (
                  <Flex
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is appropriate since message order is stable
                    key={index}
                    fillWidth
                    horizontal={msg.role === "user" ? "end" : "start"}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        borderTopRightRadius: msg.role === "user" ? "2px" : "12px",
                        borderTopLeftRadius: msg.role !== "user" ? "2px" : "12px",
                        background:
                          msg.role === "user"
                            ? "var(--brand-alpha-medium)"
                            : "var(--neutral-alpha-weak)",
                        border:
                          msg.role === "user"
                            ? "1px solid var(--brand-alpha-strong)"
                            : "1px solid var(--neutral-alpha-medium)",
                      }}
                    >
                      <div
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {renderMarkdown(msg.content, msg.role === "user")}
                      </div>
                    </div>
                  </Flex>
                ))}

                {isLoading && (
                  <Row gap="8" vertical="center" padding="4">
                    <Spinner size="s" />
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                      Typing...
                    </Text>
                  </Row>
                )}
                <div ref={chatEndRef} />
              </Column>

              {/* Suggestions Panel */}
              {!isLoading && suggestions.length > 0 && (
                <Column paddingX="12" paddingBottom="8" gap="4" style={{ flexShrink: 0 }}>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Quick Suggestions:
                  </Text>
                  <Row gap="4" style={{ flexWrap: "wrap" }}>
                    {suggestions.map((suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        onClick={() => handleSend(suggestion)}
                        style={{
                          background: "var(--neutral-alpha-weak)",
                          border: "1px solid var(--neutral-alpha-medium)",
                          borderRadius: "16px",
                          padding: "6px 10px",
                          fontSize: "11px",
                          color: "var(--neutral-on-background-strong)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--brand-alpha-strong)";
                          e.currentTarget.style.background = "var(--brand-alpha-weak)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--neutral-alpha-medium)";
                          e.currentTarget.style.background = "var(--neutral-alpha-weak)";
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </Row>
                </Column>
              )}

              {/* Message Inputs Footer */}
              <Row
                padding="8"
                gap="8"
                borderTop="neutral-alpha-weak"
                style={{
                  borderTop: "1px solid var(--neutral-alpha-medium)",
                  background: "var(--neutral-alpha-weak)",
                  flexShrink: 0,
                }}
              >
                <div style={{ flex: 1 }}>
                  <Input
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                  />
                </div>
                <IconButton
                  icon="send"
                  size="m"
                  variant="secondary"
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                />
              </Row>
            </>
          )}
        </Column>
      )}
    </div>
  );
};

const parseInlineMarkdown = (text: string) => {
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|(`)(.*?)\5|\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while (true) {
    match = regex.exec(text);
    if (!match) break;

    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: "bold" }}>
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      parts.push(
        <em key={match.index} style={{ fontStyle: "italic" }}>
          {match[4]}
        </em>,
      );
    } else if (match[5]) {
      parts.push(
        <code
          key={match.index}
          style={{
            fontFamily: "monospace",
            background: "var(--neutral-alpha-medium)",
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "0.9em",
          }}
        >
          {match[6]}
        </code>,
      );
    } else if (match[7]) {
      parts.push(
        <a
          key={match.index}
          href={match[8]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--brand-solid)",
            textDecoration: "underline",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {match[7]}
        </a>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const renderMarkdown = (text: string, isUser: boolean) => {
  const lines = text.split("\n");
  const textColor = isUser
    ? "var(--brand-on-background-strong)"
    : "var(--neutral-on-background-strong)";

  const linesWithKeys = lines.map((line, idx) => ({
    line,
    id: `md-line-${idx}-${line.length}`,
  }));

  return linesWithKeys.map(({ line, id }) => {
    if (line.startsWith("### ")) {
      return (
        <Text
          key={id}
          variant="heading-strong-xs"
          style={{ display: "block", marginTop: "8px", marginBottom: "4px", color: textColor }}
        >
          {parseInlineMarkdown(line.substring(4))}
        </Text>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <Text
          key={id}
          variant="heading-strong-s"
          style={{ display: "block", marginTop: "12px", marginBottom: "6px", color: textColor }}
        >
          {parseInlineMarkdown(line.substring(3))}
        </Text>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <Text
          key={id}
          variant="heading-strong-m"
          style={{ display: "block", marginTop: "16px", marginBottom: "8px", color: textColor }}
        >
          {parseInlineMarkdown(line.substring(2))}
        </Text>
      );
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <Row
          key={id}
          gap="8"
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingLeft: "8px",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <Text variant="body-default-s" style={{ color: textColor }}>
            •
          </Text>
          <Text variant="body-default-s" style={{ flex: 1, color: textColor }}>
            {parseInlineMarkdown(line.substring(2))}
          </Text>
        </Row>
      );
    }

    const numListMatch = line.match(/^(\d+)\.\s(.*)/);
    if (numListMatch) {
      const num = numListMatch[1];
      const content = numListMatch[2];
      return (
        <Row
          key={id}
          gap="8"
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingLeft: "8px",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <Text variant="body-default-s" style={{ color: textColor }}>
            {num}.
          </Text>
          <Text variant="body-default-s" style={{ flex: 1, color: textColor }}>
            {parseInlineMarkdown(content)}
          </Text>
        </Row>
      );
    }

    if (line.trim() === "") {
      return <div key={id} style={{ height: "8px" }} />;
    }

    return (
      <Text
        key={id}
        variant="body-default-s"
        style={{ display: "block", marginBottom: "4px", color: textColor }}
      >
        {parseInlineMarkdown(line)}
      </Text>
    );
  });
};
