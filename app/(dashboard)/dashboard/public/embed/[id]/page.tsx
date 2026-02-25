import { sql } from "../../../../../../utils/db";
import ChatInterface from "../../../../components/ChatInterface";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EmbedPage(props: { params: Params }) {
  const { id } = await props.params;

  // Fetch bot data - only if it is set to public
  const bots = await sql`
    SELECT id, name, welcome_message, theme_color 
    FROM chatbots 
    WHERE id = ${id}
    LIMIT 1
  `;
  
  const bot = bots[0];
  if (!bot) notFound();

  return (
    // Minimal wrapper: No margins, no background, just the chat
    <div className="h-screen w-screen bg-transparent overflow-hidden">
      <ChatInterface 
        botName={bot.name} 
        welcomeMessage={bot.welcome_message} 
        // isEmbed={true} // We'll add this prop to hide dashboard-specific UI
      />
    </div>
  );
}