import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("Missing NOTION_API_KEY environment variable");
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabase() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Missing NOTION_DATABASE_ID environment variable");
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "due_date",
          direction: "descending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    throw error;
  }
}
