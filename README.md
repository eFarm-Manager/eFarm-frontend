# eFarm-frontend

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Dokumentacja Frontend

## Dokumentacja CI

### Linting, Vulnerability Scanning and Building

CI bedzie sie triggerowac gdy bedzie pull request(merge request) do `dev` z branch `feature/*` lub `bugfix/*`

Instalacja nastepuje z pliku pakcage-lock.json a zeby zmieniac go robi sie to z `npm install`.
Jest tam uzyty domyslnie zainstalowany eslint,npm audit, secret-scanning oraz codeQL.

Jest mozliwosc pojawienia sie **false-positives** wiec nie wszystkie bledy przez wyzej wymienione narzedzia musza byc bledami.
