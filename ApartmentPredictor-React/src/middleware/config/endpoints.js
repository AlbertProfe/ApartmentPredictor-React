const API_BASE = "/api/v1";

const APARTMENT_BASE = `${API_BASE}/apartment`;
const SCHOOL_BASE = `${API_BASE}/school`;
const REVIEWER_BASE = `${API_BASE}/reviewer`;
const OWNER_BASE = `${API_BASE}/owner`;

export const ENDPOINTS = {
  apartment: {
    base: APARTMENT_BASE,
    getAll: `${APARTMENT_BASE}/getAll`,
    getById: (id) => `${APARTMENT_BASE}/${id}`,
    create: `${APARTMENT_BASE}/create`,
    update: `${APARTMENT_BASE}/update`,
    deleteById: (id) => `${APARTMENT_BASE}/deleteById?id=${id}`,
    filter: `${APARTMENT_BASE}/filter`,
  },
  school: {
    base: SCHOOL_BASE,
    getAll: `${SCHOOL_BASE}/getAll`,
    getById: (id) => `${SCHOOL_BASE}/${id}`,
    create: `${SCHOOL_BASE}/create`,
    update: `${SCHOOL_BASE}/update`,
    deleteById: (id) => `${SCHOOL_BASE}/deleteById?id=${id}`,
    filter: `${SCHOOL_BASE}/filter`,
  },
  reviewer: {
    base: REVIEWER_BASE,
    getAll: `${REVIEWER_BASE}/getAll`,
    getById: (id) => `${REVIEWER_BASE}/${id}`,
    create: `${REVIEWER_BASE}/create`,
    update: `${REVIEWER_BASE}/update`,
    deleteById: (id) => `${REVIEWER_BASE}/deleteById?id=${id}`,
  },
  owner: {
    base: OWNER_BASE,
    getAll: `${OWNER_BASE}/getAll`,
    getById: (id) => `${OWNER_BASE}/${id}`,
    create: `${OWNER_BASE}/create`,
    update: `${OWNER_BASE}/update`,
    deleteById: (id) => `${OWNER_BASE}/deleteById?id=${id}`,
  },
};

export default ENDPOINTS;
