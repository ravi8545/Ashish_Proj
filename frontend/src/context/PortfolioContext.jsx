import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { portfolioService } from '../services/portfolioService.js';
import { categories as defaultCategories } from '../data/portfolioData.js';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getAll();
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

  const value = useMemo(
    () => ({
      projects,
      filteredProjects,
      categories: defaultCategories,
      activeCategory,
      setActiveCategory,
      loading,
      error,
      reload: loadProjects,
    }),
    [projects, filteredProjects, activeCategory, loading, error, loadProjects]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
