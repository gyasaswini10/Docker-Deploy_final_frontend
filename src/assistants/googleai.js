import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai1 = "AIzaSyCXMBXAXl_o0CtmFeWM2QSxMPWCTwXpGRY";
const googleai=new GoogleGenerativeAI(googleai1);

export class Assistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    const gemini = googleai.getGenerativeModel({ model });
    this.#chat = gemini.startChat({ history: [] });
  }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      throw error;
    }
  }

  async *chatStream(content) {
    try {
      const result = await this.#chat.sendMessageStream(content);

      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      throw error;
    }
  }
}
