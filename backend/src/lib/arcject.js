import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import 'dotenv/config'


const aj = arcjet({
  
  key: process.env.ARCJECT_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
   
    slidingWindow({
      mode: "LIVE",
      max:100,
      interval:60
    }),
  ],
});

export default aj