// Tutorial listings. Kept here rather than inline in the page so the
// prerenderer can bake the same text into the raw HTML — the page is a list of
// real content, and inline in JSX none of it reached anything that does not
// run JavaScript.

export type TutorialIcon = 'BookOpen' | 'Code' | 'Layers' | 'Zap';

export interface Tutorial {
  iconKey: TutorialIcon;
  title: string;
  description: string;
  content: string[];
  level: string;
  duration: string;
}

export const TUTORIALS_HEADING = 'Tutorials';
export const TUTORIALS_TAGLINE =
  'Step-by-step guides to master JSON formatting and C# class generation';
export const TUTORIALS_CTA_HEADING = 'Ready to Practice?';
export const TUTORIALS_CTA_BODY =
  'Try out these tutorials using our free JSON formatter and C# class generator tools. No registration required!';

export const tutorials: Tutorial[] = [
  {
    iconKey: 'BookOpen',
    title: 'Getting Started with JSON',
    description: 'Learn the basics of JSON syntax, data types, and structure. Perfect for beginners.',
    content: [
      'Understanding JSON syntax and structure',
      'Working with objects and arrays',
      'Valid data types in JSON',
      'Common JSON use cases',
      'Tools and resources for JSON development',
    ],
    level: 'Beginner',
    duration: '15 min',
  },
  {
    iconKey: 'Code',
    title: 'Advanced JSON Formatting Techniques',
    description: 'Master advanced formatting options, validation, and optimization strategies.',
    content: [
      'Pretty printing with custom indentation',
      'Minifying JSON for production',
      'Validating JSON structure and syntax',
      'Handling large JSON files efficiently',
      'Performance optimization techniques',
      'Using JSON schemas for validation',
    ],
    level: 'Advanced',
    duration: '25 min',
  },
  {
    iconKey: 'Layers',
    title: 'C# Class Generation Best Practices',
    description: 'Learn how to generate clean, maintainable C# classes from JSON data.',
    content: [
      'Understanding type mapping between JSON and C#',
      'Handling nullable types correctly',
      'Working with nested objects and collections',
      'Using JSON attributes for serialization',
      'Implementing INotifyPropertyChanged for binding',
      'Choosing between classes and records',
      'Data validation and error handling',
    ],
    level: 'Intermediate',
    duration: '30 min',
  },
  {
    iconKey: 'Zap',
    title: 'Working with Complex JSON Structures',
    description: 'Handle deeply nested objects, polymorphic data, and dynamic structures.',
    content: [
      'Navigating deeply nested JSON hierarchies',
      'Working with polymorphic data types',
      'Handling dynamic property names',
      'Flattening and restructuring JSON',
      'Merging multiple JSON objects',
      'Extracting specific data from large documents',
      'Converting between JSON and other formats',
    ],
    level: 'Advanced',
    duration: '35 min',
  },
];
