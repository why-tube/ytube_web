import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction to guide the AI's behavior as a sales support agent
const SYSTEM_INSTRUCTION = `
당신은 'PremiumTube'라는 유튜브 프리미엄 할인 판매 사이트의 친절한 AI 상담원입니다.
고객들은 주로 가격, 이용 방법, 합법성 여부, 환불 정책에 대해 질문합니다.

다음 정보를 바탕으로 답변하세요:
1. 가격: 월 3,900원 (정가 대비 70% 할인), 1년 이용권 45,000원.
2. 방식: 가족 요금제 공유 방식을 사용하여 저렴하게 제공합니다. 안전하고 끊김이 없습니다.
3. 장점: 광고 제거, 백그라운드 재생, 오프라인 저장, 유튜브 뮤직 사용 가능.
4. 환불: 서비스 작동 안 될 시 100% 전액 환불 보장.
5. 말투: 친절하고 전문적이며, 이모지를 적절히 사용하여 모바일 환경에 맞는 짧고 가독성 좋은 답변을 제공하세요.
6. 목적: 고객이 안심하고 구매하도록 유도하는 것이 목표입니다.

답변은 한국어로 작성하세요.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};