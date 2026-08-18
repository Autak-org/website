import type { Localized } from "@/i18n/localized";
import { byOrder, loadMarkdownDir, localized, required } from "@/lib/markdown";

export type PositionKind = "thesis" | "internship" | "both";

export type Position = {
  id: string;
  kind: PositionKind;
  title: Localized<string>;
  field: Localized<string>;
  /** What the work is. */
  task: Localized<string>;
  /** What the applicant gets out of it. */
  learn: Localized<string>;
};

const kinds: readonly PositionKind[] = ["thesis", "internship", "both"];

function isKind(value: string): value is PositionKind {
  return (kinds as readonly string[]).includes(value);
}

function loadPositions(): Position[] {
  return byOrder(loadMarkdownDir("editorial/positions")).map(({ slug, file, data }) => {
    const kind = required(data, "kind", file);
    if (!isKind(kind)) {
      throw new Error(`${file}: kind must be one of ${kinds.join(", ")}.`);
    }

    return {
      id: slug,
      kind,
      title: localized(data, "title", file),
      field: localized(data, "field", file),
      task: localized(data, "task", file),
      learn: localized(data, "learn", file),
    };
  });
}

export const positions: readonly Position[] = loadPositions();

/** Attached to the thesis positions page as a downloadable example. */
export const thesisProposal = "/downloads/bus_buddy_thesis_proposal.pdf";
