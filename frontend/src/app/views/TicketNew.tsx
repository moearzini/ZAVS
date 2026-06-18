import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ProgressStepper } from "../components/zavs/ProgressStepper";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertCircle, Sparkles } from "lucide-react";

export function TicketNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [aiSuggested, setAiSuggested] = useState(false);

  const steps = [
    { number: 1, label: "Anliegen", status: "current" as const },
    { number: 2, label: "Details", status: "upcoming" as const },
    { number: 3, label: "Prüfen", status: "upcoming" as const },
    { number: 4, label: "Bestätigung", status: "upcoming" as const },
  ];

  const categories = [
    "IT",
    "Facility Management",
    "Sekretariat",
    "Verwaltung",
    "Unterrichtsmaterial",
    "Sonstiges Anliegen",
  ];

  // KI-basierte Kategorie-Vorschläge
  const suggestCategory = (title: string): string | null => {
    const lowerTitle = title.toLowerCase();

    // IT-Keywords
    if (lowerTitle.match(/wlan|wifi|internet|netzwerk|computer|pc|laptop|drucker|software|login|passwort|email|e-mail|zugang|vpn|account/)) {
      return "IT";
    }

    // Facility Management-Keywords
    if (lowerTitle.match(/beamer|projektor|raum|tür|fenster|heizung|licht|stuhl|tisch|tafel|whiteboard|klimaanlage|defekt|kaputt|reparatur|reinigung/)) {
      return "Facility Management";
    }

    // Unterrichtsmaterial-Keywords
    if (lowerTitle.match(/skript|unterlagen|material|bücher|literatur|kopien|folien/)) {
      return "Unterrichtsmaterial";
    }

    // Verwaltung-Keywords
    if (lowerTitle.match(/bescheinigung|zeugnis|attest|bafög|immatrikulation|exmatrikulation|studiengang|prüfung|anmeldung/)) {
      return "Verwaltung";
    }

    // Sekretariat-Keywords
    if (lowerTitle.match(/termin|sprechstunde|brief|post|dokument|formular|unterschrift/)) {
      return "Sekretariat";
    }

    return null;
  };

  // Automatische Kategorie-Vorschlag bei Betreff-Änderung
  useEffect(() => {
    if (formData.title.length > 5 && !formData.category) {
      const suggested = suggestCategory(formData.title);
      if (suggested) {
        setFormData(prev => ({ ...prev, category: suggested }));
        setAiSuggested(true);

        // Animation-Effekt nach kurzer Zeit ausblenden
        setTimeout(() => setAiSuggested(false), 3000);
      }
    }
  }, [formData.title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = "Bitte gib einen Betreff ein";
    if (!formData.category) newErrors.category = "Bitte wähle eine Kategorie";
    if (!formData.description) newErrors.description = "Bitte beschreibe dein Anliegen";
    if (!formData.email) newErrors.email = "Bitte gib deine E-Mail-Adresse ein";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/ticket/details");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight text-gray-900 mb-6">
          Neues Ticket einreichen
        </h1>
        <ProgressStepper steps={steps} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Betreff / Titel des Anliegens <span className="text-[#E2001A]">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="z.B. Beamer in Raum A204 funktioniert nicht"
                  className={`rounded-xl ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  Kategorie <span className="text-[#E2001A]">*</span>
                  {aiSuggested && (
                    <span className="flex items-center gap-1 text-xs text-purple-600 animate-pulse">
                      <Sparkles className="h-3.5 w-3.5" />
                      KI-Vorschlag
                    </span>
                  )}
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value });
                    setAiSuggested(false);
                  }}
                >
                  <SelectTrigger className={`rounded-xl transition-all ${
                    aiSuggested
                      ? "border-purple-400 bg-purple-50/50"
                      : errors.category
                      ? "border-red-500"
                      : ""
                  }`}>
                    <SelectValue placeholder="Bitte auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {aiSuggested && !errors.category && (
                  <p className="text-xs text-purple-600 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Kategorie wurde automatisch vorgeschlagen
                  </p>
                )}
                {errors.category && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Beschreibung des Anliegens <span className="text-[#E2001A]">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Beschreibe dein Anliegen so konkret wie möglich..."
                  rows={5}
                  className={`rounded-xl resize-none ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Je genauer deine Angaben sind, desto schneller kann die zuständige Stelle helfen.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-Mail-Adresse <span className="text-[#E2001A]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="deine.email@dhbw.de"
                  className={`rounded-xl ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Mit deiner Hochschul-E-Mail kann dein Anliegen schneller zugeordnet werden.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl flex-1 sm:flex-none"
                onClick={() => navigate("/")}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="bg-[#E2001A] hover:bg-[#C20018] text-white rounded-xl flex-1 sm:flex-none"
              >
                Weiter zu Details
              </Button>
            </div>
          </form>
        </div>

        {/* Help Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sticky top-8">
            <h3 className="text-base text-gray-900 mb-4">
              Was passiert nach dem Absenden?
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E2001A]/10 text-[#E2001A] text-xs">
                  1
                </span>
                <span>Ticketnummer wird erstellt</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E2001A]/10 text-[#E2001A] text-xs">
                  2
                </span>
                <span>Du erhältst eine Eingangsbestätigung</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E2001A]/10 text-[#E2001A] text-xs">
                  3
                </span>
                <span>Status ist per Link einsehbar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
