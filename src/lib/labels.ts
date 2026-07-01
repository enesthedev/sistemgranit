export const FINISH_LABELS: Record<string, string> = {
  cilali: 'Cilalı',
  honlanmis: 'Honlanmış',
  patinato: 'Patinato',
  eskitme: 'Eskitme',
  fircali: 'Fırçalı',
  kumlanmis: 'Kumlanmış',
}

export const APPLICATION_LABELS: Record<string, string> = {
  zemin: 'Zemin kaplama',
  duvar: 'Duvar kaplama',
  tezgah: 'Mutfak tezgâhı',
  banyo: 'Banyo',
  merdiven: 'Merdiven',
  cephe: 'Dış cephe',
  somine: 'Şömine',
}

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  konut: 'Konut',
  ticari: 'Ticari',
  otel: 'Otel',
  kamu: 'Kamu',
  peyzaj: 'Peyzaj',
}

export function labelsFrom(map: Record<string, string>, values?: (string | null)[] | null) {
  if (!values) return []
  return values.filter(Boolean).map((v) => map[v as string] ?? (v as string))
}
