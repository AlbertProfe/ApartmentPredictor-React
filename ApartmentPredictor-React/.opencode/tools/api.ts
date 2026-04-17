import { tool } from "@opencode-ai/plugin";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "http://localhost:8080/api/v1";
const RESPONSE_DIR = "apiResponses";

const ENDPOINTS = {
  apartment: {
    base: `${BASE_URL}/apartment`,
    getAll: `${BASE_URL}/apartment/getAll`,
    getById: (id) => `${BASE_URL}/apartment/getById?id=${id}`,
    create: `${BASE_URL}/apartment/create`,
    update: `${BASE_URL}/apartment/update`,
    deleteById: (id) => `${BASE_URL}/apartment/deleteById?id=${id}`,
    filter: `${BASE_URL}/apartment/filter`,
  },
  school: {
    base: `${BASE_URL}/school`,
    getAll: `${BASE_URL}/school/getAll`,
    getById: (id) => `${BASE_URL}/school/getById?id=${id}`,
    create: `${BASE_URL}/school/create`,
    update: `${BASE_URL}/school/update`,
    deleteById: (id) => `${BASE_URL}/school/deleteById?id=${id}`,
    filter: `${BASE_URL}/school/filter`,
  },
  reviewer: {
    base: `${BASE_URL}/reviewer`,
    getAll: `${BASE_URL}/reviewer/getAll`,
    getById: (id) => `${BASE_URL}/reviewer/getById?id=${id}`,
    create: `${BASE_URL}/reviewer/create`,
    update: `${BASE_URL}/reviewer/update`,
    deleteById: (id) => `${BASE_URL}/reviewer/deleteById?id=${id}`,
  },
  owner: {
    base: `${BASE_URL}/owner`,
    getAll: `${BASE_URL}/owner/getAll`,
    getById: (id) => `${BASE_URL}/owner/getById?id=${id}`,
    create: `${BASE_URL}/owner/create`,
    update: `${BASE_URL}/owner/update`,
    deleteById: (id) => `${BASE_URL}/owner/deleteById?id=${id}`,
  },
};

function buildUrl(entity, operation, args) {
  const api = ENDPOINTS[entity];
  if (!api) throw new Error(`Unknown entity: ${entity}`);

  switch (operation) {
    case "getAll":
      return api.getAll;
    case "getById":
      if (!args.id) throw new Error("id is required for getById");
      return api.getById(args.id);
    case "create":
      return api.create;
    case "update":
      return api.update;
    case "delete":
      if (!args.id) throw new Error("id is required for delete");
      return api.deleteById(args.id);
    case "filter":
      return api.filter;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

function buildQueryString(queryParams) {
  if (!queryParams) return "";

  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const query = params.toString();
  return query ? `?${query}` : "";
}

async function runCurl({ method, url, headers, body }) {
  const args = ["curl", "-sS", "-X", method, "-H", "Content-Type: application/json"];

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        args.push("-H", `${key}: ${value}`);
      }
    });
  }

  if (body !== undefined) {
    args.push("-d", JSON.stringify(body));
  }

  args.push(url);

  const proc = Bun.spawn(args, {
    stdout: "pipe",
    stderr: "pipe",
  });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);

  return { stdout, stderr, exitCode };
}

async function saveResponse({ entity, operation, parsed, raw }) {
  await mkdir(RESPONSE_DIR, { recursive: true });

  const payload = parsed ?? { rawResponse: raw };
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${entity}-${operation}-${timestamp}.json`;
  const filePath = path.resolve(RESPONSE_DIR, fileName);
  const latestPath = path.resolve(RESPONSE_DIR, "latest.json");

  await Bun.write(filePath, JSON.stringify(payload, null, 2));
  await Bun.write(latestPath, JSON.stringify(payload, null, 2));

  try {
    const opener = process.platform === "darwin" ? "open" : "xdg-open";
    const proc = Bun.spawn([opener, filePath], { stdout: "pipe", stderr: "pipe" });
    await proc.exited;
  } catch {
    // Ignore open failures; file is still saved.
  }

  return latestPath;
}

export default tool({
  description:
    "Test apartment, school, reviewer, and owner REST endpoints with curl using the phase-0 endpoint map.",
  args: {
    entity: tool.schema
      .enum(["apartment", "school", "reviewer", "owner"])
      .describe("Which backend entity to call"),
    operation: tool.schema
      .enum(["getAll", "getById", "create", "update", "delete", "filter"])
      .describe("Which CRUD endpoint to call"),
    id: tool.schema.string().optional().describe("Resource ID for getById/delete"),
    body: tool.schema.object().optional().describe("Request body for create/update"),
    queryParams: tool.schema.object().optional().describe("Query parameters for filter requests"),
    headers: tool.schema.object().optional().describe("Extra HTTP headers"),
  },
  async execute(args) {
    const url = buildUrl(args.entity, args.operation, args) + buildQueryString(args.queryParams);
    const method =
      args.operation === "getAll" || args.operation === "getById" || args.operation === "filter"
        ? "GET"
        : args.operation === "create"
          ? "POST"
          : args.operation === "update"
            ? "POST"
            : "DELETE";

    const { stdout, stderr, exitCode } = await runCurl({
      method,
      url,
      headers: args.headers,
      body: args.body,
    });

    try {
      const parsed = JSON.parse(stdout);
      const responseFile = await saveResponse({
        entity: args.entity,
        operation: args.operation,
        parsed,
      });

      return {
        success: exitCode === 0,
        entity: args.entity,
        operation: args.operation,
        method,
        url,
        response: parsed,
        prettyResponse: JSON.stringify(parsed, null, 2),
        responseFile,
        openFile: `Open this file: ${responseFile}`,
        openHint: responseFile,
        stderr: stderr || undefined,
      };
    } catch {
      const responseFile = await saveResponse({
        entity: args.entity,
        operation: args.operation,
        raw: stdout,
      });

      return {
        success: exitCode === 0,
        entity: args.entity,
        operation: args.operation,
        method,
        url,
        rawResponse: stdout,
        responseFile,
        openFile: `Open this file: ${responseFile}`,
        openHint: responseFile,
        stderr: stderr || undefined,
      };
    }
  },
});
