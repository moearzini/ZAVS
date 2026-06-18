import { useNavigate } from "react-router";
import { CheckCircle2, ArrowRight, Plus, Copy } from "lucide-react";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/zavs/StatusBadge";
import { useEffect, useState } from "react";

export function TicketConfirmation() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const ticketNumber = "ZAVS-2026-0142";

  useEffect(() => {
    setTimeout(() => setShowSuccess(true), 100);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ticketNumber);
    } catch (err) {
      // Fallback: select text
      const textArea = document.createElement('textarea');
      textArea.value = ticketNumber;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 lg:pb-8">
      <div
        className={`
          bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm
          transition-all duration-500 transform
          ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="relative h-20 w-20 text-emerald-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl text-center tracking-tight text-gray-900 mb-4">
          Ticket erfolgreich eingereicht
        </h1>

        {/* Ticket Number */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl text-gray-900">#{ticketNumber}</span>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Ticketnummer kopieren"
          >
            <Copy className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          Dein Anliegen wurde erfolgreich erfasst. Eine Eingangsbestätigung wurde
          an deine E-Mail-Adresse gesendet.
        </p>

        {/* Ticket Info Card */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <StatusBadge status="new" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Kategorie</span>
            <span className="text-sm text-gray-900">Facility Management</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Betreff</span>
            <span className="text-sm text-gray-900 text-right max-w-xs truncate">
              Beamer in Raum A204 funktioniert nicht
            </span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-sm text-gray-900 mb-3">Nächste Schritte</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Dein Ticket wird automatisch der passenden Stelle zugeordnet.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Du erhältst Statusupdates per E-Mail.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Den aktuellen Bearbeitungsstand kannst du jederzeit über den Statuslink prüfen.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate(`/ticket/status?id=${ticketNumber}`)}
            className="bg-[#E2001A] hover:bg-[#C20018] text-white rounded-xl flex-1 group"
          >
            Ticketstatus ansehen
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => navigate("/ticket/new")}
            variant="outline"
            className="rounded-xl flex-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            Weiteres Ticket erstellen
          </Button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
}
