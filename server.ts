import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ROOT_DIR = process.cwd();
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Simple debug health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Client-side Gemini Chat proxy with robust Function Tools
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { history } = req.body;
      if (!history || !Array.isArray(history)) {
        return res.status(400).json({ error: "Invalid payload. 'history' array is required." });
      }

      // Check key existence and lazy init
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(403).json({
          error: "GEMINI_API_KEY is not defined. Please add it to your environment variables or Settings > Secrets panel."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Map simplified frontend history structure to standard Gemini parts format
      const formattedContents = history.map((msg: any) => {
        return {
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        };
      });

      const systemInstruction = 
        "You are an smart, incredibly helpful Workspace Assistant inside a mobile application. " +
        "You can chat with the user and execute tasks on their behalf by calling specific tools. " +
        "Always be highly responsive, polite, and encouraging.\n\n" +
        "Available operations:\n" +
        "1. Create a task\n" +
        "2. Create a note\n" +
        "3. Create a list / folder (of notes)\n" +
        "4. Create a custom timer\n\n" +
        "When the user requests to create one of these items, ALWAYS call the corresponding tool. " +
        "For example, if they say 'remind me to wash the car at 5 PM', use `createTask` with standard parameters. " +
        "If they say 'make a recipe note for pancakes', use `createNote`. " +
        "If they say 'create a work folder', use `createFolder`. " +
        "If they say 'start a 10 min focus study timer', use `createTimer`.\n\n" +
        "You are allowed to trigger multiple actions if they ask for multiple things at once (e.g. 'add a task to read and create a study folder'). " +
        "Provide a clear, brief textual explanation of what you did. Be friendly!";

      // Define the declarations for our workspace
      const createTaskDeclaration = {
        name: "createTask",
        description: "Create a task in the todo list.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Title of the task." },
            description: { type: Type.STRING, description: "Description or quick notes about the task." },
            priority: { type: Type.STRING, enum: ["high", "medium", "low"], description: "Priority level. Default to 'medium' if unspecified." },
            dueDate: { type: Type.STRING, description: "Task due date in YYYY-MM-DD format. Default to today's date if unspecified." },
            category: { type: Type.STRING, description: "Folder or list category (e.g. Work, Personal, Ideas, Shopping, etc.). Default to 'Work'." },
            subtasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Subtasks array (comma separated list of subtask titles)."
            }
          },
          required: ["title"]
        }
      };

      const createNoteDeclaration = {
        name: "createNote",
        description: "Create a note in the textbook notepad.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Elegant title of the note." },
            content: { type: Type.STRING, description: "The core body/text content of the note." },
            folder: { type: Type.STRING, description: "Notebook folder grouping (e.g. Ideas, Work, Personal, Shopping). Default to 'Ideas'." },
            color: { type: Type.STRING, enum: ['amber', 'sky', 'rose', 'emerald', 'purple', 'slate'], description: "Aesthetic pastel color tag. Default to 'slate' or pick one matching the theme." },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of tags e.g. ['Visuals', 'Sprint', 'Home']."
            }
          },
          required: ["title", "content"]
        }
      };

      const createFolderDeclaration = {
        name: "createFolder",
        description: "Create a note folder/category in the notebooks organizer.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the folder or category list." }
          },
          required: ["name"]
        }
      };

      const createTimerDeclaration = {
        name: "createTimer",
        description: "Create a focus timer widget in the custom timer panel.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Label or custom name of the timer." },
            minutes: { type: Type.NUMBER, description: "Duration minutes integer." },
            seconds: { type: Type.NUMBER, description: "Duration seconds integer. Default to 0." },
            color: { type: Type.STRING, enum: ['indigo', 'emerald', 'amber', 'rose', 'sky', 'purple'], description: "Color theme accent for this timer." }
          },
          required: ["name", "minutes"]
        }
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          tools: [{
            functionDeclarations: [
              createTaskDeclaration,
              createNoteDeclaration,
              createFolderDeclaration,
              createTimerDeclaration
            ]
          }]
        }
      });

      // Extract text content and function calls
      const text = response.text || "I have processed your request.";
      const functionCalls = response.functionCalls || [];

      // Return both text and triggered actions
      res.json({
        text,
        actions: functionCalls.map((fc: any) => ({
          type: fc.name,
          data: fc.args
        }))
      });

    } catch (err: any) {
      console.error("Gemini route error:", err);
      res.status(500).json({ error: err.message || "An error occurred while communicating with Gemini." });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Serving in DEVELOPMENT mode via Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving in PRODUCTION mode from /dist folder...");
    const distPath = path.join(ROOT_DIR, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
