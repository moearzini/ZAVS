import { useState, useEffect } from "react";
import { Sparkles, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<FAQ[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const placeholderQuestions = [
    "Wie kann ich meinen Ticketstatus einsehen?",
    "Wie lange dauert die Bearbeitung meines Anliegens?",
    "Welche Dateiformate kann ich hochladen?",
    "An wen wird mein Ticket weitergeleitet?",
    "Kann ich ein Ticket nachträglich bearbeiten?",
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      category: "Allgemein",
      question: "Was ist ZAVS?",
      answer: "ZAVS (Zentrales Anliegen- und Verwaltungssystem) ist ein digitales Ticketsystem für alle Hochschulangehörigen. Hier können Sie technische Störungen, Verwaltungsanliegen, Fragen zu Unterrichtsmaterialien und vieles mehr zentral einreichen und nachverfolgen.",
      keywords: ["zavs", "system", "ticketsystem", "was ist"],
    },
    {
      id: "2",
      category: "Ticket einreichen",
      question: "Wie reiche ich ein Ticket ein?",
      answer: "Klicken Sie auf 'Ticket einreichen' in der Navigation. Füllen Sie zunächst Betreff, Kategorie und Beschreibung aus. Im nächsten Schritt können Sie optional Dringlichkeit, Raum und Dateien ergänzen. Nach der Prüfung erhalten Sie eine Ticketnummer und Bestätigung per E-Mail.",
      keywords: ["ticket", "einreichen", "erstellen", "anlegen", "wie"],
    },
    {
      id: "3",
      category: "Ticket einreichen",
      question: "Welche Kategorien gibt es?",
      answer: "Folgende Kategorien stehen zur Verfügung: IT (technische Probleme), Facility Management (Räume, Ausstattung), Sekretariat (Termine, Dokumente), Verwaltung (Bescheinigungen, Prüfungen), Unterrichtsmaterial (Skripte, Literatur) und Sonstiges Anliegen.",
      keywords: ["kategorie", "kategorien", "welche", "auswahl"],
    },
    {
      id: "4",
      category: "Ticket einreichen",
      question: "Welche Dateiformate kann ich hochladen?",
      answer: "Sie können PDF-, PNG- und JPG-Dateien hochladen. Pro Ticket können mehrere Dateien angehängt werden. Bei sensiblen oder personenbezogenen Daten kann eine zusätzliche Authentifizierung erforderlich sein.",
      keywords: ["dateien", "upload", "hochladen", "format", "pdf", "png", "jpg"],
    },
    {
      id: "5",
      category: "Ticketstatus",
      question: "Wie kann ich meinen Ticketstatus einsehen?",
      answer: "Nach der Einreichung erhalten Sie eine eindeutige Ticketnummer und einen Statuslink per E-Mail. Über diesen Link oder die Navigation 'Ticketstatus' können Sie jederzeit den aktuellen Bearbeitungsstand einsehen. Eine Anmeldung ist nicht erforderlich.",
      keywords: ["status", "einsehen", "prüfen", "nachverfolgen", "ticketnummer"],
    },
    {
      id: "6",
      category: "Ticketstatus",
      question: "Wie lange dauert die Bearbeitung?",
      answer: "Die Bearbeitungsdauer hängt von der Kategorie und Dringlichkeit ab. IT-Störungen werden meist innerhalb von 24 Stunden bearbeitet, Verwaltungsanliegen können 3-5 Werktage dauern. Sie erhalten automatisch E-Mail-Updates über Statusänderungen.",
      keywords: ["dauer", "bearbeitung", "wie lange", "zeit", "schnell"],
    },
    {
      id: "7",
      category: "Ticketstatus",
      question: "An wen wird mein Ticket weitergeleitet?",
      answer: "Ihr Ticket wird automatisch an die zuständige Stelle weitergeleitet: IT-Tickets an die IT-Abteilung, Facility Management an das Gebäudemanagement, etc. Die Zuordnung erfolgt sofort nach der Einreichung auf Basis der gewählten Kategorie.",
      keywords: ["weiterleitung", "zuständig", "abteilung", "wer", "an wen"],
    },
    {
      id: "8",
      category: "Bearbeitung",
      question: "Kann ich ein Ticket nachträglich bearbeiten?",
      answer: "Derzeit ist eine nachträgliche Bearbeitung nicht möglich. Sie können jedoch über den Button 'Rückfrage senden' auf der Statusseite zusätzliche Informationen an die bearbeitende Stelle übermitteln.",
      keywords: ["bearbeiten", "ändern", "nachträglich", "anpassen"],
    },
    {
      id: "9",
      category: "Bearbeitung",
      question: "Wie erfahre ich von Updates?",
      answer: "Sie erhalten automatisch E-Mail-Benachrichtigungen bei jeder Statusänderung: wenn das Ticket zugeordnet wird, in Bearbeitung geht, auf Rückmeldung wartet oder abgeschlossen wurde. Zusätzlich können Sie jederzeit den Statuslink aufrufen.",
      keywords: ["updates", "benachrichtigung", "email", "information", "statusänderung"],
    },
    {
      id: "10",
      category: "Allgemein",
      question: "Brauche ich einen Account?",
      answer: "Nein, für die Nutzung von ZAVS ist kein Account erforderlich. Sie benötigen lediglich eine gültige E-Mail-Adresse, an die die Bestätigung und der Statuslink gesendet werden. Eine Hochschul-E-Mail beschleunigt die Bearbeitung.",
      keywords: ["account", "login", "anmeldung", "registrierung", "benötigen"],
    },
  ];

  // Typing animation for placeholder
  useEffect(() => {
    if (!searchQuery) {
      const currentQuestion = placeholderQuestions[placeholderIndex] ?? "";
      let currentCharIndex = 0;

      if (isTyping) {
        const typeInterval = setInterval(() => {
          if (currentCharIndex <= currentQuestion.length) {
            setDisplayedText(currentQuestion.slice(0, currentCharIndex));
            currentCharIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => setIsTyping(false), 2000);
          }
        }, 50);

        return () => clearInterval(typeInterval);
      } else {
        const deleteInterval = setInterval(() => {
          if (currentCharIndex > 0) {
            setDisplayedText(currentQuestion.slice(0, currentCharIndex));
            currentCharIndex--;
          } else {
            clearInterval(deleteInterval);
            setIsTyping(true);
            setPlaceholderIndex((prev) => (prev + 1) % placeholderQuestions.length);
          }
        }, 30);

        return () => clearInterval(deleteInterval);
      }
    }
  }, [placeholderIndex, isTyping, searchQuery]);

  // AI-based search
  useEffect(() => {
    if (searchQuery.length > 2) {
      const query = searchQuery.toLowerCase();
      const matches = faqs.filter((faq) => {
        const questionMatch = faq.question.toLowerCase().includes(query);
        const answerMatch = faq.answer.toLowerCase().includes(query);
        const keywordMatch = faq.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
        );
        return questionMatch || answerMatch || keywordMatch;
      });

      setAiSuggestions(matches.slice(0, 3));
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
      setAiSuggestions([]);
    }
  }, [searchQuery]);

  const groupedFaqs = faqs.reduce((acc, faq) => {
    const group = acc[faq.category];
    if (!group) {
      acc[faq.category] = [faq];
    } else {
      group.push(faq);
    }
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="max-w-4xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight text-gray-900 mb-2">Hilfe & FAQ</h1>
        <p className="text-gray-600">
          Häufig gestellte Fragen und Antworten zum ZAVS-Ticketsystem
        </p>
      </div>

      {/* AI Search Field */}
      <div className="relative mb-12">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl border border-purple-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">KI-Assistent</h2>
              <p className="text-xs text-gray-600">Stelle deine Frage und erhalte sofort Antworten</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={displayedText}
              className="rounded-xl pl-12 pr-4 py-6 text-base bg-white border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          {/* AI Suggestions */}
          {showSuggestions && (
            <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-purple-700 flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                KI-Vorschläge basierend auf deiner Frage:
              </p>
              {aiSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                    // Scroll to FAQ
                    document.getElementById(`faq-${suggestion.id}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left bg-white rounded-xl border border-purple-200 p-4 hover:shadow-md hover:border-purple-300 transition-all duration-200"
                >
                  <p className="text-sm text-gray-900 mb-1">{suggestion.question}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{suggestion.answer}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
          <div key={category} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg text-gray-900 mb-4">{category}</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {categoryFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  id={`faq-${faq.id}`}
                  className="border border-gray-200 rounded-xl px-4 data-[state=open]:bg-gray-50"
                >
                  <AccordionTrigger className="text-sm text-gray-900 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Contact Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-base text-gray-900 mb-2">Frage nicht gefunden?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Wenn deine Frage hier nicht beantwortet wird, erstelle einfach ein Ticket.
          Unser Team hilft dir gerne weiter.
        </p>
        <Button
          onClick={() => window.location.href = "/ticket/new"}
          className="bg-[#E2001A] hover:bg-[#C20018] text-white rounded-xl"
        >
          Ticket einreichen
        </Button>
      </div>
    </div>
  );
}
