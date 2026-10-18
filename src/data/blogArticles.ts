export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: {
    sections: Array<{
      title: string;
      content: string;
      code?: string;
      subsections?: Array<{
        title: string;
        content: string;
        code?: string;
      }>;
    }>;
  };
  relatedArticles: string[];
}

export const blogArticles: Record<string, BlogArticle> = {
  'understanding-json-guide': {
    id: 'understanding-json-guide',
    title: 'Understanding JSON: A Complete Guide for Developers',
    excerpt: 'Learn everything about JSON from basics to advanced concepts. Understand syntax, data types, best practices, and common use cases in modern web development.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What is JSON?',
          content: 'JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that has become the de facto standard for data exchange on the web. Despite its name suggesting a connection to JavaScript, JSON is completely language-independent and can be used with virtually any programming language.\n\nCreated by Douglas Crockford in the early 2000s, JSON was designed to be easy for humans to read and write while being simple for machines to parse and generate. Its simplicity and effectiveness have made it the preferred choice for API responses, configuration files, and data storage across the software development industry.'
        },
        {
          title: 'JSON Syntax Rules',
          content: 'JSON follows a strict set of syntax rules that ensure data can be reliably parsed across different systems:\n\n• Data is represented in name/value pairs\n• Data is separated by commas\n• Curly braces hold objects\n• Square brackets hold arrays\n• String values must be wrapped in double quotes\n• No trailing commas are allowed\n• No comments are supported in standard JSON',
          code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "email": "john@example.com"
}`
        },
        {
          title: 'The Six Data Types, and Their Edges',
          content: 'JSON has exactly six value types: string, number, boolean, null, object and array. That small set is the reason it travels everywhere, and also the reason a few things need care on the way out.\n\nStrings must use double quotes, always, including for object keys. Numbers have no declared precision in the specification, but nearly every parser reads them as IEEE 754 doubles — so an integer above 2^53 loses precision silently, which is why database identifiers and snowflake ids should travel as strings. There is no date type, no binary type and no comment syntax; dates are strings by convention, binary is usually base64, and comments simply do not exist.\n\nnull means "a value that is present and empty". It is not the same as the key being absent, and the distinction matters more than it looks: many APIs use a missing key to mean "unchanged" and an explicit null to mean "clear this field".',
          code: `{
  "string": "double quotes only",
  "number": 42,
  "float": 3.14,
  "bigId": "9007199254740993",
  "boolean": true,
  "nothing": null,
  "object": { "nested": true },
  "array": [1, 2, 3]
}`,
        },
        {
          title: 'JSON Is Not JavaScript',
          content: 'The name causes a specific, recurring bug. JSON was derived from JavaScript object literal syntax, but it is a strict subset, and the things JavaScript allows that JSON does not are exactly the things people write by habit.\n\nA trailing comma after the last entry is valid JavaScript and invalid JSON. Single-quoted strings are valid JavaScript and invalid JSON. Unquoted keys are valid JavaScript and invalid JSON. Comments are valid JavaScript and invalid JSON. And NaN, Infinity and undefined are JavaScript values with no JSON representation at all — a serializer that emits them produces output no conformant parser will read back.\n\nThe practical rule: if you hand-edited a file and it will not parse, check these five before anything else.',
          code: `// Valid JavaScript, invalid JSON
{
  name: 'Ada',      // unquoted key, single quotes, comment
  score: NaN,
  tags: [1, 2,],    // trailing comma
}

// Valid JSON
{
  "name": "Ada",
  "score": null,
  "tags": [1, 2]
}`,
        },
        {
          title: 'Reading and Writing It in Practice',
          content: 'Every mainstream language ships a parser, and they agree on the format while differing on what they give you back. JavaScript JSON.parse returns plain objects and arrays. Python json.loads returns dicts and lists. Go, Rust, Java and C# want a type to decode into, which is more work up front and catches a drifting API much earlier.\n\nThe asymmetry worth remembering is that serializing is lossy in a way parsing is not. A Date, a Decimal, a Set or a custom class has no JSON equivalent, so your serializer makes a choice — usually a string — and the parser on the other side cannot know what it originally was. Deciding those conversions deliberately, rather than discovering them, is most of what "designing a JSON API" means.',
        },
        {
          title: 'Where You Will Meet It',
          content: 'JSON is the default response format for essentially every web API written in the last fifteen years, and it has spread well beyond that. Configuration files use it (package.json, tsconfig.json, composer.json), document databases store it natively (MongoDB, CouchDB, and PostgreSQL via jsonb), log pipelines ship it one object per line, and message queues carry it as payload.\n\nIt is not always the right choice. For configuration that humans edit, the lack of comments is a genuine handicap and TOML or YAML serve better. For very large datasets read repeatedly, a columnar binary format is faster and smaller. For strict contracts between services, a schema-first format such as Protocol Buffers catches more at compile time. JSON wins when you want something every language can read with no dependency and a human can inspect with no tooling.',
        },
      ]
    },
    relatedArticles: ['json-best-practices', 'common-json-errors']
  },
  'json-best-practices': {
    id: 'json-best-practices',
    title: 'Best Practices for JSON Data Structure Design',
    excerpt: 'Discover proven patterns and anti-patterns for designing efficient, maintainable JSON structures. Learn about naming conventions, nesting strategies, and performance optimization.',
    date: '2025-01-20',
    readTime: '10 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'Naming Conventions',
          content: 'Consistent naming is crucial for maintainable JSON APIs. Choose either camelCase or snake_case and stick with it throughout your entire API. camelCase (firstName, lastName) is more common in JavaScript environments, while snake_case (first_name, last_name) is popular in Python and Ruby communities.\n\nAvoid using spaces, special characters, or starting names with numbers. Keep names descriptive but concise. Instead of "usr_fn" use "userFirstName" or "user_first_name". Your JSON should be self-documenting.',
          code: `{
  "userId": 123,
  "firstName": "Jane",
  "lastName": "Smith",
  "emailAddress": "jane@example.com",
  "accountCreatedAt": "2025-01-15T10:30:00Z"
}`
        },
        {
          title: 'Structure Flattening',
          content: 'While nesting is sometimes necessary, avoid excessive depth in your JSON structures. Deep nesting makes data harder to access and increases parsing complexity. If you find yourself going more than 3-4 levels deep, consider flattening your structure or breaking it into separate resources.\n\nInstead of deeply nested objects, consider using IDs to reference related data. This approach is more scalable and easier to cache.',
          code: `{
  "user": {
    "id": 123,
    "name": "Jane Smith",
    "companyId": 456
  },
  "company": {
    "id": 456,
    "name": "Tech Corp"
  }
}`
        },
        {
          title: 'Data Type Consistency',
          content: 'Always use appropriate data types for your values. Don\'t store numbers as strings ("123" vs 123) unless there\'s a specific reason (like preserving leading zeros). Use booleans for true/false values, not 1/0 or "yes"/"no" strings.\n\nBe consistent with date formats. ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ) is the standard and most widely supported. Avoid timestamps in milliseconds unless necessary, as they\'re less human-readable.',
          code: `{
  "isActive": true,
  "age": 30,
  "balance": 1234.56,
  "createdAt": "2025-01-15T10:30:00Z",
  "tags": ["premium", "verified"]
}`
        },
        {
          title: 'Array Handling',
          content: 'When working with arrays, be consistent about singular vs plural names. Use plural names for arrays (users, not user_list). Include metadata for paginated results, such as total count and page information.\n\nFor large datasets, always implement pagination. Returning thousands of records in a single response is inefficient and can cause performance issues.',
          code: `{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalItems": 100
  }
}`
        },
        {
          title: 'Error Handling',
          content: 'Design a consistent error response format. Include an error code, human-readable message, and optionally detailed information for debugging. This makes it easier for API consumers to handle errors programmatically.\n\nProvide enough context in error messages to help developers understand what went wrong and how to fix it, but avoid exposing sensitive system information.',
          code: `{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "The email address format is invalid",
    "field": "email",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}`
        },
        {
          title: 'Null vs Undefined',
          content: 'Decide on a strategy for handling missing values. Should you include fields with null values, or omit them entirely? Both approaches have merits. Including null makes the schema explicit, while omitting fields reduces payload size.\n\nBe consistent across your API. If you choose to omit null values, document this behavior clearly. Consider using null to indicate "explicitly empty" versus omitting fields that don\'t apply.',
          code: `{
  "firstName": "John",
  "middleName": null,
  "lastName": "Doe"
}`
        },
        {
          title: 'Versioning Strategy',
          content: 'Plan for API evolution from the start. Include version information in your JSON responses, either in the URL path (/api/v1/) or in a version field. This allows you to make breaking changes without affecting existing clients.\n\nWhen adding new fields, make them optional and provide sensible defaults. This maintains backward compatibility with older clients that don\'t expect the new fields.',
          code: `{
  "apiVersion": "1.0",
  "data": {
    "userId": 123,
    "name": "Jane Smith"
  }
}`
        },
        {
          title: 'Performance Optimization',
          content: 'Minimize payload size by only including necessary data. Implement field filtering (allowing clients to specify which fields they need) and sparse fieldsets. This reduces bandwidth usage and improves response times.\n\nFor frequently accessed data, consider response compression (gzip) and caching strategies. Include appropriate cache headers in your HTTP responses.',
          code: `{
  "fields": ["id", "name", "email"],
  "data": {
    "id": 123,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}`
        },
        {
          title: 'Name Things Once and Consistently',
          content: 'Pick a casing convention and apply it to every key in every endpoint. camelCase is the most common in JSON APIs and matches JavaScript consumers; snake_case is equally defensible and common in Python and Ruby ecosystems. What costs you is mixing them, because every consumer then needs per-field mapping rather than one global naming policy.\n\nThe same applies to the words themselves. If a user identifier is userId in one response it should not be user_id, uid or id elsewhere. Consumers build their models from the names, and inconsistency turns a one-line mapping into a lookup table.',
        },
        {
          title: 'Keep Nesting Shallow',
          content: 'Deep nesting is easy to produce and expensive to consume. Every level adds a null check in a typed language, a longer access path in an untyped one, and another decision for anyone flattening the data for a spreadsheet or a warehouse.\n\nThree levels is a reasonable ceiling for a payload meant to be worked with. Beyond that, ask whether the inner structure is really part of this resource or a separate one that should be fetched on its own or referenced by id. The answer is frequently the latter, and splitting it also makes the response smaller for the many consumers who did not need that branch.',
        },
        {
          title: 'Design for the Consumer You Cannot See',
          content: 'Once a payload is public you do not control who reads it or in what language, and a few habits make that safe.\n\nSend types that survive every parser: identifiers beyond 2^53 as strings, money as minor-unit integers or strings, dates as ISO 8601 with an explicit offset. These are not preferences, they are the fields that break silently somewhere else.\n\nBe consistent about absence, choosing either omission or null and applying it everywhere. Avoid encoding meaning in key names — a map keyed by id is harder to consume than an array of objects each carrying its id, because the first cannot be iterated with a fixed shape.\n\nAnd never put a value in a key where it could be a field. "2026-01": 42 forces every consumer to parse keys; { "month": "2026-01", "count": 42 } does not.',
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-to-csharp-tutorial']
  },
  'json-to-csharp-tutorial': {
    id: 'json-to-csharp-tutorial',
    title: 'How to Convert JSON to C# Classes: Step by Step Tutorial',
    excerpt: 'Complete guide to converting JSON data into C# classes. Learn about data type mapping, handling nullable values, nested objects, and arrays with practical examples.',
    date: '2025-01-25',
    readTime: '12 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Understanding Type Mapping',
          content: 'When converting JSON to C#, understanding how JSON types map to C# types is essential. JSON has six basic types, while C# has a rich type system. Here\'s how they typically map:\n\nJSON strings become C# string, numbers can be int, long, double, or decimal depending on the value, booleans map directly to bool, null maps to nullable types, objects become classes, and arrays become List<T> or arrays.',
          code: `public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}`
        },
        {
          title: 'Handling Nested Objects',
          content: 'Nested JSON objects should be represented as separate C# classes. This creates a clear, maintainable structure that reflects your data hierarchy. Each nested object becomes its own class with appropriate properties.\n\nWhen naming nested classes, consider whether they\'ll be reused. If an Address class is specific to User, you might nest the class definition or prefix it (UserAddress). If it\'s generic, keep it as a standalone class.',
          code: `public class User
{
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
}`
        },
        {
          title: 'Working with Arrays',
          content: 'JSON arrays typically map to C# List<T> or IEnumerable<T> in modern C# development. List<T> is more flexible and commonly used. For read-only scenarios or when exposing properties publicly, consider using IReadOnlyList<T>.\n\nAlways initialize collection properties in the class constructor or with a property initializer to avoid null reference exceptions.',
          code: `public class User
{
    public string Name { get; set; }
    public List<string> Hobbies { get; set; } = new List<string>();
    public List<Order> Orders { get; set; } = new List<Order>();
}`
        },
        {
          title: 'Nullable Value Types',
          content: 'With C# nullable reference types (C# 8.0+), you can make your code more explicit about what can be null. For value types like int or DateTime that might be null in JSON, use the nullable syntax (int?, DateTime?).\n\nFor reference types like string, enable nullable reference types in your project and use string? for properties that might be null. This helps catch potential null reference bugs at compile time.',
          code: `public class User
{
    public string Name { get; set; }
    public string? MiddleName { get; set; }
    public int? Age { get; set; }
    public DateTime? LastLoginDate { get; set; }
}`
        },
        {
          title: 'JSON Property Attributes',
          content: 'Use JSON serialization attributes to handle naming differences between JSON and C#. The JsonPropertyName attribute (System.Text.Json) or JsonProperty (Newtonsoft.Json) lets you map JSON property names to different C# property names.\n\nThis is especially useful when working with APIs that use snake_case or other naming conventions that don\'t match C# conventions.',
          code: `using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("user_id")]
    public int UserId { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }

    [JsonPropertyName("email_address")]
    public string EmailAddress { get; set; }
}`
        },
        {
          title: 'Deserialization Examples',
          content: 'Once you have your C# classes defined, deserializing JSON is straightforward with System.Text.Json or Newtonsoft.Json. Here\'s how to deserialize JSON strings into C# objects using both libraries.\n\nSystem.Text.Json is the modern, built-in option with good performance. Newtonsoft.Json (Json.NET) is more feature-rich and widely used in existing projects.',
          code: `// Using System.Text.Json
using System.Text.Json;

string json = "{\\"name\\":\\"John\\",\\"age\\":30}";
User user = JsonSerializer.Deserialize<User>(json);

// Using Newtonsoft.Json
using Newtonsoft.Json;

string json = "{\\"name\\":\\"John\\",\\"age\\":30}";
User user = JsonConvert.DeserializeObject<User>(json);`
        },
        {
          title: 'Best Practices',
          content: 'When generating C# classes from JSON, follow these best practices:\n\n• Use PascalCase for class and property names (C# convention)\n• Initialize collection properties to avoid null checks\n• Use appropriate access modifiers (public for DTOs usually)\n• Add XML documentation comments for complex properties\n• Consider using records for immutable data\n• Use nullable types appropriately\n• Keep classes in separate files for maintainability\n• Add validation attributes when appropriate',
          code: `/// <summary>
/// Represents a user in the system
/// </summary>
public record User
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public List<string> Roles { get; init; } = new();
}`
        },
        {
          title: 'Choosing Between System.Text.Json and Newtonsoft',
          content: 'Before generating anything, know which serializer you are targeting, because a few details differ.\n\nSystem.Text.Json ships with .NET, is faster, allocates less, and is the right default for new code. It is also stricter: property matching is case-sensitive by default, which is the single most common reason a freshly generated class deserializes into all nulls.\n\nNewtonsoft.Json is more permissive and more featureful, and remains extremely common in existing projects. It matches property names case-insensitively out of the box, which hides the problem above but also hides genuine mismatches.\n\nThe generated classes work with either; what changes is the attribute you reach for and the default behaviour you should expect.',
          code: `// System.Text.Json — case-sensitive unless told otherwise
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};
var root = JsonSerializer.Deserialize<Root>(json, options);

// Newtonsoft — case-insensitive by default
var root2 = JsonConvert.DeserializeObject<Root>(json);`,
        },
        {
          title: 'Fixing the Types a Sample Cannot Infer',
          content: 'A generator reads one example and infers the narrowest type that fits it, which is right about shape and frequently wrong about intent. Three corrections are almost always needed.\n\nIdentifiers: a small id in the sample infers int, which overflows above about 2.1 billion. Database keys and millisecond timestamps should be long; opaque identifiers are safest as string.\n\nMoney: 19.99 infers double, and binary floating point cannot represent most decimal fractions exactly, so sums drift. Change monetary fields to decimal.\n\nOptionality: everything observed in the sample looks required. In a project with nullable reference types enabled, mark genuinely optional fields as string? and the rest required, so the compiler enforces the real contract.',
        },
        {
          title: 'Records, Classes and Immutability',
          content: 'For a payload you only read, a record is the better container: value equality, concise syntax, and immutability by default. Both serializers support records, including constructor binding, so nothing is lost.\n\nA mutable class with settable properties is the right choice when you build the object yourself, when a framework needs a parameterless constructor, or when an ORM or binding layer expects to set properties after construction.\n\nA middle option worth knowing is a class with init-only setters, which gives immutability after construction while keeping object-initializer syntax.',
          code: `// Read-only payload
public record Address(string City, string Country);

// Immutable but initializer-friendly
public class User
{
    public required long Id { get; init; }
    public required string Email { get; init; }
    public string? DisplayName { get; init; }
}`,
        },
        {
          title: 'Handling What Does Not Fit',
          content: 'Real payloads contain fields that resist a single type. A key that is sometimes a string and sometimes a number has no clean mapping; hold it as JsonElement with System.Text.Json or JToken with Newtonsoft and branch on the value kind. Forcing it into object loses exactly the information you need.\n\nDates deserve a deliberate choice. An ISO 8601 string binds to DateTime or DateTimeOffset automatically; prefer DateTimeOffset when the payload carries an offset, because DateTime discards it silently. A Unix epoch needs a converter.\n\nAnd decide what unknown fields should do. Ignoring them is the forgiving default and the right one for an API you do not control; failing on them catches drift early when you own both ends.',
        },
      ]
    },
    relatedArticles: ['nested-json-csharp', 'json-best-practices']
  },
  'common-json-errors': {
    id: 'common-json-errors',
    title: 'Common JSON Formatting Errors and How to Fix Them',
    excerpt: 'Troubleshoot the most common JSON errors developers encounter. Learn to identify and fix syntax errors, trailing commas, quote issues, and invalid data types.',
    date: '2025-02-01',
    readTime: '7 min read',
    category: 'Troubleshooting',
    content: {
      sections: [
        {
          title: 'Missing Commas',
          content: 'One of the most common JSON errors is forgetting commas between properties or array elements. Every property in an object (except the last one) must be followed by a comma. The same applies to array elements.\n\nThis error often occurs when adding or removing properties during development. Always double-check that commas are properly placed between elements.',
          code: `// ❌ Wrong - missing comma
{
  "name": "John"
  "age": 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Trailing Commas',
          content: 'While JavaScript allows trailing commas in objects and arrays, standard JSON does not. A comma after the last property in an object or last element in an array will cause a parsing error in most JSON parsers.\n\nThis is a common mistake when copying code from JavaScript to JSON configuration files.',
          code: `// ❌ Wrong - trailing comma
{
  "name": "John",
  "age": 30,
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Single Quotes Instead of Double Quotes',
          content: 'JSON requires double quotes for both property names and string values. Single quotes, which are valid in JavaScript, will cause JSON parsing to fail. This is one of the most frequent errors when developers used to JavaScript try to write JSON.\n\nAlways use double quotes, even for property names. Both keys and string values must be wrapped in double quotes.',
          code: `// ❌ Wrong - single quotes
{
  'name': 'John',
  'age': 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Unquoted Property Names',
          content: 'In JSON, all property names must be enclosed in double quotes. JavaScript allows unquoted property names in object literals, but JSON does not. This is a strict requirement that catches many developers off guard.\n\nAlways wrap your property names in double quotes, regardless of whether they contain special characters or spaces.',
          code: `// ❌ Wrong - unquoted properties
{
  name: "John",
  age: 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Comments in JSON',
          content: 'Standard JSON does not support comments. If you try to add // or /* */ comments in your JSON file, parsing will fail. This is different from JavaScript and catches many developers by surprise.\n\nIf you need to document your JSON, consider using a separate documentation file or using tools that support JSON with comments (JSONC) during development, then strip comments for production.',
          code: `// ❌ Wrong - contains comments
{
  // User information
  "name": "John",
  "age": 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Incorrect Boolean or Null Values',
          content: 'Boolean values in JSON must be lowercase: true or false, not True or False. Similarly, null must be lowercase. Using capitalized versions or alternative representations (like None) will cause parsing errors.\n\nThis error commonly occurs when converting from languages like Python that use capitalized boolean values.',
          code: `// ❌ Wrong - capitalized
{
  "isActive": True,
  "value": None
}

// ✓ Correct
{
  "isActive": true,
  "value": null
}`
        },
        {
          title: 'Unescaped Special Characters',
          content: 'Special characters in strings must be properly escaped. Quotes, backslashes, and control characters need escape sequences. Forgetting to escape quotes inside string values is a common error.\n\nCommon escape sequences: \\" for quotes, \\\\ for backslash, \\n for newline, \\t for tab, \\r for carriage return.',
          code: `// ❌ Wrong - unescaped quotes
{
  "message": "He said "hello""
}

// ✓ Correct
{
  "message": "He said \\"hello\\""
}`
        },
        {
          title: 'Invalid Number Formats',
          content: 'JSON numbers must follow specific format rules. Leading zeros are not allowed (except for 0.x), NaN and Infinity are not valid JSON values, and hexadecimal notation is not supported.\n\nIf you need to represent special numeric values, use strings or null, and document the convention.',
          code: `// ❌ Wrong
{
  "value": 0123,
  "infinity": Infinity,
  "notNumber": NaN
}

// ✓ Correct
{
  "value": 123,
  "infinity": null,
  "notNumber": null
}`
        },
        {
          title: 'Mismatched Brackets',
          content: 'Every opening bracket must have a corresponding closing bracket. Mismatched brackets are common in nested structures and cause parsing to fail. This includes both square brackets for arrays and curly braces for objects.\n\nUsing a code editor with bracket matching or a JSON formatter can help identify these errors quickly.',
          code: `// ❌ Wrong - missing closing brace
{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC"
    }
}

// ✓ Correct
{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC"
    }
  }
}`
        },
        {
          title: 'Why the Reported Position Misleads',
          content: 'Nearly every JSON error message names a line and column, and people reasonably assume that is where the mistake is. It is where the parser stopped being able to continue, which is a different thing.\n\nA bracket left unclosed early in a file is consistent with everything after it — the parser only discovers the problem when it runs out of input, so it reports the last character. A missing comma causes the parser to read the following key as part of the previous value, and the failure surfaces wherever that becomes impossible.\n\nUse the position as a ceiling rather than a target: the mistake is at or before it, and the fastest route is to walk back to the last structure you are sure is complete.',
        },
        {
          title: 'Errors That Mean the Input Is Not JSON',
          content: 'A distinct family of errors has nothing to do with syntax: the text was never JSON to begin with.\n\n"Unexpected token <" is an HTML document — an error page, a login redirect, a proxy notice, or an SPA shell returned for a path that does not exist. "Unexpected end of JSON input" on an empty string is a response body that was already consumed, a download that did not finish, or a variable never assigned. "Unexpected token o in JSON at position 1" is an object being passed to a parser that coerces it to [object Object] first.\n\nAll three are diagnosed the same way: log the status code and the first couple of hundred characters before parsing. The cause becomes obvious immediately and the fix is usually upstream of the parse call.',
        },
        {
          title: 'Errors From How the File Was Saved',
          content: 'Some documents look flawless on screen and still fail, which is the most frustrating category because inspection does not help.\n\nA byte order mark is the classic. A file saved as UTF-8 with BOM begins with bytes that are neither whitespace nor an opening brace, so the parse fails at position 0 on a document that appears perfect. Re-save as UTF-8 without BOM.\n\nSmart quotes are the other. A document edited in a word processor or pasted through a chat client can have its straight quotes silently replaced with typographic ones, which are different characters and not valid JSON string delimiters.\n\nAnd a file appended to rather than overwritten contains two complete documents back to back, which produces "Extra data" in Python or "Unexpected non-whitespace character" in JavaScript.',
        },
        {
          title: 'The Errors a Validator Will Not Catch',
          content: 'Worth ending on the failures that leave you with valid JSON and wrong data, because no parser will warn you.\n\nDuplicate keys are permitted by the specification. Most parsers keep the last occurrence and discard the rest, silently losing data in a document that validates perfectly.\n\nLarge integers lose precision. Any value beyond 2^53 is rounded when read as a double, so an identifier arrives subtly wrong with no error anywhere — the single most damaging quiet failure in JSON handling.\n\nAnd a field whose type varies between records parses fine every time while breaking any code that assumed one type. These are the cases for a schema: syntax validation answers "can this be read", and only a schema answers "is this what we agreed".',
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'nested-json-csharp': {
    id: 'nested-json-csharp',
    title: 'Working with Nested JSON Objects in C#',
    excerpt: 'Master the art of handling complex, deeply nested JSON structures in C#. Learn about deserialization, navigation, and best practices for working with hierarchical data.',
    date: '2025-02-10',
    readTime: '15 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Understanding Nested Structures',
          content: 'Nested JSON objects represent hierarchical relationships in your data. In C#, these translate to classes that contain other classes as properties. Understanding how to model these relationships correctly is crucial for working with complex APIs and data structures.\n\nWhen dealing with nested JSON, you need to create a class hierarchy that mirrors the JSON structure. Each level of nesting typically corresponds to a separate class, making your code more maintainable and type-safe.',
          code: `{
  "user": {
    "id": 123,
    "profile": {
      "firstName": "Jane",
      "lastName": "Doe",
      "contact": {
        "email": "jane@example.com",
        "phone": "+1234567890"
      }
    }
  }
}`
        },
        {
          title: 'Creating Class Hierarchies',
          content: 'For nested JSON, create a class for each level of nesting. Start from the innermost objects and work outward. Each class should be self-contained and reusable if possible.\n\nConsider whether nested classes should be separate types or nested class definitions. Separate files are better for classes used in multiple places, while nested class definitions work well for types specific to a parent class.',
          code: `public class Contact
{
    public string Email { get; set; }
    public string Phone { get; set; }
}

public class Profile
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Contact Contact { get; set; }
}

public class UserData
{
    public int Id { get; set; }
    public Profile Profile { get; set; }
}`
        },
        {
          title: 'Handling Deeply Nested Arrays',
          content: 'When JSON contains arrays at multiple levels, use List<T> for collections and create appropriate class models. Each array element type needs its own class definition if it contains multiple properties.\n\nFor arrays of simple types (strings, numbers), use List<string> or List<int>. For arrays of objects, create a class for the object type and use List<YourClass>.',
          code: `public class Order
{
    public int OrderId { get; set; }
    public List<LineItem> Items { get; set; }
}

public class LineItem
{
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public List<string> Tags { get; set; }
}`
        },
        {
          title: 'Safe Property Access',
          content: 'When working with nested objects, null reference exceptions are a common problem. Use null-conditional operators (?.) and null-coalescing operators (??) to safely navigate nested structures.\n\nC# nullable reference types (enabled with #nullable enable) help catch potential null reference issues at compile time. Mark properties as nullable (?) when they might not be present in the JSON.',
          code: `// Safe property access
string? email = userData?.Profile?.Contact?.Email;
string displayName = userData?.Profile?.FirstName ?? "Guest";

// Null checking before access
if (userData?.Profile?.Contact != null)
{
    Console.WriteLine(userData.Profile.Contact.Email);
}`
        },
        {
          title: 'Deserialization Strategies',
          content: 'When deserializing complex nested JSON, you can deserialize the entire structure at once or use selective deserialization for specific parts. For very large JSON documents, consider streaming APIs for better memory efficiency.\n\nSystem.Text.Json and Newtonsoft.Json both handle nested objects automatically. Just ensure your class structure matches the JSON hierarchy.',
          code: `using System.Text.Json;

string json = File.ReadAllText("complex-data.json");
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

UserData userData = JsonSerializer.Deserialize<UserData>(json, options);

// Access nested data
string email = userData.Profile.Contact.Email;`
        },
        {
          title: 'Working with Dynamic Structures',
          content: 'Sometimes you don\'t know the structure ahead of time or it varies. You can use JsonDocument or JObject for dynamic JSON parsing. This is useful for APIs with variable responses or when exploring unfamiliar JSON structures.\n\nDynamic parsing trades type safety for flexibility. Use it when necessary, but prefer strongly-typed classes when the structure is known.',
          code: `using System.Text.Json;

string json = "{\\"user\\": {\\"profile\\": {\\"email\\": \\"test@example.com\\"}}}";
using JsonDocument doc = JsonDocument.Parse(json);

// Navigate dynamically
if (doc.RootElement.TryGetProperty("user", out JsonElement user))
{
    if (user.TryGetProperty("profile", out JsonElement profile))
    {
        if (profile.TryGetProperty("email", out JsonElement email))
        {
            Console.WriteLine(email.GetString());
        }
    }
}`
        },
        {
          title: 'Performance Considerations',
          content: 'For large nested structures, be mindful of memory usage and deserialization performance. Consider using streaming deserialization for very large files, implement lazy loading for deeply nested data that might not always be needed, and use records instead of classes for immutable data structures.\n\nProfile your application to identify performance bottlenecks. Sometimes breaking large JSON into smaller chunks or using pagination is better than processing everything at once.',
          code: `// Using record for immutable nested data
public record ContactInfo(string Email, string Phone);

public record UserProfile(
    string FirstName,
    string LastName,
    ContactInfo Contact
);`
        },
        {
          title: 'Error Handling',
          content: 'When deserializing nested JSON, implement proper error handling. Missing properties, type mismatches, and malformed JSON can all cause exceptions. Catch specific exceptions and provide meaningful error messages.\n\nUse try-catch blocks around deserialization code and validate the structure before accessing deeply nested properties.',
          code: `try
{
    UserData userData = JsonSerializer.Deserialize<UserData>(json);

    if (userData?.Profile?.Contact?.Email == null)
    {
        throw new InvalidDataException("Email is required");
    }

    // Process data...
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON parsing error: {ex.Message}");
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"Validation error: {ex.Message}");
}`
        },
        {
          title: 'Naming the Generated Classes',
          content: 'A generator names nested classes after the key that holds them, which works until two different branches contain a key called data, meta or items. You then get Data, Data2 and Data3, and six months later nobody can tell which belongs where.\n\nRename them as the first editing pass, before the classes spread through your codebase. Name for what the thing is rather than where it sat: OrderLine rather than Items, PageInfo rather than Meta. The json attribute preserves the wire name, so renaming the C# type costs nothing at runtime.',
        },
        {
          title: 'Collections and Their Defaults',
          content: 'An array becomes List<T>, and the question worth deciding is what happens when the key is absent. A null list means every consumer needs a null check before iterating; an empty list means they do not.\n\nInitialising collection properties to an empty list is the pragmatic default — it removes a whole class of null reference exceptions and is almost always what the caller wants. The exception is when absent and empty genuinely mean different things, which does happen in PATCH-style APIs where an omitted array means "unchanged" and an empty one means "clear".\n\nFor read-only payloads, exposing IReadOnlyList<T> communicates that the caller should not mutate what the deserializer produced.',
          code: `public class Order
{
    public long Id { get; init; }

    // never null: callers can iterate without checking
    public List<OrderLine> Lines { get; init; } = new();
}`,
        },
        {
          title: 'Polymorphic and Irregular Branches',
          content: 'Deeply nested payloads frequently contain a branch whose shape depends on a discriminator — a type field deciding whether the rest of the object is one thing or another. A generator cannot see that from one sample and will produce a single class with every field from whichever example it saw, all optional.\n\nSystem.Text.Json supports this directly from .NET 7 with JsonDerivedType and JsonPolymorphic, letting you declare a base type and map each discriminator value to a subclass. Newtonsoft handles it with a custom JsonConverter.\n\nThe alternative, when the variation is small, is one class with nullable properties and a documented rule about which are populated together. It is less elegant and often less work.',
        },
      ]
    },
    relatedArticles: ['json-to-csharp-tutorial', 'common-json-errors']
  },
  'json-vs-xml-yaml': {
    id: 'json-vs-xml-yaml',
    title: 'JSON vs XML vs YAML: Choosing the Right Data Format',
    excerpt: 'A practical comparison of JSON, XML, and YAML covering syntax, readability, performance, and the situations where each format is the best choice.',
    date: '2025-02-18',
    readTime: '9 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'Three Formats, Three Philosophies',
          content: 'JSON, XML, and YAML all solve the same fundamental problem: representing structured data as text that both humans and machines can work with. But they were designed with different priorities. JSON optimizes for simplicity and direct mapping to programming data structures. XML optimizes for document markup, extensibility, and rigorous validation. YAML optimizes for human readability and hand-editing.\n\nChoosing the wrong format rarely makes a project fail, but choosing the right one removes friction. The goal of this guide is to help you match the format to the job rather than defaulting to whatever you used last time.'
        },
        {
          title: 'Syntax Side by Side',
          content: 'The same data looks very different in each format. Notice how JSON uses braces and quotes, XML uses opening and closing tags, and YAML uses indentation with almost no punctuation:',
          code: `// JSON
{ "user": { "name": "Ada", "active": true } }

<!-- XML -->
<user>
  <name>Ada</name>
  <active>true</active>
</user>

# YAML
user:
  name: Ada
  active: true`
        },
        {
          title: 'When to Use JSON',
          content: 'JSON is the right default for almost all web APIs and for data exchanged between services. It maps directly onto objects and arrays in every mainstream language, parses extremely fast, and has near-universal library support. Its lack of comments and strict syntax are actually advantages for machine-to-machine communication, where predictability matters more than annotation.\n\nReach for JSON when you are building or consuming REST APIs, storing structured data in a database column, or passing data between a frontend and backend.'
        },
        {
          title: 'When to Use XML',
          content: 'XML still dominates in domains that need rich document structure, namespaces, attributes, and formal schema validation. SOAP web services, office document formats, RSS feeds, and many enterprise and government systems are built on XML. If you need to validate documents against a strict schema (XSD) or mix structured data with free-form markup, XML remains a strong choice.'
        },
        {
          title: 'When to Use YAML',
          content: 'YAML shines for configuration files that humans edit by hand. Its clean, indentation-based syntax makes files like CI pipelines, Kubernetes manifests, and application config pleasant to read and write. The trade-off is that YAML is whitespace-sensitive and has subtle parsing rules, so it is less suited to machine-generated data or high-volume data exchange.'
        },
        {
          title: 'Quick Decision Guide',
          content: '• Building an API or exchanging data between services? Use JSON.\n• Need document markup, namespaces, or strict schema validation? Use XML.\n• Writing configuration that people edit by hand? Use YAML.\n\nBecause these formats are interconvertible, you can also use the right one at each layer — for example, edit configuration in YAML but serve data over an API in JSON.'
        },
        {
          title: 'What Each One Was Designed For',
          content: 'The three formats are not competing attempts at the same thing, which is why "which is best" has no answer without context.\n\nXML was designed for documents: marked-up text where structure surrounds prose, with namespaces so vocabularies from different sources can coexist, and a schema language to validate them. Everything people find heavy about it follows from that brief.\n\nJSON was designed for interchange between programs. It maps directly onto the data structures languages already have — objects and arrays — which is why parsing it requires no modelling step.\n\nYAML was designed to be written by people. Minimal punctuation, significant indentation, comments, and anchors for reuse.',
        },
        {
          title: 'The Practical Differences',
          content: 'XML distinguishes attributes from child elements, and nothing in JSON or YAML corresponds to that — which is why XML-to-JSON conversion always involves a convention, usually prefixing attributes with @. XML also preserves document order and mixed content, both meaningful for text and irrelevant for records.\n\nJSON has no comments, no date type and no schema built in, though JSON Schema fills the last gap well. Its type system is six types and no more, which keeps parsers simple and pushes decisions about dates and decimals onto you.\n\nYAML is a superset of JSON, so every JSON document is valid YAML. It adds comments, multi-line strings, references and multiple documents per file — and significant whitespace, which is where its failure mode lives.',
        },
        {
          title: 'The Failure Modes',
          content: 'Each format breaks in a characteristic way, and knowing which one you are exposed to is more useful than a feature table.\n\nXML breaks through complexity: namespaces, entity expansion and external entity resolution. The last is a genuine security issue — XXE attacks read local files through a parser that resolves external entities, which is why hardened parsers disable them by default.\n\nJSON breaks through strictness: one misplaced character and the whole document is unparseable, with an error position that points past the mistake.\n\nYAML breaks through ambiguity: indentation that looks right and is not, and unquoted scalars that get type-guessed. The Norway problem — the country code NO parsed as the boolean false — is the famous example, fixed in YAML 1.2 but still live in parsers implementing 1.1.',
        },
        {
          title: 'Choosing Without Agonising',
          content: 'For an API between programs, JSON, unless you are integrating with an established system that speaks XML — SOAP services, government and banking interfaces, and publishing pipelines are all still XML and will be for a long time.\n\nFor configuration a person maintains, YAML or TOML. YAML when the surrounding ecosystem has chosen it, which for Kubernetes, GitHub Actions and Ansible it has. TOML when you are free to pick and want fewer surprises.\n\nFor documents where structure wraps prose rather than records, XML, which is what it is actually good at.\n\nAnd for anything machine-written and machine-read at volume, consider leaving all three behind for a binary format — Protocol Buffers or Parquet depending on whether you are messaging or storing.',
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-vs-toml-config']
  },
  'understanding-toon-llm': {
    id: 'understanding-toon-llm',
    title: 'What Is TOON? Cutting LLM Token Costs with Token-Oriented Notation',
    excerpt: 'Learn how TOON (Token-Oriented Object Notation) represents structured data in fewer tokens than JSON, lowering cost and saving context when working with large language models.',
    date: '2025-02-25',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Tokens Matter for LLMs',
          content: 'Large language models do not read characters or words — they read tokens, chunks of text that the model bills and budgets by. Every prompt you send and every response you receive is measured in tokens, and both your costs and the model’s limited context window are denominated in them.\n\nWhen you feed structured data into a prompt — a product catalog, a set of records, a configuration — the way that data is serialized directly affects how many tokens it consumes. JSON is convenient but verbose: every key is repeated for every object, and braces, quotes, and commas all cost tokens. TOON was created to address exactly this overhead.'
        },
        {
          title: 'How TOON Saves Tokens',
          content: 'TOON (Token-Oriented Object Notation) represents the same logical data as JSON but strips away repetition and redundant punctuation. For arrays of uniform objects, instead of repeating each key in every element, it can declare the keys once and then list the values. The result is a denser document that encodes the same information in noticeably fewer tokens.\n\nThe savings grow with the size and regularity of your data. A handful of fields makes little difference, but a large array of similarly shaped records can shrink substantially — which translates directly into lower API costs and more room in the context window for reasoning.'
        },
        {
          title: 'A Practical Round Trip',
          content: 'The typical workflow is to keep your data in JSON everywhere in your application, convert it to TOON only at the moment you build a prompt, and convert any TOON the model returns back into JSON for the rest of your system to consume. This keeps the token savings localized to the model boundary without forcing your whole stack to understand a new format.',
          code: `// Application data (JSON)
[
  { "id": 1, "name": "Ada", "role": "admin" },
  { "id": 2, "name": "Linus", "role": "editor" }
]

// Converted to TOON for the prompt — keys declared once,
// values listed compactly, fewer tokens overall.`
        },
        {
          title: 'When TOON Is Worth It',
          content: 'TOON is most valuable when you are sending sizable, repetitive structured data into a model and you are sensitive to cost or bumping against context limits. For small payloads the overhead of converting is not worth it, and for normal application or API work plain JSON remains the right choice. Think of TOON as an optimization you apply at the LLM boundary, not a wholesale replacement for JSON.'
        },
        {
          title: 'Trying It Yourself',
          content: 'The easiest way to understand TOON is to convert a real dataset and compare. Paste a JSON array into our JSON to TOON converter, look at the compact result, and then convert it back with the TOON to JSON tool to confirm the round trip is lossless. Seeing the difference on your own data makes the token savings concrete.'
        },
        {
          title: 'Where the Tokens Actually Go in JSON',
          content: 'It helps to see which parts of a JSON payload a tokenizer charges you for. The values are unavoidable — that is your data. The cost you can remove is structural: every repeated key name, every quote around it, every colon, comma and brace.\n\nIn an array of uniform objects that structural share grows with the number of rows, because the keys repeat in full for every single element. A hundred records with six fields each means six hundred key repetitions, and each one is at least one token, often two with its quotes and colon.\n\nThat is precisely the redundancy a tabular representation removes: declare the field names once, then send rows of values.',
        },
        {
          title: 'Measure Before You Convert',
          content: 'The saving depends entirely on the shape of your data, so the only honest answer is to measure your own payload rather than trust a headline figure.\n\nUniform arrays of flat objects benefit the most, and the benefit grows with row count. A deeply nested document with few repeated keys benefits much less, because most of its tokens are values and unique structure. A single small object may not benefit at all — and converting it adds a step for nothing.\n\nCount tokens with the tokenizer for the model you are actually using, not a character count divided by four. Different model families tokenize differently, and the rule of thumb is only a rule of thumb.',
        },
        {
          title: 'Keep the Boundary Narrow',
          content: 'The pattern that works is to treat TOON as a wire format for the prompt and nothing else. Your database, your API and your application code stay on JSON; conversion happens at the moment you assemble the prompt, and the reverse happens as soon as a response comes back.\n\nThe reason is tooling. Everything you already have — validators, schemas, logs, tests, every library in every language — understands JSON. Pushing a different representation into the middle of your system to save tokens at the edge trades a known, well-supported format for a narrow optimisation, in the one place it provides no benefit.',
        },
        {
          title: 'What to Watch For',
          content: 'Two practical cautions. First, confirm the round trip on your real data before relying on it: convert to TOON, convert back, and compare against the original. Uniform data round-trips cleanly; data with irregular shapes is where any format that exploits uniformity has to make decisions.\n\nSecond, remember the model has to understand what it is reading. Models handle tabular input well, but a prompt that simply drops an unfamiliar format in with no explanation is asking the model to infer the schema. A single line stating what the columns are costs a handful of tokens and removes the ambiguity — usually a better trade than the tokens it spends.',
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-vs-xml-yaml']
  },
  'json-vs-toml-config': {
    id: 'json-vs-toml-config',
    title: 'JSON vs TOML for Configuration Files',
    excerpt: 'When should you use JSON and when should you reach for TOML in your configuration files? A clear breakdown of readability, comments, data types, and tooling.',
    date: '2025-03-04',
    readTime: '7 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'Configuration Is Read by Humans',
          content: 'Unlike data exchanged between services, configuration files are usually written and edited by people. That changes the priorities: readability, the ability to leave comments, and forgiving syntax matter more than parsing speed or compactness. This is the context in which TOML was designed, and where it often beats JSON.'
        },
        {
          title: 'The Comment Problem',
          content: 'Standard JSON does not allow comments. For a configuration file this is a real limitation — you cannot explain why a value is set the way it is, or temporarily disable a setting by commenting it out. TOML supports comments natively with the # character, which makes config files self-documenting.',
          code: `# TOML — comments are allowed
[server]
port = 8080      # default development port
debug = true

{
  "server": {
    "port": 8080,
    "debug": true
  }
}
// JSON has no place for that explanatory note`
        },
        {
          title: 'Readability of Nested Data',
          content: 'TOML uses named tables (sections in square brackets) that read naturally for grouped settings, whereas deeply nested JSON quickly becomes a thicket of braces. For flat or shallow configuration, TOML tends to be easier to scan. That said, for deeply nested or highly dynamic structures, JSON’s explicit nesting can actually be clearer than TOML’s table syntax.'
        },
        {
          title: 'Tooling and Ecosystem',
          content: 'JSON has the broadest support of any format — every language parses it out of the box. TOML is the configuration standard for modern toolchains like Rust’s Cargo and Python’s packaging (pyproject.toml), and has solid library support, though not quite JSON’s ubiquity. If your ecosystem already expects one format, follow that convention rather than fighting it.'
        },
        {
          title: 'Choosing Between Them',
          content: 'Use TOML when humans edit the file regularly and benefit from comments and clear sections — application config, tool settings, project metadata. Use JSON when the file is generated or consumed by code, when you need maximum tooling compatibility, or when the structure is deeply nested. And remember you can convert between them at any time: edit in TOML, then convert to JSON for your build pipeline if needed.'
        },
        {
          title: 'The Three Things JSON Cannot Do in a Config File',
          content: 'JSON is an excellent interchange format and an awkward configuration format, and the reasons come down to three omissions.\n\nThere are no comments. Configuration is exactly the kind of file where the next reader needs to know why a value is what it is, and JSON gives you nowhere to say it. The workaround — a sibling "_comment" key — is ugly and the parser has no idea it is a comment.\n\nThere are no trailing commas. Adding or reordering an entry means touching the line above it too, which turns a one-line change into a two-line diff and causes a specific, maddening class of merge conflict.\n\nAnd multi-line strings have to be escaped into one line. A certificate, a SQL query or a shell snippet becomes an unreadable run of backslash-n.',
          code: `// JSON: no comments, escape the newlines, mind the commas
{
  "_comment": "raise after the incident in March",
  "timeout": 30,
  "query": "SELECT *\\nFROM users\\nWHERE active = true"
}`,
        },
        {
          title: 'What TOML Gives You Instead',
          content: 'TOML was designed for exactly this job, and it answers all three. Comments start with a hash. Trailing commas are allowed in arrays. Multi-line strings are written between triple quotes, with the newlines intact.\n\nIt also has a first-class date and time type, which JSON does not. A timestamp in TOML is a timestamp, parsed and validated; in JSON it is a string and every consumer re-implements the parsing.\n\nThe deeper difference is the table syntax. Nested structures in JSON get deeper indentation as they nest; in TOML a section header names the whole path, so a deeply nested value is written flat and stays readable.',
          code: `# TOML: comments, real dates, readable nesting
timeout = 30            # raised after the March incident
released = 2026-01-15T10:30:00Z

query = """
SELECT *
FROM users
WHERE active = true
"""

[database.primary]
host = "db1.internal"
port = 5432`,
        },
        {
          title: 'Where JSON Still Wins',
          content: 'None of this makes TOML the better choice everywhere. JSON wins decisively whenever a machine rather than a person is the author or the reader.\n\nAnything generated, written back programmatically, or exchanged between services should be JSON: every language serializes it without a dependency, and nothing is lost in a round trip. TOML round-trips badly because comments and formatting are not part of the data model — write a TOML file from a program and the comments are gone.\n\nJSON is also better for deeply nested or irregular data. TOML is at its best with a broadly flat structure of named sections; arrays of tables are supported but get noisy quickly, and a document where the shape varies per entry is far more natural in JSON.',
        },
        {
          title: 'And Where YAML Fits',
          content: 'YAML is the third option and the one with the widest reach, largely because Kubernetes, GitHub Actions and Ansible chose it. It has comments, multi-line strings, anchors for reuse, and the lightest syntax of the three.\n\nIt also has the most ways to surprise you. Indentation is significant, so a misplaced space changes meaning silently. Unquoted values are type-guessed, which historically turned the country code NO into the boolean false and version numbers into floats — the behaviour was tightened in YAML 1.2 but plenty of parsers still implement 1.1. And the specification is large enough that two parsers can genuinely disagree.\n\nA reasonable rule: TOML for configuration a person owns, JSON for anything a program writes or an API returns, YAML when the ecosystem you are in has already decided.',
        },
      ]
    },
    relatedArticles: ['json-vs-xml-yaml', 'json-best-practices']
  },
  'parsing-large-json-files': {
    id: 'parsing-large-json-files',
    title: 'How to Parse and Process Large JSON Files Efficiently',
    excerpt: 'Strategies for handling JSON files too big to fit comfortably in memory, including streaming parsers, chunking, and practical performance tips.',
    date: '2025-03-12',
    readTime: '10 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'When JSON Gets Too Big',
          content: 'Most JSON is small enough that you can read the whole file, parse it into memory, and work with the result. But once files reach hundreds of megabytes or gigabytes — export dumps, logs, large datasets — loading everything at once can exhaust memory and freeze your application. Handling large JSON well requires a different approach: process the data as it streams in, rather than all at once.'
        },
        {
          title: 'The Problem with JSON.parse',
          content: 'A call like JSON.parse(hugeString) must hold the entire input string and the entire resulting object in memory simultaneously. For a 2 GB file that can mean needing several gigabytes of RAM, and the parse blocks your thread until it finishes. This is fine for typical payloads and fatal for very large ones.'
        },
        {
          title: 'Streaming Parsers',
          content: 'A streaming parser reads the input incrementally and emits events or values as it encounters them, so you never hold the whole document in memory. In Node.js, libraries like stream-json or clarinet let you process one record at a time as it arrives. The key insight is that most large JSON files are an array of many similar objects, and you rarely need them all in memory at once — you need to do something with each one and move on.',
          code: `// Node.js: process a huge array one item at a time
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const fs = require('fs');

fs.createReadStream('huge.json')
  .pipe(parser())
  .pipe(streamArray())
  .on('data', ({ value }) => {
    // handle one record; it is garbage-collected after
    processRecord(value);
  });`
        },
        {
          title: 'Newline-Delimited JSON (NDJSON)',
          content: 'If you control how the data is produced, consider NDJSON — one JSON object per line. It is trivially streamable: read the file line by line and parse each line independently, with no special parser required. Many data pipelines and logging systems use this format precisely because it scales to enormous sizes while staying simple.',
          code: `{"id":1,"name":"Ada"}
{"id":2,"name":"Linus"}
{"id":3,"name":"Grace"}
// Each line is independent valid JSON`
        },
        {
          title: 'Practical Tips',
          content: '• Process and discard each record as you go; do not accumulate everything in an array.\n• Prefer streaming or NDJSON over loading the full document for files above a few hundred megabytes.\n• If you only need part of the data, filter during the stream so you keep just what matters.\n• For one-off inspection of a large but not enormous file, our online viewer can format multi-megabyte JSON directly in the browser.\n• Move heavy parsing off the main thread (a worker) so your UI or server stays responsive.'
        },
        {
          title: 'Why the Usual Approach Stops Working',
          content: 'JSON.parse and json.loads read the entire document into memory and build the whole object graph before returning anything. For a file of a few megabytes that is invisible. For a file of a few gigabytes it is fatal, and not only because of the file size.\n\nThe in-memory representation is considerably larger than the text. Every string, object and number becomes a language-level value with its own overhead, so a 1 GB file routinely needs several gigabytes of heap. In Node the default heap limit will stop you long before the file does; in Python the process simply grows until the machine objects.\n\nThe fix is never a bigger machine. It is to stop holding the whole document at once.',
        },
        {
          title: 'Streaming Parsers',
          content: 'A streaming parser emits events — object start, key, value, array element — as it reads, so you can act on each record and discard it. Memory stays flat regardless of file size, and processing starts immediately rather than after the last byte.\n\nThe trade is that you lose random access. You cannot ask for the hundredth element without walking the first ninety-nine, and code that needs two distant parts of the document at once becomes awkward. For the common case — iterate over a large array of records and do something with each — that does not matter.\n\nThe mature options are ijson in Python, stream-json or clarinet in Node, encoding/json Decoder in Go, and Jackson streaming in Java.',
          code: `# Python: iterate records without loading the file
import ijson

with open("huge.json", "rb") as f:
    for record in ijson.items(f, "data.item"):
        process(record)   # one record in memory at a time`,
        },
        {
          title: 'Change the Format If You Can',
          content: 'The most effective optimisation is often not a faster parser but a different file. If you control how the data is produced, JSON Lines removes the problem entirely: one record per line means a plain loop with constant memory and no streaming library at all.\n\nIt also parallelises trivially — split the file by lines across workers — and survives corruption, since a damaged line costs one record rather than the file. This is why log pipelines and data warehouse imports standardised on it.\n\nIf the data is read far more often than written, consider going further. A columnar format such as Parquet is dramatically smaller and faster for analytical queries; JSON is a transport format, not a storage format.',
        },
        {
          title: 'Practical Tuning Before You Rewrite',
          content: 'A few things are worth checking before reaching for a streaming rewrite.\n\nMeasure where the time goes. For many workloads the parse is not the bottleneck — decompression, disk, or whatever you do per record is. Profiling first avoids optimising the wrong stage.\n\nOn Node, raising the heap with --max-old-space-size buys headroom for a file that is merely large rather than enormous, and is a legitimate answer when the alternative is a rewrite you do not have time for.\n\nAnd if you only need part of the document, say so early. Extracting a subset with a streaming filter such as jq before the data reaches your program is frequently the simplest fix available, and jq handles files far larger than memory.',
          code: `# pull just what you need before parsing in your program
jq -c '.data[] | {id, email}' huge.json > slim.jsonl

# node, when a bigger heap is genuinely the right answer
node --max-old-space-size=8192 import.js`,
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'json-schema-validation-guide': {
    id: 'json-schema-validation-guide',
    title: 'JSON Schema: Validating Your Data Structure',
    excerpt: 'An introduction to JSON Schema — how to describe the shape of your JSON, enforce required fields and types, and catch bad data before it causes bugs.',
    date: '2025-03-20',
    readTime: '11 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Validation Matters',
          content: 'Valid JSON syntax only guarantees that your data parses — not that it contains the right fields, types, or values. An API might return perfectly valid JSON that is missing a required field or has a string where your code expects a number. JSON Schema lets you describe what correct data looks like and automatically check real data against that description, turning a whole class of runtime bugs into clear, early validation errors.'
        },
        {
          title: 'A Basic Schema',
          content: 'A JSON Schema is itself a JSON document. It describes the expected type of each field, which fields are required, and constraints on their values. Here is a schema for a simple user object:',
          code: `{
  "type": "object",
  "properties": {
    "id":    { "type": "integer" },
    "name":  { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "age":   { "type": "integer", "minimum": 0 }
  },
  "required": ["id", "name", "email"]
}`
        },
        {
          title: 'Common Keywords',
          content: '• type — the expected data type (string, number, integer, boolean, object, array, null).\n• required — the list of properties that must be present.\n• properties — the schema for each named field.\n• minimum / maximum — numeric bounds.\n• minLength / maxLength / pattern — string constraints, including regular expressions.\n• enum — restricts a value to a fixed set of options.\n• items — the schema each element of an array must satisfy.'
        },
        {
          title: 'Validating in Code',
          content: 'You do not validate by hand — you use a validator library that takes your schema and your data and reports any violations. In JavaScript, Ajv is the de facto standard; most languages have an equivalent. The validator returns either success or a list of precise errors describing what failed and where.',
          code: `import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.log(validate.errors); // exactly what is wrong
}`
        },
        {
          title: 'Where to Use It',
          content: 'JSON Schema is most valuable at the boundaries of your system: validating incoming API request bodies, checking configuration files at startup, verifying responses from third-party services, and documenting the contract between a frontend and backend. By rejecting malformed data at the edge, you keep the inside of your application clean and prevent bad data from spreading into bugs that are hard to trace.'
        },
        {
          title: 'What a Schema Buys You That Types Do Not',
          content: 'A static type in your language describes what your code expects. A JSON Schema describes what the data must be, and it is enforced at runtime, at the boundary, before anything downstream sees it.\n\nThat difference is the whole point. TypeScript interfaces vanish at compile time; a Go struct catches a type mismatch but not a value outside its allowed range; neither tells an API consumer, in a machine-readable way, what a valid request looks like. A schema is both a validator and a specification, and the same document can generate documentation, example payloads and client types.',
        },
        {
          title: 'The Constraints Worth Knowing',
          content: 'Most practical schemas use a small subset of the vocabulary. type and properties describe the shape. required lists the keys that must be present — note that this is separate from the property definitions, which trips up newcomers who expect a required flag per field.\n\nBeyond shape, the useful constraints are the ones that catch bad data a type cannot: minimum and maximum for numbers, minLength and pattern for strings, enum for a fixed set, minItems and uniqueItems for arrays, and format for well-known string shapes such as email, uri and date-time.\n\nadditionalProperties is the one to decide deliberately. Left alone it permits unknown keys, which is forgiving; set to false it rejects them, which catches typos in hand-written payloads at the cost of breaking when the producer adds a field.',
          code: `{
  "type": "object",
  "required": ["id", "email"],
  "properties": {
    "id":    { "type": "integer", "minimum": 1 },
    "email": { "type": "string", "format": "email" },
    "role":  { "enum": ["admin", "editor", "viewer"] },
    "tags":  { "type": "array", "items": { "type": "string" }, "uniqueItems": true }
  },
  "additionalProperties": false
}`,
        },
        {
          title: 'Where to Validate',
          content: 'Validate at every boundary where data arrives from somewhere you do not control, and nowhere else. Server-side on every incoming request, because a client-side check is a convenience and not a protection. Client-side as well, because it turns a round trip into instant feedback. In your test suite against recorded fixtures, which catches a drifting upstream API before your users do. And in CI against configuration files, which is the cheapest validation of all.\n\nWhat you should not do is validate the same object repeatedly as it moves through your own code. Parse once at the edge, then trust the result — that is what makes the boundary meaningful.',
        },
        {
          title: 'Drafts, Tooling and Generating a Starting Point',
          content: 'JSON Schema has gone through several drafts and they are not fully compatible. Draft 7 remains the most widely supported; 2019-09 and 2020-12 are newer and split the specification into vocabularies, which matters mostly when your validator and your schema disagree about which draft they are speaking. Declare the draft with $schema and check that your library supports it.\n\nFor tooling, Ajv is the standard in JavaScript, jsonschema and fastjsonschema in Python, and most languages have a mature option. Writing a schema from scratch for an existing payload is unnecessary — generate one from a representative sample, then tighten it by hand: add required, replace loose strings with enums and formats, and set bounds where they make sense. The generated version is a draft, not an answer.',
        },
      ]
    },
    relatedArticles: ['json-best-practices', 'common-json-errors']
  },
  'json-rest-api-design': {
    id: 'json-rest-api-design',
    title: 'Designing JSON REST API Responses: Patterns and Conventions',
    excerpt: 'Proven conventions for structuring JSON responses in REST APIs — consistent envelopes, error formats, pagination, and naming that clients can rely on.',
    date: '2025-03-28',
    readTime: '10 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'Consistency Is the Whole Game',
          content: 'The single most important property of a good API is consistency. When every endpoint shapes its responses the same way — the same envelope, the same error format, the same naming convention — clients can write generic handling code and developers can predict the response without reading the docs every time. Most API design debates matter far less than simply picking conventions and applying them everywhere.'
        },
        {
          title: 'A Predictable Response Envelope',
          content: 'Many APIs wrap their payload in a consistent envelope so that data, metadata, and errors always live in known places. A common pattern returns the resource under a data key, with optional meta for things like pagination:',
          code: `{
  "data": [
    { "id": 1, "title": "First" },
    { "id": 2, "title": "Second" }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 137
  }
}`
        },
        {
          title: 'A Standard Error Format',
          content: 'Errors deserve as much design attention as success responses. A good error body includes a stable machine-readable code, a human-readable message, and ideally a pointer to the offending field. Pair this with correct HTTP status codes — 400 for bad input, 401/403 for auth, 404 for missing resources, 422 for validation failures, 500 for server errors.',
          code: `{
  "error": {
    "code": "validation_failed",
    "message": "The email field is required.",
    "field": "email"
  }
}`
        },
        {
          title: 'Naming and Types',
          content: 'Pick one casing convention and never mix: camelCase suits JavaScript clients, snake_case is common in many backends — either works, consistency is what matters. Use real JSON types rather than stringifying everything: numbers as numbers, booleans as true/false, and ISO 8601 strings for dates (for example 2025-03-28T10:00:00Z). Avoid returning null and an absent key interchangeably; decide what each means and be consistent.'
        },
        {
          title: 'Pagination and Evolution',
          content: 'For collections, always paginate from the start — returning unbounded arrays will eventually break under real data volumes. Expose page size and total counts in the meta section so clients can build navigation. Finally, design for change: add new fields rather than repurposing old ones, and treat removing or renaming a field as a breaking change that warrants a new API version.'
        },
        {
          title: 'Envelope or Bare Array',
          content: 'The first structural decision is whether a collection endpoint returns the array directly or wraps it in an object. Returning the array is tidier to read and harder to extend: there is nowhere to put pagination, rate-limit information, warnings or a deprecation notice, so adding any of them later is a breaking change.\n\nAn envelope costs one level of nesting and keeps that door open. It also makes success and failure responses structurally similar, which simplifies client code.\n\nThere is a security argument too. A bare top-level JSON array was historically exploitable through JSON hijacking in older browsers; the attack is obsolete, but the habit of wrapping persists for good reasons of its own.',
          code: `// Hard to extend
[ { "id": 1 }, { "id": 2 } ]

// Room to grow
{
  "data": [ { "id": 1 }, { "id": 2 } ],
  "meta": { "page": 1, "perPage": 20, "total": 97 }
}`,
        },
        {
          title: 'Designing for Change',
          content: 'An API is a contract you will want to alter. Two rules make that possible without breaking clients.\n\nAdd, do not repurpose. A new field is a compatible change as long as clients ignore unknown keys — which means your own client code should ignore them too, rather than failing on them. Changing the type or meaning of an existing field is never compatible, even when the name still makes sense.\n\nMake absence meaningful and consistent. Decide early whether an optional field is omitted or sent as null, and apply it everywhere. Clients write different code for the two, and an API that mixes them forces every consumer to handle both.',
        },
        {
          title: 'Types That Survive the Wire',
          content: 'Three types cause most of the production incidents, and all three are decided at design time.\n\nLarge integers lose precision in JavaScript, which reads every number as a double. Any identifier that can exceed 2^53 — snowflake ids, large auto-increment keys, timestamps in nanoseconds — should be sent as a string. This is not a theoretical concern; it is why Twitter added id_str.\n\nMoney should never be a float. Send minor units as an integer, or the amount as a string, with the currency in a separate field. A decimal fraction that cannot be represented in binary floating point will drift the moment anyone sums it.\n\nDates should be ISO 8601 with an explicit offset. A date without a timezone is ambiguous for anyone who is not in yours.',
          code: `{
  "id": "9007199254740993",
  "amount": { "value": "19.99", "currency": "USD" },
  "createdAt": "2026-01-15T10:30:00Z"
}`,
        },
        {
          title: 'Errors Deserve a Shape Too',
          content: 'Error responses are part of the contract and are usually designed last, which is why they are so often inconsistent — a string here, an object there, an HTML page under load.\n\nGive them one shape across every endpoint: a stable machine-readable code the client can branch on, a human-readable message for logs and developers, and optionally a field path for validation failures. The HTTP status carries the category; the body carries the detail.\n\nResist putting the message in the code. Messages get rewritten and translated; codes must not, because client logic depends on them.',
          code: `{
  "error": {
    "code": "validation_failed",
    "message": "The request body is not valid.",
    "details": [
      { "field": "email", "code": "invalid_format" }
    ]
  }
}`,
        },
      ]
    },
    relatedArticles: ['json-best-practices', 'json-schema-validation-guide']
  },
  'convert-json-to-excel-guide': {
    id: 'convert-json-to-excel-guide',
    title: 'How to Convert JSON to Excel: A Complete Guide',
    excerpt: 'Turn JSON data into clean Excel spreadsheets your whole team can use. Learn how arrays map to rows, how to flatten nested data, and how to avoid common pitfalls.',
    date: '2025-04-05',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Convert JSON to Excel',
          content: 'JSON is the language of APIs and code, but spreadsheets are the language of business. When you need to hand a dataset to an analyst, a manager, or a client, an Excel file they can sort, filter, and chart is far more useful than a block of JSON. Converting JSON to Excel bridges the gap between your technical data and the people who need to read it.'
        },
        {
          title: 'How Arrays Become Rows',
          content: 'The cleanest JSON to convert is an array of flat objects. Each object becomes a row, and each property name becomes a column header. Given the array below, you get a two-column sheet with a header row and one row per object:',
          code: `[
  { "name": "Ada",   "age": 36 },
  { "name": "Linus", "age": 54 },
  { "name": "Grace", "age": 41 }
]
// becomes:
// name  | age
// Ada   | 36
// Linus | 54
// Grace | 41`
        },
        {
          title: 'Handling Nested Data',
          content: 'Real JSON is often nested, and spreadsheets are flat. The common solution is to flatten nested objects into dotted column names — an address object with a city field becomes an address.city column. Arrays of values can be joined into a single cell, or, if they represent separate records, broken out into their own sheet. Deciding how to flatten is the main design choice when converting complex JSON.'
        },
        {
          title: 'Step by Step',
          content: '1. Make sure your JSON is an array of objects with consistent keys.\n2. Paste it into our JSON to Excel converter.\n3. Review the detected columns to confirm the mapping looks right.\n4. Download the generated .xlsx file.\n5. Open it in Excel, Google Sheets, or Numbers and verify the data.\n\nBecause the conversion runs entirely in your browser, even confidential data never leaves your device.'
        },
        {
          title: 'Common Pitfalls',
          content: '• Inconsistent keys across objects produce sparse columns — normalize your data first so every object has the same fields.\n• Deeply nested structures may need flattening or splitting into multiple sheets to stay readable.\n• Numbers stored as strings in JSON will arrive as text in Excel; convert them to real numbers if you plan to do math.\n• Very large datasets can be slow to open in a spreadsheet; consider CSV for bulk imports instead. You can also convert Excel back to JSON when you need to bring edited data back into your application.'
        },
        {
          title: 'Why .xlsx Beats CSV for This',
          content: 'CSV is the obvious export format and the wrong default for anything a colleague will open by double-clicking. It carries no type information, so an identifier like 00123 loses its leading zeros and a value like 1-2 becomes a date. It has no agreed separator, so a file written with commas opens in one column on a machine configured for semicolons. And it has no encoding declaration, so non-ASCII text arrives mangled unless a byte order mark happens to be present.\n\nAn .xlsx file has none of those ambiguities. Types, encoding and column structure are part of the format. If the destination is a person with a spreadsheet, produce a spreadsheet.',
        },
        {
          title: 'Flattening Decisions You Have to Make',
          content: 'A spreadsheet is a grid and JSON is a tree, so something has to give. Nested objects are the easy case: join the path into a column name, so address.city becomes its own column, and the structure survives in a readable form.\n\nArrays are harder, and the right answer depends on what a row is supposed to mean. Indexing into columns keeps everything but creates as many columns as the longest array. Joining into one cell is compact and loses structure. Exploding into one row per element is what an analyst usually wants, but it repeats the parent fields and changes the meaning of a row.\n\nDecide this before exporting rather than discovering it in the output.',
        },
        {
          title: 'Types That Need Attention',
          content: 'Three conversions are worth checking in the result rather than assuming.\n\nLong numeric strings — order numbers, phone numbers, postcodes — are the classic loss. Excel treats them as numbers, strips leading zeros and switches to scientific notation beyond fifteen digits. Writing them as text cells preserves them.\n\nDates arrive as strings in JSON and Excel will often reinterpret them according to locale, turning an unambiguous ISO date into the wrong day under a different regional setting. Writing real date cells rather than strings avoids the guesswork.\n\nAnd booleans: true becomes TRUE in a spreadsheet, which is fine until someone re-exports to CSV and a consumer expects lowercase.',
        },
        {
          title: 'Keeping the Export Reproducible',
          content: 'An export done once by hand is fine. An export someone repeats monthly should be scripted, because the manual steps — which sheet, which columns, how arrays were handled — are exactly what gets forgotten between runs.\n\nIf the spreadsheet is the deliverable but the JSON is the source of truth, keep both and regenerate rather than editing the spreadsheet and losing the link. And if the file is heading back into a system afterwards, agree the column names up front: a round trip through a spreadsheet where someone has renamed a header is a common and very quiet way to break an import.',
        },
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'json-parse-error-unexpected-token': {
    id: 'json-parse-error-unexpected-token',
    title: 'How to Fix "Unexpected token in JSON" and Other Parse Errors',
    excerpt: 'Decode the most-searched JSON parse errors — "Unexpected token < in JSON at position 0", "Unexpected end of JSON input" and more — and learn exactly how to fix each one.',
    date: '2025-04-14',
    readTime: '9 min read',
    category: 'Troubleshooting',
    content: {
      sections: [
        {
          title: 'Why These Errors Appear',
          content: 'Almost every developer has pasted a cryptic error like "Unexpected token < in JSON at position 0" into a search engine. These messages come from JSON.parse() (or a library built on it) when the text you handed it is not valid JSON. The parser reads until it hits a character it cannot make sense of, then reports the offending token and its position. The message looks scary but it is precise: it tells you exactly where parsing broke.',
        },
        {
          title: '"Unexpected token < in JSON at position 0"',
          content: 'This is the single most common one, and it almost never means your JSON is malformed — it means you are not receiving JSON at all. Position 0 with a < character means the very first byte is an HTML tag. Your fetch call got back an HTML page (usually a 404 or 500 error page, a login redirect, or a proxy error) instead of the JSON API response. Check the actual response body and HTTP status before parsing:',
          code: `const res = await fetch('/api/data');
if (!res.ok) throw new Error('HTTP ' + res.status);
const text = await res.text();
console.log(text.slice(0, 200)); // see what really came back
const data = JSON.parse(text);   // parse only once you trust it`,
        },
        {
          title: '"Unexpected end of JSON input"',
          content: 'This means the parser reached the end of the string before the structure was complete — an unclosed brace or bracket, or an empty string. Common causes: the response body was empty (a 204 No Content, or a failed request), the JSON was truncated in transit, or you called JSON.parse("") on an empty value. Guard against empty input and make sure every { and [ has a matching } and ].',
        },
        {
          title: 'Other Frequent Culprits',
          content: '• "Unexpected token \\047 in JSON" — you used single quotes; JSON requires double quotes.\n• "Unexpected token } in JSON" — a trailing comma before the closing brace or bracket.\n• "Unexpected non-whitespace character after JSON" — you have two JSON values concatenated, or extra text after the object.\n• "Unexpected token o in JSON at position 1" — you passed an object to JSON.parse() that was already an object (it got stringified to "[object Object]"); you probably meant to skip parsing.',
        },
        {
          title: 'The Fastest Way to Locate the Problem',
          content: 'When the position number is not enough, paste the raw text into our JSON formatter or validator. It highlights the exact line and character where the structure breaks and names the specific issue — missing comma, unquoted key, wrong quote style — which is far quicker than counting brackets by hand. Once it validates cleanly there, it will parse cleanly in your code.',
        },
        {
          title: 'Read the Position Backwards',
          content: 'The number in the message is where the parser gave up, not where the mistake is. Those are the same place only for a stray character; for a structural error they can be thousands of bytes apart.\n\nAn object left unclosed near the top of a file is perfectly consistent with everything that follows, right up to the end — so the error is reported at the last character. A missing comma after a value means the parser reads the next key as a continuation, and fails wherever that stops making sense.\n\nThe method that works: go to the reported position, then walk backwards to the last structure you are certain is complete and balanced, and check everything after it.',
        },
        {
          title: 'When the Token Is a Letter',
          content: 'The character named in the message is the strongest clue you have, and two cases cover most occurrences.\n\n"Unexpected token <" means you are not parsing JSON at all. An HTML document arrived where data was expected: an error page, a login redirect, a proxy notice, or a 404 returning the SPA shell. Log the first 200 characters of the response body before parsing and the cause is immediately obvious.\n\n"Unexpected token o in JSON at position 1" means an object was passed to the parser. JSON.parse coerces its argument to a string first, so an object becomes the literal [object Object] and fails on the o. The value is already parsed — delete the parse call.',
          code: `// the two most common cases, made visible
const text = await response.text();
console.log(response.status, text.slice(0, 200));

try {
  return JSON.parse(text);
} catch (err) {
  throw new Error(\`Expected JSON, got \${response.status}: \${text.slice(0, 120)}\`);
}`,
        },
        {
          title: 'The Mistakes That Produce It Most',
          content: 'In hand-edited files the causes are predictable and few. A trailing comma after the last entry, which is legal JavaScript and not JSON. Single quotes instead of double, usually from text copied out of code. Unquoted keys, the same habit. Comments, which JSON has none of. And smart quotes pasted from a word processor or chat client, which look almost identical to straight quotes and are a different character entirely.\n\nIn generated output the usual cause is string concatenation: building JSON by joining pieces in a loop and missing the separator on one branch. The answer there is not to fix the join but to stop concatenating — serialize a real object instead.',
        },
        {
          title: 'Preventing the Next One',
          content: 'Two habits remove most of these errors permanently.\n\nNever build JSON by hand. Construct the value in your language and let the serializer write it; it will quote, escape and separate correctly every time, including for the values you did not anticipate.\n\nAnd check the content type before parsing a response. If the server says text/html, you already know the parse will fail and you can produce an error message that names the actual problem rather than a character offset. An error that says "expected JSON, got a 502 HTML page" saves the next person the entire investigation.',
        },
      ],
    },
    relatedArticles: ['common-json-errors', 'json-schema-validation-guide'],
  },
  'json-array-to-csv': {
    id: 'json-array-to-csv',
    title: 'How to Convert a JSON Array to CSV',
    excerpt: 'Turn an array of JSON objects into clean CSV — learn how keys map to columns, how to handle nested fields and commas, and the fastest way to do it online.',
    date: '2025-04-22',
    readTime: '7 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Convert JSON to CSV',
          content: 'CSV is the lingua franca of data import: spreadsheets, databases, BI tools, and countless scripts all accept it. When you have an array of JSON objects — an API export, a query result, a log dump — converting it to CSV lets you open it in Excel, load it into a database, or feed it to a data pipeline without writing any parsing code.',
        },
        {
          title: 'How the Mapping Works',
          content: 'The conversion is conceptually simple: each object in the array becomes one row, and the union of all object keys becomes the header row of columns. Given a clean array of flat objects, the result is a tidy table:',
          code: `[
  { "id": 1, "name": "Ada",   "city": "London" },
  { "id": 2, "name": "Linus", "city": "Helsinki" }
]

// becomes
id,name,city
1,Ada,London
2,Linus,Helsinki`,
        },
        {
          title: 'Handling Commas, Quotes, and Newlines',
          content: 'CSV breaks if a value itself contains a comma, a double quote, or a line break. The rule (RFC 4180) is to wrap such values in double quotes and escape any internal double quote by doubling it. A value like Smith, John becomes "Smith, John". A good converter does this automatically — doing it by hand with a naive join(",") is the number-one cause of corrupted CSV.',
          code: `// value: He said "hi", then left
// correct CSV cell:
"He said ""hi"", then left"`,
        },
        {
          title: 'What About Nested Objects?',
          content: 'CSV is flat, so nested JSON needs a strategy. The usual approach is to flatten nested keys with a separator — user.name becomes a user.name column — or to serialize the nested part back to a JSON string inside a single cell. Arrays of objects that represent separate records are better split into their own file. If your data is deeply nested, flatten it first (see our guide on flattening nested JSON).',
        },
        {
          title: 'The Quick Way',
          content: 'Rather than writing a script, paste your array into our Excel/CSV converters — they detect the columns, escape special characters correctly, and give you a downloadable file in seconds. For a spreadsheet instead of raw CSV, the JSON to Excel converter produces an .xlsx directly.',
        },
        {
          title: 'What Has to Be Decided Before You Convert',
          content: 'Converting an array of objects to CSV looks mechanical and involves four decisions that the data cannot make for you.\n\nWhich keys become columns: if every object has the same keys, this is obvious. If they vary, you either take the union of all keys and leave gaps, or the intersection and drop data. Most tools take the union, which is usually right but means the first object cannot be used alone to derive the header.\n\nWhat to do with nested values, what to do with arrays, and what the separator should be. The last one is not a detail, as anyone who has opened a comma-separated file in a European Excel installation knows.',
        },
        {
          title: 'Quoting Is Not Optional',
          content: 'CSV has one escaping mechanism and it has to be applied correctly or the file silently misparses. A field containing the separator, a double quote, or a line break must be wrapped in double quotes, and any double quote inside it must be doubled.\n\nThis is where hand-rolled conversion usually goes wrong. Joining values with commas works on the test data and corrupts the first record containing a comma in an address or a quotation in a comment — and the corruption is not an error, it is a row with the wrong number of columns that some readers will happily accept.\n\nUse a real CSV writer. Every language has one, and the rules are fussier than they look.',
          code: `Value in JSON                 Correct CSV field
---------------------------   --------------------------------
London, UK                    "London, UK"
She said "yes"                "She said ""yes"""
line one\\nline two             "line one
line two"`,
        },
        {
          title: 'The Separator Problem',
          content: 'CSV has no real standard, and the most visible consequence is the separator. Excel uses the list separator from the operating system locale: a comma in en-US, a semicolon in most of Europe, Turkey included. Open a comma-separated file on a machine configured for semicolons and every row lands in a single column.\n\nThere are three ways out. Produce semicolon-separated output when you know the audience, which breaks it for everyone else. Prefix the file with a sep=, line, which Excel honours and other tools treat as a stray row. Or ship .xlsx instead, which carries no separator ambiguity at all and also preserves types.\n\nFor a file a colleague will open by double-clicking, the spreadsheet format is usually the kinder answer.',
        },
        {
          title: 'Encoding and Leading Characters',
          content: 'Two more things bite after the structure is right. Encoding: write UTF-8, and if the file is destined for Excel on Windows, consider a byte order mark, because without one Excel assumes the legacy code page and non-ASCII characters arrive mangled. This is the single most common cause of broken Turkish, German and Spanish text in exported files.\n\nAnd leading characters: a value beginning with =, +, - or @ is interpreted by spreadsheets as a formula. For an export that is at best confusing and at worst a CSV injection vulnerability, since a crafted value can run a command when opened. Prefix such values with an apostrophe, or quote them and let the importer treat them as text.',
        },
      ],
    },
    relatedArticles: ['convert-json-to-excel-guide', 'flatten-nested-json'],
  },
  'flatten-nested-json': {
    id: 'flatten-nested-json',
    title: 'How to Flatten Nested JSON Objects',
    excerpt: 'Flattening turns deeply nested JSON into a single-level structure with dotted keys — essential for CSV, spreadsheets, and tables. Learn the patterns and edge cases.',
    date: '2025-04-30',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What "Flattening" Means',
          content: 'Flattening converts a nested JSON structure into a single-level object where nested paths become compound keys, usually joined by dots. It is the step that makes hierarchical JSON fit into flat formats like CSV, Excel, or a database table. Understanding it well is the difference between a clean export and a mangled one.',
          code: `// nested
{ "user": { "name": "Ada", "address": { "city": "London" } } }

// flattened
{ "user.name": "Ada", "user.address.city": "London" }`,
        },
        {
          title: 'The Basic Algorithm',
          content: 'Flattening is a recursive walk: for each key, if the value is a plain object, recurse into it while building up the prefix; otherwise, record the value at the accumulated key. The result is a flat map from dotted paths to leaf values.',
          code: `function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}`,
        },
        {
          title: 'Handling Arrays',
          content: 'Arrays are the tricky part, and there is no single right answer. Three common strategies: (1) index the array into the key — items.0.sku, items.1.sku — which keeps everything in one row but explodes the column count; (2) join primitive arrays into one cell — tags becomes "red;green;blue"; or (3) if each array element is really a separate record, break it out into its own set of rows. Pick based on how you will consume the output.',
        },
        {
          title: 'Common Pitfalls',
          content: '• Key collisions: if a real key already contains a dot, dotted flattening becomes ambiguous — choose a separator your data does not use.\n• Losing types: flattening for CSV turns everything into text, so numbers and booleans may need re-typing downstream.\n• Sparse columns: different objects with different nested shapes produce many mostly-empty columns; normalize your data first if possible.',
        },
        {
          title: 'When You Just Need the Result',
          content: 'If your goal is simply to get nested JSON into a spreadsheet, our JSON to Excel converter flattens nested objects into dotted columns for you automatically — no code required. Use the manual approach above when you need custom control over how arrays and collisions are handled.',
        },
        {
          title: 'Why Flattening Is Usually Forced On You',
          content: 'Flattening is rarely something you want for its own sake. It is what you do when the destination has no concept of nesting: a CSV file, a spreadsheet, a relational column, a form, an analytics event, or a chart library expecting rows.\n\nThe mismatch is fundamental. A JSON document is a tree; a table is a grid. Every flattening strategy is a decision about how to project the first onto the second, and all of them lose something. Knowing which thing you are losing is what separates a clean export from a confusing one.',
        },
        {
          title: 'Dot Notation and Its Conventions',
          content: 'The common approach joins the path to each leaf with a separator, usually a dot, so that address.city becomes a single column name. It is readable, reversible in principle, and understood by tools such as pandas json_normalize and most spreadsheet importers.\n\nTwo details decide whether the result stays reversible. First, the separator must not appear in any key — if a key is literally "user.name", a dot-joined path becomes ambiguous and cannot be unflattened. Picking a separator you know does not occur in your data, or escaping it, avoids a silent corruption.\n\nSecond, you need a convention for array indices. Appending the position (items.0.sku) keeps the path exact, at the cost of columns that multiply with the longest array in the set.',
          code: `Input                              Flattened
-------------------------------    ------------------------
{                                  user.id        = 1
  "user": {                        user.name      = "Ada"
    "id": 1,                       address.city   = "London"
    "name": "Ada"                  tags.0         = "admin"
  },                               tags.1         = "editor"
  "address": { "city": "London" },
  "tags": ["admin", "editor"]
}`,
        },
        {
          title: 'Arrays Are the Hard Part',
          content: 'Objects flatten cleanly because their keys are fixed. Arrays do not, because their length varies per record, and every strategy for them is a trade-off.\n\nIndexing into columns (items.0.sku, items.1.sku) preserves everything but produces a column count driven by the largest array in the dataset, mostly empty for everyone else. Joining into one cell ("admin, editor") stays compact and readable but loses the structure, and breaks if a value contains the separator. Exploding into rows — one output row per array element, repeating the parent fields — is what a relational model would do, and is usually right for analysis, but it changes what a row means.\n\nThere is no default answer. Pick by asking what one row is supposed to represent in the output.',
        },
        {
          title: 'Collisions, Depth and Getting Back',
          content: 'Two practical failures turn up with real data. Key collisions happen when flattening produces the same column from different paths, which is possible as soon as your separator can appear inside a key. Depth happens when a document nests far enough that column names become unusable — at four or five levels a name like data.result.items.0.meta.tags.2 is technically correct and humanly useless.\n\nIf you may need to reverse the process, keep the structure intact somewhere. The cleanest approach is to export the flattened view for consumption and retain the original JSON as the source of truth, rather than treating the flattened file as canonical and trying to reconstruct the tree later.',
        },
      ],
    },
    relatedArticles: ['json-array-to-csv', 'convert-json-to-excel-guide'],
  },
  'minify-json-guide': {
    id: 'minify-json-guide',
    title: 'How to Minify JSON (and When You Actually Should)',
    excerpt: 'Minifying JSON strips whitespace to shrink payloads and speed up APIs. Learn how it works, how much it saves, and when to minify versus keep JSON readable.',
    date: '2025-05-08',
    readTime: '6 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What Minifying Does',
          content: 'Minifying JSON removes every character that a parser does not need: indentation, line breaks, and the spaces after colons and commas. The data is completely unchanged — only the formatting whitespace is gone. The result is a single dense line that is harder for humans to read but smaller and faster for machines to transfer and parse.',
          code: `// formatted (readable)
{
  "id": 1,
  "name": "Ada"
}

// minified
{"id":1,"name":"Ada"}`,
        },
        {
          title: 'How Much Space You Save',
          content: 'For typical nested JSON, minifying cuts 15-30% off the raw size, and more for deeply indented documents. On top of that, servers usually apply gzip or brotli compression, which shrinks both versions dramatically — but minified JSON still comes out ahead and, importantly, parses marginally faster because the parser scans fewer bytes.',
        },
        {
          title: 'When to Minify',
          content: 'Minify JSON for anything that travels over the network or is stored at scale: API responses, data embedded in HTML, config bundled into a build, or records written to a database in bulk. In these machine-to-machine contexts, readability does not matter and every kilobyte and millisecond counts.',
        },
        {
          title: 'When NOT to Minify',
          content: 'Keep JSON formatted whenever a human reads or edits it: configuration files checked into git (minified diffs are unreadable), documentation examples, and files you debug by eye. A good workflow is to author and store config in a readable form and minify only at the boundary where it ships. You can always toggle between the two — paste a minified blob into our formatter to beautify it, or paste formatted JSON to minify it instantly.',
        },
        {
          title: 'How Much Does Minifying Actually Save?',
          content: 'Minifying removes every byte that the parser ignores: the indentation, the newlines, and the space after each colon and comma. On pretty-printed JSON with two-space indentation that is typically 15 to 30 per cent of the file, and the deeper the nesting the more you save, because indentation grows with depth.\n\nThe number worth checking, though, is not the raw saving. Almost everything that serves JSON over HTTP also compresses it, and gzip or brotli are extremely good at exactly the kind of repetition that whitespace is. Measure both: a payload that drops 25 per cent when minified often drops only 2 or 3 per cent more after compression, because the compressor had already removed most of that redundancy.',
          code: `# measure before deciding
$ wc -c data.json                 # 48,201
$ jq -c . data.json | wc -c       # 36,118   (-25%)
$ gzip -c data.json | wc -c       #  5,402
$ jq -c . data.json | gzip | wc -c#  5,219   (-3% vs gzipped original)`,
        },
        {
          title: 'When It Is Worth Doing',
          content: 'Minifying earns its place where compression is not available or not applied. Storing many small documents in a database, writing to a size-capped field, embedding JSON in a URL or a data attribute, pushing payloads over a protocol with no compression layer, or paying per byte for storage or egress — in all of those the raw size is what counts.\n\nIt also matters at the extremes. Multi-megabyte responses parse measurably faster when there is less text to scan, and on constrained devices the memory held by the string itself is worth reducing.\n\nWhere it rarely matters is the common case: a compressed HTTP response from a web server. Enabling gzip or brotli achieves far more than minifying, and doing both yields very little beyond the first.',
        },
        {
          title: 'When Not to Minify',
          content: 'Anything a human edits should stay formatted. A minified package.json or tsconfig.json is hostile to the next person and produces unreadable diffs — a one-character change shows as the whole file rewritten, which destroys code review and makes merge conflicts unresolvable.\n\nThe same applies to fixtures and committed test data. Keep them pretty-printed so a failing assertion points at a readable line, and let the build minify if the shipped artefact needs it.\n\nA useful habit is to treat formatting as a property of the stage, not the file: formatted in the repository, minified in transit, and whichever is convenient at rest.',
        },
        {
          title: 'Minifying Without Changing the Data',
          content: 'Minifying is a lossless transformation when done by a parser: read the document into memory, write it back with no whitespace. The bytes change, the data does not, and key order is preserved by every mainstream implementation even though JSON does not require it.\n\nWhat you should not do is strip whitespace with a regular expression. Whitespace inside string values is data — removing it corrupts the content, and a naive pattern cannot tell a space inside quotes from a space between tokens. Always round-trip through an actual parser.',
          code: `// JavaScript: parse then stringify with no spacing
const minified = JSON.stringify(JSON.parse(raw));

// Python
import json
minified = json.dumps(json.loads(raw), separators=(",", ":"))

// Command line
jq -c . input.json > output.min.json`,
        },
      ],
    },
    relatedArticles: ['understanding-json-guide', 'json-rest-api-design'],
  },
  'json-vs-jsonl-ndjson': {
    id: 'json-vs-jsonl-ndjson',
    title: 'JSON vs JSONL vs NDJSON: Line-Delimited JSON Explained',
    excerpt: 'JSONL and NDJSON put one JSON object per line. Learn how they differ from regular JSON, why they scale to huge datasets, and when to use each.',
    date: '2025-05-16',
    readTime: '7 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'The Core Difference',
          content: 'Regular JSON represents an entire dataset as one value — typically a single array containing every record. JSONL (JSON Lines) and NDJSON (Newline-Delimited JSON) instead put one complete, independent JSON object on each line, with no enclosing array and no commas between records. JSONL and NDJSON are essentially the same format under two names.',
          code: `// Regular JSON — one array
[
  {"id":1,"name":"Ada"},
  {"id":2,"name":"Linus"}
]

// JSONL / NDJSON — one object per line
{"id":1,"name":"Ada"}
{"id":2,"name":"Linus"}`,
        },
        {
          title: 'Why Line-Delimited Scales Better',
          content: 'Because each line is independent, you can read and process a JSONL file one record at a time without loading the whole thing into memory — critical for files with millions of records. You can also append a new record by simply writing another line, and split the file across workers by line count. A giant JSON array, by contrast, must be fully parsed before you can touch the first element.',
        },
        {
          title: 'Where Each Is Used',
          content: 'Regular JSON dominates APIs and config, where the payload is small and a single well-formed value is convenient. JSONL/NDDJSON dominates data engineering: log streams, big data exports, machine-learning training sets, and LLM fine-tuning files (OpenAI and others expect JSONL). If the data is a stream or a large collection processed record-by-record, line-delimited wins.',
        },
        {
          title: 'Converting Between Them',
          content: 'Converting is straightforward: to go from a JSON array to JSONL, write each element on its own line; to go the other way, wrap the lines in [ ] and join them with commas. Note that a JSONL file as a whole is not valid JSON — each line is valid JSON, but the file is not — so do not try to JSON.parse() the entire file at once. Parse it line by line instead.',
        },
        {
          title: 'What Changes When Each Line Stands Alone',
          content: 'A JSON file is one value. To read any of it, a parser has to read all of it, because the closing bracket is what tells it the document is complete. JSON Lines turns that around: every line is a complete, independent JSON document, and the newline is the only thing separating them.\n\nThat single change has consequences in three directions. Memory, because you can process a 50 GB file one line at a time with a constant footprint. Appending, because adding a record is opening the file and writing a line, with no need to rewrite a closing bracket. And error recovery, because one corrupted line is one lost record rather than an unparseable file.',
          code: `# JSON — one document, must be read whole
[
  { "id": 1, "ok": true },
  { "id": 2, "ok": false }
]

# JSON Lines — two documents, readable one at a time
{"id": 1, "ok": true}
{"id": 2, "ok": false}`,
        },
        {
          title: 'The Rules Are Stricter Than They Look',
          content: 'JSON Lines looks informal and has a few requirements that bite when ignored. Each line must be a complete JSON value with no embedded raw newlines — pretty-printing a record across several lines breaks the format entirely, since the reader splits on the newline before parsing. Encoding must be UTF-8. The separator is a line feed; a file written on Windows with CRLF endings needs the carriage return stripped or tolerated.\n\nThe file should also not be wrapped in brackets or separated by commas. Those are the markers of a single JSON array, and a reader expecting one document per line will fail on the first character.',
          code: `# Valid: one line per record, compact
{"event":"login","at":"2026-01-02T10:00:00Z"}
{"event":"logout","at":"2026-01-02T10:42:00Z"}

# Invalid: pretty-printed across lines
{
  "event": "login"
}`,
        },
        {
          title: 'Reading Each Format',
          content: 'The tooling difference is small but real. For JSON you call one parse function and get everything. For JSON Lines you iterate, parsing each line, which is a few more lines of code and a great deal less memory.\n\nMost data tooling already understands both. jq reads a stream of documents without any flag. pandas takes lines=True on read_json. Python needs nothing beyond a loop. The error people hit most often is calling the whole-file parser on a JSON Lines file, which produces "Extra data" in Python and "Unexpected non-whitespace character after JSON" in JavaScript — both meaning the parser finished one document and found another.',
          code: `# Python
import json
with open("events.jsonl") as f:
    for line in f:
        record = json.loads(line)

# jq handles a stream natively
jq 'select(.event == "login")' events.jsonl

# pandas
pd.read_json("events.jsonl", lines=True)`,
        },
        {
          title: 'Choosing Between Them',
          content: 'Use plain JSON when the data is one coherent thing: an API response, a configuration file, a document with a top-level shape that means something. The brackets are not overhead there, they are structure.\n\nUse JSON Lines when the data is a sequence of independent records that grows over time: application logs, event streams, exported tables, machine-learning datasets, anything you want to append to or process in a pipeline. It is the format of choice for BigQuery and Snowflake imports, for OpenAI fine-tuning files, and for most log shippers, for exactly these reasons.\n\nIf you are unsure, ask whether a consumer would ever want one record without the others. If yes, lines. If the file only makes sense whole, JSON.',
        },
      ],
    },
    relatedArticles: ['parsing-large-json-files', 'json-vs-xml-yaml'],
  },
  'json-security-guide': {
    id: 'json-security-guide',
    title: 'JSON Security: Common Risks and How to Protect Your Application',
    excerpt: 'JSON looks harmless, but parsing untrusted JSON opens the door to injection, prototype pollution, denial-of-service, and data leaks. A practical, in-depth guide to the real risks and the defenses that actually work.',
    date: '2025-06-02',
    readTime: '14 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Why JSON Security Deserves Attention',
          content: 'JSON is just data, so it feels safe — but the moment your application parses JSON that came from outside (a client, a third-party API, a file upload, a webhook), you are executing decisions based on input you do not control. Attackers know this. Most JSON-related incidents are not about the format itself but about what your code does with the parsed result: trusting it, expanding it, or feeding it into something more powerful.\n\nThis guide walks through the concrete risks — injection, prototype pollution, denial-of-service, and information disclosure — and, more importantly, the defenses that actually hold up in production. The recurring theme is simple: never trust the shape or size of incoming JSON, and validate before you use it.',
        },
        {
          title: 'Prototype Pollution',
          content: 'Prototype pollution is the most JSON-specific vulnerability, and it is easy to introduce by accident. It happens when a parser or a deep-merge function copies attacker-controlled keys like __proto__, constructor, or prototype into an object, mutating the base Object prototype for the entire process. From there an attacker can influence unrelated code paths — turning a bad payload into privilege escalation or remote code execution in some frameworks.\n\nJSON.parse itself does not pollute prototypes, but naive code that merges parsed data into existing objects does. The fix is to reject dangerous keys and avoid unsafe recursive merges.',
          code: `// DANGEROUS: a deep merge that copies __proto__
merge(target, JSON.parse(untrustedInput));

// SAFER: reject dangerous keys during parse
const data = JSON.parse(untrustedInput, (key, value) => {
  if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
    return undefined; // drop it
  }
  return value;
});

// Or create objects without a prototype for lookups
const safe = Object.assign(Object.create(null), data);`,
        },
        {
          title: 'JSON Injection and Downstream Injection',
          content: 'JSON injection happens when you build JSON by string concatenation instead of serialization, letting attacker input break out of a string and inject new fields. The rule is absolute: never build JSON with string templates — always use a real serializer (JSON.stringify or your language equivalent), which escapes values correctly.\n\nThe more dangerous cousin is downstream injection: a value that is valid JSON but malicious when your code passes it, unescaped, into SQL, a shell command, an HTML page, or a NoSQL query. The parsed value is fine as data; the vulnerability is in how you use it.',
          code: `// DANGEROUS: hand-built JSON
const body = '{"name":"' + userName + '"}'; // userName can break out

// CORRECT: let the serializer escape everything
const body = JSON.stringify({ name: userName });

// And escape/parameterize again at every downstream boundary
db.query('SELECT * FROM users WHERE name = $1', [data.name]); // parameterized`,
        },
        {
          title: 'Denial-of-Service: Big and Deep Payloads',
          content: 'Because JSON.parse loads the entire input into memory at once, an attacker can send a payload designed to exhaust resources: a multi-gigabyte body, a deeply nested structure that blows the stack, or a huge array that consumes all available RAM. Even a "small" 20 KB payload can expand dramatically once deserialized into objects.\n\nDefenses are about limits, applied before and during parsing:',
          code: `// 1. Cap request body size at the server/middleware level
app.use(express.json({ limit: '100kb' }));

// 2. Reject absurd nesting depth (many parsers/validators support this)
// 3. Validate the schema so unexpected giant arrays are rejected early
// 4. Stream very large legitimate inputs instead of buffering them`,
        },
        {
          title: 'Validate Before You Trust: JSON Schema',
          content: 'The single most effective defense is to validate incoming JSON against a strict schema before your code touches it. A schema rejects unexpected fields, wrong types, out-of-range numbers, and oversized arrays at the boundary — turning a whole class of attacks and bugs into a clean 400 response.\n\nUse a battle-tested validator (Ajv for JavaScript, and equivalents in every language), define required fields and types, set maxLength / maximum / maxItems constraints, and disallow additional properties. Treat validation as a security control, not just data hygiene.',
          code: `const schema = {
  type: 'object',
  additionalProperties: false,          // reject unexpected fields
  required: ['email', 'age'],
  properties: {
    email: { type: 'string', format: 'email', maxLength: 254 },
    age:   { type: 'integer', minimum: 0, maximum: 130 },
    tags:  { type: 'array', maxItems: 20, items: { type: 'string' } }
  }
};`,
        },
        {
          title: 'Information Disclosure and Sensitive Data',
          content: 'JSON responses leak data more often than people realize. Serializing a full database object can expose password hashes, internal IDs, tokens, or fields you never meant to return. Verbose error responses can reveal stack traces and library versions that help an attacker.\n\nAdopt an allow-list mindset for output: explicitly choose which fields to serialize rather than returning whole entities. Strip secrets, and return generic error messages to clients while logging the details server-side.',
          code: `// DANGEROUS: returns everything, including passwordHash, internalNotes...
res.json(user);

// SAFER: serialize only what the client should see
res.json({ id: user.id, name: user.name, email: user.email });`,
        },
        {
          title: 'A Practical Checklist',
          content: '• Never build JSON by string concatenation — always serialize.\n• Validate every incoming payload against a strict schema (required fields, types, maxLength/maxItems, no additional properties).\n• Cap request body size and reject excessive nesting depth.\n• Drop __proto__ / constructor / prototype keys and avoid unsafe deep merges.\n• Re-escape or parameterize values at every downstream boundary (SQL, shell, HTML, NoSQL).\n• Serialize responses with an explicit allow-list of fields; never dump full entities.\n• Return generic errors to clients; log details privately.\n\nNone of these are exotic — they are the difference between JSON as safe data and JSON as an attack surface. When you need to inspect a suspicious payload, do it in a client-side tool like our formatter and validator so the data never leaves your machine.',
        },
        {
          title: 'Treat Size as an Attack Surface',
          content: 'A parser given unbounded input will consume unbounded memory, which makes an unlimited request body a denial-of-service vector that requires no cleverness at all.\n\nCap the body size at the edge — in the reverse proxy and again in the application — at a limit derived from your largest legitimate payload rather than a round number. Reject early, before parsing, because a 413 costs almost nothing and a parse of the same body costs everything.\n\nDepth deserves its own limit. A deeply nested document is small on the wire and expensive to parse, and recursive parsers can be made to exhaust the stack with a few kilobytes of nested brackets. Many parsers offer a maximum depth setting; set it.',
        },
        {
          title: 'Never Build JSON by Hand',
          content: 'Constructing JSON through string concatenation is the same category of mistake as building SQL that way, and it fails for the same reason: a value containing the delimiter escapes its context.\n\nA user-supplied name containing a double quote breaks the document at best and injects structure at worst, adding keys the server did not intend. Serialize a real object instead and let the library escape it — correctly, every time, including for the characters you did not think about.\n\nThe mirror of this applies when reading: do not reconstruct a value by slicing the raw text. Parse it, then take the field.',
        },
        {
          title: 'What Not to Put in the Payload',
          content: 'Over-serialisation is the quiet data leak. An object graph handed straight to a serializer sends every public field, including the ones added later by someone who did not know this type crosses the network — password hashes, internal flags, admin notes, the full user record attached to a comment.\n\nUse an explicit response model rather than serialising domain objects. It costs a mapping step and makes the contract deliberate, so a new field is exposed only when someone chooses to expose it.\n\nThe same applies to errors. A stack trace or a database message in an error response is a gift to anyone probing your service; log the detail server-side and return a code and a short message.',
        },
      ],
    },
    relatedArticles: ['json-schema-validation-guide', 'common-json-errors'],
  },
  'dates-in-json': {
    id: 'dates-in-json',
    title: 'Working with Dates and Times in JSON: The Complete Guide',
    excerpt: 'JSON has no date type, which is the source of endless bugs. A thorough guide to representing dates and times in JSON correctly — ISO 8601 vs Unix timestamps, time zones, and the pitfalls that bite everyone.',
    date: '2025-06-12',
    readTime: '12 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'The Root of the Problem: JSON Has No Date Type',
          content: 'JSON defines exactly six value types — string, number, boolean, null, object, and array. There is no date. Every date you have ever seen in JSON is really a string or a number by convention, and every system on both ends must agree on that convention. When they do not, you get off-by-hours bugs, dates that shift when they cross a time zone, and values that sort incorrectly.\n\nThis guide covers the two mainstream conventions — ISO 8601 strings and Unix timestamps — when to use each, and the time-zone traps that cause the most production incidents.',
        },
        {
          title: 'Option 1: ISO 8601 Strings (Recommended for APIs)',
          content: 'The most interoperable choice is an ISO 8601 string in UTC, ending with Z (the "Zulu"/UTC designator). It is human-readable, unambiguous, sorts correctly as text, and is parsed natively by virtually every language. For most APIs, this is the right default.',
          code: `{
  "createdAt": "2026-07-06T14:30:00Z",
  "updatedAt": "2026-07-06T14:30:00.123Z"
}

// Always store/transmit in UTC, convert to local time only for display.
new Date("2026-07-06T14:30:00Z"); // parsed reliably everywhere`,
        },
        {
          title: 'Option 2: Unix Timestamps (Compact and Unambiguous)',
          content: 'A Unix timestamp — the number of seconds (or milliseconds) since 1 January 1970 UTC — is a single integer with no formatting or time-zone ambiguity at all. It is compact, trivially comparable, and common in tokens (JWT exp/iat) and event pipelines. The main downsides are that it is not human-readable and that you must be crystal clear about seconds vs. milliseconds.',
          code: `{
  "exp": 1783410231,      // seconds — 10 digits (common in JWT, Unix tools)
  "eventTime": 1783410231000  // milliseconds — 13 digits (JavaScript Date)
}

// Seconds -> Date in JS (multiply by 1000):
new Date(1783410231 * 1000);`,
        },
        {
          title: 'The Time Zone Trap',
          content: 'Most date bugs come from ambiguous time zones. A value like "2026-07-06 14:30:00" with no offset is meaningless without knowing which zone it refers to — and different systems will guess differently. The fix is a discipline, not a library: store and transmit instants in UTC, include the offset or Z designator, and convert to the user’s local time only at the moment you display it.\n\nAlso beware of "floating" dates like a birthday (2026-07-06) that should NOT be converted across zones — represent those as a plain date string and treat them as date-only, never as an instant at midnight UTC.',
        },
        {
          title: 'Durations, Dates, and Times',
          content: 'ISO 8601 covers more than instants. A date-only value is 2026-07-06. A time-only value is 14:30:00. A duration uses the P format — P1Y2M10DT2H30M means one year, two months, ten days, two hours, thirty minutes. Using these standard forms keeps your JSON self-describing and avoids inventing custom formats that the other side has to reverse-engineer.',
          code: `{
  "date": "2026-07-06",          // date only, no time/zone
  "time": "14:30:00",            // time only
  "timeout": "PT30M",            // ISO 8601 duration: 30 minutes
  "subscription": "P1Y"          // one year
}`,
        },
        {
          title: 'Common Pitfalls and How to Avoid Them',
          content: '• Sending local time without an offset — always include Z or the offset.\n• Mixing seconds and milliseconds — pick one and document it; 10 digits is seconds, 13 is milliseconds.\n• Relying on Date.toString() formats — they are locale- and engine-dependent; use toISOString().\n• Treating date-only values as UTC midnight — this shifts the day backward for users west of UTC.\n• Assuming lexical sort equals chronological sort — it only works for ISO 8601 strings in the same zone, or for numeric timestamps.\n• Losing sub-second precision when you need it — include milliseconds in the ISO string.',
        },
        {
          title: 'Best Practices Summary',
          content: 'For APIs, default to ISO 8601 strings in UTC (2026-07-06T14:30:00Z) — readable, sortable, unambiguous. For tokens, high-volume events, or when size matters, use Unix timestamps and clearly document seconds vs. milliseconds. Always store instants in UTC, convert to local only for display, and use date-only strings for calendar dates that must not shift across zones.\n\nWhen you receive a raw timestamp and need to see what it means, paste it into our Unix Timestamp Converter to get the human-readable date, or decode a JWT to read its exp/iat claims as real dates.',
        },
        {
          title: 'Why ISO 8601 and Not Something Shorter',
          content: 'JSON has no date type, so every date is a string by convention and the convention worth adopting is ISO 8601 with an explicit offset — 2026-01-15T10:30:00Z.\n\nIt sorts correctly as text, which means a lexicographic sort is a chronological sort and a database index on the string behaves sensibly. It is unambiguous, unlike any format where the day and month can be confused. And every mainstream language parses it without configuration, which is not true of anything else.\n\nThe alternative you will meet is a Unix epoch, which is compact and unambiguous but unreadable in a log and silently ambiguous about seconds versus milliseconds — a distinction that has produced an impressive number of bugs dated to 1970.',
        },
        {
          title: 'The Offset Is Not Optional',
          content: 'A timestamp without an offset is incomplete, and the failure is quiet: it parses, it looks right, and it means something different depending on who reads it. "2026-01-15T10:30:00" is ten-thirty somewhere, and every consumer guesses, usually by assuming its own local zone.\n\nSend UTC with a Z, or an explicit offset such as +03:00. Both are unambiguous; UTC is simpler to reason about and the usual choice for storage and transport, with conversion to local time pushed to the display layer.\n\nNote that an offset is not the same as a timezone. +03:00 tells you the shift at that instant; Europe/Istanbul tells you the rules. For a future appointment the rules matter, because offsets change — so send the zone name alongside the timestamp when the event has not happened yet.',
        },
        {
          title: 'Dates Without Times',
          content: 'A birthday, an invoice date or a public holiday is a calendar date, not an instant, and converting it to a timestamp is a mistake that produces off-by-one-day bugs for anyone east or west of you.\n\nSend it as a plain date — 2026-01-15 — and parse it as a date type rather than a datetime. The moment a timezone is attached, midnight in one zone becomes the previous evening in another, and a birthday shifts by a day for part of your users. This class of bug is common, hard to reproduce locally, and entirely avoidable by not adding a time that was never there.',
        },
      ],
    },
    relatedArticles: ['json-rest-api-design', 'json-best-practices'],
  },
  'json-performance-at-scale': {
    id: 'json-performance-at-scale',
    title: 'JSON at Scale: Performance, Size, and Parsing Speed',
    excerpt: 'When JSON goes from kilobytes to gigabytes, naive code falls over. An in-depth look at what makes JSON slow, how to measure it, and the techniques — streaming, NDJSON, minification, and alternatives — that keep it fast at scale.',
    date: '2025-06-22',
    readTime: '13 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Where JSON Performance Actually Goes',
          content: 'For most applications JSON is effectively free — a few kilobytes parse in microseconds. Performance only becomes a topic at scale: large payloads, high request rates, or memory-constrained environments. Before optimizing, it helps to know where the cost really is. There are three main areas: the bytes on the wire (network and storage), the CPU spent parsing and serializing, and the memory used to hold the parsed structure.\n\nCrucially, the parsed, in-memory representation is often several times larger than the JSON text, because every object, string, and number becomes a full language object with overhead. A 100 MB JSON file can need several hundred megabytes of RAM once parsed.',
        },
        {
          title: 'The Cost of JSON.parse and Serialization',
          content: 'JSON.parse and JSON.stringify are highly optimized in modern engines, but they are synchronous and all-or-nothing: they block the thread and require the entire input (and output) in memory at once. On a server, a big parse blocks the event loop and delays every other request; on the client, it can freeze the UI.\n\nThe first rule of JSON performance is therefore: keep payloads small and parse off the hot path. Move heavy parsing to a worker thread, and never parse more than you need.',
          code: `// Blocking: a large synchronous parse stalls everything
const data = JSON.parse(hugeString);

// Better on the client: parse in a Web Worker so the UI stays responsive
// Better on the server: stream (below) instead of buffering the whole body`,
        },
        {
          title: 'Reduce Bytes: Minification and Compression',
          content: 'Two cheap wins shrink the payload. Minifying removes formatting whitespace, cutting 15-30% off the raw size for free. On top of that, HTTP compression (gzip or brotli) typically reduces JSON by 70-90% because JSON is highly repetitive — the same keys appear in every object. Always enable compression on JSON endpoints; it is usually the single biggest transfer win.\n\nFor data with many repeated keys, structural changes help even more: return columnar data (arrays of values with a separate header) instead of an array of objects, so keys are not repeated thousands of times.',
          code: `// Repetitive: keys repeated for every row
[{"id":1,"name":"A"},{"id":2,"name":"B"}]

// Columnar: keys once, values compact (great with compression)
{ "columns": ["id","name"], "rows": [[1,"A"],[2,"B"]] }`,
        },
        {
          title: 'Stream Instead of Buffer: NDJSON',
          content: 'The biggest scalability unlock is to stop treating a large dataset as one JSON value. Newline-delimited JSON (NDJSON) puts one object per line, so you can read, parse, and process records one at a time with constant memory — no matter how many records there are. This is how log pipelines, data exports, and ML training sets handle gigabytes without exhausting RAM.\n\nStreaming parsers (like stream-json) achieve the same for a regular JSON array, emitting each element as it is read rather than building the whole array first.',
          code: `// NDJSON: process millions of records in constant memory
const rl = readline.createInterface({ input: fs.createReadStream('data.ndjson') });
for await (const line of rl) {
  if (line.trim()) handle(JSON.parse(line));
}`,
        },
        {
          title: 'Send Less: Pagination and Field Selection',
          content: 'The fastest JSON is the JSON you never send. Two API-level techniques matter most at scale: pagination (return a page of results with a cursor, never an unbounded array) and field selection (let clients request only the fields they need, GraphQL-style or via a fields parameter). Both cut payload size, parse time, and memory simultaneously, and they protect your server from a single client requesting everything at once.',
        },
        {
          title: 'When to Consider Alternatives',
          content: 'JSON is the right default, but at extreme scale other formats earn their place. Binary formats like Protocol Buffers, MessagePack, or Avro are smaller and faster to parse because they skip text encoding and repeated keys, at the cost of human readability and tooling. For LLM prompts, token-oriented formats like TOON represent the same data in fewer tokens, cutting cost and context usage. The trade-off is always the same: you give up JSON’s universality and readability for size or speed, so switch only where you have measured a real bottleneck.',
        },
        {
          title: 'Measure, Then Optimize',
          content: 'Every optimization here has a cost in complexity, so do not apply them blindly. Measure first: log payload sizes, time your parse/serialize calls, and watch memory under realistic load. Optimize the one number that is actually hurting you — usually payload size (fix with compression + pagination) or main-thread blocking (fix with streaming or a worker). Most applications never need more than small payloads, gzip, and pagination.\n\nWhen you are inspecting or shrinking a payload by hand, our JSON formatter can minify it and our JSON to TOON converter shows how much a token-oriented representation would save.',
        },
        {
          title: 'Measure Before Optimising the Parser',
          content: 'Parsing is the obvious suspect and frequently not the bottleneck. In a typical pipeline the time goes to network transfer, decompression, allocation and whatever you do per record — and replacing the parser improves none of those.\n\nProfile first and the answer is often unglamorous: a response that is larger than it needs to be, a per-record database call inside the loop, or serialisation of a field nobody reads. Those are cheaper to fix and produce bigger gains than any parser swap.\n\nWhen parsing genuinely dominates, the fix is usually structural — stream instead of loading, or change the format — rather than finding a faster library for the same approach.',
        },
        {
          title: 'Send Less Rather Than Parse Faster',
          content: 'The cheapest byte to process is the one you never sent. Before optimising the read path, check what is in the payload.\n\nField selection is the biggest win available in most APIs: a response carrying forty fields when the client renders six is wasting the majority of its own transfer and parse cost. Supporting a fields parameter, or splitting fat resources into summary and detail representations, cuts the work proportionally.\n\nPagination is the second. An endpoint that returns everything is fine until the dataset grows, and the failure is sudden rather than gradual.\n\nAnd compression is close to free: gzip or brotli on JSON typically achieves 80 to 90 per cent reduction, because JSON is extremely repetitive. Confirm it is actually enabled — it frequently is not on internal services.',
        },
        {
          title: 'Know When to Leave JSON',
          content: 'JSON is a transport format and a poor storage format, and the distinction matters once volume grows.\n\nFor data written once and queried repeatedly, a columnar format such as Parquet is dramatically smaller and faster, because it stores each column together and skips the ones a query does not touch. For high-frequency service-to-service messaging, Protocol Buffers or MessagePack cut both size and parse cost, at the price of a schema and a build step.\n\nThe judgement is about who reads the data and how often. JSON earns its place when humans inspect it, when consumers are diverse, or when no dependency is the point. When the only readers are your own services at volume, its advantages stop applying and its costs remain.',
        },
      ],
    },
    relatedArticles: ['parsing-large-json-files', 'minify-json-guide'],
  }
};
