export interface FormatRequest {
  action: 'format';
  jsonData: string;
}

export interface FormatResponse {
  formatted: string;
  minified: string;
  stats: {
    lineCount: number;
    characterCount: number;
    size: string;
  };
}

export interface GenerateRequest {
  action: 'generate';
  jsonData: string;
  className: string;
  namespace: string;
}

export interface GenerateResponse {
  csharpCode: string;
  classes: string[];
  stats: {
    classCount: number;
    lineCount: number;
  };
}

export type ApiRequest = FormatRequest | GenerateRequest;
export type ApiResponse = FormatResponse | GenerateResponse;
