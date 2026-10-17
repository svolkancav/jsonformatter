export interface JsonError {
  slug: string;
  errorMessage: string;
  language: string;
  title: string;
  description: string;
  cause: string;
  fix: string;
  badExample: string;
  goodExample: string;
  /** Extra context: how to read the message and what usually causes it. */
  details: string[];
}

// One page per common JSON error message. Targets exact-match searches where a
// developer pastes the error text into a search engine.
export const jsonErrors: JsonError[] = [
  {
    slug: 'unexpected-token',
    errorMessage: 'Unexpected token < in JSON at position 0',
    language: 'JavaScript',
    title: 'Unexpected token < in JSON at position 0',
    description: 'What "Unexpected token < in JSON at position 0" means in JavaScript and how to fix it — usually you received HTML instead of JSON.',
    cause:
      'This almost never means your JSON is malformed. A "<" at position 0 means the first character is an HTML tag — your fetch/AJAX call received an HTML page (a 404 or 500 error page, a login redirect, or a proxy error) instead of the JSON you expected, and JSON.parse() choked on it.',
    fix:
      'Check the actual response body and HTTP status before parsing. Log the raw text, confirm the URL is correct, and make sure the server returns application/json. Only call JSON.parse() once you have confirmed the response really is JSON.',
    details: [
      'The position in the message is where the parser gave up, not where you went wrong. An object left unclosed near the top of a file is only noticed at the very end, so the reported offset can be thousands of characters away from the actual mistake. Work backwards to the last structure you are certain is complete and check from there.',
      'The most frequent real cause is a trailing comma. JavaScript object and array literals allow a comma after the final entry, JSON does not, and the two look identical in an editor. The second most frequent is a single quote where a double quote belongs, usually from text pasted out of code rather than out of a response.',
      'If the token named in the message is a letter such as < or a word like Unexpected token <, you are not looking at JSON at all — the response is HTML. That almost always means an error page, a login redirect or a proxy notice arrived where you expected data.',
    ],
    badExample: `const res = await fetch('/api/data');
const data = await res.json(); // throws if the server returned an HTML error page`,
    goodExample: `const res = await fetch('/api/data');
if (!res.ok) throw new Error('HTTP ' + res.status);
const text = await res.text();
console.log(text.slice(0, 120)); // inspect what actually came back
const data = JSON.parse(text);`,
  },
  {
    slug: 'unexpected-end-of-json-input',
    errorMessage: 'Unexpected end of JSON input',
    language: 'JavaScript',
    title: 'Unexpected end of JSON input',
    description: 'What causes "Unexpected end of JSON input" in JavaScript and how to fix truncated or empty JSON.',
    cause:
      'The parser reached the end of the string before the JSON structure was complete. Common causes: the response body was empty (a 204 No Content or a failed request), the JSON was truncated in transit, or you called JSON.parse("") on an empty value. Often an opening { or [ has no matching close.',
    fix:
      'Guard against empty input before parsing, and make sure every opening brace and bracket has a matching close. If the data comes from the network, verify the request actually returned a body.',
    details: [
      'This message means the parser reached the end of the text while still waiting for something: a closing brace, a closing bracket, or a closing quote. The document is not malformed so much as incomplete.',
      'An empty string is the most common input that produces it. JSON.parse("") fails with exactly this message, so a fetch whose body was already consumed, a file that did not download fully, or a variable that was never assigned all surface here. Check the length of what you are parsing before blaming its contents.',
      'Truncation is the other cause. A response cut short by a timeout, a log line clipped at a fixed width, or a chunked stream read only partially will all end mid-structure. If the text ends in the middle of a value rather than at a clean boundary, the data was cut rather than written wrong.',
    ],
    badExample: `JSON.parse("");            // Unexpected end of JSON input
JSON.parse('{"a": 1');      // missing closing brace`,
    goodExample: `const text = await res.text();
if (!text) return null;     // handle empty responses
const data = JSON.parse(text);`,
  },
  {
    slug: 'unexpected-token-o-in-json',
    errorMessage: 'Unexpected token o in JSON at position 1',
    language: 'JavaScript',
    title: 'Unexpected token o in JSON at position 1',
    description: 'Why "Unexpected token o in JSON at position 1" happens — you passed an object to JSON.parse instead of a string.',
    cause:
      'You called JSON.parse() on a value that is already a JavaScript object. JSON.parse expects a string, so it coerces the object to the string "[object Object]" — the "o" at position 1 is from that text. You are parsing something that was never JSON.',
    fix:
      'Do not call JSON.parse() on a value that is already parsed. If a function already returns an object (for example res.json() in fetch), use it directly. Only parse actual JSON strings.',
    details: [
      'This is the signature of passing an object where a string was expected. JSON.parse coerces its argument to a string first, so an object becomes the literal text [object Object], and the parser fails on the o at position 1.',
      'The fix is almost always to delete the parse call. If the value came from response.json(), an ORM, or a library that already deserialized it, it is a JavaScript object and parsing it again is a mistake. Use it directly.',
      'A quick way to confirm: log typeof value before parsing. If it prints object rather than string, nothing needs parsing. The same error with a different leading character — unexpected token a for an array stringified in some runtimes — has the same root cause.',
    ],
    badExample: `const obj = { a: 1 };
JSON.parse(obj); // "[object Object]" -> Unexpected token o`,
    goodExample: `const obj = { a: 1 };
// It is already an object — just use it:
console.log(obj.a);`,
  },
  {
    slug: 'unexpected-non-whitespace-character',
    errorMessage: 'Unexpected non-whitespace character after JSON',
    language: 'JavaScript',
    title: 'Unexpected non-whitespace character after JSON at position N',
    description: 'What "Unexpected non-whitespace character after JSON" means and how to fix trailing or concatenated data.',
    cause:
      'The parser successfully read a complete JSON value, then found more non-whitespace text after it. This usually means two JSON values are concatenated, there is a trailing comma or stray character, or you accidentally have multiple objects that are not wrapped in an array.',
    fix:
      'Ensure the string contains exactly one JSON value. If you have multiple objects, wrap them in an array separated by commas, or parse them line by line (NDJSON). Remove any trailing characters after the final } or ].',
    details: [
      'The parser finished reading a complete, valid JSON value and then found more text after it. JSON documents hold exactly one top-level value, so anything following it is an error even if that trailing text is itself valid JSON.',
      'Concatenated payloads are the usual source: two responses written to the same file, a log containing one object per line, or a stream read as a single string. Each of those is a sequence of JSON documents rather than one document.',
      'If your data genuinely is one object per line, you have JSON Lines (NDJSON) rather than JSON. Split on the newline and parse each line separately, or use a parser that understands the format — treating the whole file as a single document will never work.',
    ],
    badExample: `JSON.parse('{"a":1}{"b":2}'); // two objects, not valid
JSON.parse('{"a":1},');       // trailing comma`,
    goodExample: `JSON.parse('[{"a":1},{"b":2}]'); // wrap multiple objects in an array`,
  },
  {
    slug: 'expecting-value',
    errorMessage: 'json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)',
    language: 'Python',
    title: 'Expecting value: line 1 column 1 (char 0)',
    description: 'The most common Python JSONDecodeError — what "Expecting value" means and how to fix it.',
    cause:
      'Python found no valid JSON where it expected a value. The input is empty, is None, is not actually JSON (often an HTML error page or a plain string), or you passed a file object instead of its contents. "char 0" means it failed at the very first character.',
    fix:
      'Print the raw text before parsing to see what you actually have. Make sure the response is real JSON, that the body is not empty, and that you are using json.loads() on a string (or json.load() on a file object) — not mixing them up.',
    details: [
      'Python raises this when the text it was handed does not begin with anything that could start a JSON value. An empty string, None converted to text, or a response body that was already consumed all produce it at line 1 column 1.',
      'When the position is line 1 column 1 (char 0), check what you passed in before checking the JSON itself. requests users hitting this usually called response.json() on an error response whose body is an HTML page, not JSON.',
      'Python-specific values are the other trap. None, True and False are not JSON — the wire format uses null, true and false. Text produced with str() on a Python dict rather than json.dumps() will also fail here, because it uses single quotes.',
    ],
    badExample: `import json
json.loads("")        # Expecting value: line 1 column 1 (char 0)
json.loads(response)  # if response is an HTML page, same error`,
    goodExample: `import json
text = response.text
if text.strip():
    data = json.loads(text)`,
  },
  {
    slug: 'expecting-delimiter',
    errorMessage: "json.decoder.JSONDecodeError: Expecting ',' delimiter",
    language: 'Python',
    title: "Expecting ',' delimiter",
    description: 'Why Python raises "Expecting \',\' delimiter" and how to fix the missing comma or bad structure.',
    cause:
      'The parser expected a comma between two items in an object or array but did not find one. Usually a comma is missing between key/value pairs or array elements — or a previous value was not closed properly, so the parser is confused about where it is.',
    fix:
      'Add the missing comma between elements, and check the item just before the reported position for an unclosed string or bracket. Formatting the JSON in a validator quickly reveals where the structure breaks.',
    details: [
      'The parser has read a value and now needs either a comma to continue or a closing brace or bracket to finish, and it found something else. In practice that means a missing comma between two entries, or a quote that was never closed so the string ran on into the next key.',
      'The reported column is reliable here in a way it is not for every JSON error: the delimiter is expected at a specific point, so look at the character immediately before the position in the message.',
      'When the document is machine-generated, suspect the join rather than the data. Building JSON by concatenating strings in a loop usually misses the separator on one branch, which is exactly what this error reports.',
    ],
    badExample: `{
  "name": "Ada"
  "age": 36
}`,
    goodExample: `{
  "name": "Ada",
  "age": 36
}`,
  },
  {
    slug: 'extra-data',
    errorMessage: 'json.decoder.JSONDecodeError: Extra data',
    language: 'Python',
    title: 'Extra data: line N column M',
    description: 'What Python\'s "Extra data" JSONDecodeError means and how to fix multiple values in one string.',
    cause:
      'Python parsed one complete JSON value and then found more data after it. This happens when a string contains multiple JSON objects (for example an NDJSON file read all at once), or there is stray text after the final bracket.',
    fix:
      'A single json.loads() call expects exactly one JSON value. For a file with one JSON object per line, parse each line separately. Otherwise, wrap multiple objects in a JSON array.',
    details: [
      'json.loads parsed a complete value and found more characters afterwards. The first document was fine; the problem is that there is a second one.',
      'This is the standard symptom of a JSON Lines file being read with json.loads on the whole file. Read it line by line instead, calling json.loads on each line, or use json.JSONDecoder().raw_decode in a loop when the documents are not newline-separated.',
      'It also appears when a file was appended to rather than overwritten. Two complete objects written back to back produce a file that looks reasonable and cannot be parsed as one document.',
    ],
    badExample: `import json
json.loads('{"a": 1}\\n{"a": 2}')  # Extra data`,
    goodExample: `import json
# One object per line (NDJSON):
for line in text.splitlines():
    if line.strip():
        obj = json.loads(line)`,
  },
  {
    slug: 'expecting-property-name',
    errorMessage: 'json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes',
    language: 'Python',
    title: 'Expecting property name enclosed in double quotes',
    description: 'Why you get "Expecting property name enclosed in double quotes" — usually single quotes, unquoted keys, or a trailing comma.',
    cause:
      'JSON requires object keys to be wrapped in double quotes, and it does not allow a trailing comma before a closing brace. This error means the parser expected a quoted key but found a single quote, an unquoted name, or a } right after a comma.',
    fix:
      'Use double quotes around every key, never single quotes, and remove any trailing comma before } or ]. Remember JSON is stricter than a Python dict or JavaScript object literal.',
    details: [
      'Inside an object, the parser needs a double-quoted string next, and it found something else — usually an unquoted key, a key in single quotes, or a trailing comma where the closing brace should be.',
      'Hand-written configuration files are where this appears most. A JavaScript object literal with bare keys is valid JavaScript and invalid JSON, and so is the output of printing a Python dict, which uses single quotes throughout.',
      'If the file is meant to allow comments and relaxed syntax, it is not JSON but a dialect such as JSON5 or JSONC. Either parse it with a library that understands the dialect, or convert it to strict JSON before loading.',
    ],
    badExample: `{
  'name': "Ada",
  age: 36,
}`,
    goodExample: `{
  "name": "Ada",
  "age": 36
}`,
  },
];

export const errorBySlug: Record<string, JsonError> = Object.fromEntries(
  jsonErrors.map((e) => [e.slug, e]),
);
