import { Link } from "react-router";
import { ArrowRight, Zap, Eye, Clock, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

export function Home() {
  const benefits = [
    {
      icon: MapPin,
      title: "Zentrale Anlaufstelle",
      description: "Alle Anliegen an einem Ort",
    },
    {
      icon: Eye,
      title: "Status jederzeit einsehbar",
      description: "Transparente Nachverfolgung",
    },
    {
      icon: Zap,
      title: "Schnellere Bearbeitung",
      description: "Direkte Weiterleitung an Zuständige",
    },
    {
      icon: Clock,
      title: "Automatische Updates",
      description: "Benachrichtigungen per E-Mail",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 lg:pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-8 sm:p-12 lg:p-16 mb-8 shadow-sm">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-[#E2001A]/5 blur-3xl" />
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 mb-4">
            Dein zentrales Anliegen
            <br />
            schnell und einfach einreichen.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
            Melde technische Störungen, defekte Ausstattung, Verwaltungsanliegen
            oder Fragen direkt an die richtige Stelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ticket/new">
              <Button
                size="lg"
                className="bg-[#E2001A] hover:bg-[#C20018] text-white rounded-full px-8 py-6 text-base shadow-sm transition-all duration-200 hover:shadow-md group w-full sm:w-auto"
              >
                Ticket einreichen
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/ticket/status">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base border-gray-300 hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto"
              >
                Ticketstatus prüfen
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="group rounded-2xl bg-white border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 mb-4 group-hover:bg-[#E2001A]/10 transition-colors">
              <benefit.icon className="h-6 w-6 text-gray-700 group-hover:text-[#E2001A] transition-colors" />
            </div>
            <h3 className="text-base text-gray-900 mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <Link to="/impressum" className="hover:text-gray-900 transition-colors">
          Impressum
        </Link>
        <span className="text-gray-300">•</span>
        <Link to="/impressum#datenschutz" className="hover:text-gray-900 transition-colors">
          Datenschutz
        </Link>
        <span className="text-gray-300">•</span>
        <Link to="/help" className="hover:text-gray-900 transition-colors">
          Hilfe & FAQ
        </Link>
      </div>
    </div>
  );
}
