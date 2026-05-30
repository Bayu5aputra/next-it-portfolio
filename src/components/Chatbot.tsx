"use client";

import { person } from "@/resources";
import { Button, Column, Flex, IconButton, Input, Row, Spinner, Text } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
- You have expert knowledge of standard IT, Networking, Cybersecurity, Cloud, and IoT concepts (including SOC, SD-WAN, MTCNA, CCNA, MikroTik, Cisco, Docker, Grafana, VoIP, and LAN/WAN).
- If a user asks general questions about any IT or cybersecurity topic (e.g., "Apa itu SOC?" or "How does SD-WAN work?"), you MUST explain the concept clearly, professionally, and comprehensively using your general knowledge.
- After explaining, naturally connect the concept back to Bayu's expertise or projects where applicable.

Tone Instructions:
- Answer directly and helpfully. If asked about things *completely* outside the IT/networking/cybersecurity domain (like cooking or pop culture), politely decline and suggest emailing Bayu at bayusaputra.005.003@gmail.com.
- Do not make up fake experiences or certificates for Bayu. Keep responses concise but informative.
- IMPORTANT: At the very end of EVERY response, you MUST provide exactly 3 short, natural follow-up questions that the user might want to ask next based on the conversation context. You MUST format these questions exactly as a JSON array on a new line prefixed with "SUGGESTIONS:". For example:
SUGGESTIONS: ["What is MTCNA?", "Tell me about Sinar Mas", "Show me IoT projects"]`;

// --- Adaptive suggestions constants ---
// Keyword-to-suggestion mapping for blog/work slug keywords
const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  // Networking topics
  mikrotik:   ["What is Bayu's MTCNA cert?", "How does Bayu harden routers?", "MikroTik vs Cisco experience?"],
  cve:        ["How does Bayu handle CVEs?", "RouterOS hardening tips?", "Any network security projects?"],
  hardening:  ["What firewall rules does Bayu use?", "How to secure management access?", "Tell me about network security"],
  networking: ["What networking certs does Bayu have?", "Explain CCNA vs MTCNA", "Multi-site network experience?"],
  "5g":       ["How does 5G affect IoT?", "Bayu's networking background?", "SD-WAN and 5G together?"],
  sdwan:      ["What is SASE?", "Bayu's multi-site network work?", "MPLS vs SD-WAN experience?"],
  sase:       ["How does Zero Trust work?", "SD-WAN at Sinar Mas Land?", "Network architecture projects?"],

  // Security topics
  security:   ["Bayu's security certifications?", "Zero Trust implementation?", "How are incidents handled?"],
  "zero-trust": ["How does Bayu implement ZT?", "Identity-based security?", "P1-P4 incident handling?"],
  agentic:    ["How does Bayu handle incidents?", "What is SLA P1-P4?", "Security monitoring tools?"],
  soc:        ["Incident response at Sinar Mas?", "What monitoring tools are used?", "CTEM explained?"],
  cybersecurity: ["What security certs does Bayu have?", "How are P1 incidents handled?", "Network security projects?"],
  cloud:      ["Cloud security experience?", "Docker and container security?", "Monitoring cloud infra?"],

  // IoT topics
  iot:        ["What IoT devices does Bayu manage?", "Flood sensor monitoring?", "IoT security practices?"],
  botnet:     ["How to protect IoT devices?", "Bayu's field device security?", "Network segmentation for IoT?"],
  sensor:     ["What sensors does Bayu manage?", "Flood and soil monitoring?", "IoT data pipeline?"],
  smart:      ["Smart city projects?", "ATCS monitoring system?", "IoT at Sinar Mas Land?"],
  atcs:       ["How does ATCS monitoring work?", "Grafana + Docker dashboard?", "Traffic system experience?"],

  // Monitoring / Observability
  grafana:    ["How does Bayu use Grafana?", "ATCS monitoring dashboard?", "Docker + Prometheus setup?"],
  docker:     ["Docker monitoring stack?", "Grafana deployment with Docker?", "Container experience?"],
  observability: ["What monitoring tools are used?", "SLO-based alerting?", "Prometheus + Loki setup?"],
  monitoring: ["Grafana dashboards at work?", "How are devices monitored?", "ICCC and ITMS tools?"],
  prometheus: ["Prometheus + Grafana setup?", "Metrics collection approach?", "Monitoring IoT devices?"],

  // Smart City
  city:       ["Smart city projects?", "ATCS system details?", "IoT in urban infrastructure?"],
  traffic:    ["ATCS traffic system?", "How is traffic monitored?", "Smart APIL experience?"],
  apil:       ["What is Smart APIL?", "ATCS at Sinar Mas Land?", "Traffic monitoring tools?"],
  sustainability: ["Green tech in smart cities?", "IoT for sustainability?", "Environmental sensors?"],

  // Work/projects
  looker:     ["BAZNAS dashboard details?", "Looker Studio experience?", "Data visualization projects?"],
  baznas:     ["What did Bayu do at BAZNAS?", "Looker Studio dashboard?", "Web development internship?"],
  "sinar-mas": ["Current role details?", "IoT work at Sinar Mas?", "Multi-site network ops?"],
};

const DEFAULT_SUGGESTIONS = [
  "What certificates does Bayu have?",
  "Tell me about Sinar Mas Land role",
  "How do I contact Bayu?",
];

const PAGE_SUGGESTIONS: Record<string, string[]> = {
  "/about":  ["What is Bayu's education?", "Work experience summary?", "Technical skills overview?"],
  "/badges": ["What is MTCNA?", "Cisco CCNA details?", "BNSP certification?"],
  "/work":   ["Featured projects?", "ATCS monitoring project?", "Looker Studio dashboard?"],
  "/blog":   ["Latest blog post topics?", "IoT articles?", "Networking articles?"],
};

// Extract matching suggestions from slug keywords
const getSuggestionsForSlug = (slug: string): string[] => {
  const words = slug.toLowerCase().split("-");
  for (const word of words) {
    if (Object.prototype.hasOwnProperty.call(TOPIC_SUGGESTIONS, word)) {
      return TOPIC_SUGGESTIONS[word];
    }
  }
  // Try partial matches for compound slugs
  const fullSlug = slug.toLowerCase();
  for (const [key, suggs] of Object.entries(TOPIC_SUGGESTIONS)) {
    if (fullSlug.includes(key)) {
      return suggs;
    }
  }
  return DEFAULT_SUGGESTIONS;
};

interface ChatbotProps {
  isVisible?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi there! I am Next Co-Pilot. Ask me anything about Bayu's work at Sinar Mas Land, network certifications (CCNA, MTCNA), projects, or how to reach him!`,
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

  // Page context for adaptive suggestions
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load custom credentials, chat history, and open status on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedModel =
        localStorage.getItem("openrouter_model") || "nvidia/nemotron-3-super-120b-a12b:free";
      setCustomModel(savedModel);

      const savedMessages = localStorage.getItem("chatbot_messages");
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Failed to parse saved messages", e);
        }
      }

      const savedIsOpen = localStorage.getItem("chatbot_is_open");
      if (savedIsOpen) {
        setIsOpen(savedIsOpen === "true");
      }
    }
  }, []);

  // Sync messages to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Sync isOpen to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot_is_open", String(isOpen));
    }
  }, [isOpen]);

  // Auto scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll needs to trigger on message or loading state updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const saveSettings = () => {
    localStorage.setItem("openrouter_model", customModel);
    setShowSettings(false);
  };

  // --- Adaptive suggestions: fully client-side, zero AI tokens ---

  // Get suggestions based on current page
  const getSuggestionsForPage = useCallback((): string[] => {
    if (!pathname) return DEFAULT_SUGGESTIONS;

    // Blog article
    if (pathname.startsWith("/blog/") && pathname !== "/blog") {
      const slug = pathname.replace("/blog/", "");
      return getSuggestionsForSlug(slug);
    }

    // Work project
    if (pathname.startsWith("/work/") && pathname !== "/work") {
      const slug = pathname.replace("/work/", "");
      return getSuggestionsForSlug(slug);
    }

    // Static pages
    if (PAGE_SUGGESTIONS[pathname]) {
      return PAGE_SUGGESTIONS[pathname];
    }

    return DEFAULT_SUGGESTIONS;
  }, [pathname]);

  // Update suggestions when page changes
  useEffect(() => {
    if (pathname && pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setSuggestions(getSuggestionsForPage());
    }
  }, [pathname, getSuggestionsForPage]);

  // Update suggestions after each conversation based on keywords
  const updateSuggestions = (userText: string, aiText: string) => {
    const combined = `${userText} ${aiText}`.toLowerCase();

    // Check conversation keywords against topic map
    for (const [keyword, suggs] of Object.entries(TOPIC_SUGGESTIONS)) {
      if (combined.includes(keyword)) {
        setSuggestions(suggs);
        return;
      }
    }

    // Broader keyword categories as fallback
    if (/sertifikasi|certification|sertifikat|certificate|ccna|mtcna|bnsp/.test(combined)) {
      setSuggestions(["What is MTCNA certification?", "Cisco CCNA details?", "Other network credentials?"]);
    } else if (/role|kerja|pekerjaan|job|experience|internship/.test(combined)) {
      setSuggestions(["Projects at Sinar Mas Land?", "What tools for IoT?", "BAZNAS internship?"]);
    } else if (/project|proyek|portofolio|portfolio/.test(combined)) {
      setSuggestions(["ATCS monitoring project?", "Looker Studio dashboard?", "GitHub repositories?"]);
    } else if (/contact|hubungi|email|linkedin|github|hire/.test(combined)) {
      setSuggestions(["Bayu's email address?", "LinkedIn profile?", "How to hire Bayu?"]);
    } else {
      // Fall back to page-based suggestions
      setSuggestions(getSuggestionsForPage());
    }
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

      let aiMessage = data.choices?.[0]?.message?.content || "No response received.";
      
      // Parse out adaptive suggestions if provided by AI
      const suggestionsMatch = aiMessage.match(/SUGGESTIONS:\s*(\[[\s\S]*\])/i);
      if (suggestionsMatch?.[1]) {
        try {
          const parsedSuggestions = JSON.parse(suggestionsMatch[1]);
          if (Array.isArray(parsedSuggestions) && parsedSuggestions.length > 0) {
            setSuggestions(parsedSuggestions.slice(0, 3).map(s => String(s).trim()));
            // Remove the suggestions block from the message displayed to user
            aiMessage = aiMessage.replace(suggestionsMatch[0], "").trim();
          } else {
            updateSuggestions(activeText, aiMessage);
          }
        } catch (e) {
          console.error("Failed to parse AI suggestions", e);
          updateSuggestions(activeText, aiMessage);
        }
      } else {
        // Fallback to local keywords if AI didn't provide suggestions
        updateSuggestions(activeText, aiMessage);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiMessage }]);
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
    <div
      className="chatbot-container"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
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
          className="chatbot-window"
          style={{
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
                  Next Co-Pilot
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
                        NVIDIA Nemotron 3 Super
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
                        Gemini 2.5 Flash
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
                    AI Suggestion:
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
