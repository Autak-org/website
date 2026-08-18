import type { Localized } from "@/i18n/localized";
import {
  byOrder,
  csv,
  loadMarkdownDir,
  optional,
  optionalLocalized,
  required,
} from "@/lib/markdown";

export type Member = {
  slug: string;
  name: string;
  photo: string;
  /** Board function or the role a supporter plays for the association. */
  role?: Localized<string>;
  tags?: readonly string[];
  bio?: Localized<string>;
};

export type MemberGroupId = "team" | "alumni" | "supporters";

export type MemberGroup = {
  id: MemberGroupId;
  members: readonly Member[];
};

const groups: readonly MemberGroupId[] = ["team", "alumni", "supporters"];

function isGroup(value: string): value is MemberGroupId {
  return (groups as readonly string[]).includes(value);
}

function loadMembers(): MemberGroup[] {
  const loaded: Record<MemberGroupId, Member[]> = {
    team: [],
    alumni: [],
    supporters: [],
  };

  for (const { slug, file, data } of byOrder(
    loadMarkdownDir("editorial/members"),
  )) {
    const group = required(data, "group", file);
    if (!isGroup(group)) {
      throw new Error(`${file}: group must be one of ${groups.join(", ")}.`);
    }

    const tags = csv(data, "tags");
    loaded[group].push({
      slug,
      name: required(data, "name", file),
      photo: optional(data, "photo") ?? `/images/people/${slug}.jpg`,
      role: optionalLocalized(data, "role", file),
      tags: tags.length ? tags : undefined,
      bio: optionalLocalized(data, "bio", file),
    });
  }

  return groups.map((id) => ({ id, members: loaded[id] }));
}

export const memberGroups: readonly MemberGroup[] = loadMembers();

export const memberCount = memberGroups.reduce(
  (total, group) => total + group.members.length,
  0,
);
