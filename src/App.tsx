import { StationHeader } from './components/StationHeader';
import { DepartureBoard } from './components/DepartureBoard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans flex flex-col">
      <StationHeader />
      <DepartureBoard />
      <footer className="bg-[#08081a] border-t border-blue-900/20 px-6 py-3 text-center text-xs text-blue-300/20">
        Gare du Nord - Tableau des departs et arrivees - Donnees simulees
      </footer>
    </div>
  );
}
