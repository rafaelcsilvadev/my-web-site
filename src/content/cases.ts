import type { CaseContent } from "@/models/case-content";

import { avariaCase } from "./avaria-case";
import { myTrelloVersionCase } from "./my-trello-version-case";
import { esteSiteCase } from "./this-site-case";

export const cases: CaseContent[] = [avariaCase, myTrelloVersionCase, esteSiteCase];

export const caseSlugs: string[] = cases.map((entry) => entry.slug);
