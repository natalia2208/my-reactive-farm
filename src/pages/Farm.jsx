import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout.jsx";
import Alert from "../components/Alert.jsx";
import Loader from "../components/Loader.jsx";
import AnimalList from "../components/AnimalList.jsx";
import AnimalForm from "../components/AnimalForm.jsx";
import { getAnimals, createAnimal } from "../services/animalsApi.js";

// Filtros disponibles
const TYPES = ["all", "cow", "chicken", "sheep", "pig", "other"];
const STATUSES = ["all", "healthy", "review", "sick"];
const CATEGORIES = ["all", "mammal", "bird", "reptile", "other"];

export default function Farm() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Filtros UI
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Error de envío desde el formulario
  const [submitError, setSubmitError] = useState(null);

  // Carga inicial
  useEffect(() => {
    let cancelled = false;
    async function fetchAnimals() {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await getAnimals();
        if (!cancelled) setAnimals(data);
      } catch (err) {
        if (!cancelled) setLoadError("Failed to load animals. Please retry.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAnimals();
    return () => {
      cancelled = true;
    };
  }, []);

  // Crear animal (formulario)
  async function handleCreate(animal) {
    try {
      setSubmitError(null);
      const created = await createAnimal(animal);
      setAnimals((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setSubmitError("Could not create the animal. Try again.");
      throw err;
    }
  }

  // Filtros + búsqueda
  const filteredAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return animals.filter((a) => {
      const byType = typeFilter === "all" || a.type === typeFilter;
      const byStatus = statusFilter === "all" || a.status === statusFilter;
      const byCategory = categoryFilter === "all" || a.category === categoryFilter;

      const byQuery =
        q.length === 0 ||
        a.name?.toLowerCase().includes(q) ||
        a.type?.toLowerCase().includes(q) ||
        String(a.weight).includes(q) ||
        String(a.age).includes(q);

      return byType && byStatus && byCategory && byQuery;
    });
  }, [animals, typeFilter, statusFilter, categoryFilter, query]);

  return (
    <Layout title="My Reactive Farm 🐄🌾">
      {loading && <Loader message="Fetching animals from the farm…" />}
      {loadError && <Alert variant="error">{loadError}</Alert>}

      {!loading && !loadError && (
        <div className="space-y-8">
          {/* Form para crear */}
          <section aria-labelledby="create-animal">
            <h2 id="create-animal" className="mb-3 text-xl font-semibold">
              Add new animal
            </h2>
            <AnimalForm onSubmit={handleCreate} submitError={submitError} />
          </section>

          {/* Lista + Filtros */}
          <section aria-labelledby="animals-list">
            <h2 id="animals-list" className="sr-only">
              Animals
            </h2>

            <AnimalList animals={filteredAnimals}>
              <div className="flex flex-wrap items-center gap-3">

                {/* Search */}
                <input
                  id="search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, type, age, weight…"
                  className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                />

                {/* Type */}
                <select
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {/* Status */}
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {/* Category (CORREGIDO, afuera del status) */}
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

              </div>
            </AnimalList>
          </section>
        </div>
      )}
    </Layout>
  );
}
