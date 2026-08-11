import Link from "next/link";

export function BrandHeader({ quiet = false }: { quiet?: boolean }) {
  return (
    <header className={`brand-header${quiet ? " brand-header--quiet" : ""}`}>
      <Link href="/diagnostico" className="brand-mark" aria-label="A Regra é Clara — início">
        <span className="brand-mark__rule" aria-hidden="true" />
        <span>A REGRA É CLARA</span>
      </Link>
      <span className="brand-header__edition">DIAGNÓSTICO / 01</span>
    </header>
  );
}
