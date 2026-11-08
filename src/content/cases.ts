import type { CaseContent } from "@/models/case-content";

import { avariaCase } from "./avaria-case";
import { myTrelloVersionCase } from "./my-trello-version-case";

export const cases: CaseContent[] = [avariaCase, myTrelloVersionCase];

export const caseSlugs: string[] = cases.map((entry) => entry.slug);
