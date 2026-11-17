// ESLint 9 em flat config (rev-2.22.0). O Next 16 removeu o `next lint`; as
// mesmas regras de antes (core-web-vitals + typescript) vêm do eslint-config-next.
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', '.logo-concepts/**'],
  },
];

export default eslintConfig;
