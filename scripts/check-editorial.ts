import { capabilities, eventVideos, pressCitations, showcaseVideos, usageVideos, userVoices } from "../src/content/media";
import { memberCount, memberGroups } from "../src/content/members";
import { newsByDate } from "../src/content/news";
import { positions } from "../src/content/positions";
import { featuredProjects, projects } from "../src/content/projects";
import { products } from "../src/content/shop";

if (newsByDate.length === 0) throw new Error("no news loaded");
if (positions.length === 0) throw new Error("no positions loaded");
if (products.length === 0) throw new Error("no products loaded");
if (memberCount === 0) throw new Error("no members loaded");
if (!memberGroups.every((group) => group.members.length > 0)) {
  throw new Error("a member group is empty");
}
if (projects.length === 0) throw new Error("no projects loaded");
if (featuredProjects.length === 0) throw new Error("no featured projects");
if (showcaseVideos.length === 0) throw new Error("no showcase videos");
if (usageVideos.length === 0) throw new Error("no usage videos");
if (eventVideos.length === 0) throw new Error("no event videos");
if (pressCitations.length === 0) throw new Error("no press citations");
if (capabilities.length === 0) throw new Error("no capabilities");
if (userVoices.length === 0) throw new Error("no user voices");

const wheelchair = projects.find((project) => project.slug === "wheelchair");
if (!wheelchair?.videos?.length) {
  throw new Error("wheelchair project is missing videos");
}

console.log(
  [
    `${newsByDate.length} news (latest ${newsByDate[0].slug})`,
    `${positions.length} positions (${positions[0].id})`,
    `${products.length} products (${products[0].id})`,
    `${memberCount} members`,
    `${projects.length} projects (${featuredProjects.length} featured)`,
    `${showcaseVideos.length} showcase / ${usageVideos.length} usage / ${eventVideos.length} event videos`,
    `${pressCitations.length} press, ${capabilities.length} capabilities, ${userVoices.length} user voices`,
  ].join("; "),
);
