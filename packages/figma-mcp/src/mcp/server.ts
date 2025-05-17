import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { addTool } from "./tools/addTool";

const server = new McpServer({
  name: "My MCP Server",
  version: "1.0.0",
});

server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

server.tool(addTool.name, addTool.input, addTool.handler);
