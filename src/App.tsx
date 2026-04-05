import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import DeparturesPage from './pages/DeparturesPage';
import BirHakeimPage from './pages/BirHakeimPage';
import EurostarPage from './pages/EurostarPage';
import StationsPage from './pages/StationsPage';
import ItineraryHistoricPage from './pages/ItineraryHistoricPage';
import ItineraryCulturalPage from './pages/ItineraryCulturalPage';
import ItineraryFoodPage from './pages/ItineraryFoodPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DeparturesPage />} />
          <Route path="bir-hakeim" element={<BirHakeimPage />} />
          <Route path="eurostar" element={<EurostarPage />} />
          <Route path="stations" element={<StationsPage />} />
          <Route path="itinerary/historic" element={<ItineraryHistoricPage />} />
          <Route path="itinerary/cultural" element={<ItineraryCulturalPage />} />
          <Route path="itinerary/food" element={<ItineraryFoodPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
