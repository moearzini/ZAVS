import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/zavs/Layout";
import { Home } from "./views/Home";
import { TicketNew } from "./views/TicketNew";
import { TicketDetails } from "./views/TicketDetails";
import { TicketConfirmation } from "./views/TicketConfirmation";
import { TicketStatus } from "./views/TicketStatus";
import { Help } from "./views/Help";
import { Impressum } from "./views/Impressum";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ticket/new" element={<TicketNew />} />
          <Route path="ticket/details" element={<TicketDetails />} />
          <Route path="ticket/confirmation" element={<TicketConfirmation />} />
          <Route path="ticket/status" element={<TicketStatus />} />
          <Route path="help" element={<Help />} />
          <Route path="impressum" element={<Impressum />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
