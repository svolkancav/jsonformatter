export interface CheatRow {
  term: string;
  meaning: string;
  example?: string;
}

export interface CheatSection {
  heading: string;
  rows: CheatRow[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: CheatSection[];
}

// Reference "cheat sheet" pages — highly shareable, link-magnet content.
export const cheatSheets: CheatSheet[] = [
  {
    slug: 'json-syntax',
    title: 'JSON Syntax Cheat Sheet',
    description: 'A quick reference for JSON syntax: data types, structure rules, and the mistakes that break parsers — with examples.',
    intro:
      'JSON has a small, strict grammar. This cheat sheet covers every data type, the rules that make JSON valid, and the mistakes that most often cause parse errors.',
    sections: [
      {
        heading: 'Data Types',
        rows: [
          { term: 'String', meaning: 'Text wrapped in double quotes.', example: '"hello"' },
          { term: 'Number', meaning: 'Integer or float. No leading zeros, no NaN/Infinity.', example: '42, 3.14, -1e5' },
          { term: 'Boolean', meaning: 'Lowercase true or false.', example: 'true' },
          { term: 'Null', meaning: 'Lowercase null for an empty value.', example: 'null' },
          { term: 'Object', meaning: 'Unordered key/value pairs in curly braces.', example: '{ "id": 1 }' },
          { term: 'Array', meaning: 'Ordered list of values in square brackets.', example: '[1, 2, 3]' },
        ],
      },
      {
        heading: 'Rules',
        rows: [
          { term: 'Double quotes only', meaning: 'Keys and strings must use " not \'.', example: '{ "key": "value" }' },
          { term: 'Quoted keys', meaning: 'Every object key must be a quoted string.', example: '{ "age": 30 }' },
          { term: 'No trailing comma', meaning: 'No comma after the last element.', example: '[1, 2]  not  [1, 2,]' },
          { term: 'No comments', meaning: 'Standard JSON does not support // or /* */.', example: '—' },
          { term: 'Commas separate', meaning: 'Separate pairs and elements with commas.', example: '{ "a": 1, "b": 2 }' },
          { term: 'One root value', meaning: 'A document is exactly one value (usually object or array).', example: '{ ... }' },
        ],
      },
      {
        heading: 'Common Mistakes',
        rows: [
          { term: 'Single quotes', meaning: 'Using \'...\' instead of "..." — always invalid.', example: "{ 'a': 1 } ✗" },
          { term: 'Trailing comma', meaning: 'A comma before } or ] breaks parsing.', example: '{ "a": 1, } ✗' },
          { term: 'Unquoted key', meaning: 'Keys without quotes are invalid in JSON.', example: '{ a: 1 } ✗' },
          { term: 'Undefined / NaN', meaning: 'Not valid JSON values.', example: '{ "x": undefined } ✗' },
        ],
      },
    ],
  },
  {
    slug: 'jwt-claims',
    title: 'JWT Claims Reference (Cheat Sheet)',
    description: 'A reference of standard JWT claims (iss, sub, aud, exp, nbf, iat, jti) and header fields, with what each one means.',
    intro:
      'A JSON Web Token carries a set of claims in its payload. This reference explains the registered (standard) claims and the common header fields you will see when you decode a token.',
    sections: [
      {
        heading: 'Registered Payload Claims',
        rows: [
          { term: 'iss', meaning: 'Issuer — who created and signed the token.', example: '"iss": "https://auth.example.com"' },
          { term: 'sub', meaning: 'Subject — the user or entity the token is about.', example: '"sub": "user-123"' },
          { term: 'aud', meaning: 'Audience — who the token is intended for.', example: '"aud": "my-api"' },
          { term: 'exp', meaning: 'Expiration time (Unix seconds). Reject after this.', example: '"exp": 1700000000' },
          { term: 'nbf', meaning: 'Not before — token is invalid before this time.', example: '"nbf": 1699990000' },
          { term: 'iat', meaning: 'Issued at — when the token was created.', example: '"iat": 1699980000' },
          { term: 'jti', meaning: 'JWT ID — unique identifier, useful for revocation.', example: '"jti": "abc-123"' },
        ],
      },
      {
        heading: 'Header Fields',
        rows: [
          { term: 'alg', meaning: 'Signing algorithm (e.g. HS256, RS256).', example: '"alg": "HS256"' },
          { term: 'typ', meaning: 'Token type — almost always "JWT".', example: '"typ": "JWT"' },
          { term: 'kid', meaning: 'Key ID — which key was used to sign, for rotation.', example: '"kid": "key-2025"' },
        ],
      },
      {
        heading: 'Good to Know',
        rows: [
          { term: 'Not encrypted', meaning: 'Header and payload are base64url-encoded, not encrypted — anyone can read them.' },
          { term: 'Verify server-side', meaning: 'Always verify the signature with the secret/public key before trusting a token.' },
          { term: 'Keep it small', meaning: 'Store only non-sensitive claims; tokens travel in every request.' },
        ],
      },
    ],
  },
];

export const cheatBySlug: Record<string, CheatSheet> = Object.fromEntries(
  cheatSheets.map((c) => [c.slug, c]),
);
