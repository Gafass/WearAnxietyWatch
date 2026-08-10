import { spawnSync } from 'node:child_process';

const severityRank = {
  info: 0,
  low: 1,
  moderate: 2,
  high: 3,
  critical: 4,
};

const minimumBlockedSeverity = severityRank.high;
const acceptedAdvisories = new Map([
  [
    'https://github.com/advisories/GHSA-w3rx-r6r6-pgpr',
    { expires: '2026-09-30', risk: 'RISK-2026-001' },
  ],
  [
    'https://github.com/advisories/GHSA-5p2g-fcmc-qvqq',
    { expires: '2026-09-30', risk: 'RISK-2026-001' },
  ],
]);

const isWindows = process.platform === 'win32';
const auditCommand = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : 'npm';
const auditArguments = isWindows
  ? ['/d', '/s', '/c', 'npm audit --json']
  : ['audit', '--json'];
const result = spawnSync(auditCommand, auditArguments, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});

if (result.error) {
  console.error(`No se pudo ejecutar npm audit: ${result.error.message}`);
  process.exit(2);
}

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  console.error('npm audit no devolvió un informe JSON válido.');
  console.error(result.stderr.trim());
  process.exit(2);
}

if (!report.vulnerabilities) {
  console.error(
    'El informe de npm audit no contiene el inventario de vulnerabilidades.',
  );
  console.error(report.error?.summary ?? result.stderr.trim());
  process.exit(2);
}

function advisoryUrlsFor(packageName, visiting = new Set()) {
  if (visiting.has(packageName)) return new Set();
  visiting.add(packageName);

  const urls = new Set();
  const vulnerability = report.vulnerabilities[packageName];
  for (const source of vulnerability?.via ?? []) {
    if (typeof source === 'string') {
      for (const url of advisoryUrlsFor(source, new Set(visiting)))
        urls.add(url);
    } else if (source.url) {
      urls.add(source.url);
    }
  }
  return urls;
}

const today = new Date().toISOString().slice(0, 10);
const blocked = [];
const accepted = [];

for (const [packageName, vulnerability] of Object.entries(
  report.vulnerabilities,
)) {
  if ((severityRank[vulnerability.severity] ?? 99) < minimumBlockedSeverity)
    continue;

  const advisoryUrls = [...advisoryUrlsFor(packageName)];
  const decisions = advisoryUrls.map((url) => ({
    url,
    acceptance: acceptedAdvisories.get(url),
  }));
  const isAccepted =
    decisions.length > 0 &&
    decisions.every(
      ({ acceptance }) => acceptance && today <= acceptance.expires,
    );

  if (isAccepted) {
    accepted.push({ packageName, severity: vulnerability.severity, decisions });
  } else {
    blocked.push({ packageName, severity: vulnerability.severity, decisions });
  }
}

for (const item of accepted) {
  const risks = [
    ...new Set(item.decisions.map(({ acceptance }) => acceptance.risk)),
  ].join(', ');
  const expirations = [
    ...new Set(item.decisions.map(({ acceptance }) => acceptance.expires)),
  ].join(', ');
  console.warn(
    `ACEPTADO TEMPORALMENTE: ${item.packageName} (${item.severity}); ${risks}; vence ${expirations}.`,
  );
}

if (blocked.length > 0) {
  console.error(
    '\nVulnerabilidades altas o críticas sin una aceptación vigente:',
  );
  for (const item of blocked) {
    const identifiers =
      item.decisions.map(({ url }) => url).join(', ') ||
      'sin identificador trazable';
    console.error(`- ${item.packageName} (${item.severity}): ${identifiers}`);
  }
  process.exit(1);
}

console.log(
  `Auditoría aprobada: ${accepted.length} dependencias afectadas están cubiertas únicamente por riesgos temporales vigentes.`,
);
