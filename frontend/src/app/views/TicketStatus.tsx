import { StatusBadge } from "../components/zavs/StatusBadge";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { MessageSquare, Home, Copy } from "lucide-react";

export function TicketStatus() {
  const navigate = useNavigate();
  const ticketNumber = "ZAVS-2026-0142";

  const timeline = [
    {
      status: "complete",
      title: "Ticket wurde erstellt",
      timestamp: "30. April 2026, 10:23 Uhr",
    },
    {
      status: "complete",
      title: "Automatisch Facility Management zugeordnet",
      timestamp: "30. April 2026, 10:23 Uhr",
    },
    {
      status: "current",
      title: "Bearbeitung gestartet",
      timestamp: "30. April 2026, 11:15 Uhr",
    },
    {
      status: "pending",
      title: "Warten auf Rückmeldung",
      timestamp: "",
    },
    {
      status: "pending",
      title: "Abgeschlossen",
      timestamp: "",
    },
  ];

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
    <div className="max-w-5xl mx-auto pb-20 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight text-gray-900 mb-2">Ticketstatus</h1>
        <div className="flex items-center gap-2">
          <span className="text-xl text-gray-600">#{ticketNumber}</span>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Ticketnummer kopieren"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg text-gray-900">Aktueller Status</h2>
              <StatusBadge status="in_progress" />
            </div>
            <p className="text-sm text-gray-600">
              Dein Ticket wird aktuell durch Facility Management geprüft.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg text-gray-900 mb-6">Verlauf</h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full shrink-0
                        ${
                          item.status === "complete"
                            ? "bg-[#E2001A]"
                            : item.status === "current"
                            ? "bg-amber-500"
                            : "bg-gray-200"
                        }
                      `}
                    >
                      {item.status === "complete" && (
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {item.status === "current" && (
                        <div className="h-3 w-3 rounded-full bg-white" />
                      )}
                    </div>
                    {index !== timeline.length - 1 && (
                      <div
                        className={`
                          w-0.5 flex-1 mt-2
                          ${
                            item.status === "complete"
                              ? "bg-[#E2001A]"
                              : "bg-gray-200"
                          }
                        `}
                        style={{ minHeight: "40px" }}
                      />
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 pb-6">
                    <p
                      className={`
                        text-sm
                        ${
                          item.status === "pending"
                            ? "text-gray-500"
                            : "text-gray-900"
                        }
                      `}
                    >
                      {item.title}
                    </p>
                    {item.timestamp && (
                      <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
            <MessageSquare className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Du erhältst weitere Updates automatisch per E-Mail.
            </p>
          </div>
        </div>

        {/* Sidebar - Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ticket Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base text-gray-900 mb-4">Ticketdetails</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-600 mb-1">Betreff</dt>
                <dd className="text-gray-900">Beamer in Raum A204 funktioniert nicht</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">Kategorie</dt>
                <dd className="text-gray-900">Facility Management</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">Dringlichkeit</dt>
                <dd className="text-gray-900">Normal</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">Erstellt am</dt>
                <dd className="text-gray-900">30. April 2026, 10:23 Uhr</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">Letzte Aktualisierung</dt>
                <dd className="text-gray-900">30. April 2026, 11:15 Uhr</dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full rounded-xl"
              disabled
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Rückfrage senden
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Zur Startseite
            </Button>
          </div>

          {/* Feedback */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">
              Feedback nach Abschluss verfügbar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
