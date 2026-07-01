import Papa from 'papaparse';
import { dump as yamlDump, load as yamlLoad } from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

// All converters take a string and return a string, throwing an Error with a
// helpful message on invalid input. Everything runs client-side.

export function jsonToCsv(input: string): string {
  const data = JSON.parse(input);
  const rows = Array.isArray(data) ? data : [data];
  if (rows.length === 0) throw new Error('The JSON array is empty — nothing to convert.');
  return Papa.unparse(rows);
}

export function csvToJson(input: string): string {
  const result = Papa.parse(input.trim(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }
  return JSON.stringify(result.data, null, 2);
}

export function jsonToYaml(input: string): string {
  const data = JSON.parse(input);
  return yamlDump(data, { indent: 2, lineWidth: -1 });
}

export function yamlToJson(input: string): string {
  const data = yamlLoad(input);
  return JSON.stringify(data, null, 2);
}

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,
  indentBy: '  ',
});

export function jsonToXml(input: string): string {
  const data = JSON.parse(input);
  // XML needs a single root element; wrap arrays/primitives under <root>.
  const obj =
    typeof data === 'object' && data !== null && !Array.isArray(data) ? data : { root: data };
  return xmlBuilder.build(obj).trim();
}

export function xmlToJson(input: string): string {
  if (!input.trim()) throw new Error('Please enter XML to convert.');
  const data = xmlParser.parse(input);
  return JSON.stringify(data, null, 2);
}

// Decodes a base64url segment to a UTF-8 string (JWT parts are base64url).
function decodeBase64Url(segment: string): string {
  const b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
  const binary = atob(b64 + pad);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function decodeJwt(input: string): string {
  const token = input.trim().replace(/^Bearer\s+/i, '');
  const parts = token.split('.');
  if (parts.length < 2) {
    throw new Error('Not a valid JWT — expected the format header.payload.signature');
  }

  let header: unknown;
  let payload: unknown;
  try {
    header = JSON.parse(decodeBase64Url(parts[0]));
    payload = JSON.parse(decodeBase64Url(parts[1]));
  } catch {
    throw new Error('Could not decode the token — the header or payload is not valid base64url JSON.');
  }

  const out: Record<string, unknown> = { header, payload };

  // Add human-readable timestamps for the standard time claims.
  if (payload && typeof payload === 'object') {
    const p = payload as Record<string, unknown>;
    if (typeof p.exp === 'number') {
      out.expiresAt = new Date(p.exp * 1000).toISOString();
      out.expired = Date.now() > p.exp * 1000;
    }
    if (typeof p.iat === 'number') out.issuedAt = new Date(p.iat * 1000).toISOString();
  }

  return JSON.stringify(out, null, 2);
}
