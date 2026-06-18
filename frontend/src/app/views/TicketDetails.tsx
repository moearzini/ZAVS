import { useState } from "react";
import { useNavigate } from "react-router";
import { ProgressStepper } from "../components/zavs/ProgressStepper";
import { PriorityChips } from "../components/zavs/PriorityChips";
import { FileUpload } from "../components/zavs/FileUpload";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Info } from "lucide-react";

export function TicketDetails() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal");
  const [course, setCourse] = useState("");
  const [room, setRoom] = useState("");

  const steps = [
    { number: 1, label: "Anliegen", status: "complete" as const },
    { number: 2, label: "Details", status: "current" as const },
    { number: 3, label: "Prüfen", status: "upcoming" as const },
    { number: 4, label: "Bestätigung", status: "upcoming" as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/ticket/confirmation");
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight text-gray-900 mb-6">
          Details ergänzen
        </h1>
        <ProgressStepper steps={steps} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          {/* Priority */}
          <div className="space-y-3 mb-6">
            <Label>Dringlichkeit</Label>
            <PriorityChips selected={priority} onChange={setPriority} />
          </div>

          {/* Course/Program */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="course">Kurs / Studiengang (optional)</Label>
            <Input
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="z.B. TINF21B"
              className="rounded-xl"
            />
          </div>

          {/* Room/Location */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="room">Raum / Standort (optional)</Label>
            <Input
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="z.B. A204 oder Gebäude C"
              className="rounded-xl"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Datei-Anhänge</Label>
            <FileUpload />
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Bei sensiblen oder personenbezogenen Daten kann eine zusätzliche
            Authentifizierung erforderlich sein.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl flex-1 sm:flex-none"
            onClick={() => navigate("/ticket/new")}
          >
            Zurück
          </Button>
          <Button
            type="submit"
            className="bg-[#E2001A] hover:bg-[#C20018] text-white rounded-xl flex-1 sm:flex-none"
          >
            Zur Prüfung
          </Button>
        </div>
      </form>
    </div>
  );
}
