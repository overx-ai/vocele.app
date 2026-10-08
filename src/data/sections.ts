import type { LegalSection } from './types';

// The layout numbers sections by their order, so cross-references are derived from the same order.
export function legalSections<Id extends string>(ids: readonly Id[], word = 'Section') {
  const number = (id: Id) => ids.indexOf(id) + 1;
  return {
    number,
    ref: (id: Id) => `<a href="#${id}">${word} ${number(id)}</a>`,
    build: (bodies: Record<Id, Omit<LegalSection, 'id'>>): LegalSection[] => ids.map((id) => ({ id, ...bodies[id] })),
  };
}

export const legalTable = (head: readonly string[], rows: readonly (readonly string[])[]) => `
        <div class="legal-table"><table>
          <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
          <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`;
