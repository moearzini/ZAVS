export function Impressum() {
  return (
    <div className="max-w-4xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight text-gray-900 mb-2">Impressum</h1>
        <p className="text-gray-600">
          Angaben gemäß § 5 TMG
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
        {/* Institution */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Betreiber</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="text-gray-900">Duale Hochschule Baden-Württemberg</p>
            <p>Friedrichstraße 14</p>
            <p>70174 Stuttgart</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Kontakt</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Telefon: +49 (0)711 320660-0</p>
            <p>E-Mail: info@dhbw.de</p>
            <p>Internet: www.dhbw.de</p>
          </div>
        </div>

        {/* Legal Representative */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Vertretungsberechtigt</h2>
          <div className="text-sm text-gray-600">
            <p>Prof. Dr. Martina Klärle</p>
            <p className="text-gray-500">Präsidentin der DHBW</p>
          </div>
        </div>

        {/* Regulatory Authority */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Zuständige Aufsichtsbehörde</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Ministerium für Wissenschaft, Forschung und Kunst</p>
            <p>Baden-Württemberg</p>
            <p>Königstraße 46</p>
            <p>70173 Stuttgart</p>
          </div>
        </div>

        {/* VAT */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Umsatzsteuer-Identifikationsnummer</h2>
          <div className="text-sm text-gray-600">
            <p>DE 811 238 382</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Haftungsausschluss</h2>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <h3 className="text-gray-900 mb-1">Haftung für Inhalte</h3>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
                keine Gewähr übernehmen.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte
                wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets
                der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Datenschutz</h2>
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener
              Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise
              Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies stets auf
              freiwilliger Basis.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
              Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
              Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
            <div>
              <h3 className="text-gray-900 mb-1">Verarbeitung personenbezogener Daten im ZAVS</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>E-Mail-Adressen werden ausschließlich zur Ticketbearbeitung verwendet</li>
                <li>Tickets werden verschlüsselt gespeichert und nur autorisierten Stellen zugänglich gemacht</li>
                <li>Datenlöschung erfolgt nach Abschluss der Bearbeitung gemäß Aufbewahrungsfristen</li>
                <li>Bei Fragen zur Datenverarbeitung: datenschutz@dhbw.de</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Operation */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            ZAVS - Zentrales Anliegen- und Verwaltungssystem
            <br />
            Version 1.0 | Stand: Mai 2026
          </p>
        </div>
      </div>
    </div>
  );
}
