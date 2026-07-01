import { TextConverter } from '../components/TextConverter';
import { decodeJwt } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JwtDecoderPage() {
  return (
    <>
      <SEO
        title="JWT Decoder | Free Online JSON Web Token Decoder"
        description="Free online JWT decoder. Paste a JSON Web Token to instantly decode its header and payload as readable JSON, with expiry info. Runs entirely in your browser — tokens never leave your device."
        keywords="jwt decoder, decode jwt, json web token decoder, jwt parser, jwt debugger, decode json web token, free online jwt"
        canonicalUrl="https://jsonformater.com/jwt-decoder"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JWT Decoder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Paste a JSON Web Token to instantly decode its header and payload as readable JSON, including expiry times. Everything runs in your browser — your token is never sent anywhere.
          </p>
        </header>

        <AdSlot slotId="jwt_decoder_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="JWT (paste your token)"
            outputLabel="Decoded Header & Payload"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            convertLabel="Decode JWT"
            downloadName="jwt-decoded.json"
            uploadAccept=".txt,.jwt"
            convert={decodeJwt}
          />
        </div>

        <AdSlot slotId="jwt_decoder_footer" />

        <ToolContent slug="jwt-decoder" />
      </div>
    </>
  );
}
